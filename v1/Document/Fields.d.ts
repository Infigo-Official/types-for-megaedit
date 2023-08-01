/**
 * This module gives access to all field specific functions.
 * @module Document / Field Functions
 */

/**
 * Result object when calling {@link Fields#MeasureFieldText}. This object contains all the information about the text measurement.
 */
type FieldMeasureResult = {
    /**
     * Flag to indicate if the text was wrapped or not at line level.
     */
    didWrap: boolean;
    /**
     * Flag to indicate if the text was wrapped or not at word level.
     */
    didWrapWord: boolean;
    /**
     * The height of the text in points.
     */
    height: number;
    /**
     * Any overflowing text which didn't fit in the field as individual lines as broken by the algorithm.
     */
    overflow: string[];
    /**
     * Flag to control if the overflow has been created due to line wrapping.
     */
    overflowBrokenByAlgorithm: boolean;
    /**
     * The cursor position of the overflow if applicable (if there is an active UI cursor).
     */
    overflowCursor: number;
    /**
     * The style (rich text) of the overflowed text.
     */
    overflowStyle: object;
    /**
     * The overflowed text.
     */
    overflowText: string;
    /**
     * The width of text in points.
     */
    width: number;
}

/**
 * The fields interface allows to interact with the fields. Retrieve them, manipulate them and perform additional helper operations.
 */
interface Fields {
    /**
     * Return all fields in the document optionally filtered by type.
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param types Optional type filter. Specify a single type or an array of types to filter by. If not specified, all types will be returned.
     * @returns All the fields - optionally filtered by type.
     */
    All(cb?: null, types?: FieldType[] | FieldType | null): BaseField[];
    /**
     * Return a field by id.
     * @param id The field id.
     * @returns Returns the field with the specified id or null if not found.
     */
    ById(id: string): BaseField | null;
    /**
     * Return a number of fields identified by their id.
     * @param ids Id list of the fields to return.
     * @returns Returns the fields with the specified ids.
     */
    ByIds(ids: string[]): BaseField[];
    /**
     * Return all fields matching by name.
     * @param name The name to search for.
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param exact Optional flag to indicate if the search should be exact or not. Default is false.
     * @param types Optional type filter. Specify a single type or an array of types to filter by. If not specified, all types will be returned.
     * @returns Returns the fields matching the specified name.
     */
    ByName(name: string, cb?: null, exact?: boolean, types?: FieldType[] | FieldType | null): BaseField[];
    /**
     * Return all fields matching specified tags and are on the specified pages - optionally filtered by type.
     * @param tags Either a single tag or an array of tags to filter by.
     * @param pages Page can be specified by either index or id and either as a single value or an array of values. 
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param all Optional flag to indicate if all tags should be matched or any. Default is false.
     * @param types Optional type filter. Specify a single type or an array of types to filter by. If not specified, all types will be returned.
     * @returns Returns the fields matching the specified tags and pages.
     */
    ByPagesAndTags(tags: string | string[], pages: string | string[] | number | number[], cb: null, all: boolean, types: FieldType[] | FieldType | null): BaseField[];
    /**
     * Return all fields matching specified tags - optionally filtered by type.
     * @param tags Either a single tag or an array of tags to filter by.
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param all Optional flag to indicate if all tags should be matched or any. Default is false.
     * @param types Optional type filter. Specify a single type or an array of types to filter by. If not specified, all types will be returned.
     * @returns Returns the fields matching the specified tags.
     */
    ByTags(tags: string | string[], cb: null, all: boolean, types: FieldType[] | FieldType | null): BaseField[];
    /**
     * Return all fields on the specified pages - optionally filtered by type.
     * @param pages Page can be specified by either index or id and either as a single value or an array of values.
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param types Optional type filter. Specify a single type or an array of types to filter by. If not specified, all types will be returned.
     * @returns Returns the fields on the specified pages.
     */
    ByPages(pages: number | number[] | string | string[], cb: null, types?: FieldType[] | FieldType | null): BaseField[];
    /**
     * Create a new custom field for a specific sub type.
     * @param customType The custom field subtype as identified when registering the custom field.
     * @param page The page identified by index, id or name.
     * @param position The position of the field on the page.
     * @param size The size of the field on the page
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param tags Optional tags to assign to the field directly at creation time. Note that tags should not contain the '|' character.
     * @returns The newly created custom field.
     */
    CreateCustomField(customType: string, page: number | string, position: Point, size: Size, cb?: null, tags?: string[]): CustomField;
    /**
     * Creates a new field of the specified type.
     * @param type The field type to create. For custom fields, please use {@link CreateCustomField} instead.
     * @param page The page identified by index, id or name.
     * @param position The position of the field on the page.
     * @param size The size of the field on the page
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param tags Optional tags to assign to the field directly at creation time. Note that tags should not contain the '|' character.
     * @returns The newly created field.
     */
    CreateField<T extends BaseField>(type: FieldType, page: number | string, position: Point, size: Size, cb?: null, tags?: string[]): T;
    /**
     * Deletes a field from the document.
     * @param fieldOrId The field to delete identified by id or object
     * @returns Flag indicating if the field was deleted or not.
     */
    DeleteField(fieldOrId: string | BaseField): boolean;
    /**
     * Copy the given field. This can be used to simply copy or move a field (in conjunction with {@link DeleteField}).
     * @param fieldOrId The field to copy identified by id or object
     * @param targetPage The target page identified by index, id or name.
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param tags Optional tags to assign to the field directly at creation time. Note that tags should not contain the '|' character. The tags of the source field will be merged with the specified tags.
     * @returns The copied field.
     */
    CopyField<T extends BaseField>(fieldOrId: string | BaseField, targetPage: number | string, cb?: null, tags?: string[]): T;
    /**
     * Returns the text flow chain the specified field is part of. It will return a list with at least one field (the source), but if there is a text flow configured, it will return the flow in order of the flow direction.
     * @param fieldOrId The text field directly or the id of the text field.
     * @returns An ordered list of text fields which makue up the entire text flow.
     */
    GetTextFlowChain(fieldOrId: number | TextField): TextField[];
    /**
     * Save a range of fields in a single call. This is to improve performance, but is mandatory for text fields with text flow to ensure the text flow is correctly updated.
     * @param fields The field objects to save.
     */
    SaveFields(fields: BaseField[]): void;
    /**
     * Measure the text within a field and retrieve information about it including the overflow text and the dimensions of the text.
     * @param fieldOrId The id of the field or the field object itself. Must be a text field.
     * @param cb The callback is triggered once the measurements are ready.
     */
    MeasureFieldText(fieldOrId: string | TextField, cb: (data: FieldMeasureResult) => void): void;
    /**
     * Get the text as HTML where the rich text format is represented with the MegaEdit rich text format.
     * @param fieldOrId The text field directly or the id of the text field.
     * @param cb [Deprecated] Shouldn't be used anymore, please pass _null_ instead.
     * @param includeFieldSettings If true, we will have styling tags for the field standard format too in the output. If false, we will have only the rich text formatting which differs from the field standard format. Default is false. Use it to display the format externally (e.g. in a HTML context).
     * @param tagLimiters This is an array of size two where the first element is the opening tag, and the second element is the closing tag used as the tag limiter. Standard value is ['<' , '>'].
     * @param entireTextFlow If this is true we will extract the text from an entire text flow if the field is part of it. If false, we will extract only the text from the field itself. Default is false.
     * @returns The text as HTML variant.
     */
    GetTextAsHtml(fieldOrId: string | TextField, cb: null, includeFieldSettings?: boolean, tagLimiters?: string[], entireTextFlow?: boolean): string;
    /**
     * Set the text of the field in a limited HTML format. MegaEdit rich text format is only a very small subset and is very limited in what it can represent compared to HTML. This is the prefered method to set text with rich text formatting.
     * @param fieldOrId The text field directly or the id of the text field.
     * @param text The text to set including rich text formatting. Newlines are represented with '<br/>' and Html entities may be decoded.
     * @param cb Optional callback to be triggered once the text has been set.
     * @param tagLimiters This is an array of size two where the first element is the opening tag, and the second element is the closing tag used as the tag limiter. Standard value is ['<' , '>'].
     */
    SetTextAsLimitedHtml(fieldOrId: string | TextField, text: string, cb?: (success: boolean, self: TextField) => void, tagLimiters?: string[]): void;
    /**
     * Get the current font size used in a text field as if fit to box would be enabled. This allows to set the fit to box options directly in the parameters.
     * Note that you have to either specify the values or the defaults as  below will be used. It will not use the field settings for it automatically.
     * 
     * @param fieldOrId The text field directly or the id of the text field.
     * @param callback The callback will be triggered once the font size has been calculated and the value is passed as a parameter.
     * @param withWrap Flag to control if text wrapping should be applied when calculating the font size. Default is false.
     * @param minFontSize The minimum font size to use when calculating the font size. Default is -1 - meaning no minimum font size.
     * @param maxFontSize The maximum font size to use when calculating the font size. Default is -1 - meaning no maximum font size.
     */
    GetFitToBoxFontSize(fieldOrId: string | TextField, callback: (fontSize: number) => void, withWrap?: boolean, minFontSize?: number, maxFontSize?: number): void;
    /**
     * Sets the image scale or zoom of an image field. Value is between 0 and 100 - and that can be used as a simplified call to use the zoom feature.
     * @param fieldOrId The image field directly or the id of the image field.
     * @param value The zoom value to set. Value is between 0 and 100.
     * @returns Flag indicating if the image scale was set or not.
     */
    SetImageScale(fieldOrId: string | ImageField, value: number): boolean;
    /**
     * Updates the appareance of a custom field. This is important if the underlaying data has been changed and the field needs to be updated to show the new data.
     * @param fieldOrId The custom field directly or the id of the custom field.
     * @returns Flag indicating if the field was updated or not.
     */
    RenderCustomField(fieldOrId: string | CustomField): boolean;
    /**
     * Renders a field to an image. This is useful to get a preview of the field.
     * @param fieldOrId The field to render identified by id or object
     * @param width The width of the image in pixels. The height will be calculated automatically based on the aspect ratio of the field.
     * @param callback The callback is triggered once the image is ready and the image data is passed as a parameter in base 64 format.
     */
    Render(fieldOrId: string | BaseField, width: number, callback: (image: string) => void): void;
}