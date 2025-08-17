import { useState, useEffect, useRef } from "react"; // Import useRef
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, FileText } from "lucide-react";
import QrPreview from "./QrPreview";
import useDebounce from "@/hooks/useDebounce";

// Define types for customization options
export type QrOptions = {
  foregroundColor: string;
  backgroundColor: string;
  logo?: string;
  size: number;
  fileExtension: "png" | "svg"; // Add fileExtension
};

interface SidebarProps {
  headers: string[];
  selectedColumns: string[];
  qrCodesGenerated: boolean;
  setSelectedColumns: (columns: string[]) => void;
  onGenerate: () => void;
  onDownloadZip: () => void;
  onDownloadPdf: () => void;
  setQrOptions: (options: QrOptions) => void;
}

export default function Sidebar({
  headers,
  selectedColumns,
  qrCodesGenerated,
  setSelectedColumns,
  onGenerate,
  onDownloadZip,
  onDownloadPdf,
  setQrOptions,
}: SidebarProps) {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | undefined>();
  const [qrSize, setQrSize] = useState(200);
  const [fileExtension, setFileExtension] = useState<"png" | "svg">("png");

  // Debounce color and size changes
  const debouncedForegroundColor = useDebounce(foregroundColor, 300);
  const debouncedBackgroundColor = useDebounce(backgroundColor, 300);
  const debouncedQrSize = useDebounce(qrSize, 300);

  // Use a ref to store the previous qrOptions to prevent unnecessary updates
  const prevQrOptionsRef = useRef<QrOptions | null>(null);

  // Update parent qrOptions when debounced values change
  useEffect(() => {
    const currentQrOptions: QrOptions = {
      foregroundColor: debouncedForegroundColor,
      backgroundColor: debouncedBackgroundColor,
      logo: logoPreview,
      size: debouncedQrSize,
      fileExtension,
    };

    // Only call setQrOptions if the options have actually changed
    if (JSON.stringify(currentQrOptions) !== JSON.stringify(prevQrOptionsRef.current)) {
      setQrOptions(currentQrOptions);
      prevQrOptionsRef.current = currentQrOptions; // Update the ref
    }
  }, [debouncedForegroundColor, debouncedBackgroundColor, logoPreview, debouncedQrSize, fileExtension, setQrOptions]);


  const handleSelectAll = (checked: boolean) => {
    setSelectedColumns(checked ? headers : []);
  };

  const allSelected = selectedColumns.length === headers.length;
  const noneSelected = selectedColumns.length === 0;

  const handleCheckboxChange = (header: string) => {
    const newSelectedColumns = selectedColumns.includes(header)
      ? selectedColumns.filter((col) => col !== header)
      : [...selectedColumns, header];
    setSelectedColumns(newSelectedColumns);
  };

  const handleForegroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setForegroundColor(newColor);
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const newLogoPreview = event.target?.result as string;
        setLogoPreview(newLogoPreview);
      };
      reader.readAsDataURL(file);
    } else {
      setLogo(null);
      setLogoPreview(undefined);
    }
  };

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Settings & Actions</CardTitle>
        <CardDescription>Configure and generate your QR codes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Column Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Columns to Include</h3>
            <Button variant="link" size="sm" onClick={() => handleSelectAll(!allSelected)}>
              {allSelected ? "Deselect All" : "Select All"}
            </Button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {headers.map((header) => (
              <div key={header} className="flex items-center space-x-2">
                <Checkbox
                  id={header}
                  checked={selectedColumns.includes(header)}
                  onCheckedChange={() => handleCheckboxChange(header)}
                />
                <Label htmlFor={header} className="font-normal">{header}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Customization */}
        <div className="space-y-4">
          <h3 className="font-semibold">Customization</h3>
          <div className="flex gap-4">
            <div className="space-y-2 flex-grow">
              <Label>Foreground</Label>
              <Input type="color" value={foregroundColor} onChange={handleForegroundColorChange} className="p-1"/>
            </div>
            <div className="space-y-2 flex-grow">
              <Label>Background</Label>
              <Input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} className="p-1"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="qrSize">Size (px)</Label>
            <Input id="qrSize" type="number" value={qrSize} onChange={(e) => setQrSize(Number(e.target.value))} min={50} max={1000} step={10} />
          </div>
          <div className="space-y-2">
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={handleLogoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outputFormat">Output Format</Label>
            <Select value={fileExtension} onValueChange={(value: "png" | "svg") => setFileExtension(value)}>
              <SelectTrigger id="outputFormat">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center p-4 bg-muted rounded-md">
            <QrPreview qrOptions={{ foregroundColor, backgroundColor, logo: logoPreview, size: qrSize, fileExtension }} />
          </div>
        </div>

        <Button onClick={onGenerate} disabled={noneSelected} className="w-full">
          {qrCodesGenerated ? "Regenerate" : "Generate"} QR Codes
        </Button>

        <Separator />

        {/* Download Options */}
        <div className="space-y-4">
          <h3 className="font-semibold">Download Options</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" disabled={!qrCodesGenerated} onClick={onDownloadZip}>
              <FileDown className="h-4 w-4 mr-2" />
              Download all as ZIP
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled={!qrCodesGenerated} onClick={onDownloadPdf}>
              <FileText className="h-4 w-4 mr-2" />
              Export all to PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
