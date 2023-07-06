interface MEUIHtmlListOption {
    Label: string;
    ShortLabel: string;
    Value: string;
}

interface MEUIHtmlList extends MEUIBase {
    OnChange: (htmlList: MEUIHtmlList) => void;
    Options: MEUIHtmlListOption[];
    Properties: {
        ShortLabel: string;
    };
    Label: string;
    ShortLabel: string;
    Value: string;
    ExpandedWidth: 'auto';
    Collapsed: boolean;
    UsePopup: boolean;
    CurrentObject: MEUIHtmlListOption;
    Type: 'HtmlList';
}

interface MEUIHtmlListConstructor {
    new (
        label: string,
        options: {
            Label?: string;
            ShortLabel?: string;
            Value: string;
        }[],
        current?: string,
        change?: (htmlList: MEUIHtmlList) => void,
        collapsed?: boolean,
        usePopup?: boolean
    ): MEUIHtmlList;
    readonly prototype: MEUIHtmlList;
}

declare const MEUIHtmlList: MEUIHtmlListConstructor;