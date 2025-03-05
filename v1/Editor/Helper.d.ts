/**
 * This module holds information about all the available helper functions.
 * There are functions to:
 * - escape and unescape HTML characters
 * - measure text
 * - deal with scale factor and DPI's
 * - calculate similarity between strings and performs matching and auto mapping
 * - load external scripts and data sets
 * - generate GUID's
 * - perform deep copies
 * - check if an item is an object, array, boolean, number, function or string
 * - merge objects and deal with the configuration
 * - execute megascripts server side
 * - perform variable data replacement
 * - convert between units
 * - parse and stringify CSV data
 * - deal with timeouts
 * @module Editor / Helper functions
 */

/**
 * Options for the HTML unescape function {@link Helper.HtmlUnescape} - see https://github.com/mathiasbynens/he for more information.
 */
type UnescapeOptions = {
    /**
     * If not set, it will decode the string as if it is were used in a text context in a HTML document.
     * If set, it will decode the string as if it is were used in an attribute context in a HTML document.
     * Default value is _false_.
     */
    isAttributeValue?: boolean;
    /**
     * If set to _true_, it will throw an error instead of decoding invalid input.
     * Default value is _false_.
     */
    strict?: boolean;
};

/**
 * This interface defines an object which has a size (width & height).
 * E.g. the Javascript image object has a width and height property and would match this interface, but also the {@link MediaItem} object.
 */
interface DimensionalItem {
    /**
     * The width of the item.
     */
    width: number;
    /**
     * The height of the item.
     */
    height: number;
}

/**
 * A batchmapping is an object with keys for the placeholders and values for the mapping result.
 */
type BatchMapping = { [placeholder: string]: BatchMappingItem };

/**
 * Interface for a wide range of utility functions.
 */
interface Helper {
    /**
     * Escapes the HTML characters in the given text using https://github.com/mathiasbynens/he
     * @param text The text to escape.
     * @returns The escaped text.
     */
    HtmlEscape(text: string): string;
    /**
     * Unescapes the HTML characters in the given text using https://github.com/mathiasbynens/he.
     * The options parameter can be used to specify additional options for the unescape function - see above Github page for this.
     * @param text The text to unescape.
     * @param options The optional options to use for unescaping.
     * @returns The unescaped text.
     */
    HtmlUnescape(text: string, options?: UnescapeOptions): string;
    /**
     * Will measure the given text (width & height) using the given formatting options with the browser engine.
     * @param text The text to measure.
     * @param font The font to use for the measurement.
     * @param fontSize The font size to use for the measurement.
     * @param isBold If set, we will use a bold font for the measurement.
     * @param isItalic If set, we will use an italic font for the measurement.
     * @param leading The leading will be only used if we have not retrieved a calculated height from the browser engine.
     * @returns The dimensions of the text.
     */
    MeasureText(
        text: string,
        font: string,
        fontSize: number,
        isBold: boolean,
        isItalic: boolean,
        leading: number
    ): Size;
    /**
     * Calculates the scale factor required to fit the given diemnsional item (usually a Javascript Image object or a {@link MediaItem}) into the given width and height.
     * The crop parameter can be used to specify if the image should be cropped to fit the given dimensions fully, or if the entire image should be visible.
     * @param width The width of the area to fit the image into.
     * @param height The height of the area to fit the image into.
     * @param crop Flag indicating if the image should be cropped to fit the given dimensions fully, or if the entire image should be visible.
     * @param image The image to fit into the given dimensions.
     * @returns The scale factor required to fit the given image into the given dimensions.
     */
    GetScaleFactor(
        width: number,
        height: number,
        crop: boolean,
        image: MediaItem | DimensionalItem
    ): number;
    /**
     * Returns the per product setting for the minimum image resolution or 0 if no setting is configured.
     * If the value is <= 0, DPI checks will be disabled.
     */
    GetMinimumDpi(): number;
    /**
     * Gets the DPI of the given image when it is rendered into the given dimensions using the given crop flag.
     * @param width The width of the area to fit the image into.
     * @param height The height of the area to fit the image into.
     * @param crop Flag indicating if the image should be cropped to fit the given dimensions fully, or if the entire image should be visible.
     * @param image The image to fit into the given dimensions.
     * @returns The DPI of the given image when it is rendered into the given dimensions using the given crop flag.
     */
    GetDpi(
        width: number,
        height: number,
        crop: boolean,
        image: MediaItem | DimensionalItem
    ): number;
    /**
     * Get the DPI of the given image when it is rendered for a given Image field using the given crop flag.
     * @param field The field to test the DPI for.
     * @param image The image to test the DPI for.
     * @param crop Flag indicating if the image should be cropped to fit the given dimensions fully, or if the entire image should be visible.
     */
    GetDpiForField(
        field: ImageField,
        image: MediaItem | DimensionalItem,
        crop: boolean
    ): number;
    /**
     * Simplified similarity check for two strings. The higher the value, the more similar the strings are.
     * @param a The first string to compare.
     * @param b The second string to compare.
     * @returns The similarity value >= 0. 0 means the strings are not similar at all. The higher the value, the more similar the strings are.
     */
    GetSimilarity(a: string, b: string): number;
    /**
     * Returns the index of the best matching item in a list of candidates for a given reference string using the simplified similarity check {@link Helper.GetSimilarity}.
     * @param reference The reference string to compare the candidates against.
     * @param candidates The list of candidates to compare against the reference string.
     * @returns The index of the best matching item in the list of candidates. If no item matches it will return -1.
     */
    BestMatch(reference: string, candidates: string[]): number;
    /**
     * Maps all given placeholders to the given values. The result will be an object with the placeholder as key and the mapping result as the value.
     * The mapping result will have the index of the best matching value entry in the values array as the mapping index. Or -1 if no value matched.
     * Note that multiple placeholders may be mapped to the same value.
     * @param placeholders The placeholders to map.
     * @param values The candidate values to map the placeholders to.
     * @returns The mapping result.
     */
    AutoMap(placeholders: string[], values: string[]): BatchMapping;
    /**
     * Return the custom field class for a custom field. When registering a custom field type, a custom class can be defined and made accessible through this function.
     * The functions and interface depend fully on the custom script implementation.
     * @param fieldOrType The custom field or the custom field type to get the class for.
     * @returns The custom field class or null if no class is registered for the given field or type.
     */
    GetCustomFieldClass(fieldOrType: CustomField | string): unknown | null;
    /**
     * Clears a previously triggered timeout based on the timeout id returned by {@link Helper.SetTimeOut} to avoid the timeout to be triggered.
     * @param timeoutId The timeout id to clear.
     */
    ClearTimeOut(timeoutId: number): void;
    /**
     * Sets a timeout to trigger the given callback after the given timeout in milliseconds within the editor.
     * Server side this will be executed immediately. Once the current calling queue has been emptied.
     * @param callback The callback function to trigger.
     * @param timeout The time in milliseconds to wait before triggering the callback (browser only).
     * @returns The timeout id which can be used to clear the timeout using {@link Helper.ClearTimeOut}.
     */
    SetTimeOut(callback: () => void, timeout: number): number;
    /***
     * Loads an external script or data set into the editor. The script will be loaded asynchronously and the callback will be triggered once the external resource is loaded.
     * @param url The URL to load the external resource from.
     * @param callback The callback function to trigger once the external resource is loaded.
     * @param onlyData If set to true, the external resource will be loaded as data set and passed to the callback as parameter. If set to false, the URL will be loaded as a Javascript resource and the _load_ event parameter will be passed. Default value is false.
     */
    LoadExternal(
        url: string,
        callback?: (data?: unknown) => void,
        onlyData?: boolean
    ): void;
    /**
     * Generate a new random GUID as string.
     * @returns The new GUID as string.
     */
    NewGuid(): string;
    /**
     * Performs a deep copy of the passed object. This will also copy all nested objects and arrays.
     * @param item The object to copy.
     * @returns The deep copy of the passed object.
     */
    DeepCopy<T>(item: T): T;
    /**
     * Test function to check if the passed item is an object.
     * @param item The item to test.
     * @returns True if the passed item is an object, and false if it is not.
     */
    IsObject(item: unknown): boolean;
    /**
     * Test function to check if the passed item is an array.
     * @param item The item to test.
     * @returns True if the passed item is an array, and false if it is not.
     */
    IsArray(item: unknown): boolean;
    /**
     * Test function to check if the passed item is a boolean.
     * @param item The item to test.
     * @returns True if the passed item is a boolean, and false if it is not.
     */
    IsBool(item: unknown): boolean;
    /**
     * Test function to check if the passed item is a number.
     * @param item The item to test.
     * @returns True if the passed item is a number, and false if it is not.
     */
    IsNumber(item: unknown): boolean;
    /**
     * Test function to check if the passed item is a function.
     * @param item The item to test.
     * @returns True if the passed item is a function, and false if it is not.
     */
    IsFunction(item: unknown): boolean;
    /**
     * Test function to check if the passed item is a string.
     * @param item The item to test.
     * @returns True if the passed item is a string, and false if it is not.
     */
    IsString(item: unknown): boolean;
    /**
     * Test if the string passed is null, undefined or whitespace.
     * @param value The text to test.
     * @returns True if the string passed is null, undefined or whitespace, and false if it is not.
     */
    IsNullOrWhitespace(value: string): boolean;
    /**
     * Merges two objects together. This will merge all properties of the source object into the target object.
     * If the current items are arrays, the items will be appended if necessary.
     * If the current items are objects, the properties are merged, potentially overwriting the target properties with the source properties.
     * Note that the objects need to be compatible in that sense that they need to be either array or object types (included nested objects).
     * @param target The target item to merge the source item into.
     * @param source The source item to merge into the target item.
     */
    MergeObject(target: object, source: object): void;
    /**
     * Executes a megascript instance, optionally overriding the script and config.
     * Note that this only works server side and cannot be used client side.
     * @param megascriptInstanceName The instance name to trigger.
     * @param script Optionally the script to execute. If null, the script configured for the instance will be used.
     * @param config The optional configuration to overwrite. If null, the configuration configured for the instance will be used.
     * @returns Boolean flag indicating if the script was executed successfully.
     */
    ExecuteMegaScript(
        megascriptInstanceName: string,
        script?: string | null,
        config?: string
    ): boolean;
    /**
     * The text helper sub interface has helper functions to work with text.
     */
    TextHelper: {
        /**
         * Performs variable data replacement on the given field array using the given replacement data.
         * The operation depends on the field type.
         *
         * @param fieldArray The field listing to perform the replacement on.
         * @param replacementData The replacement data to use with keys (placeholder names) and values (replacement values). This is used for text and barcode fields.
         * @param optionalVariableTags The start and end tags for the text replacement.
         * @param optionalImageRetrievalFunction For image fields, this function can be used to retrieve the image data for the given image field. If not specified, the image will not be replaced.
         * @param replaceCaseInvariant This flag controls if the replacement should be case invariant. Default value is false.
         * @param textSuppressionMode The optional text suppression mode to use. Default value is _null_ meaning no suppression to be used.
         * @param replacementText The optional replacement text allows to feed in the text to replace for the field from the outside - essentially overriding the field value. Default value is _null_ meaning the field value will be used.
         * @param callback The callback function to trigger once the replacement is complete.
         */
        PerformFieldDataReplacement(
            fieldArray: BaseField[],
            replacementData: { [key: string]: string },
            optionalVariableTags?: { start: string; end: string },
            optionalImageRetrievalFunction?: () => void,
            replaceCaseInvariant?: boolean,
            textSuppressionMode?: TextSuppressionMode,
            replacementText?: string,
            callback?: () => void
        ): void;

        /**
         * Suppresses segments of the given text based on whether corresponding data is present.
         *
         * The function identifies segments delimited by the specified start and end tags and checks
         * if each segment's associated key exists in the provided data. If a key is missing,
         * the segment is suppressed according to the specified mode.
         *
         * @param text - The input text that may contain segments eligible for suppression.
         * @param tags - An object defining the start and end tags that mark the segments.
         * @param data - An object mapping keys to values; a missing key indicates that its segment should be suppressed.
         * @param mode - The suppression mode to apply. Defaults to null (i.e., no suppression) if not provided.
         * @returns The resulting text after applying the suppression logic.
         */
        SuppressText(
            text: string,
            tags: { start: string; end: string },
            data: { [key: string]: string },
            mode: TextSuppressionMode
        ): string;
    };
    /**
     * The config sub interface allows to interact with the script configuration.
     */
    Config: {
        /**
         * Returns the current script configuration object.
         * @returns The current script configuration object.
         */
        GetConfig<T>(): T;
        /**
         * Check to see if the script has a configuration.
         * @returns True if the script has a configuration, and false if it does not.
         */
        HasConfig(): boolean;
        /**
         * Merges the script configuration into the passed target.
         * This is useful to define the configuration object with all defaults, and then overwrite the defaults with the script configuration, which will also work partially.
         * Anything not defined will still be the default value.
         * @param target The target object to merge the script configuration into. This will be usually the full configuration object with all defaults.
         */
        Merge<T>(target: T): void;
    };
    /**
     * The convert sub interface allows to convert between different units.
     */
    Convert: {
        /**
         * Convert mm to points.
         * @param mm The value in mm.
         * @returns The value in points.
         */
        mmToPoints(mm: number): number;
        /**
         * Convert points to mm.
         * @param pt The value in points.
         * @returns The value in mm.
         */
        pointsToMm(pt: number): number;
    };
    /**
     * This sub interface allows to work with CSV data.
     */
    CSV: {
        /**
         * Helper function to parse a string to a CSV table.
         * @param csv The CSV string to parse.
         * @param options The optional CSV options to use for parsing.
         * @returns An array of arrays (with the rows and columns) of the parsed result. Note that based on {@link CsvOptions.disableNumberConversion} the values may be strings or numbers.
         */
        parse: (csv: string, options?: CsvOptions) => (string | number)[][];
        /**
         * Helper function to convert a CSV table to a string.
         * @param table The CSV table to convert to a string.
         * @param options The optional CSV options to use for stringifying.
         * @returns The CSV string.
         */
        stringify: (
            table: (string | number)[][],
            options?: CsvOptions
        ) => string;
        /**
         * Tests the uploaded file result to see if it is a valid CSV file.
         * @param uploadedFile The uploaded file result to test.
         * @param checkFileExtension Check the file extension as well. Default value is false.
         * @param options The CSV options to use for testing. Default value is null.
         * @returns True if the uploaded file result is a valid CSV file, and false if it is not.
         */
        isContentValidCSV: (
            uploadedFile: MEUIUploadFile,
            checkFileExtension?: boolean,
            options?: CsvOptions
        ) => boolean;
    };
}

/**
 * The text suppression mode controls how the text suppression will be performed.
 */
declare enum TextSuppressionMode {
    /**
     * This will remove static element to the left of empty placeholders.
     */
    Left = "Left",
    /**
     * This will remove static element to the right of empty placeholders.
     */
    Right = "Right",
    /**
     * This will remove static element to the left and right of empty placeholders.
     */
    Full = "Full",
}

/**
 * The Csv Options can be used when parsing or stringifying CSV data.
 */
type CsvOptions = {
    /**
     * The CSV delimiter. Defaults to the comma ','.
     */
    delimiterChar?: string;
    /**
     * The CSV quote character. Defauls to the double quote '"'.
     */
    quoteChar?: string;
    /**
     * Flag indicating if numbers should be converted to numbers or should remain text in the parsed output. Default value is false.
     */
    disableNumberConversion?: boolean;
};
