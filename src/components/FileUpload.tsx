'use client';

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, File, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CsvData = {
  headers: string[];
  rows: { [key: string]: string }[];
};

interface FileUploadProps {
  onUpload: (data: CsvData) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];

    if (file.type !== "text/csv") {
      toast.error("Invalid file type", {
        description: "Please upload a valid CSV file.",
      });
      return;
    }

    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields as string[];
        const rows = results.data as { [key: string]: string }[];
        onUpload({ headers, rows });
        setLoading(false);
        toast.success("CSV parsed successfully!");
      },
      error: (error) => {
        setLoading(false);
        toast.error("Error parsing CSV", {
          description: error.message,
        });
      },
    });
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Upload CSV</CardTitle>
        <CardDescription>Drag & drop your CSV file or click to browse.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          {loading ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          ) : isDragActive ? (
            <>
              <File className="h-12 w-12 text-primary" />
              <p className="mt-4 text-lg font-semibold">Drop the file here...</p>
            </>
          ) : (
            <>
              <UploadCloud className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">Drag & drop a CSV file or click here</p>
              <p className="text-sm text-muted-foreground">Maximum file size 10MB</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
