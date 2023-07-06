type PageMode = 'Single' | 'Double';

interface Page {
    background: [];
    canDelete: boolean;
    displayName: string;
    fieldCount: number;
    id: string;
    isCover: boolean;
    layout: { cat: string; name: string }[];
    mode: PageMode;
    name: string;
    notDeletable: boolean;
    size: {
        width: number;
        height: number;
    };
    tags: string[];
    visible: boolean;
}

interface PageInfo {
    actualPageCount: number;
    bookLayout: boolean;
    editInsideCover: boolean;
    firstPageDimension: { width: number; height: number };
    hasCover: boolean;
    max: number;
    min: number;
    pageCount: number;
    separateCoverPages: boolean;
}

interface Pages {
    All: (callback: (pages: Array<Page>) => void) => void;
    ByIdOrIndex: (index: number | string, callback?: (page: Page) => void) => Page;
    ByName: (name: string, callback?: (page: Page) => void, exact?: boolean) => Page;
    SetLayout: (page: number | Page, layout: LayoutItem, index?: number, callback?: () => void) => void;
    UpdatePreview: (page: Page | string | null, callback?: (hasUpdated: boolean) => void) => void;
    Add: (
        callback?: (page: Page | null) => void,
        afterPageOrId?: number | string | null,
        ignorePageLimit?: boolean
    ) => void;
    Delete: (page: Page | string[], callback?: () => void) => void;
    Clear: (page: number | Page, drawingsOnly?: boolean, callback?: () => void) => void;
    Info: () => PageInfo;
    Count: (callback: (count: number) => void) => void;
    Render: (pageOrIndex: number | Page, size: number, callback: (image: string) => void) => void;
    ReArrange: (
        page: number,
        fieldOrIdList: MEFieldTypes | string[],
        ignoreUndo: boolean,
        ignoreEvent: boolean,
        callback?: () => void
    ) => void;
}