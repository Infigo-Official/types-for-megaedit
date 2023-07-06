interface View {
    Zoom(amount: number, callback: () => undefined): void;
    ZoomToField(field: METextField | MEImageField, padding: number, callback: Function): void;
    ZoomTo(x: number, y: number, w: number, h: number, padding: number, callback: Function): void;
    GetViewPortInfo(callback: (x: number, y: number, zoom: number) => void): void;
    CurrentPage: () => number;
    Refresh: (callback?: () => void) => void;
    ReDraw: () => void;
    OpenPreview: (callback?: () => void) => void;
    ClosePreview: (callback?: () => void) => void;
    IsInPreview: () => boolean;
    TogglePreview: (callback?: () => void) => void;
    SetCurrentPage: (page: number, callback?: () => void) => void;
    RenderObjects: (force: boolean) => void;
}