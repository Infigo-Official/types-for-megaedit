interface GlobalAdditionalDataGetResponse {
    ok: boolean;
    content: string;
}

interface EditorData {
    Get: <T>(target: 'Product' | 'ProductExternal', key: string, callback: T) => void;
    Set: <T>(target: DataTarget, key: string, value: string, callback: T) => void;
    GetProductExternalByKeys: <T>(keys: Array<string>, callback: T) => void;
    GetProductExternalKeys: <T>(callback: T) => void;
    GetAllProductExternalItems: <T>(callback: T) => void;
    GlobalAdditionalData: {
        List: (
            directory: string,
            callback: (
                result:
                    | {
                          ok: boolean;
                          files: string[];
                      }[]
                    | undefined
            ) => void
        ) => void;
        Get: (
            file: string,
            direct: boolean,
            callback: (result: GlobalAdditionalDataGetResponse | undefined) => void
        ) => void;
    };
}