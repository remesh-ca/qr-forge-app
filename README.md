# CSV to QR Code Generator

A web application to easily convert your CSV data into QR codes. Upload a CSV file, select the columns you want to include, and generate QR codes for each row. You can then download the QR codes individually as PNGs, as a single ZIP file, or as a PDF document.

## Screenshots

*(I will add this section later after the UI is running and I can take screenshots)*

## Features

- **CSV Upload:** Upload your CSV file with a simple drag-and-drop interface.
- **Column Selection:** Choose which columns from your CSV to include in the QR code data.
- **QR Code Generation:** Instantly generate QR codes for each row of your CSV data.
- **Individual PNG Download:** Download each QR code as a separate PNG file.
- **Bulk ZIP Download:** Download all generated QR codes in a single ZIP file.
- **PDF Export:** Export all QR codes into a single, easy-to-share PDF document.
- **Responsive Design:** Works on both desktop and mobile devices.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with TypeScript and App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **CSV Parsing:** [PapaParse](https://www.papaparse.com/)
- **QR Code Generation:** [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **File Downloads:** [jszip](https://stuk.github.io/jszip/), [file-saver](https://github.com/eligrey/FileSaver.js/), [jspdf](https://github.com/parallax/jsPDF)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd qr-generator
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Running with Docker

1.  **Build the Docker image:**
    ```bash
    docker build -t csv-to-qr .
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 csv-to-qr
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment on Vercel

1.  Push your code to a Git repository (e.g., on GitHub).
2.  Import the repository on [Vercel](https://vercel.com/).
3.  Vercel will automatically detect the Next.js project and deploy it.