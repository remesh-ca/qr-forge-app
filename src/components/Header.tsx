import { QrCode } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <QrCode className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">
          QR Forge
        </h1>
      </div>
    </header>
  );
}
