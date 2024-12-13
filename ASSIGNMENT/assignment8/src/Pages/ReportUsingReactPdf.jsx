import axios from 'axios';
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import API from '../API';

pdfjs.GlobalWorkerOptions.workerSrc =
    `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReportUsingReactPdf = () => {
    const [showPDF, setShowPDF] = useState(false);

    const [numPages, setNumPages] = useState(null);

    const [pageNumber, setPageNumber] = useState(1);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [pdfFile, setPdfFile] = useState(null);


    const handleGenerateReport = async () => {

        try {
            setLoading(true);
            setError(null);

            const response = await API.get(`/dashboard/report`, {
                responseType: 'blob',
                withCredentials: true
            });

            // Buat URL untuk preview PDF
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setPdfFile(pdfUrl);
            setShowPDF(true);
        } catch (err) {
            setError('Error fetching PDF: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (pdfFile) {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.setAttribute('download', `Laporan.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    };


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) => {
        setError('Error loading PDF: ' + error.message);
    };

    const goToPreviousPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div>
                    <button onClick={handleGenerateReport} disabled={loading} className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                        ) : 'Lihat Laporan'}
                    </button>
                </div>
                {pdfFile && (
                    <div>
                        <button className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={handleDownloadPDF}>
                            Unduh PDF
                        </button>
                    </div>
                )}
            </div>
            <div className="col-12">
                {/* PDF Viewer */}
                {showPDF && (
                    <div className="border rounded-lg shadow-lg">
                        <div className="p-4">
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
                                                className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                            >
                                                Previous
                                            </button>

                                            <p className="mb-0">Page {pageNumber} of {numPages}</p>

                                            <button
                                                onClick={goToNextPage}
                                                disabled={pageNumber >= numPages}
                                                className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );

}


export default ReportUsingReactPdf;