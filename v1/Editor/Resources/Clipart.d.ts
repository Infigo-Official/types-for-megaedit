interface ClipArtItem extends BaseImageItem {
    name: string;
    width: number;
    height: number;
    date: string;
    numUsages: number;
    preview: string;
    thumbnail: string;
    full: string;
    meta: string;
    type: string;
    numChildren: number;
    parentId: string;
    parentMedia: string;
}