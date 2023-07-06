interface Events {
    Register: (
        event: MEvents | string,
        callback: (
            unused: boolean,
            data: unknown,
            event: string,
            eventObj: {
                preventDefault: () => void;
                stopPropagation: () => void;
            }
        ) => void
    ) => void;
    Listen: (event: MEvents | string, callback: (eventName: string, data: { [key: string]: any }) => void) => void;
    Broadcast: <T extends object>(event: MEvents | string, value?: T, targetEditorParent?: boolean) => void;
}