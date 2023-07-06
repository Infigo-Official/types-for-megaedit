interface MEUIStackLayout extends MEUILayout {
    Add(...items: any[]): void;
    Remove(item: any): void;
}

interface MEUIStackLayoutConstructor {
    new (horizontal: boolean): MEUIStackLayout;
    readonly prototype: MEUIStackLayout;
}

declare const MEUIStackLayout: MEUIStackLayoutConstructor;