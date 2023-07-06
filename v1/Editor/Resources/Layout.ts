type LayoutModeType = 'Single' | 'Double';

interface LayoutItem {
    id: string;
    name: string;
    mode: LayoutModeType;
    src: string;
    restrictions: boolean;
    parentCategory: string;
    numFields: number;
    fieldSummary: string;
}

interface LayoutAlbum extends BaseAlbum {
    editable: boolean;
    numLayouts: number;
}