import { Upload, FileText } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
}

export default function FileUpload({ onFilesChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    onFilesChange(files);
  };

  return (
    <div>
      <label className="text-sm font-semibold text-black flex gap-2">
        Resume / Cover Letter
      </label>

      <p className="text-gray-500 text-xs py-2">
        The uploaded files will be used to customize your interview practice.
      </p>

      <div
        onClick={handleClick}
        className="w-full p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50"
      >
        {selectedFiles.length === 0 && (
          <div className="flex items-center gap-3">
            <Upload className="text-gray-500 w-5 h-5" />
            <span className="text-gray-500 text-sm leading-tight">
              Upload up to 2 files (.pdf, .docx)
              <br />
              (Max 10MB each)
            </span>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-md p-4 bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                </div>

                <span className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
