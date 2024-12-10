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

    // const [startDate, setStartDate] = useState('');

    // const [endDate, setEndDate] = useState('');


    const handleGenerateReport = async () => {
        // if (!startDate || !endDate) {
        //     setError('Harap pilih rentang tanggal lengkap');
        //     return;
        // }

        try {
            setLoading(true);
            setError(null);

            const response = await API.get(`/dashboard/report`, {
                // params: {
                //     startDate: startDate,
                //     endDate: endDate
                // },
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
        <div className="container">
            <div className="row">

                {/* <div className="col-md-4 mb-3">
                    <label className="form-label">Tanggal Mulai</label>
                    <input type="date" className="form-control" value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Tanggal Akhir</label>
                    <input type="date" className="form-control" value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} />
                </div> */}


                <div className="mb-2">
                    <button onClick={handleGenerateReport} disabled={loading} className="btn btn-primary me-2">
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                        ) : ('Lihat Laporan')}
                    </button>
                    {pdfFile && (
                        <button className="btn btn-success" onClick={handleDownloadPDF}>
                            Unduh PDF
                        </button>
                    )}
                </div>
                <div className="col-12">
                    {/* PDF Viewer */}
                    {showPDF && (
                        <div className="card">
                            <div className="card-body">
                                {loading && (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger" role="alert"> {error}</div>
                                )}

                                {pdfFile && (
                                    <>
                                        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}
                                            onLoadError={onDocumentLoadError}
                                            loading={
                                                <div className="text-center">
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            }>
                                            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}
                                                className="mx-auto" width={Math.min(window.innerWidth * 0.9, 800)} />
                                        </Document>
                                        {numPages && (
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <button onClick={goToPreviousPage} disabled={pageNumber <= 1} className="btn btn-primary">
                                                    Previous
                                                </button>

                                                <p className="mb-0"> Page {pageNumber} of {numPages} </p>

                                                <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="btn btn-primary">
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
        </div>
    );

}


export default ReportUsingReactPdf;