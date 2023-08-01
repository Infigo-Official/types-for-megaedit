/**
 * Create a paragraph using Bulma's spacer _block_ as shown here: https://bulma.io/documentation/elements/block/
 * @module UI / Bulma / Paragraph
 */

/**
 * Paragraph interface
 */
interface MEUIParagraph extends MEUIBase {
    /**
     * The type of the UI element. Always "Paragraph".
     */
    readonly Type: "Paragraph";
    /**
     * The text of the paragraph to display. Can hold HTML code.
     */
    Text: string;    
}

/**
 * Paragraph constructor interface
 */
interface MEUIParagraphConstructor {
    /**
     * Creates a new paragraph
     * @param text The text of the paragraph to display.
     * @returns A new paragraph.
     */
    new (text: string): MEUIParagraph;
    readonly prototype: MEUIParagraph;
}

/**
 * The paragraph class
 */
declare const MEUIParagraph: MEUIParagraphConstructor;