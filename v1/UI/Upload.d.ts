/**
 * A file upload component.
 * 
 * @module UI / Control / Upload Component
 */

/**
 * The file upload result
 */
type MEUIUploadFile = {
    /**
     * Flag indicating this object is a MegaEdit scripting type. Will be true for objects created by this component.
     */
    mesType: boolean;
    /**
     * The file name of the uploaded file.
     */
    fileName: string;
    /**
     * The last modification timestamp as a string.
     */
    lastMod: string;
    /**
     * The size of the file in bytes.
     */
    size: number;
    /**
     * The data URI of the uploaded file.
     * Base 64 for binary data and plain text for text data.
     */
    dataUrl: string;
    /**
     * The data type of the uploaded file.
     */
    dataType: string;
    /**
     * The unmodified data. Can be used if {@link dataUrl} is not correctly handled by the upload process.
     */
    originalData: string;
    /**
     * Flag indicating if the upload is base 64 encoded.
     */
    isBase64: boolean;
}

/**
 * Upload component interface
 */
interface MEUIUpload extends MEUIBase {
    /**
     * The type of the UI element. Always "Upload".
     */
    readonly Type: "Upload";
    /**
     * The button label for the upload button.
     */
    ButtonText: string;
    /**
     * The data type which should be allowed to be uploaded.
     * Can be null. But if set, the event will only fire when the upload has the correct matching type.
     */
    DataType?: string;
    /**
     * The event which is fired when a file is uploaded.
     * @param self The upload component.
     * @param event This will always be "Upload".
     * @param upload The uploaded file.
     */
    OnUpload: (self: MEUIUpload, event: "Upload", upload: MEUIUploadFile) => void;
}

/**
 * Upload component constructor interface
 */
interface MEUIUploadConstructor {
    /**
     * Creates a new upload component
     * @param text The button label for the upload button.
     * @param dataType The data type which should be allowed to be uploaded.
     * @param uploaded The event which is fired when a file is uploaded.
     */
    new (text: string, dataType?: string, uploaded?: (self: MEUIUpload, event: "Upload", upload: MEUIUploadFile) => void);
    readonly prototype: MEUIUpload;
}

/**
 * The upload component class
 */
declare const MEUIUpload: MEUIUploadConstructor;