interface NativeFilePlugin {
  downloadFile(options: {
    url: string;
    fileName?: string;
    mimeType?: string;
  }): Promise<unknown>;
  downloadBase64?: (options: {
    base64Data: string;
    fileName?: string;
    mimeType?: string;
  }) => Promise<unknown>;
}

interface CapacitorLike {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
  Plugins?: {
    NativeFile?: NativeFilePlugin;
  };
}

interface ChatNativeFileBridge {
  isAndroidNativePlatform: () => boolean;
  downloadFile: (options: {
    url: string;
    fileName?: string;
    mimeType?: string;
  }) => Promise<unknown>;
  downloadBase64: (options: {
    base64Data: string;
    fileName?: string;
    mimeType?: string;
  }) => Promise<unknown>;
}

const getChatNativeFileBridge = (): ChatNativeFileBridge | null => {
  const bridge = (
    window as Window & {
      __CHAT_NATIVE_FILE__?: ChatNativeFileBridge;
    }
  ).__CHAT_NATIVE_FILE__;

  if (!bridge?.isAndroidNativePlatform()) {
    return null;
  }

  return bridge;
};

const getNativeFilePlugin = (): NativeFilePlugin | null => {
  const capacitor = (window as Window & { Capacitor?: CapacitorLike })
    .Capacitor;

  if (
    !capacitor?.isNativePlatform?.() ||
    capacitor.getPlatform?.() !== 'android'
  ) {
    return null;
  }

  return capacitor.Plugins?.NativeFile || null;
};

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Failed to encode file'));
        return;
      }

      const [, base64Data = ''] = reader.result.split(',');
      resolve(base64Data);
    };

    reader.onerror = () => {
      reject(reader.error || new Error('Failed to read file'));
    };

    reader.readAsDataURL(blob);
  });

const isObjectLikeUrl = (path: string) => /^(blob:|data:)/i.test(path);

const downloadFile = async (
  path: string,
  name: string = 'file',
  file?: File
): Promise<void> => {
  const nativeFilePlugin = getChatNativeFileBridge() || getNativeFilePlugin();

  if (nativeFilePlugin) {
    if (file && nativeFilePlugin.downloadBase64) {
      const base64Data = await blobToBase64(file);
      await nativeFilePlugin.downloadBase64({
        base64Data,
        fileName: name,
        mimeType: file.type || undefined
      });
      return;
    }

    if (isObjectLikeUrl(path) && nativeFilePlugin.downloadBase64) {
      const response = await fetch(path);
      const blob = await response.blob();
      const base64Data = await blobToBase64(blob);

      await nativeFilePlugin.downloadBase64({
        base64Data,
        fileName: name,
        mimeType: blob.type || file?.type || undefined
      });
      return;
    }

    if (!isObjectLikeUrl(path)) {
      await nativeFilePlugin.downloadFile({
        url: path,
        fileName: name,
        mimeType: file?.type || undefined
      });
      return;
    }
  }

  const response = await fetch(path, {
    credentials: isObjectLikeUrl(path) ? 'same-origin' : 'include'
  });
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = name;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default downloadFile;
