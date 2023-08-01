/**
 * A title UI element. See https://bulma.io/documentation/elements/title/ for further information.
 * @module UI / Bulma / Title
 */

/**
 * Title interface
 */
interface MEUITitle extends MEUIBase {
    /**
     * The type of the UI element. Always "Title".
     */
    readonly Type: "Title";
    /**
     * The text of the title.
     */
    Text: string;
    /**
     * Integer value between 1 and 6 for the title size.
     * For normal titles the default is 3, for sub titles the default is 5.
     */
    TitleSize: number;
}

/**
 * Title constructor interface
 */
interface MEUITitleConstructor {
    /**
     * Creates a new title
     * @param text The text of the title.
     * @param isSubtitle Optional boolean to set the title as a sub title. Defaults to false.
     * @param titleSize Optional integer value between 1 and 8 for the title size. Defaults to 3 for normal titles and 5 for sub titles.
     */
    new (text: string, isSubtitle?: boolean, titleSize?: number): MEUITitle;
    readonly prototype: MEUITitle;
}

/**
 * The title class
 */
declare const MEUITitle: MEUITitleConstructor;