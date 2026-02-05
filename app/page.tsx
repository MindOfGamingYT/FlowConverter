import Converter from '@/components/Converter';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Universal File <span className="text-blue-600">Converter</span>
        </h1>
        <p className="text-lg text-slate-600">
          Privacy-focused, serverless file conversion. Your files never leave your device. Fast, free, and secure image, video, and audio conversion.
        </p>
      </section>

      {/* Main App Component */}
      <Converter />

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-blue-50 rounded-full">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold">100% Private</h3>
          <p className="text-sm text-gray-500">Processing happens entirely in your browser. Files are never uploaded to any server.</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-indigo-50 rounded-full">
            <Zap className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-bold">Lightning Fast</h3>
          <p className="text-sm text-gray-500">Utilizes the power of WebAssembly (FFmpeg.wasm) for high-speed local conversion.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-green-50 rounded-full">
            <ShieldCheck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold">Batch Processing</h3>
          <p className="text-sm text-gray-500">Upload multiple files at once and convert them to different formats simultaneously.</p>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="w-full text-center border-t border-gray-200 pt-8 mt-12 text-sm text-gray-400">
        <p>© 2024 ConvertAll. Built with Next.js & FFmpeg.wasm</p>
      </footer>
    </div>
  );
}
