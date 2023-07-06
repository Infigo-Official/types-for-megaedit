interface MEUIColumnLayout extends MEUILayout {
    Add(...items: any[]): void;
    Remove(item: any): void;
}

interface MEUIColumnLayoutConstructor {
    new (
        isMultiline?: boolean,
        isVerticalAligned?: boolean,
        columnsPerRow?: number,
        columnPadding?: number
    ): MEUIColumnLayout;
    readonly prototype: MEUIColumnLayout;
}

declare const MEUIColumnLayout: MEUIColumnLayoutConstructor;