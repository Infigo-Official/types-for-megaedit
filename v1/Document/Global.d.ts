/**
 * The information for a specified output type
 */
interface OutputTypeInfo {
    /**
     * The id of the output type (GUID)
     */
    id: string;
    /**
     * The optional description of the output type
     */
    description?: string;
    /**
     * The name of the output type
     */
    name: string;
    /**
     * The settings for the output type
     */
    settings: {
        /**
         * The bleed currently visible in the editor in points. Usually this is the same as the configured bleed, but if the bleed is hidden, this value will be 0.
         */
        bleed: number;
        /**
         * The configured bleed in points. This will be the configured value no matter if the bleed is hidden or not.
         */
        configuredBleed: number;
        /**
         * Flag if duplex printing is used. This is used to calculate the spine thickness
         */
        duplexPrinting: boolean;
        /**
         * The price factor for the output type
         */
        priceFactor: number;
        /**
         * Cover addition values. This allows to have different dimensions and wrap (aka bleed) for the cover pages
         */
        coverAddition: {
            /** 
             * The additional width to add to the cover pages in points.
             */
            width: number;
            /**
             * The additional width to add to the cover pages in points
             */
            height: number;
            /**
             * The wrap (value in points) is used instead of the bleed for cover pages - as it can be wrapped around the cover for production it allows a different value. This may be 0 if the bleed (and wrap) is hidden.
             */
            wrap: number;
            /**
             * The configured wrap in points. This will be the configured value no matter if the bleed is hidden or not.
             */
            configuredCoverWrap: number;
        };
        /**
         * The gutter configuration. The gutter is used for separate pages in a spread configuration.
         */
        gutter: {
            /**
             * The gutter size (additional width) in points when creating the individual spread halves.
             */
            size: number;
            /**
             * A URL for an optional image to display within the gutter
             */
            url: string;
        };
        /**
         * The margin configuration for the pages. Margins are optional and virtual boundaries and can be used to snap to.
         */
        margin: {
            /**
             * The top margin in points.
             */
            top: number;
            /**
             * The left margin in points.
             */
            left: number;
            /**
             * The right margin in points.
             */
            right: number;
            /**
             * The bottom margin in points.
             */
            bottom: number;
        }
    }
}

/**
 * The dimension of the canvas in points.
 */
interface CanvasDimension {
    /**
     * The canvas width in points.
     */
    width: number;
    /**
     * The canvas height in points.
     */
    height: number;
}

/**
 * The information for a specified canvas size
 */
interface CanvasSizeInfo {
    /**
     * The id of the size item (GUID)
     */
    id: string;
    /**
     * The name of the size item
     */
    name: string;
    /**
     * The price factor for the base price for this size
     */
    priceFactorBasePrice: number;
    /**
     * The price factor for the output type for this size
     */
    priceFactorOutputType: number;
    /**
     * The price factor for the pages for this size
     */
    priceFactorPages: number;
    /**
     * The final dimensions of the canvas using this size item
     */
    dimension: CanvasDimension;
}

/**
 * The information for a specified canvas
 */
interface CanvasInfo {
    /**
     * The name of the canvas
     */
    name: string;
    /**
     * The optional description of the canvas
     */
    description: string;
    /**
     * The id of the canvas (GUID)
     */
    id: string;
    /**
     * The list of available sizes for this canvas
     */
    sizes: CanvasSizeInfo[];
}

/**
 * Result object when retrieving the current canvas and size.
 */
interface CanvasAndSizeResult {
    /**
     * The currently selected canvas
     */
    canvas: CanvasInfo;
    /**
     * The currently selected canvas size
     */
    size: CanvasSizeInfo;
}

/**
 * The information for a specified stock item
 */
interface StockItemInfo {
    /**
     * The id of the stock item (GUID)
     */
    id: string;
    /**
     * The name of the stock item
     */
    name: string;
    /**
     * The optional description of the stock item
     */
    description: string;
    /**
     * The preview settings for the stock item
     */
    preview: {
        /**
         * The CSS value to display the stock items background color
         */
        css: string;        
        /**
         * The optional thumbnail if we have a textured stock item
         */
        thumbnail: string;
    };
    /**
     * The settings for the stock items
     */
    settings: {
        /**
         * The price factor for the stock item
         */
        price: number;
        /**
         * The thickness of the stock item
         */
        micron: number;
    }
}

/**
 * Methods to set the current global settings.
 */
interface GlobalSet {
    /**
     * Updates the current canvas and/or size. This can be used to change to a different size for the same canvas or a new canvas with new size altogether.
     * This should not be used when the product is configured for dynamic sizing.
     * @param canvasObjectOrId The canvas object or id to change to
     * @param sizeObjectOrId  The size object or id to change to
     * @param callback The callback function to call when the canvas and size have been updated. If the canvas/size is not being updated the callback will not be triggered.
     * @param applySmartLayout Flag to control if the canvas and size change should use smart layout. Smart layout will attempt to apply a similary named layout (category + name) for the target canvas based on the currently used layouts. If the layout is not found or none is used, this will have no effect.
     * @param refresh Flag to control if the editor would reinitialize itself. If additional operations are required after the canvas and size change, this should be set to false and the refresh should be called manually.
     * @param maintainFieldSize Flag to control if the field sizes should be maintained. If smart layout is used, we will use the new layout dimenions. If smart layout is not used, the field sizes will be adjusted proportionally to the new canvas size. If this flag is used, the field dimensions will not be adjusted (ignored when smart layout is used).
     */
    CanvasAndSize: (
        canvasObjectOrId: CanvasInfo | string,
        sizeObjectOrId: CanvasSizeInfo | string,
        callback?: () => void,
        applySmartLayout?: boolean,
        refresh?: boolean,
        maintainFieldSize?: boolean
    ) => void;
    /**
     * Updates the current stock item.
     * @param objectOrId The stock item object or id to change to
     * @returns Boolean flag to control if the stock item was changed
     */
    StockItem: (objectOrId: StockItemInfo | string) => boolean;
    /**
     * Updates the current output type.
     * @param objectOrId The output type object or id to change to
     * @returns 
     */
    OutputType: (objectOrId: OutputTypeInfo | string) => boolean;
    /**
     * Updates the current dynamic size. Can only be used if the product is configured for dynamic sizing. The dimensions are in points and will be restricted to be within the min/max dimensions of the product. Step sizes are not enforced.
     * @param width The new width in points
     * @param height The new height in points
     * @param callback The optional callback. This will be called if the size was changed successfully. If the size could not be changed, no callback will be triggered.
     * @param applySmartLayout Flag to control if the canvas and size change should use smart layout. Smart layout will attempt to apply a similary named layout (category + name) for the target canvas based on the currently used layouts. If the layout is not found or none is used, this will have no effect.
     * @param refresh Flag to control if the editor would reinitialize itself. If additional operations are required after the canvas and size change, this should be set to false and the refresh should be called manually.
     * @param maintainFieldSize Flag to control if the field sizes should be maintained. If smart layout is used, we will use the new layout dimenions. If smart layout is not used, the field sizes will be adjusted proportionally to the new canvas size. If this flag is used, the field dimensions will not be adjusted (ignored when smart layout is used).
     * @param optionalPageId Optional page id. If null, all pages will change the size. If the setup allows different aspect ratios for different pages, optionally you can configure the page id to change only the size of a single page.
     * @returns 
     */
    DynamicSize: (
        width: number,
        height: number,
        callback?: () => void,
        applySmartLayout?: boolean,
        refresh?: boolean,
        maintainFieldSize?: boolean,
        optionalPageId?: string | undefined
    ) => void;
}

/**
 * Methods to retrieve the current global settings.
 */
interface GlobalGet {
    /**
     * Retrieve the currently selected canvas and size
     * @returns {CanvasAndSizeResult} The currently selected canvas and size
     */
    CanvasAndSize: () => CanvasAndSizeResult;
    /**
     * Retrieve the currently selected stock item
     * @returns {StockItemInfo} The currently selected stock item
     */
    StockItem: () => StockItemInfo;
    /**
     * Retrieve the currently selected output type
     * @returns {OutputTypeInfo} The currently selected output type
     */
    OutputType: () => OutputTypeInfo;
    /**
     * Retrieve the dynamic size if this product is using dynamic sizes
     * @returns {CanvasDimension | null} The current dynamic size or null if this product is not using dynamic sizes
     */
    DynamicSize: () => CanvasDimension | null;
}

/**
 * This object controls the global settings of the product.
 */
interface Global {
    /**
     * Methods to retrieve the current global settings.
     */
    Get: GlobalGet;
    /**
     * Methods to set the current global settings.
     */
    Set: GlobalSet;
}