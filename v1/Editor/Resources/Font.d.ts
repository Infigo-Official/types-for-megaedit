/**
 * This module holds information about font resources.
 * 
 * @module Resource / Fonts
 */

/**
 * Defines a font item
 */
interface FontItem {
    /**
     * The name of the font - as the font family.
     */
    readonly Name: string;
    /**
     * Flag to indicate if the font has a bold variant.
     */
    readonly Bold: boolean;
    /**
     * Flag to indicate if the font has an bold and italic variant.
     */
    readonly BoldItalic: boolean;
    /**
     * Flag to indicate if the font has an italic variant.
     */
    readonly Italic: boolean;
    /**
     * The name of the category - used to group fonts together.
     */
    readonly CategoryName: string;
    /**
     * Flag to indicate if the font is an internal resource and should not be used actively by the end user.
     */
    readonly IsAdminOnly: boolean;
}