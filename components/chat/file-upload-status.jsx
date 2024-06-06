"use client";
import { Loader2, File as IconFile } from "lucide-react"; // Ensure you have lucide-react installed

const FileUploadStatus = ({ fileUploadStatus, fileName }) => {
  if (!fileUploadStatus) return null;

  return (
    <div className="px-6 py-2 border-2 w-80 text-gray-700 bg-backgroun rounded-md flex items-center">
      {fileUploadStatus === "Uploading..." && (
        <>
          <Loader2 className="mr-2 animate-spin" />
          <span className="block sm:inline">File uploading...</span>
        </>
      )}
      {fileUploadStatus === "Upload successful!" && (
        <>
          <IconFile className="mr-2" />
          <span className="block sm:inline">{fileName}</span>
        </>
      )}
      {fileUploadStatus !== "Uploading..." &&
        fileUploadStatus !== "Upload successful!" && (
          <span className="block sm:inline">{fileUploadStatus}</span>
        )}
    </div>
  );
};

export default FileUploadStatus;
