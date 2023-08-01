/**
 * A button which will initiate a download when clicked.
 * 
 * @module UI / Control / Download control
 */

/**
 * Download interface
 */
interface MEUIDownload extends MEUIBase {
    /**
     * The type of the UI element. Always "Download".
     */
    readonly Type: "Download";
    /**
     * The button label text.
     */
    ButtonText: string;
    /**
     * The data to download. Binary formats must be in Base64 (see {@link https://developer.mozilla.org/en-US/docs/Glossary/Base64}).
     */
    Data: string;
    /**
     * The data type of the download. Defaults to "text/plain".
     * See valid mime types: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
     */
    DataType: string;
    /**
     * The file name of the download as suggested as the default by the browser. Defaults to "download.txt".
     */
    FileName: string;
    /**
     * Registers a callback for the download event.
     * @param callback Event gets fired when the download is initiated.
     */
    OnDownload(callback: (download: MEUIDownload) => void): void;
}

/**
 * Download constructor interface
 */
interface MEUIDownloadConstructor {
    /**
     * Creates a new download
     * @param text The button label text.
     * @param data The data to download. Binary formats must be in Base64.
     * @param dataType The data type of the download. Defaults to "text/plain".
     * @param fileName The file name of the download as suggested as the default by the browser. Defaults to "download.txt".
     * @returns A new download component.
     */
    new (text: string, data: string, dataType?: string, fileName?: string): MEUIDownload;
    readonly prototype: MEUIDownload;
}

/**
 * The download class.
 */
declare const MEUIDownload: MEUIDownloadConstructor;