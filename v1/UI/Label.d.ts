/**
 * A static label as a piece of text.
 * @module UI / Control / Label
 */

/**
 * Label interface
 */
interface MEUILabel extends MEUIBase {
    /**
     * The type of the UI element. Always "Label".
     */
    readonly Type: "Label";
    /**
     * The text of the label to display. Can hold HTML code.
     */
    Text: string;
    /**
     * Optional onclick handler for the label.
     * @param event The event handler.
     */
    OnClick(event: (label: MEUILabel) => void): void;
}

/**
 * Label constructor interface
 */
interface MEUILabelConstructor {
    /**
     * Creates a new label
     * @param text The text of the label to display.
     * @returns A new label.
     */
    new (text: string): MEUILabel;
    readonly prototype: MEUILabel;
}

/**
 * The label class
 */
declare const MEUILabel: MEUILabelConstructor;