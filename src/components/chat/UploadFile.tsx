
import React from 'react';
import { Upload } from 'lucide-react';
import { useMessageContext } from '@/contexts/MessageContext';

interface UploadFileProps {
  onUpload?: (files: File[]) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onUpload }) => {
  // Since setUploadOpen doesn't exist anymore in MessageContext, we won't use it
  const { } = useMessageContext();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files.length > 0) {
      if (onUpload) {
        onUpload(Array.from(files));
      }
    }
  };

  return (
    <div className="bg-noesis-dark rounded-lg border border-noesis-purple/30 p-4 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-semibold">Upload Files</h3>
        <p className="text-sm text-gray-400 text-center">
          Drag and drop files here or click to browse
        </p>
        
        <div className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-gray-900/50">
          <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Click to browse files</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleUpload} 
              multiple 
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
