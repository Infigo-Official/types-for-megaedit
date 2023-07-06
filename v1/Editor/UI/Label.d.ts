interface MEUILabel extends MEUIBase {
    Text: string;
    OnClick: (label: MEUILabel) => void;
}

interface MEUILabelConstructor {
    new (text: string): MEUILabel;
    readonly prototype: MEUILabel;
}

declare const MEUILabel: MEUILabelConstructor;