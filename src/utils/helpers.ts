export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
};

/**
 * Resizes and compresses image to maximum 600px width and 0.7 JPEG quality
 * to strictly prevent localStorage quota exceeded errors (5MB limit).
 */
export const compressAndConvertImage = (
  file: File,
  maxWidth: number = 600,
  quality: number = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If not an image, read directly as data URL
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Proportional resize down to maxWidth if needed
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if canvas context fails
          resolve(event.target?.result as string);
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed JPEG
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = () => {
        // Fallback to raw base64 if image decoding fails
        resolve(event.target?.result as string);
      };
    };

    reader.onerror = (error) => reject(error);
  });
};

/**
 * Default file upload converter with automatic 600px/0.7 JPEG compression
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return compressAndConvertImage(file, 600, 0.7);
};

/**
 * Estimates size in KB from a base64 data URL
 */
export const getBase64SizeKb = (base64String: string): number => {
  const stringLength = base64String.length - (base64String.indexOf(',') + 1);
  const sizeInBytes = (stringLength * 3) / 4;
  return Math.round(sizeInBytes / 1024);
};
