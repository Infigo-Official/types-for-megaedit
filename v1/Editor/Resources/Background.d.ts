/**
 * This module holds information about background resources.
 * 
 * @module Resource / Backgrounds
 */

/**
 * A background item to be used for page as background. Double pages can have two backgrounds, one for each page.
 */
interface BackgroundItem {
    /**
     * The name of the background. This is the file name of the background item for image backgrounds and the name of the color for color backgrounds.
     */
    readonly name: string;
    /**
     * The relative link to the thumbnail of the background item when an image background is used. For color backgrounds, this is null. The thumbnail is a low resolution version of the background item.
     */
    readonly thumbnail: string;
    /**
     * The relative link to the preview of the background item when an image background is used. For color backgrounds, this is null. The preview is a medium resolution version of the background item.
     */
    readonly preview: string;
    /**
     * The color of the background item when a color background is used. For image backgrounds, this is null. Otherwise this is the CMYK or RGB color value.
     */
    readonly color: string;
    /**
     * The parent is the id of the background category the background item belongs to.
     */
    readonly parent: string;
}

/**
 * A background category holds background items categorized by a name. Background items can be used for pages. Single pages can hold a single background, double pages can hold two separate backgrounds, one for each spread side.
 */
interface BackgroundCategory extends ResourceCategory {
}