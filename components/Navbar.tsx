import { Box, Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Layers className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ConvertAll
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
