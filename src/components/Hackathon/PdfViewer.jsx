import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the worker source explicitly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <button className="mb-4 text-red-500" onClick={onClose}>
          Close
        </button>
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) =>
            console.log(`Loaded a file with ${numPages} pages`)
          }
          onLoadError={(error) => console.error("Error loading PDF: ", error)}
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
