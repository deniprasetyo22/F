import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import API from '../../API';
import Button from '../../components/Elements/Button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const EmployeeLeavesReport = () => {
    const [showPDF, setShowPDF] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleGenerateReport = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await API.get('/dashboard/employee-leaves-report', {
                params: { startDate, endDate },
                responseType: 'blob',
                withCredentials: true,
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setPdfFile(pdfUrl);
            setShowPDF(true);
        } catch (err) {
            setError(`Error fetching PDF: ${err.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (pdfFile) {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.setAttribute('download', 'Laporan.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    };

    const handleReset = () => {
        setShowPDF(false);
        setPdfFile(null);
        setError(null);
        setNumPages(null);
        setPageNumber(1);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) => {
        setError(`Error loading PDF: ${error.message}`);
    };

    const goToPreviousPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Report</h1>
            <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <div className="mb-4 md:mb-0 md:w-full">
                    <div className="flex items-center justify-center my-4">
                        <Button variant="bg-blue-500" onClick={handleGenerateReport} disabled={loading} className="mr-2">
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </>
                            ) : 'View'}
                        </Button>
                        {pdfFile && (
                            <Button variant="bg-green-500 mx-4" onClick={handleDownloadPDF}>
                                Download
                            </Button>
                        )}
                        <Button variant="bg-red-500" onClick={handleReset} className="ml-2">
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-center overflow-x-auto">
                {showPDF && (
                    <div>
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                            <tbody>
                                <tr>
                                    <td className="p-4">
                                        {loading && (
                                            <div className="text-center">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        )}
                                        {error && (
                                            <div className="alert alert-danger text-red-600" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        {pdfFile && (
                                            <>
                                                <Document
                                                    file={pdfFile}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                    onLoadError={onDocumentLoadError}
                                                    loading={
                                                        <div className="text-center">
                                                            <div className="spinner-border text-primary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <Page
                                                        pageNumber={pageNumber}
                                                        renderTextLayer={false}
                                                        renderAnnotationLayer={false}
                                                        className="mx-auto"
                                                        width={Math.min(window.innerWidth * 0.9, 800)}
                                                    />
                                                </Document>
                                                {numPages && (
                                                    <div className="flex justify-between items-center mt-3">
                                                        <button
                                                            onClick={goToPreviousPage}
                                                            disabled={pageNumber <= 1}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                        >
                                                            Previous
                                                        </button>
                                                        <p className="mb-0">Page {pageNumber} of {numPages}</p>
                                                        <button
                                                            onClick={goToNextPage}
                                                            disabled={pageNumber >= numPages}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeLeavesReport;
