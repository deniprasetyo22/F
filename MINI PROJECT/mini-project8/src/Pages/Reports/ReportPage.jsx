import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import API from '../../API';
import Button from '../../components/Elements/Button';
import DepartmentService from '../../Services/DepartmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ReportPage = () => {
    const [activeReport, setActiveReport] = useState('department');

    const [showDepartmentPDF, setShowDepartmentPDF] = useState(false);
    const [departmentNumPages, setDepartmentNumPages] = useState(null);
    const [departmentPageNumber, setDepartmentPageNumber] = useState(1);
    const [departmentLoading, setDepartmentLoading] = useState(false);
    const [departmentError, setDepartmentError] = useState(null);
    const [departmentPdfFile, setDepartmentPdfFile] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    const [showLeavesPDF, setShowLeavesPDF] = useState(false);
    const [leavesNumPages, setLeavesNumPages] = useState(null);
    const [leavesPageNumber, setLeavesPageNumber] = useState(1);
    const [leavesLoading, setLeavesLoading] = useState(false);
    const [leavesError, setLeavesError] = useState(null);
    const [leavesPdfFile, setLeavesPdfFile] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [showProjectsPDF, setShowProjectsPDF] = useState(false);
    const [projectsNumPages, setProjectsNumPages] = useState(null);
    const [projectsPageNumber, setProjectsPageNumber] = useState(1);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [projectsError, setProjectsError] = useState(null);
    const [projectsPdfFile, setProjectsPdfFile] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getAllNoPages();
                setDepartments(response.data);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleGenerateDepartmentReport = async () => {
        try {
            setDepartmentLoading(true);
            setDepartmentError(null);

            const response = await API.get(`/dashboard/list-employees-by-department-report`, {
                params: { departmentName },
                responseType: 'blob',
                withCredentials: true
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setDepartmentPdfFile(pdfUrl);
            setShowDepartmentPDF(true);
        } catch (err) {
            setDepartmentError('Error fetching PDF: ' + (err.message || 'Unknown error'));
        } finally {
            setDepartmentLoading(false);
        }
    };

    const handleGenerateLeavesReport = async () => {
        try {
            setLeavesLoading(true);
            setLeavesError(null);

            const response = await API.get('/dashboard/employee-leaves-report', {
                params: { startDate, endDate },
                responseType: 'blob',
                withCredentials: true,
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setLeavesPdfFile(pdfUrl);
            setShowLeavesPDF(true);
        } catch (err) {
            setLeavesError(`Error fetching PDF: ${err.message || 'Unknown error'}`);
        } finally {
            setLeavesLoading(false);
        }
    };

    const handleGenerateProjectsReport = async () => {
        try {
            setProjectsLoading(true);
            setProjectsError(null);

            const response = await API.get('/dashboard/projects-report', {
                responseType: 'blob',
                withCredentials: true,
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setProjectsPdfFile(pdfUrl);
            setShowProjectsPDF(true);
        } catch (err) {
            setProjectsError(`Error fetching PDF: ${err.message || 'Unknown error'}`);
        } finally {
            setProjectsLoading(false);
        }
    };

    const handleDownloadPDF = (pdfFile) => {
        if (pdfFile) {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.setAttribute('download', 'Laporan.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    };

    const handleReset = (setShowPDF, setPdfFile, setError, setNumPages, setPageNumber) => {
        setShowPDF(false);
        setPdfFile(null);
        setError(null);
        setNumPages(null);
        setPageNumber(1);
    };

    const onDocumentLoadSuccess = (setNumPages) => ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (setError) => (error) => {
        setError('Error loading PDF: ' + error.message);
    };

    const goToPreviousPage = (setPageNumber, pageNumber) => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = (setPageNumber, numPages, pageNumber) => {
        setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Reports</h1>
            <div className="flex flex-col md:flex-row justify-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/3">
                    <button onClick={() => setActiveReport('department')} className={`w-full px-4 py-8 rounded ${activeReport === 'department' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Employee List By Department
                    </button>
                </div>
                <div className="w-full md:w-1/3">
                    <button onClick={() => setActiveReport('leaves')} className={`w-full px-4 py-8 rounded ${activeReport === 'leaves' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Employee Leaves Report
                    </button>
                </div>
                <div className="w-full md:w-1/3">
                    <button onClick={() => setActiveReport('projects')} className={`w-full px-4 py-8 rounded ${activeReport === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Projects Report
                    </button>
                </div>
            </div>

            {/* Employee List by Department Report */}
            {activeReport === 'department' && (
                <div className="border p-4 rounded-lg shadow mx-auto">
                    <h2 className="text-lg font-semibold mb-2 text-center">Employee List By Department</h2>
                    <label className="block text-sm font-medium text-gray-700">Department Name</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                    >
                        <option value="">-- Select a department --</option>
                        {departments.map(department => (
                            <option key={department.deptid} value={department.deptname}>
                                {department.deptname}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center justify-center my-4">
                        <Button variant="bg-blue-500" onClick={handleGenerateDepartmentReport} disabled={departmentLoading} className="mr-2">
                            {departmentLoading ? 'Loading...' : 'View'}
                        </Button>
                        {departmentPdfFile && (
                            <Button variant="bg-green-500 mx-4" onClick={() => handleDownloadPDF(departmentPdfFile)}>
                                Download
                            </Button>
                        )}
                        <Button variant="bg-red-500" onClick={() => handleReset(setShowDepartmentPDF, setDepartmentPdfFile, setDepartmentError, setDepartmentNumPages, setDepartmentPageNumber)} className="ml-2">
                            Reset
                        </Button>
                    </div>
                    {showDepartmentPDF && (
                        <div className="mt-4 flex flex-col items-center justify-center overflow-x-auto">
                            <Document
                                file={departmentPdfFile}
                                onLoadSuccess={onDocumentLoadSuccess(setDepartmentNumPages)}
                                onLoadError={onDocumentLoadError(setDepartmentError)}
                                loading={<div>Loading PDF...</div>}
                            >
                                <Page pageNumber={departmentPageNumber} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
                            </Document>
                            <div className="flex justify-center items-center mt-3 w-full">
                                <button onClick={() => goToPreviousPage(setDepartmentPageNumber, departmentPageNumber)} disabled={departmentPageNumber <= 1} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <p className="mx-4">Page {departmentPageNumber} of {departmentNumPages}</p>
                                <button onClick={() => goToNextPage(setDepartmentPageNumber, departmentNumPages, departmentPageNumber)} disabled={departmentPageNumber >= departmentNumPages} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    )}
                    {departmentError && <div className="text-red-600 text-center">{departmentError}</div>}
                </div>
            )}


            {/* Employee Leaves Report */}
            {activeReport === 'leaves' && (
                <div className="border p-4 rounded-lg shadow mx-auto">
                    <h2 className="text-lg font-semibold mb-2 text-center">Employee Leaves Report</h2>
                    <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2"
                        />
                    </div>
                    <div className="flex items-center justify-center my-4">
                        <Button variant="bg-blue-500" onClick={handleGenerateLeavesReport} disabled={leavesLoading} className="mr-2">
                            {leavesLoading ? 'Loading...' : 'View'}
                        </Button>
                        {leavesPdfFile && (
                            <Button variant="bg-green-500 mx-4" onClick={() => handleDownloadPDF(leavesPdfFile)}>
                                Download
                            </Button>
                        )}
                        <Button variant="bg-red-500" onClick={() => handleReset(setShowLeavesPDF, setLeavesPdfFile, setLeavesError, setLeavesNumPages, setLeavesPageNumber)} className="ml-2">
                            Reset
                        </Button>
                    </div>
                    {showLeavesPDF && (
                        <div className="mt-4 flex flex-col items-center justify-center overflow-x-auto">
                            <Document
                                file={leavesPdfFile}
                                onLoadSuccess={onDocumentLoadSuccess(setLeavesNumPages)}
                                onLoadError={onDocumentLoadError(setLeavesError)}
                                loading={<div>Loading PDF...</div>}
                            >
                                <Page pageNumber={leavesPageNumber} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
                            </Document>
                            <div className="flex justify-center items-center mt-3 w-full">
                                <button onClick={() => goToPreviousPage(setLeavesPageNumber, leavesPageNumber)} disabled={leavesPageNumber <= 1} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <p className="mx-4">Page {leavesPageNumber} of {leavesNumPages}</p>
                                <button onClick={() => goToNextPage(setLeavesPageNumber, leavesNumPages, leavesPageNumber)} disabled={leavesPageNumber >= leavesNumPages} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            </div>
                        </div>
                    )}
                    {leavesError && <div className="text-red-600 text-center">{leavesError}</div>}
                </div>
            )}

            {/* Projects Report */}
            {activeReport === 'projects' && (
                <div className="border p-4 rounded-lg shadow mx-auto">
                    <h2 className="text-lg font-semibold mb-2 text-center">Projects Report</h2>
                    <div className="flex items-center justify-center my-4">
                        <Button variant="bg-blue-500" onClick={handleGenerateProjectsReport} disabled={projectsLoading} className="mr-2">
                            {projectsLoading ? 'Loading...' : 'View'}
                        </Button>
                        {projectsPdfFile && (
                            <Button variant="bg-green-500 mx-4" onClick={() => handleDownloadPDF(projectsPdfFile)}>
                                Download
                            </Button>
                        )}
                        <Button variant="bg-red-500" onClick={() => handleReset(setShowProjectsPDF, setProjectsPdfFile, setProjectsError, setProjectsNumPages, setProjectsPageNumber)} className="ml-2">
                            Reset
                        </Button>
                    </div>
                    {showProjectsPDF && (
                        <div className="mt-4 flex flex-col items-center justify-center overflow-x-auto">
                            <Document
                                file={projectsPdfFile}
                                onLoadSuccess={onDocumentLoadSuccess(setProjectsNumPages)}
                                onLoadError={onDocumentLoadError(setProjectsError)}
                                loading={<div>Loading PDF...</div>}
                            >
                                <Page pageNumber={projectsPageNumber} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
                            </Document>
                            <div className="flex justify-center items-center mt-3 w-full">
                                <button onClick={() => goToPreviousPage(setProjectsPageNumber, projectsPageNumber)} disabled={projectsPageNumber <= 1} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                                <p className="mx-4">Page {projectsPageNumber} of {projectsNumPages}</p>
                                <button onClick={() => goToNextPage(setProjectsPageNumber, projectsNumPages, projectsPageNumber)} disabled={projectsPageNumber >= projectsNumPages} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    )}
                    {projectsError && <div className="text-red-600 text-center">{projectsError}</div>}
                </div>
            )}

        </div>
    );
};

export default ReportPage;
