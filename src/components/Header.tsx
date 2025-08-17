import { QrCode } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <QrCode className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">
          QR Forge
        </h1>
        {/* Dev-Beta blob */}
        <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full opacity-75 flex items-center gap-1"> {/* Adjusted py-0.5 */}
          <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
          Dev-Beta
        </span>
      </div>
    </header>
  );
}