/**
 * File Upload Helper Module
 * Uses built-in S3 storage functions
 */

import { storagePut, storageGet } from "./storage.js";

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  contentType: string;
}

/**
 * Upload file to S3 storage
 * @param file - File buffer or data
 * @param fileName - Original file name
 * @param contentType - MIME type
 * @returns Upload result with URL and key
 */
export async function uploadFile(
  file: Buffer | Uint8Array,
  fileName: string,
  contentType: string
): Promise<UploadResult> {
  // Generate unique key with timestamp
  const timestamp = Date.now();
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `resources/${timestamp}-${sanitizedName}`;

  // Upload to S3 using built-in helper
  const result = await storagePut(key, file, contentType);

  return {
    key: result.key,
    url: result.url,
    size: file.length,
    contentType,
  };
}

/**
 * Get signed URL for file download
 * @param key - S3 object key
 * @returns Signed URL
 */
export async function getFileUrl(key: string): Promise<string> {
  const result = await storageGet(key);
  return result.url;
}

/**
 * Parse base64 data URL
 * @param dataUrl - Base64 data URL
 * @returns Buffer and content type
 */
export function parseDataUrl(dataUrl: string): { buffer: Buffer; contentType: string; fileName: string } {
  const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid data URL format");
  }

  const contentType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Generate filename based on content type
  const ext = contentType.split('/')[1] || 'bin';
  const fileName = `file.${ext}`;

  return { buffer, contentType, fileName };
}

/**
 * Validate file type
 * @param contentType - MIME type
 * @param allowedTypes - Array of allowed MIME types
 * @returns True if valid
 */
export function validateFileType(contentType: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(contentType);
}

/**
 * Validate file size
 * @param size - File size in bytes
 * @param maxSize - Maximum allowed size in bytes
 * @returns True if valid
 */
export function validateFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}

// Allowed file types
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
];

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

// Max file sizes (in bytes)
export const MAX_DOCUMENT_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
