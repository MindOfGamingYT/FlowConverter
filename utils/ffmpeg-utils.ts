import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export const loadFFmpeg = async () => {
  if (ffmpeg) return ffmpeg;

  const instance = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  
  await instance.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  ffmpeg = instance;
  return ffmpeg;
};

export const getActionFromExtension = (ext: string): 'image' | 'video' | 'audio' => {
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
  const videoExts = ['mp4', 'mkv', 'avi', 'mov', 'webm'];
  const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];

  if (imageExts.includes(ext.toLowerCase())) return 'image';
  if (videoExts.includes(ext.toLowerCase())) return 'video';
  if (audioExts.includes(ext.toLowerCase())) return 'audio';
  return 'image';
};
