"use client";

import FileUploader from "@/components/form/file-uploader";
import { useState } from "react";
import { fa } from "zod/v4/locales";

export default function DemoPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleFilesChange = (files: any[]) => {
    console.log("Files changed:", files);
    setUploadedFiles(files);
  };

  const handleFileRemove = (fileId: string) => {
    console.log("File removed:", fileId);
  };

  // Example of custom upload function
  const handleUpload = async (file: File): Promise<string> => {
    // Simulate API upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return a mock URL
    return `https://example.com/uploads/${file.name}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">File Uploader Demo</h1>
          <p className="text-muted-foreground">
           
          </p>
        </div>

        <div className="space-y-8">
          {/* Example 1: Basic uploader */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Uploader</h2>
            <FileUploader
              multiple={true}
              maxSize={10 * 1024 * 1024}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
