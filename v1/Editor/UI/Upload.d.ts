interface MEUIUploadFile {
    mesType: boolean;
    fileName: string;
    lastMod: string;
    size: number;
    dataUrl: string;
    dataType: string;
    originalData: string;
    isBase64: boolean;
}

interface MEUIUpload extends MEUIBase {
    ButtonText: string;
    DataType: string;
    OnUpload: (self: MEUIUpload, event: any, upload: MEUIUploadFile) => void;
}

interface MEUIUploadConstructor {
    new (text: string, dataType?: string, uploaded?: (dummy: any, event: any, uploaded: MEUIUploadFile) => void);
    readonly prototype: MEUIUpload;
}

declare const MEUIUpload: MEUIUploadConstructor;