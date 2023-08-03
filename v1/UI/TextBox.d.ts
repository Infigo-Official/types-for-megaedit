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
     * @param textBox The text box which changed.
     */
    OnChange: (textBox: MEUITextBox) => void;
    /**
     * Event gets fired when the text box gets focus.
     * @param textBox The text box which got focus.
     */
    OnFocus: (textBox: MEUITextBox) => void;
    /**
     * Event gets fired when the text box loses focus.
     * @param textBox The text box which lost focus.
     */
    OnBlur: (textBox: MEUITextBox) => void;
    /**
     * Event gets fired when a key is released
     * @param textBox The text box which key was released.
     */
    OnKeyUp: (textBox: MEUITextBox, event: KeyboardEvent) => void;
    /**
     * Event gets fired when a key is pressed
     * @param textBox The text box which key was pressed.
     */
    OnKeyDown: (textBox: MEUITextBox, event: KeyboardEvent) => void;
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