/**
 * This defines the image field interface with the necessary types.
 * 
 * @module Field / Image Field
 */

/**
 * The image blend mode defines how to blend the image with the background. The blend mode in the output are based on the native support within the PDF specification.
 * For details see the following resources (not all applies for the PDF output, but they do give a good overview of how they are used): 
 * - https://printtechnologies.org/wp-content/uploads/2020/03/pdf-reference-1.6-addendum-blend-modes.pdf
 * - https://en.wikipedia.org/wiki/Blend_modes
 * - https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
 * - https://web.dev/learn/css/blend-modes/
 */
declare enum ImageBlendMode {
    /**
     * Normal rendering, no changes to the image applied.
     */
    Normal = 'Normal',
    /**
     * The multiply blend mode is like stacking multiple transparencies on top of each other. The luminosity values are multiplied. White will appear transparent, black will stay black.
     */
    Multiply = 'Multiply',
    /**
     * The inverse effect to multiply. The luminosity values are inverted and multiplied. Black will appear transparent, white will stay white.
     */
    Screen = 'Screen',
    /**
     * This mode combines multiply and screen.
     */
    Overlay = 'Overlay',
    /**
     * This compares the source and background color values and selects the darkest of the two by comparing the RGB values separately for each channel. This can result in new color values.
     */
    Darken = 'Darken',
    /**
     * This compares the source and background color values and selects the lightest of the two by comparing the RGB values separately for each channel. This can result in new color values.
     */
    Lighten = 'Lighten',
    /**
     * This lightens the background color to reflect the source color. This can result in new color values.
     */
    ColorDodge = 'ColorDodge',
    /**
     * Similar to multiply but with a higher contrast. This can result in new color values.
     */
    ColorBurn = 'ColorBurn',
    /**
     * This checks if hte pixel value is ligther than 50% gray. If so it will lighten the image as does the 'screen' mode, otherwise it will darken the image as does the 'multiply' mode.
     */
    HardLight = 'HardLight',
    /**
     * Similar to 'overlay' but with less intensity and also less contrast.
     */
    SoftLight = 'SoftLight',
    /**
     * The difference mode will take the difference value for each pixel and invert the light colors. Identical pixels would be black.
     */
    Difference = 'Difference',
    /**
     * Exclusion is similar to 'Difference' but identical pixels would not be black but 50% gray, resulting in less contrast.
     */
    Exclusion = 'Exclusion',
    /**
     * The hue of the source color will be combined with the saturation and luminosity of the background color.
     */
    Hue = 'Hue',
    /**
     * The satuartion of the source color and the hue and luminosity of the background will be combined.
     */
    Saturation = 'Saturation',
    /**
     * The hue and saturation of the source will be used and combined with the luminosity of the background color.
     */
    Color = 'Color',
    /**
     * The inverse of 'color'. The luminosity of the source and the hue and saturation of the background color are combined.
     */
    Luminosity = 'Luminosity',
    /**
     * Uses the source data unmodified. Same as 'normal'.
     */
    SourceOver = 'SourceOver'
}

/**
 * Image field issues extend the base issue data with image specific checks.
 */
interface ImageFieldIssues extends BaseFieldIssues {
    /**
     * This flag is true if the image is too small for the field. The resolution to check against is defined in the product settings.
     * Note that resolution is always compared to the final print size, and is not specific to the actual image file size alone.
     */
    hasResolutionIssues: boolean;
}

/**
 * Image field restrictions extend the base restrictions.
 */
interface ImageFieldRestrictions extends BaseFieldRestrictions {
    /**
     * Flag to control if the image can be flipped horizontally or vertically.
     */
    allowFlipping: boolean;
    /**
     * Flag to control if the image can be scaled/zoomed.
     */
    allowImageScaling: boolean;
    /**
     * Flag to control if the image field can accept clipart images as well as media items.
     */
    allowClipArtImages: boolean;
    /**
     * Flag to control if the image zoom would allow to zoom out to see the whole image. By default image fields will zoom with cropping applied.
     */
    fitWithoutCropping: boolean;
    /**
     * This flag is only used for cliparts. When enabled, it will allow to distort the clipart image so it spans 100% of the width and 100% of the height, ignoring the aspect ratio.
     */
    allowClipArtDistortion: boolean;
    /**
     * Currently unused.
     */
    allowFitContent: boolean;
}

/**
 * The image field ui options extend the base ui options
 */
interface ImageFieldUiOptions extends BaseFieldUiOptions {
    /**
     * Flag to control if all image effect options should be hidden from the UI.
     */
    hideFxOptions: boolean;
    /**
     * Flag to control if the opacity slider should be hidden from the UI.
     */
    hideOpacity: boolean;
    /**
     * Flag to control if the image zoom control should be hidden.
     */
    hideImageSliderOptions: boolean;
    /**
     * Flag to control if the image should act as a drop target when dragging / dropping image items.
     */
    noImageDropTarget: boolean;
    /**
     * Flag to control if the sharpness options should be hidden from the UI.
     */
    hideSharpnessOptions: boolean;
    /**
     * Flag to control if the image mask tab should be hidden
     */
    hideMask: boolean;
    /**
     * The specified placeholder image by name. Please refer to the placeholder resources for valid values.
     */
    placeholderImage: string;
}

/**
 * The image alignment mode defines how the image is aligned within the field.
 * This is used for automatic image placement only.
 */
declare enum ImageAlignmentMode {
    /**
     * Align the image top left.
     */
    TopLeft = 'lt',
    /**
     * Align the image top centered.
     */
    Top = 'ct',
    /**
     * Align the image top right.
     */
    TopRight = 'rt',
    /**
     * Align the image to the left.
     */
    Left = 'lc',
    /**
     * Align the image to the center.
     */
    Center = 'cc',
    /**
     * Align the image to the right.
     */
    Right = 'rc',
    /**
     * Align the image bottom left.
     */
    BottomLeft = 'lb',
    /**
     * Align the image bottom centered.
     */
    Bottom = 'cb',
    /**
     * Align the image bottom right.
     */
    BottomRight ='rb'
}

/**
 * The image effect defines the effect to apply to the image.
 */
declare enum ImageEffect {
    /**
     * The image is not modified by a specific effect.
     */
    None = 'None',
    /**
     * The image will be converted to black and white.
     */
    BlackAndWhite = 'BlackAndWhite',
    /**
     * The image will be converted to sepia palette.
     */
    Sepia = 'Sepia',
    /**
     * An emboss effect is applied to the image.
     */
    Emboss = 'Emboss'
}

/**
 * Defines how the sharpess of the image should be adjusted.
 */
declare enum ImageSharpnessOption {
    /**
     * The sharpness of the image will not be changed.
     */
    Normal = 'Normal',
    /**
     * The image will be slightly blurred.
     */
    Blur = 'Blur',
    /**
     * The image will be slightly sharpened.
     */
    Sharp = 'Sharp'
}

/**
 * An image field will hold a graphical element. The source can be a media item which is uploaded by the user or a clipart item which is part of the product setup.
 * Depending on that, the behaviour will change.
 * - Clipart items will be immutable and cannot be used as a drop target
 * - Clipart items will by default be shown 100% without cropping
 * - Media items will by default show with cropping (configurable)
 * - Media items can be used as drop targets (configurable)
 * - Media items can optionally also hold clipart items (configurable)
 */
interface ImageField extends BaseField {
    /**
     * The type of the field. This is always 'ImageField'.
     */
    readonly type: FieldType.ImageField;
    /**
     * The issues for this image field.
     */
    readonly issues: ImageFieldIssues;
    /**
     * The restrictions set for this image field.
     */
    readonly restrictions: ImageFieldRestrictions;
    /**
     * The UI options for this image field.
     */
    readonly uioptions: ImageFieldUiOptions;
    /**
     * The image data object holds information for all image specific settings
     */
    readonly image: {
        /**
         * The transformation of the image being displayed within the field. This will define how the pixel data of the image are transformed to the field outline.
         */
        readonly transform: {
            /**
             * The horizontal shift of the image.
             */
            translateX: number;
            /**
             * The vertical shift of the image.
             */
            translateY: number;
            /**
             * The scale of the image
             */
            scale: number;
            /**
             * Flag to control if the image is flipped vertically.
             */
            flippedV: boolean;
            /**
             * The alignment mode used for the image when it is auto-positioned.
             */
            alignment: ImageAlignmentMode;
            /**
             * The image blend mode to use
             */
            blendMode: ImageBlendMode;
            /**
             * Flag to control if the image is flipped horizontally.
             */
            flippedH: boolean;
            /**
             * The rotation angle of the image in degrees.
             */
            angle: number;
            /**
             * Flag to control if the image is scaled automatically to fit the field. This is used when the field gets resized it will adjust the scale factor automatically.
             */
            isAutoScaling: boolean;
            /** 
             * Flag to control if the image is translated horizontally automatically. This is used when the field gets resized. 
             */
            isAutoTranslatingX: boolean;
            /**
             * Flag to control if the image is translated vertically automatically. This is used when the field gets resized.
             */
            isAutoTranslatingY: boolean;
        };
        /**
         * Flag to control if this image field acts as a clipart or as a media item.
         */
        readonly isClipArt: boolean;
        /**
         * The image field can rotate the image in addition to the transformation angle by 90° steps.
         */
        totalRotationAngle: number;
        /**
         * The media item set for the field. This can be null if no media item is set.
         */
        data: MediaItem | null;
        /**
         * The effect options applied to the image.
         */
        readonly effects: {
            /**
             * The effect to apply to the image.
             */
            effect: ImageEffect;
            /**
             * The sharpness adjustment to apply to the image.
             */
            sharpness: ImageSharpnessOption;
            /**
             * Flag to control if the image color values should be inverted.
             */
            invert: boolean;
            /**
             * Flag to control if the brightness should be adjusted.
             */
            brightness: boolean;
            /**
             * The brightness value to use for adjustment.
             */
            brightnessValue: number;
            /**
             * Flag to control if the contrast should be adjusted.
             */
            contrast: boolean;
            /**
             * The contrast value to use for adjustment.
             */
            contrastValue: number;
            /**
             * Flag to control if the gamma should be adjusted.
             */
            gamma: boolean;
            /**
             * The gamma value to use for adjustment.
             */
            gammaValue: number;
            /**
             * Flag to control if the image should be pixelated.
             */
            pixelate: boolean;
            /**
             * The pixelation value to use (controlling the size of the pixelation).
             */
            pixelateValue: number;
            /**
             * Flag to control if the image should be tinted by a color.
             */
            tint: boolean;
            /**
             * The tint value to use (controlling the amount of tinting).
             */
            tintValue: number;
            /**
             * The color to use for tinting. This can be any RGB value.
             */
            tintColor: string;
            /**
             * The opacity of the image.
             */
            opacity: number;
        };
        /**
         * The optional mask item to use for this image.
         */
        mask: MaskItem | null;
    };

    /**
     * This function will reposition, scale and rotate the current field so that two points of the current image match two points of the target image.
     * @param target The target image field to align to
     * @param targetPoints The target points to align too. Must have exactly two points.
     * @param sourcePoints The source points to use for alignment. Must have exactly two points.
     * @returns True if the alignment was successful, false otherwise.
     */
    Align2PixelsAtTarget(target: ImageField, targetPoints: Point[], sourcePoints: Point[]): boolean;
    /**
     * Repositions the current field so that the defined pixel location of the target matches the pixel location of the source.
     * @param target The target image field to align to
     * @param targetPoint The pixel location on the target image field to align to.
     * @param sourcePoint The pixel location of the source image to use for alignment.
     * @returns True if the alignment was successful, false otherwise.
     */
    AlignPixelAtTarget(target: ImageField, targetPoint: Point, sourcePoint: Point): boolean;    
    /**
     * A convenient function to get the global position on the canvas directly using {@link ConvertPixelPositionToRelativeFieldPosition} and {@link ConvertRelativeFieldPositionToGlobalLocation}.
     * @param point The pixel position to convert.
     * @returns The global position of the pixel on the canvas.
     */
    ConvertPixelPositionToGlobalPosition(point: Point): Point;
    /**
     * Convert a pixel value to a relative field position. This can then be further used for {@link ConvertRelativeFieldPositionToGlobalLocation} to understand where in the canvas a certain pixel would sit.
     * Note: this does not work if image angle is used or if the image is flipped.
     * 
     * This can be used to position elements at pixels within the image field.
     * @param point The pixel position to convert.
     * @returns The relative position of the pxel within the field.
     */
    ConvertPixelPositionToRelativeFieldPosition(point: Point): Point;
}