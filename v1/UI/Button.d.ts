/**
 * A basic button with a click event.
 * 
 * @module UI / Control / Button
 */

/**
 * Button interface
 */
interface MEUIButton extends MEUIBase {
    /**
     * The type of the UI element. Always "Button".
     */
    readonly Type: "Button";
    /**
     * The button label text.
     */
    ButtonText: string;
    /**
     * The click event of the button.
     * @param button The button which was clicked.
     */
    OnClick: (button: MEUIButton) => void;
}

/**
 * Button constructor interface
 */
interface MEUIButtonConstructor {
    /**
     * Creates a new button
     * @param text The button label text.
     * @param click The click event of the button.
     * @returns A new button.
     */
    new (text: string, click?: (button: MEUIButton) => void): MEUIButton;
    readonly prototype: MEUIButton;
}

/**
 * The button class
 */
declare const MEUIButton: MEUIButtonConstructor;