interface DocumentUpdateHandler {
    WaitOne(): void;
    GetTotal(): number;
    Start(): void;
    Stop(): void;
    PlusOne(): void;
}

interface DocumentUpdateHandlerConstructor {
    new(total: number, callback: () => void, skipRefresh?: boolean, skipUpdatePreview?: boolean): DocumentUpdateHandler;
    readonly prototype: DocumentUpdateHandler;
}

declare const DocumentUpdateHandler: DocumentUpdateHandlerConstructor;