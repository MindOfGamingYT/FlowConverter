"use client";

import { useState, useEffect } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { Download, Loader2, X, RefreshCw, FileType, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dropzone from './Dropzone';
import { loadFFmpeg, getActionFromExtension } from '@/utils/ffmpeg-utils';
import { bytesToSize, getFileExtension, removeFileExtension } from '@/utils/file-utils';

interface FileState {
  file: File;
  id: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  targetFormat: string;
  progress: number;
  resultUrl?: string;
  resultName?: string;
}

const EXTENSIONS = {
  image: ['jpg', 'png', 'webp', 'gif', 'bmp'],
  video: ['mp4', 'mkv', 'avi', 'mov', 'webm'],
  audio: ['mp3', 'wav', 'ogg', 'aac']
};

export default function Converter() {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadFFmpeg().then(() => setIsReady(true));
  }, []);

  const addFiles = (newFiles: File[]) => {
    const states: FileState[] = newFiles.map(file => {
      const ext = getFileExtension(file.name).toLowerCase();
      const type = getActionFromExtension(ext);
      return {
        file,
        id: Math.random().toString(36).substring(7),
        status: 'pending',
        targetFormat: EXTENSIONS[type].find(e => e !== ext) || EXTENSIONS[type][0],
        progress: 0
      };
    });
    setFiles(prev => [...prev, ...states]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateFormat = (id: string, format: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, targetFormat: format } : f));
  };

  const convertFile = async (fileState: FileState) => {
    const ffmpeg = await loadFFmpeg();
    const inputName = fileState.file.name;
    const outputName = `${removeFileExtension(inputName)}.${fileState.targetFormat}`;

    setFiles(prev => prev.map(f => f.id === fileState.id ? { ...f, status: 'converting', progress: 0 } : f));

    try {
      ffmpeg.on('progress', ({ progress }) => {
        setFiles(prev => prev.map(f => f.id === fileState.id ? { ...f, progress: Math.round(progress * 100) } : f));
      });

      await ffmpeg.writeFile(inputName, await fetchFile(fileState.file));
      
      // Basic conversion logic - FFmpeg handles mapping
      await ffmpeg.exec(['-i', inputName, outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      const url = URL.createObjectURL(new Blob([(data as any)], { type: `${getActionFromExtension(fileState.targetFormat)}/${fileState.targetFormat}` }));

      setFiles(prev => prev.map(f => f.id === fileState.id ? { 
        ...f, 
        status: 'completed', 
        resultUrl: url, 
        resultName: outputName 
      } : f));
    } catch (error) {
      console.error(error);
      setFiles(prev => prev.map(f => f.id === fileState.id ? { ...f, status: 'error' } : f));
    }
  };

  const convertAll = async () => {
    const pending = files.filter(f => f.status === 'pending');
    for (const f of pending) {
      await convertFile(f);
    }
  };

  return (
    <div className="w-full space-y-8">
      {!isReady && (
        <div className="flex items-center justify-center p-8 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 animate-pulse">
          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
          Initializing converter engine...
        </div>
      )}

      {files.length === 0 ? (
        <Dropzone onFilesAdded={addFiles} />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Uploaded Files ({files.length})</h3>
            <div className="flex gap-2">
               <button 
                onClick={() => setFiles([])}
                className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                disabled={files.some(f => f.status === 'converting')}
              >
                Clear All
              </button>
            </div>
          </div>

          <AnimatePresence>
            {files.map((f) => (
              <motion.div 
                key={f.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-4"
              >
                <div className="bg-gray-100 p-3 rounded-lg">
                  <FileType className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-gray-800">{f.file.name}</p>
                  <p className="text-xs text-gray-500">{bytesToSize(f.file.size)}</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  {f.status === 'pending' && (
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-gray-500">to</span>
                       <select 
                        value={f.targetFormat}
                        onChange={(e) => updateFormat(f.id, e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 outline-none"
                       >
                         {EXTENSIONS[getActionFromExtension(getFileExtension(f.file.name))].map(ext => (
                           <option key={ext} value={ext}>{ext.toUpperCase()}</option>
                         ))}
                       </select>
                    </div>
                  )}

                  {f.status === 'converting' && (
                    <div className="flex-1 md:w-32">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${f.progress}%` }}></div>
                      </div>
                      <p className="text-[10px] text-center mt-1 font-medium text-blue-600">Converting {f.progress}%</p>
                    </div>
                  )}

                  {f.status === 'completed' && (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
                       <CheckCircle className="w-4 h-4"/> Success
                    </span>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    {f.status === 'pending' && (
                      <button 
                        onClick={() => convertFile(f)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                      >
                         <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    {f.status === 'completed' && f.resultUrl && (
                      <a 
                        href={f.resultUrl} 
                        download={f.resultName}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                    <button 
                      onClick={() => removeFile(f.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition"
                      disabled={f.status === 'converting'}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {files.some(f => f.status === 'pending') && (
            <div className="flex justify-end pt-4">
              <button
                onClick={convertAll}
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Convert All Files
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
