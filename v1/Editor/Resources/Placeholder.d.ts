/**
 * This module holds information about placeholder resources.
 * Placeholder resources are used to define the content of an image field when the field is empty.
 * They are being rendered visually destinctive (e.g. black and white) to indicate that the field is empty, but give a good representation of how the field will look like when it is filled.
 * 
 * @module Resource / Placeholder Items
 */

/**
 * A placeholder category holds placeholder items categorized by a name.
 */
interface PlaceholderCategory extends ResourceCategory {
}

/**
 * A spot color album holds spot color items categorized by a name.
 */
interface PlaceholderItem  {
    /**
     * The id of the placeholder item
     */
    readonly id: string;
    /**
     * The name of the item.
     */
    readonly name: string;
    /**
     * The width of the placeholder image in pixels.
     */
    readonly width: number;
    /**
     * The height of the placeholder image in pixels.
     */
    readonly height: number;
    /**
     * The relative link to the preview of the placeholder item. The preview is a medium resolution version of the placeholder item.
     */
    readonly preview: string;
    /**
     * The relative link to the thumbnail of the placeholder item. The thumbnail is a low resolution version of the placeholder item.
     */
    readonly thumbnail: string;
}