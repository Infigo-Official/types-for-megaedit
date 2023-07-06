interface MediaAlbum extends BaseAlbum {
    description: string;
    itemLimit: number;
    numItems: number;
    readOnly: number;
    isDefault: boolean;
}

interface MediaItem extends BaseImageItem {
    name: string;
    width: number;
    height: number;
    preview: string;
    thumbnail: string;
    original: string;
    type: string;
    parentId: string;
    parentAlbum: number;
    numChildren: number;
}