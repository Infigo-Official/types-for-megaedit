interface Fields {
    All: (cb?: (fields: Array<MEFieldTypes>) => void, types?: Array<string>) => MEFieldTypes[];
    ById: (id: string, cb?: (field: MEFieldTypes) => void) => MEFieldTypes;
    ByIds: (ids: Array<string>, cb: (fields: Array<MEFieldTypes>) => void) => void;
    ByName: (name: string, cb?: (fields: Array<MEFieldTypes>) => void, exact?: boolean, types?: Array<string>) => MEFieldTypes;
    ByPagesAndTags: (
        tags: Array<string>,
        pages: Array<string>,
        cb: (fields: Array<MEFieldTypes>) => void,
        all: boolean,
        types: string[]
    ) => void;
    ByTags: (tags: Array<string>, cb: (fields: MEBaseField[]) => void, all: boolean, types: Array<string>) => void;
    ByPages: (pages: number | Array<string>, cb: (fields: Array<MEFieldTypes>) => void, types?: Array<string>) => void;
    CreateField: <T extends MEFieldTypes>(
        type: string,
        page: number,
        position: { x: number; y: number },
        size: { width: number; height: number },
        cb: (field: T) => void
    ) => void;
    DeleteField: (fieldOrId: number | MEFieldTypes, cb?: (field: MEFieldTypes) => void) => void;
    CopyField: (
        fieldOrId: number | string | MEFieldTypes,
        targetPage: number,
        cb: (field: MEFieldTypes) => void
    ) => void;
    MeasureFieldText: (
        fieldOrId: number | MEFieldTypes,
        cb: (data: {
            didWrap: boolean;
            didWrapWord: boolean;
            height: number;
            overflow: string[];
            overflowBrokenByAlgorithm: boolean;
            overflowCursor: number;
            overflowStyle: object;
            overflowText: string;
            width: number;
        }) => void
    ) => void;
    GetTextAsHtml: (
        fieldOrId: number | MEFieldTypes,
        cb: (html: string) => void,
        includeFieldSettings?: boolean,
        tagLimiters?: string,
        entireTextFlow?: boolean
    ) => void;
    SetTextAsLimitedHtml: (
        fieldOrId: number | MEFieldTypes,
        text: string,
        cb?: (
            success: boolean,
            self: MEFieldTypes,
            response: { changed: boolean; text?: string; replacedText?: string }
        ) => void,
        tagLimiters?: string
    ) => void;
    GetFitToBoxFontSize: (
        fieldOrId: number | MEFieldTypes,
        callback: (fontSize: number) => void,
        withWrap?: boolean,
        minFontSize?: number,
        maxFontSize?: number
    ) => void;
    CreateCustomField: (
        type: string,
        page: number,
        position: { x: number; y: number },
        size: { width: number; height: number },
        cb: (field: MEFieldTypes) => void
    ) => void;
    SaveFields: (fields: MEFieldTypes[], onCompletion?: () => void) => void;
    RenderCustomField: (field: MECustomField, callback?: () => void) => void;
    Render: (fieldOrId: number | MEFieldTypes, width: number, callback: (image: string) => void) => void;
}