/**
 * This defines the custom field interface with the necessary types.
 * 
 * @module Field / Custom Field
 */

/**
 * Callback used for custom field events.
 */
type CustomFieldCallback = (field: CustomField) => void;

/**
 * The drawing command target defines which canvas to write to.
 * The default is the data canvas. Only the data target will appear in the output.
 */
declare enum CustomFieldDrawingCommandTarget {
    /**
     * This canvas is drawn at the top of the field and will not appear in the output.
     */
    Overlay = "overlay",
    /**
     * This canvas is drawn at the bottom of the field and will not appear in the output.
     */
    Background = "background",
    /**
     * This canvas is drawn in the middle of the field and will appear in the output.
     */
    Data = "data"
}

/**
 * A custom field canvas can be used to draw on a custom field using the standard canvas drawing commands in Javascript.
 * The output would be rendered as vector where possible and it will support the color format of MegaEdit, not just RGB.
 */
interface CustomFieldCanvas {
    /**
     * The width of the canvas. This is the field with multiplied by the scale factor defined for the custom field.
     */
    readonly width: number;
    /**
     * The height of the canvas in pixels. This is the field height multiplied by the scale factor defined for the custom field.
     */
    readonly height: number;
    /**
     * Generate the 2d drawing context. This is of type CanvasRenderingContext2D {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D}
     * 
     * The drawing context can be used almost normally with a few exceptions:
     * - most, but not all drawing commands are supported: check the console log for any warnings
     * - the color format is MegaEdit's internal format, not jsut RGB. You can use CMYK or spot colors as well in the drawing commands.
     * @param type Must be "2d"
     */
    getContext(type: "2d"): CanvasRenderingContext2D;
    /**
     * Converts the canvas to a data url.
     * @param type Optional type - defaults to "image/png" - see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL}
     * @param encoderOptions Optional encoder options when the type supports them (e.g. JPEG or webp)
     */
    toDataUrl(type?: string, encoderOptions?: number): string;
    /**
     * Generate a blob object from the canvas
     * @param callback The callback to call when the blob is ready
     * @param type The type of the blob - defaults to "image/png" - see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob}
     * @param encoderOptions Optional encoder options when the type supports them (e.g. JPEG or webp)
     */
    toBlob(callback: (blob: Blob) => void, type?: string, encoderOptions?: number): void;
    /**
     * Serialize the drawing commands issued so far into the field definition.
     * The field will then reflect the drawing commands when rendered.
     * @param target The target defines which canvas to write to. The default is the data canvas.
     * @param callback The callback will be triggered once the field has been written to. This may be asynchronous if images have to be saved.
     */
    WriteToField(target?: CustomFieldDrawingCommandTarget, callback?: () => void): void;
}

/**
 * The constructor interface for a custom drawing canvas.
 */
interface CustomFieldCanvasConstructor {
    /**
     * Generate a new drawing canvas for a custom field. The field will be linked and writing the canvas data will update the field.
     * @param field The field to generate the canvas for.
     * @returns The canvas object.
     */
    new (field: CustomField): CustomFieldCanvas;
    readonly prototype: CustomFieldCanvas;
}

/**
 * The custom drawing canvas class.
 */
declare const CustomFieldCanvas: CustomFieldCanvasConstructor;

/**
 * The field definition for a custom field.
 * Used for registration in {@link Events.RegisterCustomField}.
 */
interface CustomFieldDefinition {
    /**
     * The sub type of the custom field. Used to identify the field type and ensure the correct actions are applied.
     * Use a unique name to avoid conflicts with other custom fields ideally via a naming convention.
     */
    Name: string;
    /**
     * The events available for this custom field. The individual events can be null in which case no custom code will be executed.
     */
    Events: {
        /**
         * Event handler triggered when a new field of this type has been created. 
         * The field object is passed as parameter.
         */
        Create: CustomFieldCallback;
        /**
         * Event handler triggered when a field of this type is being resized.
         * The field object is passed as parameter.
         */
        Resize: CustomFieldCallback;
        /**
         * Event handler triggered when a field of this type should open its UI.
         * The field object is passed as parameter.
         */
        OpenUi: CustomFieldCallback;
        /**
         * Event handler triggered when a field of this type should redraw itself.
         */
        Redraw: CustomFieldCallback;
    },
    /**
     * The settings available for this custom field.
     */
    Settings: {
        /**
         * The dialog title for the settings dialog.
         */
        DialogTitle: string;
        /**
         * Flag to indicate if the field should have a shadow.
         */
        HasShadow: boolean;
        /**
         * Flag to indicate if the field should have a border.
         */
        HasBorder: boolean;
        /**
         * Flag to indicate if the field can be duplicated.
         */
        AllowCopy: boolean;
        /**
         * Flag to indicate if the field can be reset.
         */
        HasReset: boolean;
        /**
         * The tooltip for the UI tab.
         */
        TabToolTip: string;
        /**
         * The title of the UI tab.
         */
        TabTitle: string;
        /**
         * Flag indicating if the field should have an options dialog.
         */
        HasOptionDialog: boolean;
        /**
         * Flag indicating if the field should have a second tab.
         */
        HasSecondTab: boolean;
        /**
         * Flag indicating if the field can be selected by the user.
         */
        Selectable: boolean;
        /**
         * The variable name of the field. This should be a global variable within the custom field script and used to access functions specific to that field in other scripts via that class available under this variable.
         */
        CustomFieldVariableName: string;
    }
}

/**
 * The constructor interface for a custom field definition.
 */
interface CustomFieldDefinitionConstructor {
    
    new (name: string, create: CustomFieldCallback, resize: CustomFieldCallback, openUi: CustomFieldCallback, uiTitle: string): CustomFieldDefinition;
    readonly prototype: CustomFieldDefinition;
}

/**
 * The custom field definition class.
 */
declare const CustomFieldDefinition: CustomFieldDefinitionConstructor;

/**
 * A custom field allows to define a new field type via script.
 */
interface CustomField extends BaseField {
    /**
     * The custom object holds information specific to that field
     */
    readonly custom: {
        /**
         * This defines the specific type of the custom field as defined by a script. This is used to identify the code which will interact with this field.
         */
        readonly type: string,
        /**
         * The data object is fully controlled by the script. It can be used to store any information needed by the script.
         */
        data: unknown,
        /**
         * The scale factor of the field in relation to the document. This is used to scale the field to the correct size when rendering.
         * Useful for higher resolution output. Default value is 2.
         */
        fieldScaleFactor: number,
        /**
         * The canvas data to render on the output. This data is in an internal format. Use the CustomFieldCanvas to write this data via normal drawing commands.
         */
        readonly canvasData: unknown,
        /**
         * The canvas overlay data to render on the output. This data is in an internal format. Use the CustomFieldCanvas to write this data via normal drawing commands.
         */
        readonly canvasOverlayData: unknown,
        /**
         * The canvas background data to render on the output. This data is in an internal format. Use the CustomFieldCanvas to write this data via normal drawing commands.
         */
        readonly canvasBackgroundData: unknown,
        /**
         * The external resources used by the field. This is generated automatically during rendering via CustomFieldCanvas.
         */
        readonly externalResources: unknown        
    };
}