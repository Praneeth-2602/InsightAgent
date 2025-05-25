// useUpload custom hook placeholder
import { useState } from 'react';

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  return { isUploading, setIsUploading };
}
