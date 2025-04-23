
import React from 'react';

interface DropzoneProps {
  onDrop: (files: File[]) => void;
  children: React.ReactNode;
}

const Dropzone = ({ onDrop, children }: DropzoneProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative"
    >
      {children}
    </div>
  );
};

export default Dropzone;
