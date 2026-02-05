# ConvertAll - Universal Universal Local File Converter

A high-performance, privacy-focused file conversion tool built with Next.js 14 and FFmpeg.wasm. Convert images, videos, and audio files directly in your web browser without ever uploading them to a server.

## Features

- **Privacy First**: Files are processed locally using WebAssembly. Data never leaves your machine.
- **Universal Support**: Convert between common formats (JPG, PNG, WebP, MP4, MKV, MP3, WAV, etc.).
- **Batch Processing**: Convert multiple files in one click.
- **Modern UI**: Clean, responsive interface with drag-and-drop support.

## Prerequisites

- Node.js 18.x or later
- npm (or yarn/pnpm)
- A Modern Browser (Chrome, Firefox, Safari, Edge) with SharedArrayBuffer support.

## Installation

1.  **Clone the Repository**
    git clone https://github.com/YOUR_USERNAME/convert-all.git
    cd convert-all

2.  **Install Dependencies**
    npm install

3.  **Run Development Server**
    npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment Instructions

### To GitHub
1.  Create a new repository on GitHub named `convert-all`.
2.  Follow the commands below:
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/convert-all.git
    git push -u origin main

### To Vercel
1.  Go to [Vercel](https://vercel.com) and sign in.
2.  Click **Add New** > **Project**.
3.  Select the `convert-all` repository.
4.  In the configuration, Vercel will automatically detect the Next.js framework.
5.  Click **Deploy**.

**CRITICAL NOTE**: FFmpeg.wasm requires `SharedArrayBuffer` to work. The `next.config.mjs` file already includes the required headers:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

Vercel will respect these headers automatically.

## Project Structure

- `/app`: Next.js App Router folders and main page layout.
- `/components`: UI components including the `Converter` logic and `Dropzone`.
- `/utils`: Helper functions for file sizing and FFmpeg instance management.
- `next.config.mjs`: Essential security header configuration.

## Troubleshooting

- **COOP/COEP Error**: If the conversion doesn't start, ensure you are using a modern browser and the security headers are correctly applied (check Developer Tools > Network).
- **Large Files**: Conversion speed is dependent on your local CPU since it's running via WebAssembly in your browser.
