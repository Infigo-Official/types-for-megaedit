/**
 * This module holds information about spot color resources.
 * 
 * @module Resource / Spot Colors
 */

/**
 * A spot color item defines a spot color which can be used for most color values in the editor.
 */
interface SpotColorItem {
    /**
     * The name of the spot color item. That is also the name used within the output and has a production meaning.
     */
    readonly Name: string;
    /**
     * The fallback color value of the spot color. This is either in RGB or CMYK format and is used to render the color in devices which do not support the spot color natively.
     */
    readonly Value: string;
}

/**
 * A spot color album holds spot color items categorized by a name.
 */
interface SpotColorAlbum  {
    /**
     * The id of the spot color album (GUID)
     */
    readonly Id: string;
    /**
     * The name of the album.
     */
    readonly Name: string;
    /**
     * Flag indicating if the category is administator only.
     */
    readonly IsAdminOnly: boolean;
}