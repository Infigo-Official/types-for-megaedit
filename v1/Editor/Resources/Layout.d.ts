/**
 * This module holds information about layout resources.
 * 
 * @module Resource / Layouts
 */

/**
 * The type of the generated layout. The type controls for which pages the layout can be used and how it is applied.
 */
declare enum LayoutModeType {
    /**
     * Single mode layouts can be used for single pages or for spreads, but applied to only a single side of the spread.
     */
    Single = 'Single',
    /**
     * Double mode layouts can only be used for pages with the double page mode.
     */
    Double = 'Double'
}

/**
 * The layout field info is part of the response about a layout item and can be used by the script to identify what is within the layout.
 */
type LayoutFieldInfo = {
    /** 
     * The name of the field. Most fields may not have a name set.
     */
    name: string;
    /**
     * The tags of the field.
     */
    tags: string[];
    /**
     * The sequence number is used to control a logical order of the fields within a layout. The sequence is used when transfering data from on layout to another.
     */
    sequence: number;
    /**
     * The type of the field.
     */
    type: string;
    /**
     * Boolean flag to control if the field is a clipart field. For non image fields, this is always false.
     * If an image field is a clipart, it will keep the reference to the image used when the layout is applied, otherwise the field will be always empty.
     */
    isClipArt: boolean;
    /**
     * The relative width of the field (0-1)
     */
    width: number;
    /**
     * The relative height of the field (0-1)
     */
    height: number;
}

/**
 * The layout restrictions control which background categories and clip art categories are available for a given layout. This only is usefull if the MegaEdit product setting _enableLayoutRestrictions_ is set to true.
 */
type LayoutRestrictions = {
    /**
     * The ids of the background categories to support. If restrictions are enabled, for a given layout only those background categories defined here are available within the UI to choose from.
     */
    BackgroundCategories: string[];
    /**
     * The ids of the clip art categories to support. If restrictions are enabled, for a given layout only those clip art categories defined here are available within the UI to choose from.
     */
    ClipArtAlbums: string[];
}

/**
 * The layout item holds the information about a specific layout.
 * A layout holds a field configuration similar to a page. The fields are arranged in a defined position and order.
 * The fields within a layout are usually empty, but for some, default data can be configured.
*/
type LayoutItem = {
    /**
     * The id of the layout
     */
    readonly id: string;
    /**
     * The name of the layout
     */
    readonly name: string;
    /**
     * The layout mode determines for which pages the layout can be used and how it is applied.
     */
    readonly mode: LayoutModeType;
    /**
     * This is the base 64 encoded thumbnail of the layout. The thumbnail is a low resolution version of the layout.
     */
    readonly src: string;
    /**
     * The restrictions (if any) for the layout. If restrictions are enabled, the layout set against the page controls the available background and clipart categories.
     * Note that the MegaEdit product setting _enableLayoutRestrictions_ must be set to true for this to work.
     */
    readonly restrictions: LayoutRestrictions | null;
    /** The id of the parent company */
    readonly parentCategory: string;
    /** The number of fields within the layout */
    readonly numFields: number;
    /** A field summary. The order of the field info items are based on the z-index on the page. */
    readonly fieldSummary: LayoutFieldInfo[];
}

/**
 * A layout category holds layout items categorized by a name. Layout items can be used for pages. Single pages can hold a single layout, double pages can hold two separate layouts, one for each spread side.
 */
interface LayoutCategory extends ResourceCategory {
    /**
     * Boolean flag to control if the layout category can be edited - aka if new layouts can be added to or removed from the category.
     */
    readonly editable: boolean;
    /**
     * The number of layouts currently in the category.
     */
    readonly numLayouts: number;
}