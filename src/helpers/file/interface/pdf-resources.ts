export interface IPdfResourceRequest {
  kind: 'cMapUrl' | 'standardFontDataUrl' | 'wasmUrl';
  filename: string;
}
