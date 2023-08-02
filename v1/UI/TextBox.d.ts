/**
 * A simple single line text box.
 * @module UI / Control / Text Box
 */

/**
 * Text box interface
 */
interface MEUITextBox extends MEUIBase {
    /**
     * The type of the UI element. Always "TextBox".
     */
    readonly Type: "TextBox";
    /**
     * The placeholder text shown when there is no value.
     */
    Placeholder: string;
    /**
     * The current value of the control.
     */
    Value: string;
    /**
     * The html encoded version of the value.
     */
    ValueHtmlEncoded: string;
    /**
     * Event gets fired when the value of the text box changes.
     * @param event The callback to trigger when the value changes.
     */
    OnChange(event: (textBox: MEUITextBox) => void): void;
    /**
     * Event gets fired when the text box gets focus.
     * @param event The callback to trigger when the text box gets focus.
     */
    OnFocus(event: (textBox: MEUITextBox) => void): void;
    /**
     * Event gets fired when the text box loses focus.
     * @param event The callback to trigger when the text box loses focus.
     */
    OnBlur(event: (textBox: MEUITextBox) => void): void;
    /**
     * Event gets fired when a key is released
     * @param event The callback to trigger when a key is released.
     */
    OnKeyUp(event: (textBox: MEUITextBox, event: KeyboardEvent) => void): void;
    /**
     * Event gets fired when a key is pressed
     * @param event The callback to trigger when a key is pressed.
     */
    OnKeyDown(event: (textBox: MEUITextBox, event: KeyboardEvent) => void): void;
}

/**
 * Text box constructor interface
 */
interface MEUITextBoxConstructor 
{
    /**
     * Creates a new text box
     * @param value The initial value of the text box.
     * @param change The event which is fired when the value of the text box changes.
     * @returns A new text box.
     */
    new (value: string, change?: (textBox: MEUITextBox) => void): MEUITextBox;
    readonly prototype: MEUITextBox;
}

/**
 * The text box class
 */
declare const MEUITextBox: MEUITextBoxConstructor;