/**
 * This module holds information about mask resources.
 * 
 * @module Resource / Masks
 */

/**
 * A mask album holds mask items categorized by a name. Mask items can be used by {see ImageField} fields.
 */
interface MaskAlbum extends ResourceCategory {
}

/**
 * A mask item to be used for image fields.
 * A mask is a grayscale image where white areas are invisible and black areas are visible. Gray areas are semi transparent.
 */
interface MaskItem {
    /**
     * The id of the mask item.
     */
    readonly id: string;
    /**
     * The name of the mask item.
     */
    readonly name: string;
    /**
     * The URL of the mask item.
     */
    readonly url: string;
}