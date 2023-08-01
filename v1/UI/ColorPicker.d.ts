/**
 * A color picker control supporting RGB, CMYK and spot colors.
 * @module UI / Control / Color Picker
 */

/**
 * Color picker interface
 */
interface MEUIColorPicker extends MEUIBase {
    /**
     * The type of the UI element. Always "ColorPicker".
     */
    readonly Type: "ColorPicker";
    /**
     * The text on the color picker dialog.
     */
    Text: string;
    /**
     * The current color value in the selected format.
     */
    Color: string;
    /**
     * Flag indicating if the color picker supports RGB colors.
     * By default this is true.
     */
    AllowRgb: boolean;
    /**
     * Flag indicating if the color picker supports CMYK colors.
     * By default this is false.
     */
    AllowCmyk: boolean;
    /**
     * Flag indicating if the color picker supports spot colors.
     * Note that spot colors have to be defined in the template.
     * By default this is false.
     */
    AllowSpot: boolean;
    /**
     * Change event when the color is adjusted - is fired when the dialog is still open but color is changed.
     * @param event The callback to trigger when the color changes.
     */
    OnChange(event: (picker: MEUIColorPicker) => void): void;
    /**
     * Event gets fired when the color picker dialog is closed.
     * @param event The callback to trigger when the dialog is closed.
     */
    OnClickOk(event: (picker: MEUIColorPicker) => void): void;
}

/**
 * Color picker constructor interface
 */
interface MEUIColorPickerConstructor {
    /**
     * Creates a new color picker
     * @param text The text on the color picker dialog.
     * @param color The initial color value.
     * @param allowCmyk Flag indicating if the color picker supports CMYK colors. Defaults to false.
     * @param change Change event when the color is adjusted - is fired when the dialog is still open but color is changed.
     * @param allowRgb Flag indicating if the color picker supports RGB colors. Defaults to true.
     * @param allowSpot Flag indicating if the color picker supports spot colors. Defaults to false.
     * @returns A new color picker.
     */
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

/**
 * The color picker class
 */
declare const MEUIColorPicker: MEUIColorPickerConstructor;