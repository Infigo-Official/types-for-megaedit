interface Resources {
    MediaAlbums: (callback: (albums: Array<MediaAlbum>) => void, includeHidden?: boolean) => void;
    MediaChildItems: (media: MediaItem, callback: (items: Array<MediaItem>) => void) => void;
    MediaItems: (albumOrId: number | MediaAlbum, callback: (items: Array<MediaItem>) => void, filter?: string) => void;
    ClipartItem: (catName: string, itemName: string, callback: (item: ClipArtItem) => void) => void;
    ClipartAlbums: (callback: (albums: Array<BaseAlbum>) => void) => void;
    ClipartItems: (albumOrId: number | ClipArtItem, callback: (items: Array<ClipArtItem>) => void) => void;
    BackgroundCategories: (callback: (categories: Array<BackgroundCategory>) => void) => void;
    BackgroundItems: (albumOrId: string | BackgroundCategory, callback: (items: Array<BackgroundItem>) => void) => void;
    LayoutCategories: (callback: (categories: Array<LayoutAlbum>) => void, tag?: string) => void;
    LayoutItems: (albumOrId: number | LayoutItem, callback: (items: Array<LayoutItem>) => void) => void;
    Fonts: (callback: (fonts: Array<Font>) => void) => void;
    Info: InfoResource;
    UploadMediaItems: (
        albumOrId: MediaAlbum | number | null,
        callback: (mediaItem?: ClipArtItem, preflightInfo?: PreflightInfo) => void
    ) => void;
    DeleteMediaItem: (id: number, callback?: ({ result: boolean }) => void) => void;
    MaskCategories: (callback: (albums: Array<MaskAlbum>) => void) => void;
    MaskItems: (id: string | MaskAlbum, callback: (albums: Array<MaskItem>) => void) => void;
    Global: GlobalResources;
}