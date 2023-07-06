interface MEUITextBox extends MEUIBase {
    Placeholder: string;
    Value: string | boolean | number;
    OnChange: (textBox: MEUITextBox) => void;
    OnFocus: (textBox: MEUITextBox) => void;
    OnBlur: (textBox: MEUITextBox) => void;
}

interface MEUITextBoxConstructor {
    new (value: string | boolean | number, change?: (textBox: MEUITextBox) => void): MEUITextBox;
    readonly prototype: MEUITextBox;
}

declare const MEUITextBox: MEUITextBoxConstructor;