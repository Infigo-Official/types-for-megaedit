interface MEUITextArea extends MEUIBase {
    Placeholder: string;
    Value: string;
    OnChange: (textArea: MEUITextArea) => void;
    OnFocus: (textArea: MEUITextArea) => void;
    OnBlur: (textArea: MEUITextArea) => void;
    SupportRichText: boolean;
    SupportBold: boolean;
    SupportItalic: boolean;
    SupportFontSize: boolean;
    SupportFont: boolean;
    SupportUnderline: boolean;
    RichTextFontArray: Array<string>;
}

interface MEUITextAreaConstructor {
    new (value: string, width?: number, height?: number, change?: (textArea: MEUITextArea) => void): MEUITextArea;
    readonly prototype: MEUITextArea;
}

declare const MEUITextArea: MEUITextAreaConstructor;