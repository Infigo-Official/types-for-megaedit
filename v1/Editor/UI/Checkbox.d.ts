interface MEUICheckBox extends MEUIBase {
    OnChange: (checkbox: MEUICheckBox) => void;
    Label: string;
    Value: boolean;
}

interface MEUICheckBoxConstructor {
    new (label: string, value: boolean, change?: (checkbox: MEUICheckBox) => void): MEUICheckBox;
    readonly prototype: MEUICheckBox;
}

declare const MEUICheckBox: MEUICheckBoxConstructor;