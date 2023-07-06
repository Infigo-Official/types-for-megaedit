interface MEUIButton extends MEUIBase {
    Properties: {
        ButtonText: string;
    };
    ButtonText: string;
    TextDirection: any;
    Type: string;
    OnClick: (button: MEUIButton) => void;
}

interface MEUIButtonConstructor {
    new (text: string, click?: (button: MEUIButton) => void): MEUIButton;
    readonly prototype: MEUIButton;
}

declare const MEUIButton: MEUIButtonConstructor;