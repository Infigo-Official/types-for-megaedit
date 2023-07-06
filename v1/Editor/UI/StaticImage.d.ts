interface MEUIStaticImage extends MEUIBase {
    Url: string;
}

interface MEUIStaticImageConstructor {
    new (url: string, width?: number, height?: number);
    readonly prototype: MEUIStaticImageConstructor;
}

declare const MEUIStaticImage: MEUIStaticImageConstructor;