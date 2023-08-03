/**
 * A multi line text area - optionally supporting rich text.
 * @module UI / Control / Text Area
 */

/**
 * Text area interface
 */
interface MEUITextArea extends MEUISizeBase {
    /**
     * The type of the UI element. Either "TextArea" or "RichText".
     */
    readonly Type: "TextArea" | "RichText";
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
     * Flag indicating if the text area supports bold text. Note that all fonts must support those variants. Only valid if rich text is supported.
     */
    SupportBold: boolean;
    /**
     * Flag indicating if the text area supports italic text. Note that all fonts must support those variants. Only valid if rich text is supported.
     */
    SupportItalic: boolean;
    /**
     * Flag indicating if the text area supports font size changes. Only valid if rich text is supported.
     */
    SupportFontSize: boolean;
    /**
     * Flag indicating if the text area supports font family changes. Please provide a list of supported fonts in {@link RichTextFontArray}. Only valid if rich text is supported.
     */
    SupportFont: boolean;
    /**
     * Flag indicating if the text area supports underline formatting. Only valid if rich text is supported. Only valid if rich text is supported.
     */
    SupportUnderline: boolean;
    /**
     * Flag to indicate if the text area supports rich text.
     */
    SupportRichText: boolean;
    /**
     * The list of available fonts to use. Must be the font family names and all fonts must be available for the editor to use. Only valid if rich text is supported.
     */
    RichTextFontArray: string[];
    /**
     * Event gets fired when the value of the text area changes.
     * @param textArea The text area which changed.
     */
    OnChange: (textArea: MEUITextArea) => void;
    /**
     * Event gets fired when the text area gets focus.
     * @param textArea The text area which got focus.
     */
    OnFocus: (textArea: MEUITextArea) => void;
    /**
     * Event gets fired when the text area loses focus.
     * @param textArea The text area which lost focus.
     */
    OnBlur: (textArea: MEUITextArea) => void;
    /**
     * Event gets fired when a key is released
     * @param textArea The text area which key was released.
     * @param event The keyboard event which was fired.
     */
    OnKeyUp: (textArea: MEUITextArea, event: KeyboardEvent) => void;
    /**
     * Event gets fired when a key is pressed
     * @param textArea The text area which key was pressed.
     * @param event The keyboard event which was fired.
     */
    OnKeyDown: (textArea: MEUITextArea, event: KeyboardEvent) => void;
}

/**
 * Text area constructor interface
 */
interface MEUITextAreaConstructor 
{
    /**
     * Creates a new text area
     * @param value The initial value of the text area.
     * @param width The width of the text area or null for the default value.
     * @param height The height of the text area or null for the default value.
     * @param change The event which is fired when the value of the text area changes.
     * @returns A new text area.
     */
    new (value: string, width?: number, height?: number, change?: (textArea: MEUITextArea) => void): MEUITextArea;
    readonly prototype: MEUITextArea;
}

/**
 * The text area class
 */
declare const MEUITextArea: MEUITextAreaConstructor;