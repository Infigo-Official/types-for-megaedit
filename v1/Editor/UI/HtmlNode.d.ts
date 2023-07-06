interface MEUIHtmlNodeConstructor {
    new (callback: (self: MEUIHtmlNode, event: any, payload: object) => void): MEUIHtmlNode;
    readonly prototype: MEUIHtmlNode;
}

declare const MEUIHtmlNode: MEUIHtmlNodeConstructor;