declare module "@novnc/novnc" {
  export type RFBCredentials = {
    username?: string;
    password?: string;
    target?: string;
  };

  export type RFBOptions = {
    shared?: boolean;
    credentials?: RFBCredentials;
    repeaterID?: string;
    wsProtocols?: string[];
  };

  export type RFBCapabilities = {
    power: boolean;
  };

  export default class RFB extends EventTarget {
    constructor(target: HTMLElement, urlOrChannel: string | WebSocket | RTCDataChannel, options?: RFBOptions);

    background: string;
    readonly capabilities: RFBCapabilities;
    readonly clippingViewport: boolean;
    clipViewport: boolean;
    compressionLevel: number;
    dragViewport: boolean;
    focusOnClick: boolean;
    qualityLevel: number;
    resizeSession: boolean;
    scaleViewport: boolean;
    viewOnly: boolean;

    approveServer(): void;
    blur(): void;
    clipboardPasteFrom(text: string): void;
    disconnect(): void;
    focus(): void;
    getImageData(): ImageData;
    machineReboot(): void;
    machineReset(): void;
    machineShutdown(): void;
    sendCredentials(credentials: RFBCredentials): void;
    sendCtrlAltDel(): void;
    sendKey(keysym: number, code?: string | null, down?: boolean): void;
    toBlob(callback: BlobCallback, type?: string, quality?: number): void;
    toDataURL(type?: string, quality?: number): string;
  }
}