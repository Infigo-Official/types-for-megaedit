interface UI {
    ShowEditorUi: (
        target: EditorUITarget | keyof typeof Editor.Constants.EditorUITarget,
        visible: boolean,
        callback?: () => void
    ) => void;
    SetEditorUiData: (
        target: EditorUITarget | keyof typeof Editor.Constants.EditorUITarget,
        value: number,
        callback?: () => void
    ) => void;
    ShowDialog: (
        title: string,
        uiItem: MEUIStackLayout,
        actions: { [label: string]: (dialogId: string) => void },
        closeCallback?: () => void,
        callback?: (dialogId: string) => void,
        windowClass?: string
    ) => void;
    ShowError: (msg: string, buttonText?: string, callback?: () => void, timeout?: number) => void;
    ShowWarning: (msg: string, buttonText?: string, callback?: () => void) => void;
    ShowMessage: (
        msg: string,
        buttonText?: string,
        callback?: () => void,
        permanent?: boolean,
        allowClose?: boolean,
        timeout?: number
    ) => void;
    ShowConfirm: (
        msg: string,
        title: string,
        buttonYesText?: string,
        buttonNoText?: string,
        yesCallback?: () => void,
        noCallback?: () => void
    ) => void;
    ShowOverlay: (msg: string, showTransparent?: boolean, showUi?: boolean, showFast?: boolean) => void;
    HideOverlay: () => void;
    CloseDialog: (dialogId: string, callback?: () => void) => void;
    Update: (callback: Function | null, includeChildren: boolean, ...args: any[]) => void;
    Add: (callback: Function | null, destination: keyof typeof Editor.Constants.EditorUITarget, ...args: any[]) => void;
    Reload: (callback: Function, ...args: any[]) => void;
    SetDefaultAlbum: (albumOrId: MediaAlbum | number) => void;
    GetSelectedAlbum: (callback: (album: MediaAlbum) => void) => void;
}