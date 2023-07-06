interface MEUISize {
    readonly width: number;
    readonly height: number;
}

interface MEUISizeConstructor {
    new (width: number, height: number): MEUISize;
    readonly prototype: MEUISize;
}

declare const MEUISize: MEUISizeConstructor;