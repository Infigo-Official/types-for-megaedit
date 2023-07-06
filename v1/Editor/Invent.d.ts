interface Variables {
    Get: (variableName: string, callback: (variableName: string) => void) => void;
    Set: (variableName: string, value: string, callback: ((variableName: string, value : string) => void) | null) => void;
}

interface InventEvents {
    RegisterForVariableUpdates: (updateCallback: (variableName: string, value: string) => void, registerSuccessCallback: (succes: boolean) => void) => void;
    RegisterValueReplacer: (replaceFunction: (variableName: string, value: string) => void, registerSuccessCallback: (succes: boolean) => void) => void;
}

interface Invent {
    GetConnector: (callback: Function | null) => void;
    Variables: Variables;
    Events: InventEvents;
}