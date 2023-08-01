/**
 * A checkbox component for a single option.
 * @module UI / Control / Checkbox
 */

/**
 * Checkbox interface
 */
interface MEUICheckBox extends MEUIBase {
    /**
     * The type of the UI element. Always "CheckBox".
     */
    readonly Type: "CheckBox";
    /**
     * The label of the checkbox. Can use full HTML.
     */
    Label: string;
    /**
     * The current value of the checkbox.
     */
    Value: boolean;
    /**
     * Change event when the checkbox value is changed.
     * @param event Change event when the checkbox value is changed.
     */
    OnChange(event: (checkbox: MEUICheckBox) => void): void;    
}

/**
 * Checkbox constructor interface
 */
interface MEUICheckBoxConstructor {
    /**
     * Creates a new checkbox
     * @param label The label of the checkbox.
     * @param value The current value of the checkbox.
     * @param change Change event when the checkbox value is changed.
     * @returns A new checkbox.
     */
    new (label: string, value: boolean, change?: (checkbox: MEUICheckBox) => void): MEUICheckBox;
    readonly prototype: MEUICheckBox;
}

/**
 * The checkbox class
 */
declare const MEUICheckBox: MEUICheckBoxConstructor;