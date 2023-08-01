/**
 * The _DocumentUpdateHandler_ is used to track the progress an ongoing operation with multiple steps and is a good tool with the async nature of the scripting interface to trigger an action once all steps are completed.
 * @module Helper / Document Update Handler
 */

/**
 * The base interface of the document update handler.
 */
interface DocumentUpdateHandler {
    WaitOne(): void;
    GetTotal(): number;
    Start(): void;
    Stop(): void;
    PlusOne(): void;
}

/**
 * The constructor interface of the document update handler.
 */
interface DocumentUpdateHandlerConstructor {
    /**
     * Creates a new document update handler.
     * 
     * @param total The total number of steps to be completed.
     * @param callback The callback function to be called once all steps are completed.
     * @param skipRefresh If set to true, the document will not be refreshed once all steps are completed. Defaults to false, meaning by default the document will be refreshed.
     * @param skipUpdatePreview If set to true, the page thumbnails will not be updated once all steps are completed. Defaults to false, meaning by default the page thumbnails will be updated.
     * @returns A new update handler.
     */
    new(total: number, callback: () => void, skipRefresh?: boolean, skipUpdatePreview?: boolean): DocumentUpdateHandler;    
    readonly prototype: DocumentUpdateHandler;
}

/**
 * Declaring the _DocumentUpdateHandler_ object for construction.
 */
declare const DocumentUpdateHandler: DocumentUpdateHandlerConstructor;