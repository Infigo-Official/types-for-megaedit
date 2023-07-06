interface MEUIColorPicker extends MEUIBase {
    Text: string;
    Color: string;
    AllowRgb?: boolean;
    AllowCmyk?: boolean;
    AllowSpot?: boolean;
    OnChange?: (picker: MEUIColorPicker) => void;
    OnClickOk?: (picker: MEUIColorPicker) => void;
}

interface MEUIColorPickerConstructor {
    new (
        text: string,
        color?: string,
        allowCmyk?: boolean,
        change?: (picker: MEUIColorPicker) => void,
        allowRgb?: boolean,
        allowSpot?: boolean
    ): MEUIColorPicker;
    readonly prototype: MEUIColorPicker;
}

declare const MEUIColorPicker: MEUIColorPickerConstructor;