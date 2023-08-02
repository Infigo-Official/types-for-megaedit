/**
 * The _Global_ components used for the current job can be controlled within this module. See {@link Global} for more details how to get or set the components.
 * 
 * @example
 * // Load current configuration - see developer tools for the result
 * console.log("The current canvas and canvas size:");
 * console.log(Job.Global.Get.CanvasAndSize());
 * console.log("The current output type:");
 * console.log(Job.Global.Get.OutputType());
 * console.log("The current stock item:");
 * console.log(Job.Global.Get.StockItem());
 * 
 * @module Document / Global Components
 */

/**
 * MegaEdit products have various components:
 * - the {@link Canvas} along with a {@link CanvasSize}
 * - the {@link StockItem}
 * - the {@link OutputType}
 * 
 * The output type object controls elements like
 * - bleed
 * - cover options
 * - gutter
 * - print production
 * - margins
 * - how pages are set together (single page vs spread)
 * 
 * Multiple output types can be assigned to a product and the user can switch between them.
 * 
 * @example
 * {
    "id": "fb75ffbb-201e-4f29-9408-c5c3a7744748",
    "description": null,
    "name": "Mug",
    "settings": {
        "coverAddition": {
            "width": 0,
            "height": 0,
            "wrap": 0,
            "configuredCoverWrap": 0
        },
        "bleed": 0,
        "configuredBleed": 0,
        "duplexPrinting": false,
        "gutter": {
            "size": 0,
            "url": ""
        },
        "margin": {
            "top": 0,
            "left": 0,
            "right": 0,
            "bottom": 0
        },
        "priceFactor": 1
    },
    "previewThumbnail": ""
}
 */
type OutputType = {
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
 * The canvas size is linked to a {@link Canvas} object and used together to define the final {@link Size}.
 * The {@link Canvas} essentially defines the aspect ratio while the sizes define scale factors for the final dimensions.
 * 
 * @example
 * {
        "id": "52bcf395-4684-43a7-8b63-11aaa10e0bb9",
        "name": "Default",
        "priceFactorBasePrice": 1,
        "priceFactorOutputType": 1,
        "priceFactorPages": 1,
        "dimension": {
            "width": 2087.9999999987303,
            "height": 2807.9999999983906
        }
    }
 */
type CanvasSize = {
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
    dimension: Size;
}

/**
 * MegaEdit products have various components:
 * - the {@link Canvas} along with a {@link CanvasSize}
 * - the {@link StockItem}
 * - the {@link OutputType}
 * 
 * The canvas defines the aspect ratio of the product along with a list of available {@link CanvasSize} objects.
 * The canvas and the assigned size together will result in the final {@link Size}
 * 
 * @example
 * {
        "name": "Wall Tapestry Portrait",
        "description": "",
        "id": "c3012fd2-8051-42a3-a5f2-e860c13a8798",
        "sizes": [
            {
                "id": "52bcf395-4684-43a7-8b63-11aaa10e0bb9",
                "name": "Default",
                "priceFactorBasePrice": 1,
                "priceFactorOutputType": 1,
                "priceFactorPages": 1,
                "dimension": {
                    "width": 2087.9999999987303,
                    "height": 2807.9999999983906
                }
            }
        ]
    }
 */
type Canvas = {
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
    sizes: CanvasSize[];
}

/**
 * Result object when retrieving the current canvas and size.
 * 
 * @example
 * {
    "canvas": {
        "name": "Wall Tapestry Portrait",
        "description": "",
        "id": "c3012fd2-8051-42a3-a5f2-e860c13a8798",
        "sizes": [
            {
                "id": "52bcf395-4684-43a7-8b63-11aaa10e0bb9",
                "name": "Default",
                "priceFactorBasePrice": 1,
                "priceFactorOutputType": 1,
                "priceFactorPages": 1,
                "dimension": {
                    "width": 2087.9999999987303,
                    "height": 2807.9999999983906
                }
            }
        ]
    },
    "size": {
        "id": "52bcf395-4684-43a7-8b63-11aaa10e0bb9",
        "name": "Default",
        "priceFactorBasePrice": 1,
        "priceFactorOutputType": 1,
        "priceFactorPages": 1,
        "dimension": {
            "width": 2087.9999999987303,
            "height": 2807.9999999983906
        }
    }
}
 */
type CanvasAndSizeResult = {
    /**
     * The currently selected canvas
     */
    canvas: Canvas;
    /**
     * The currently selected canvas size
     */
    size: CanvasSize;
}

/**
* MegaEdit products have various components:
 * - the {@link Canvas} along with a {@link CanvasSize}
 * - the {@link StockItem}
 * - the {@link OutputType}
 * 
 * This defines the stock used to produce the output. This is used to calculate weight and thickness, colour etc of the material/stock.
 * 
 * @example
 * {
    "id": "e8dc9f6c-f8c3-43f3-9d3f-75ccc3b801b4",
    "description": "",
    "name": "Canvas",
    "settings": {
        "price": 0,
        "micron": 0
    },
    "preview": {
        "css": "background-color: #ffffff;"
        "thumbnail": ""
    }
}
 */
type StockItem = {
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
 * The _Global_ interface gives access to the global compontents which make up a MegaEdit product for the current job.
 * 
 * This includes 
 * - The {@link Canvas} and {@link CanvasSize} which define the size/aspect ratio of the pages within the product
 * - the dynamic size if that is enabled for the current product which allows to control the size directly and dynamically within a preconfigured range.
 * - the {@link StockItem} which defines the stock used to produce. This is used to calculate weight and thickness
 * - the {@link OutputType} which controls how the pages are set together (single page vs spread), if covers are used, the bleed and margin settings etc
 * 
 * There are separate methods available to retrieve each of those components as they are currently applied to the job and methods available to set and update each component for the current job.
 */
interface Global {
    /**
     * This property retrieves the currently applied components of the current job.
     */
    Get: {
        /**
         * Retrieve the currently selected canvas and size
         * @returns {CanvasAndSizeResult} The currently selected canvas and size
         */
        CanvasAndSize(): CanvasAndSizeResult;
        /**
         * Retrieve the currently selected stock item
         * @returns {StockItemInfo} The currently selected stock item
         */
        StockItem(): StockItem;
        /**
         * Retrieve the currently selected output type
         * @returns {OutputTypeInfo} The currently selected output type
         */
        OutputType(): OutputType;
        /**
         * Retrieve the dynamic size if this product is using dynamic sizes
         * @returns {Size | null} The current dynamic size or null if this product is not using dynamic sizes
         */
        DynamicSize(): Size | null;
    };
    /**
     * This property updates and sets the components to the current job.
     */
    Set: {
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
        CanvasAndSize(
            canvasObjectOrId: Canvas | string,
            sizeObjectOrId: CanvasSize | string,
            callback?: () => void,
            applySmartLayout?: boolean,
            refresh?: boolean,
            maintainFieldSize?: boolean
        ): void;
        /**
         * Updates the current stock item.
         * @param objectOrId The stock item object or id to change to
         * @returns Boolean flag to control if the stock item was changed
         */
        StockItem(objectOrId: StockItem | string): boolean;
        /**
         * Updates the current output type.
         * @param objectOrId The output type object or id to change to
         * @returns Boolean flag to control if the output type was changed
         */
        OutputType(objectOrId: OutputType | string): boolean;
        /**
         * Updates the current dynamic size. Can only be used if the product is configured for dynamic sizing. The dimensions are in points and will be restricted to be within the min/max dimensions of the product. Step sizes are not enforced.
         * @param width The new width in points
         * @param height The new height in points
         * @param callback The optional callback. This will be called if the size was changed successfully. If the size could not be changed, no callback will be triggered.
         * @param applySmartLayout Flag to control if the canvas and size change should use smart layout. Smart layout will attempt to apply a similary named layout (category + name) for the target canvas based on the currently used layouts. If the layout is not found or none is used, this will have no effect.
         * @param refresh Flag to control if the editor would reinitialize itself. If additional operations are required after the canvas and size change, this should be set to false and the refresh should be called manually.
         * @param maintainFieldSize Flag to control if the field sizes should be maintained. If smart layout is used, we will use the new layout dimenions. If smart layout is not used, the field sizes will be adjusted proportionally to the new canvas size. If this flag is used, the field dimensions will not be adjusted (ignored when smart layout is used).
         * @param optionalPageId Optional page id. If null, all pages will change the size. If the setup allows different aspect ratios for different pages, optionally you can configure the page id to change only the size of a single page.
         */
        DynamicSize(
            width: number,
            height: number,
            callback?: () => void,
            applySmartLayout?: boolean,
            refresh?: boolean,
            maintainFieldSize?: boolean,
            optionalPageId?: string | undefined
        ): void;
    };
}