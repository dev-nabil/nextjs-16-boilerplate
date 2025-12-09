"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, Upload, X, FileIcon, Loader2, CheckCircle2 } from "lucide-react"
import { useState, useRef } from "react"
import toast from "react-hot-toast"

type UploadedFile = {
  file: File
  preview?: string
  progress: number
  status: "uploading" | "complete" | "error"
}

export default function FileUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      progress: 0,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((_, index) => {
      simulateUpload(files.length + index)
    })
  }

  const simulateUpload = (index: number) => {
    const interval = setInterval(() => {
      setFiles((prev) => {
        const updated = [...prev]
        if (updated[index]) {
          updated[index] = {
            ...updated[index],
            progress: Math.min(updated[index].progress + 10, 100),
          }

          if (updated[index].progress === 100) {
            updated[index].status = "complete"
            clearInterval(interval)
            toast.success(`${updated[index].file.name} uploaded successfully!`)
          }
        }
        return updated
      })
    }, 200)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev]
      if (updated[index].preview) {
        URL.revokeObjectURL(updated[index].preview!)
      }
      updated.splice(index, 1)
      return updated
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/examples">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Examples
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">File Upload</h1>
          <p className="text-muted-foreground">Drag & drop file upload with preview and progress tracking</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Upload images or documents with real-time progress indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
              <p className="text-sm text-muted-foreground">Supports images, PDFs, and documents up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <Label>Uploaded Files ({files.length})</Label>
                {files.map((uploadedFile, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    {uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview || "/placeholder.svg"}
                        alt={uploadedFile.file.name}
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{uploadedFile.file.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.file.size)}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0 h-8 w-8"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {uploadedFile.status === "uploading" && (
                        <div className="space-y-1">
                          <Progress value={uploadedFile.progress} className="h-2" />
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Uploading... {uploadedFile.progress}%
                          </div>
                        </div>
                      )}

                      {uploadedFile.status === "complete" && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle2 className="w-4 h-4" />
                          Upload complete
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {files.length > 0 && (
              <div className="flex gap-2">
                <Button className="flex-1">
                  Submit {files.length} {files.length === 1 ? "File" : "Files"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
                    setFiles([])
                  }}
                >
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>File Upload Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Drag and drop support with visual feedback</li>
              <li>Multiple file selection</li>
              <li>Image preview thumbnails</li>
              <li>Real-time upload progress bars</li>
              <li>File size and type validation</li>
              <li>Individual file removal</li>
              <li>Toast notifications for upload completion</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
