/**
 * Styles can be used for text fields to easily adjust the formating. They can be granular to define exactly what the style should adjust and can be grouped together, so the end user has a choice of styles to choose from.
 * 
 * @module Document / Styles
 */

/**
 * A style item can be used for text fields. It defines the base style of a text field and can be used to quickly and easily change the style of a text field.
 * Style items can be grouped together to give a meaningful choice to the enduser.
 * 
 * A style item holds possible formating options for a text field where each option is optional. So it can be quite granular to configure what the styles will adjust when applied to a text field.
 */
type StyleItem = {
    /**
     * The id of the style item (GUID).
     */
    id: string;
    /**
     * The name of the style item as it appears in the UI.
     */
    name: string;
    /**
     * Flag to indicate that the alignment should be applied.
     */
    applyAlignment: boolean;
    /**
     * The alignment to use. Only used if {@link applyAlignment} is true.
     */
    alignment: TextHorizontalAlignment;
    /**
     * Flag to indicate that the background color should be applied.
     */
    applyBackgroundColor: boolean;
    /**
     * The background color to use. Only used if {@link applyBackgroundColor} is true.
     * Any MegaEdit color format is supported.
     */
    bgColor: string;
    /**
     * Flag to indicate that the bold flag should be applied.
     * Note that the fonts need to support all the variants for the styles to work.
     */
    applyBoldFlag: boolean;
    /**
     * The bold flag to use. Only used if {@link applyBoldFlag} is true.
     */
    boldFlag: boolean;
    /**
     * Flag to indicate that the italic flag should be applied.
     * Note that the fonts need to support all the variants for the styles to work.
     */
    applyItalicFlag: boolean;
    /**
     * The italic flag to use. Only used if {@link applyItalicFlag} is true.
     */
    italicFlag: boolean;
    /**
     * Flag to indicate that the underline flag should be applied.
     */
    applyUnderlineFlag: boolean;
    /**
     * The underline flag to use. Only used if {@link applyUnderlineFlag} is true.
     */
    underlineFlag: boolean;
    /**
     * Flag to indicate that the strike flag should be applied.
     */
    applyStrikeFlag: boolean;
    /**
     * The strike flag to use. Only used if {@link applyStrikeFlag} is true.
     */
    strikeFlag: boolean;
    /**
     * Flag to indicate that the font family should be applied.
     */
    applyFontFamily: boolean;
    /**
     * The font family to use. Only used if {@link applyFontFamily} is true.
     * This must be a valid available font resource.
     */
    fontFamily: string;
    /**
     * Flag to indicate that the font color should be applied.
     */
    applyFontColor: boolean;
    /**
     * The font color to use. Only used if {@link applyFontColor} is true.
     * Any MegaEdit color format is supported.
     */
    fontColor: string;
    /**
     * Flag to indicate that the font size should be applied.
     */
    applyFontSize: boolean;
    /**
     * The font size to use. Only used if {@link applyFontSize} is true.
     */
    fontSize: number;
    /**
     * Flag to indicate that the character spacing should be applied.
     */
    applyCharSpacing: boolean;
    /**
     * The character spacing to use. Only used if {@link applyCharSpacing} is true.
     */
    charSpacing: number;
    /**
     * Flag to indicate that the word spacing should be applied.
     */
    applyWordSpacing: boolean;
    /**
     * The word spacing to use. Only used if {@link applyWordSpacing} is true.
     */
    wordSpacing: number;
    /**
     * Flag to indicate that the paragraph spacing should be applied.
     */
    applyParagraphSpacing: boolean;
    /**
     * The paragraph spacing to use. Only used if {@link applyParagraphSpacing} is true.
     */
    paragraphSpacing: number;
    /**
     * Flag to indicate that the leading should be applied.
     */
    applyLeading: boolean;
    /**
     * The leading to use. Only used if {@link applyLeading} is true.
     * The leading value here is the percentage - e.g. default is 130 for 130%.
     */
    leading: number;
    /**
     * Flag to indicate that the opacity should be applied.
     */
    applyOpacity: boolean;
    /**
     * The opacity to use. Only used if {@link applyOpacity} is true.
     * Value between 0 and 1. 0 is fully transparent, 1 is fully opaque.
     */
    opacity: number;
}

/**
 * A style group holds style items categorized by a name. Style items can be used for text fields and the group can be assigned to a text field, so that the enduser can choose one of the styles within.
 */
type StyleGroup = {
    /**
     * The id of the style group (GUID).
     */
    id: string;
    /**
     * The name of the style group.
     */
    name: string;
    /**
     * The ids of the style items in the group ({@link StyleItem}), all guids.
     */
    ids: string[];
}

/**
 * Interface for the style items and style groups
 */
interface Styles {
    /**
     * Interface to retrieve and manage the style items in the system.
     */
    Items: {
        /**
         * Returns an array with all available style items.
         * @returns All available style items
         */
        All(): StyleItem[];
        /**
         * Return a style item by its id.
         * @param id The id of the style item to return.
         * @returns The style item with the given id or null if not found.
         */
        ById(id: string): StyleItem;
        /**
         * Returns a style item by its name, where the name can be an exact match or a partial match.
         * @param name The name of the style item to return.
         * @param exactMatch Flag to indicate if the name must be an exact match or a partial match.
         * @returns The style item with the given name or null if not found.
         */
        ByName(name: string, exactMatch?: boolean): StyleItem;
        /**
         * Adds a new style item. A style must have a name, the id will be autocalculated.
         * @param item The style item to add - it must match the {@link StyleItem} interface.
         * @returns The added style item or null if it could not add it.
         */
        Add(item: StyleItem): StyleItem | null;
        /**
         * The style item to update. The id must match an existing style item. If the style is assigned to text fields, the changes will be reflected on the text fields.
         * @param item The updated style item
         * @returns The updated style item or null if it could not update it.
         */
        Update(item: StyleItem): StyleItem | null;
        /**
         * Deletes a style item from the listing. This will also clear the style from any text fields it is assigned to.
         * @param itemOrId The style item or the id of the style item to delete.
         * @returns True if the style item was deleted, false otherwise.
         */
        Delete(itemOrId: StyleItem | string): boolean;
    };
    /**
     * Interface to retrieve and manage the style groups in the system.
     */
    Groups: {
        /**
         * Returns an array with all available style groups.
         * @returns All available style groups
         */
        All(): StyleGroup[];
        /**
         * Return a style group by its id.
         * @param id The id of the style group to return.
         * @returns The style group with the given id or null if not found.
         */
        ById(id: string): StyleGroup;
        /**
         * Returns a style group by its name, where the name can be an exact match or a partial match.
         * @param name The name of the style group to return.
         * @param exactMatch Flag to indicate if the name must be an exact match or a partial match.
         * @returns The style group with the given name or null if not found.
         */
        ByName(name: string, exactMatch?: boolean): StyleGroup;
        /**
         * Adds a new style group. A group must have a name, the id will be autocalculated.
         * @param item The style group to add - it must match the {@link StyleGroup} interface.
         * @returns The added style group or null if it could not add it.
         */
        Add(item: StyleGroup): StyleGroup | null;
        /**
         * The style group to update. The id must match an existing style group. This will not update any fields with that grou appliedp - as they still will have the original style applied.
         * @param item The updated style group
         * @returns The updated style group or null if it could not update it.
         */
        Update(item: StyleGroup): StyleGroup | null;
        /**
         * Deletes a style group from the listing. This will not update any fields with that group applied - as they still will have the original style applied.
         * @param itemOrId The style group or the id of the style group to delete.
         * @returns True if the style group was deleted, false otherwise.
         */
        Delete(itemOrId: StyleGroup | string): boolean;
    };
}