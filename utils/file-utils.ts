export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop() || '';
}

export function removeFileExtension(fileName: string): string {
  return fileName.split('.').slice(0, -1).join('.');
}

export const ACCEPTED_FILES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'],
  'video/*': ['.mp4', '.mkv', '.avi', '.mov', '.webm'],
  'audio/*': ['.mp3', '.wav', '.ogg', '.aac', '.m4a']
};
