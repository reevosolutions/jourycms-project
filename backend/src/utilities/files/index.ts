export const mimetypeToFileTypeGroup = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/gif': 'image',
  'image/bmp': 'image',
  'image/webp': 'image',
  'image/svg+xml': 'image',
  'image/tiff': 'image',
  'image/vnd.microsoft.icon': 'image',
  // documents
  'application/pdf': 'document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'document',
  'application/vnd.ms-excel': 'document',
  'text/csv': 'document',
  'application/msword': 'document',
  // data
  'application/json': 'data',
  'application/xml': 'data',
  'text/plain': 'text',
  // videos
  'video/mp4': 'video',
  'video/mpeg': 'video',
  'video/quicktime': 'video',
  'video/webm': 'video',
  'video/x-msvideo': 'video',
  // audio
  'audio/mpeg': 'audio',
  'audio/ogg': 'audio',
  'audio/wav': 'audio',
  'audio/aac': 'audio',
  'audio/midi': 'audio',
  // archive
  'application/zip': 'archive',
  'application/x-rar-compressed': 'archive',
  'application/x-7z-compressed': 'archive',
  'application/x-tar': 'archive',
  // web
  'text/html': 'web',
  'text/css': 'web',
  'application/javascript': 'web',
} as const;


export function getFileTypeGroup<M extends keyof typeof mimetypeToFileTypeGroup>(mimetype: M): typeof mimetypeToFileTypeGroup[M] | null {
  // Get the file type group based on the provided mimetype
  const fileTypeGroup = mimetypeToFileTypeGroup[mimetype];

  // Return the file type group or null if not found
  return fileTypeGroup || null;
}

const type = getFileTypeGroup('application/pdf')