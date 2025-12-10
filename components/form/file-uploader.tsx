// FileUploader.tsx - Updated version
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Upload, X, FileText, Video, AlertCircle } from 'lucide-react';

export interface UploadedFile {
  file: File;
  id: string;
  type: 'image' | 'video' | 'pdf' | 'unknown';
  preview: string | null;
  name: string;
  size: number;
}

interface ErrorToast {
  id: string;
  message: string;
}

export interface FileUploaderProps {
  allowedTypes?: string[];
  multiple?: boolean;
  maxSize?: number;
  previewUrl?: string | null;
  onFilesChange?: (files: UploadedFile[]) => void;
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  name?: string;
  disabled?: boolean;
}

export interface FileUploaderRef {
  clearFiles: () => void;
  getFiles: () => UploadedFile[];
}

const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(({ 
  allowedTypes = ['image/*', 'video/*', 'application/pdf'],
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB default
  previewUrl = null,
  onFilesChange,
  value,
  onChange,
  name,
  disabled = false
}, ref) => {
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>(value || []);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorToast[]>([]);
  const [showPreviewUrl, setShowPreviewUrl] = useState<boolean>(!!previewUrl && (value?.length === 0));

  // Use controlled value if provided
  const files = value !== undefined ? value : internalFiles;

  const getFileTypeLabel = (): string => {
    const types: string[] = [];
    
    if (allowedTypes.some(type => type.includes('image'))) {
      types.push('images');
    }
    if (allowedTypes.some(type => type.includes('video'))) {
      types.push('videos');
    }
    if (allowedTypes.some(type => type.includes('pdf'))) {
      types.push('PDFs');
    }
    
    if (types.length === 0) return 'files';
    if (types.length === 1) return types[0];
    if (types.length === 2) return `${types[0]} and ${types[1]}`;
    return `${types.slice(0, -1).join(', ')}, and ${types[types.length - 1]}`;
  };

  const removePreviewUrl = (): void => {
    setShowPreviewUrl(false);
    if (onFilesChange) {
      onFilesChange([]);
    }
    if (onChange) {
      onChange([]);
    }
  };

  const showError = (message: string): void => {
    const id = Math.random().toString(36).substr(2, 9);
    setErrors(prev => [...prev, { id, message }]);
    
    setTimeout(() => {
      setErrors(prev => prev.filter(err => err.id !== id));
    }, 4000);
  };

  const removeError = (id: string): void => {
    setErrors(prev => prev.filter(err => err.id !== id));
  };

  const getFileType = (file: File): 'image' | 'video' | 'pdf' | 'unknown' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    return 'unknown';
  };

  const handleFiles = (newFiles: FileList | File[]): void => {
    if (disabled) return;
    
    const fileArray = Array.from(newFiles);
    let hasErrors = false;

    const validFiles = fileArray.filter(file => {
      const fileType = getFileType(file);
      
      // Check if file type is allowed
      const isTypeAllowed = allowedTypes.some(allowedType => {
        if (allowedType.includes('/*')) {
          const category = allowedType.split('/')[0];
          return file.type.startsWith(`${category}/`);
        }
        return file.type === allowedType;
      });

      if (!isTypeAllowed) {
        showError(`"${file.name}" has an unsupported file type. Allowed: ${getFileTypeLabel()}`);
        hasErrors = true;
        return false;
      }
      
      if (fileType === 'unknown') {
        showError(`"${file.name}" has an unsupported file type`);
        hasErrors = true;
        return false;
      }
      
      if (file.size > maxSize) {
        showError(`"${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
        hasErrors = true;
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0 && hasErrors) return;

    const filesWithPreview: UploadedFile[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      type: getFileType(file),
      preview: file.type.startsWith('image/') || file.type.startsWith('video/') 
        ? URL.createObjectURL(file) 
        : null,
      name: file.name,
      size: file.size
    }));

    const updatedFiles = multiple ? [...files, ...filesWithPreview] : filesWithPreview;
    
    // Update internal state
    if (value === undefined) {
      setInternalFiles(updatedFiles);
    }
    
    // Hide preview URL when new files are uploaded
    if (showPreviewUrl) {
      setShowPreviewUrl(false);
    }
    
    // Call callbacks
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
    if (onChange) {
      onChange(updatedFiles);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return;
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string): void => {
    if (disabled) return;
    
    const updated = files.filter(f => f.id !== id);
    const fileToRemove = files.find(f => f.id === id);
    
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    // Update internal state
    if (value === undefined) {
      setInternalFiles(updated);
    }
    
    // Call callbacks
    if (onFilesChange) {
      onFilesChange(updated);
    }
    if (onChange) {
      onChange(updated);
    }
  };

  const clearAllFiles = (): void => {
    if (disabled) return;
    
    files.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    
    const updated: UploadedFile[] = [];
    
    // Update internal state
    if (value === undefined) {
      setInternalFiles(updated);
    }
    
    // Call callbacks
    if (onFilesChange) {
      onFilesChange(updated);
    }
    if (onChange) {
      onChange(updated);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    clearFiles: clearAllFiles,
    getFiles: () => files
  }));

  return (
    <div className="w-full">
      {/* Error Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {errors.map((error) => (
          <div
            key={error.id}
            className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 max-w-md animate-slide-in"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm flex-1">{error.message}</p>
            <button
              onClick={() => removeError(error.id)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className={`bg-white rounded-lg shadow-lg p-6 ${disabled ? 'opacity-60' : ''}`}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">File Uploader</h2>
        
        {showPreviewUrl && previewUrl && files.length === 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <button
                  onClick={removePreviewUrl}
                  disabled={disabled}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="aspect-square bg-gray-100">
                  <img
                    src={previewUrl}
                    alt="Current preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    Current File
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Existing preview
                  </p>
                </div>
              </div>

              {multiple && !disabled && (
                <div
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors relative"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple={multiple}
                    accept={allowedTypes.join(',')}
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={disabled}
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">Add more</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                1 file selected
                {!multiple && <span className="text-gray-500 ml-2">(Single file mode - remove to re-upload)</span>}
              </p>
              <button
                onClick={removePreviewUrl}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {multiple ? 'Clear All' : 'Remove & Re-upload'}
              </button>
            </div>
          </div>
        ) : files.length === 0 ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple={multiple}
              accept={allowedTypes.join(',')}
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={disabled}
              name={name}
            />
            <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop {multiple ? 'files' : 'file'} here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              Supports {getFileTypeLabel()} (Max {formatFileSize(maxSize)})
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {!disabled && (
                    <button
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {fileObj.type === 'image' && (
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={fileObj.preview!}
                        alt={fileObj.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {fileObj.type === 'video' && (
                    <div className="aspect-square bg-gray-900">
                      <video
                        src={fileObj.preview!}
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Video className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  )}

                  {fileObj.type === 'pdf' && (
                    <div className="aspect-square bg-red-50 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-red-500" />
                    </div>
                  )}

                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-700 truncate" title={fileObj.name}>
                      {fileObj.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(fileObj.size)}
                    </p>
                  </div>
                </div>
              ))}

              {multiple && !disabled && (
                <div
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors relative"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple={multiple}
                    accept={allowedTypes.join(',')}
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={disabled}
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">Add more</p>
                  </div>
                </div>
              )}
            </div>

            {!disabled && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {files.length} file{files.length !== 1 ? 's' : ''} selected
                  {!multiple && <span className="text-gray-500 ml-2">(Single file mode - remove to re-upload)</span>}
                </p>
                <button
                  onClick={clearAllFiles}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  {multiple ? 'Clear All' : 'Remove & Re-upload'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

FileUploader.displayName = 'FileUploader';
export default FileUploader;