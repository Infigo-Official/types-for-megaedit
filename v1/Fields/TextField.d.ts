/**
 * This defines the text field interface with the necessary types.
 * 
 * @module Field / Text Field
 */

/**
 * Text field issues extend the base issue data with text specific checks.
 */
interface TextFieldIssues extends BaseFieldIssues {
    /**
     * Flag to control if there are profanity issues (only available if the profanity check is enabled for this product)
     */
    hasProfanityIssues: boolean;
}

/**
 * Text field restrictions extend the base restrictions.
 */
interface TextFieldRestrictions extends BaseFieldRestrictions {
    /**
     * Flag to control if the text should be preserved/maintained when switching layouts. If false, the text will be replaced via the layout mapping.
     */
    maintainTextOnLayout: boolean;
    /**
     * Flag to control if this field supports rich text. If false, the text will be plain text only.
     */
    noRichTextSupport: boolean;
    /**
     * Flag to control if the text is editable. If false, the text cannot be changed.
     */
    fixedText: boolean;
}

/**
 * The text field ui options extend the base ui options
 */
interface TextFieldUiOptions extends BaseFieldUiOptions {
    /**
     * Show the rendering mode options (outline, full, etc.)
     */
    showRenderMode: boolean;
    /**
     * The margin option defines additional margin around the text field to increase the clipping area to avoid cut off text for certain fonts.
     * The values are in points. Separation is done by a space.
     * 
     * It supports the following formats (similar to CSS margin options):
     * - single number: all sides have the same margin - e.g. 5
     * - two numbers: the first number is the top and bottom margin, the second number is the left and right margin - e.g. 5 10
     * - three numbers: the first number is the top margin, the second number is the left and right margin, the third number is the bottom margin - e.g. 5 10 15
     * - four numbers: the first number is the top margin, the second number is the right margin, the third number is the bottom margin, the fourth number is the left margin - e.g. 5 10 15 20
     */
    margin: string;
    /**
     * Flag to control if the format options should be hidden (font, bold and italic options, underline, strike through, font size, color)
     */
    hideFormat: boolean;
    /**
     * Flag to control if the advanced text options should be hidden.
     */
    hideAdvancedTextOptions: boolean;
    /**
     * Hide the font selector
     */
    hideFontsOptions: boolean;
    /**
     * Hide the bold and italic options.
     */
    hideBoldItalicOptions: boolean;
    /**
     * Hide the font size options.
     */
    hideFontSizeOption: boolean;
    /**
     * Placeholder text to display on the canvas in case the text is empty. This will not be part of the preview or output.
     */
    placeholderText: string;
    /**
     * The selected style group by id - {@link StyleGroup.id}. A style group then allows to select the style items within that group for that text field to quickly and easily adjust styles.
     */
    selectedGroupStyle: string;
    /**
     * Flag to control if the text color option should be hidden.
     */
    hideTextColorOption: boolean;
    /**
     * Flag to control if the text decoration (underline, strike-through) option should be hidden.
     */
    hideTextDecorationOption: boolean;
    /**
     * Flag to control if the text alignment option should be hidden.
     */
    hideAlignmentOption: boolean;
}

/**
 * The font weight options available in MegaEdit.
 * Note: the respective variant must be available in the font setup.
 */
declare enum FontWeight {
    /**
     * The text will be rendered not bold.
     */
    Normal = 'normal',
    /**
     * The text will be rendered bold.
     */
    Bold = 'bold'
}

/**
 * The font style options available in MegaEdit.
 * Note: the respective variant must be available in the font setup.
 */
declare enum FontStyle {
    /**
     * The text will be rendered not italic.
     */
    Normal = 'normal',
    /**
     * The text will be rendered italic.
     */
    Italic = 'italic'
}

/**
 * The text decoration options available in MegaEdit.
 * Note - only one option can be active at a time.
 */
declare enum TextDecoration {
    /**
     * No text decoration is applied
     */
    Normal = '',
    /**
     * Underline the current text
     */
    Underline = 'underline',
    /**
     * The current text is struck through
     */
    StrikeThrough = 'line-through'
}

/**
 * The style item available for rich text formatting.
 */
type RichTextStyleItem = {
    /**
     * The font family to use. This must match an available font available in the resources for the current product
     */
    fontFamily: string | null;
    /**
     * The font size to use. This is in points.
     */
    fontSize: number | null;
    /**
     * The font color to use. This can be any valid MegaEdit color value.
     */
    fill: string | null;
    /**
     * The font weight to use. Note that the respective variant must be available in the font setup.
     */
    fontWeight: FontWeight | null;
    /**
     * The font style to use. Note that the respective variant must be available in the font setup.
     */
    fontStyle: FontStyle | null;
    /**
     * The text decoration to use. Note that only one option can be active at a time.
     */
    textDecoration: TextDecoration | null;
    /**
     * The text background color item to use. This can be any valid MegaEdit color value.
     */
    textBackgroundColor: string | null;
}

/**
 * Defines a rich text entry which defines a span of text and gives them a specific style.
 * The style is defined by the {@link RichTextStyleItem} object which supports an override mechanism. Only properties not equal to null will be applied.
 */
type RichTextEntry = {
    /**
     * The starting character index within the current line to apply the style to.
     */
    start: number;
    /**
     * The end character index within the current line to apply the style to.
     */
    end: number;
    /**
     * The style to apply. If null, the default style will be used.
     */
    format: RichTextStyleItem | null
}

/**
 * Defines the text format options. All members are optional - and depending on the usage context, a null value would indicate no change and the format will not be adjusted.
 * In the context of a text fields default format though, all values for a standard appareance should be set.
 */
type TextFormat = {
    /**
     * The font family to use. This must match an available font available in the resources for the current product
     */
    fontFamily: string;
    /**
     * Flag to control if the text is bold. Note that the font used must support a bold variant. If {@link italicFlag} is true, we need to support a bold italic variant.
     */
    boldFlag: boolean;
    /**
     * Flag to control if the text is italic. Note that the font used must support an italic variant. If {@link boldFlag} is true, we need to support a bold italic variant.
     */
    italicFlag: boolean;
    /**
     * Add an underline decoration to the text.
     */
    underlineFlag: boolean;
    /**
     * Add a strike through decoration to the text.
     */
    strikeFlag: boolean;
    /**
     * The color of the text/glyphs. This can be any valid MegaEdit color value.
     */
    fontColor: string;
    /**
     * The background color to add a rectangular background for each glyph. This can be any valid MegaEdit color value.
     */
    bgColor: string;
    /**
     * The font size to use. This is in points.
     */
    fontSize: number;
    /**
     * The horizontal text alignment.
     */
    alignment: TextHorizontalAlignment;
    /**
     * The opacity of the text.
     */
    opacity: number;
    /**
     * The identifier of the style used for this field or null if no style object is applied. {@link StyleItem.id} for more details. This is one of the styles in the group assigned to the field (see {@link TextFieldUiOptions.selectedGroupStyle}).
     */
    styleId: string | null;
}

/**
 * The vertical alignment of the text.
 */
declare enum TextVerticalAlignment {
    /**
     * Top aligned text.
     */
    Top = 'T',
    /**
     * Middle aligned text.
     */
    Middle = 'M',
    /**
     * Bottom aligned text.
     */
    Bottom = 'B'
}

/**
 * The horizontal alignment of the text.
 */
declare enum TextHorizontalAlignment {
    /**
     * Left aligned text.
     */
    Left = 'left',
    /**
     * Center aligned text.
     */
    Center = 'center',
    /**
     * Right aligned text.
     */
    Right = 'right'
}

/**
 * The grow type defines how the text field will auto grow when text is being entered.
 */
declare enum TextFieldAutoGrowType {
    /**
     * The field will not grow at all, text will be wrapped at the widht and the height may cut off text going beyond.
     */
    Fixed = 'Fixed',
    /**
     * The field can grow horizontally. This means text will not wrap as it can extend with typing. But vertically the text field will be fixed and text may be cut off.
     */
    Horizontal = 'Horizontal',
    /**
     * The field can grow vertically, but not horizontally. Text will wrap when typing. But the field height will increase to ensure all of the text is visible. This is the default behavior.
     */
    Vertical = 'Vertical',
    /**
     * The field can grow in both dimensions. Text will not wrap and not be cut off.
     */
    Free = 'Free'
}

/**
 * The render mode defines how the glyphs are being rendered.
 */
declare enum TextRenderMode {
    /**
     * This will render the fill of the glyphs only. This is the default rendering mode.
     */
    Fill = 'Fill',
    /**
     * The outline will only stroke the outline of the glyphs.
     */
    Outline = 'Outline',
    /**
     * This will render first the fill and then the outline of the glyphs. Separate colours can be configured.
     */
    FillAndOutline = 'FillAndOutline'
}

/**
 * Defines the text case type for automatic case conversion. The actual text doesn't change, only adjusts how the text is rendered.
 */
declare enum TextCaseType {
    /**
     * The text will not be changed.
     */
    Untouched = 'Untouched',
    /**
     * The text will be converted to all upper case letters when being rendered.
     */
    UpperCase = 'UpperCase',
    /**
     * The text will be converted to all lower case letters when being rendered.
     */
    LowerCase = 'LowerCase'
}

/**
 * The text field mode defines how the field behaves when text is being entered.
 */
declare enum TextFieldMode {
    /**
     * Standard mode used for general text fields.
     */
    Normal = 'Normal',
    /**
     * This field is part of a text flow. That means it will not auto grow ({@link TextFieldAutoGrowType}) and the text will flow from one field to the next.
     */
    TextFlow = 'TextFlow',
    /**
     * Restricted fields will have a restricted input which ensures that it always will fit in. The UI is linked to it similar to limited character count, although this is dynamic based on the size.
     */
    Restricted = 'Restricted'
}

/**
 * The text field direction defines the direction the text flows.
 */
declare enum TextFieldTextDirection {
    /**
     * Inherit the setting from the document. See {@link Job.GetBaseDirection}.
     */
    Inherit = 'Inherit',
    /**
     * The field is always left to right.
     */
    LeftToRight = 'LTR',
    /**
     * The field is always right to left.
     */
    RightToLeft = 'RTL'
}

/**
 * An text field will contain text in various formats.
 */
interface TextField extends BaseField {
    /**
     * The issues for this text field.
     */
    readonly issues: TextFieldIssues;
    /**
     * The restrictions for this text field.
     */
    readonly restrictions: TextFieldRestrictions;
    /**
     * The UI options for this text field.
     */
    readonly uioptions: TextFieldUiOptions;
    /**
     * The text specific options for this field.
     */
    readonly text: {
        /**
         * The text of the field as it came from the input source. This is always plain text - but you can {@link styles} to understand additional rich text formatting for individual glyphs.
         */
        data: string;
        /**
         * The internal text matches the normal {@link data} but may contain additional line breaks due to the line wrapping of the field.
         * This can be used if the script needs to understand exactly how the text is rendered.
         */
        readonly internalText: string;
        /**
         * The field type defines how the field can grow when text is being entered.
         */
        fieldType: TextFieldAutoGrowType;
        /**
         * The vertical alignment of the field. This is set ofr the intire field, not individual lines.
         */
        verticalAlignment: TextVerticalAlignment;
        /**
         * The default format 
         */
        defaultFormat: TextFormat;
        /**
         * Advanced text options are defined in this object.
         */
        readonly options: {
            /**
             * The fit to box feature allows to control  how the text is automatically resized to fit the available space.
             */
            readonly fitToBox: {
                /**
                 * Flag to control if automatic resizing should be enabled.
                 */
                enabled: boolean;
                /**
                 * Flag to control if the automatic resizing should include automatic line wrapping. Otherwise the size is adjusted without breaking up any lines.
                 */
                withWrap: boolean;
                /**
                 * The minimum font size to use. This is in points. The automatic sizing would never go below this even if the text would not fit.
                 */
                minFontSize: number;
                /**
                 * The maximum font size to use. This is in points. The automatic sizing would never go above this even if the text would not fit.
                 */
                maxFontSize: number;
            };
            /**
             * The text render mode of the glpyhs.
             */
            readonly  renderMode: {
                /**
                 * Specifies the enabled render mode.
                 */
                type: TextRenderMode;
                /**
                 * For font and outline modes, this is the color of the outline (as we support two colours). This can be any valid MegaEdit color value.
                 */
                color: string;
                /**
                 * The width of the outline in points.
                 */
                width: number;
            };
            /**
             * The text type defines if the casing of the text should be changed.
             */
            textType: TextCaseType;
            /**
             * The text type defines how the field is being used externally.
             */
            textTypeMode: TextFieldMode;
            /**
             * If text flow is used, this defines the field chain how the text will flow.
             */
            textFlow: {
                /**
                 * The id of the next field in the chain. Or null if this is the last field or text flow is not used.
                 */
                next: string | null;
                /**
                 * The id of the previous field in the chain. Or null if this is the first field or text flow is not used.
                 */
                prev: string | null;
            } | null;
            /**
             * The paragraph options used for this field.
             */
            readonly paragraphOptions: {
                /**
                 * The leading defines the vertical spacing between lines. The leading is a factor of the line height. Default would be 1.3 meaning the line height is 130% of the font size.
                 */
                leading: number;
                /**
                 * The additional horizontal spacing to add between words in points.
                 */
                wordSpacing: number;
                /**
                 * The additional horizontal spacing to add between characters in points.
                 */
                charSpacing: number;
                /**
                 * The additional vertical spacing to add between paragraphs in points. Paragraphs are identified by an empty line between them.
                 */
                paragraphSpacing: number;
            };
        };
        /** 
         * The rich text styles can be accessed through this property.
         */
        styles: {
            /**
             * This contains an object where each key is the line index, and the value defines the format ranges within that line.
             */
            lines: Record<string, RichTextEntry[]>
        } | null;
        /**
         * The text direction defines how the text flows for this field.
         */
        textDirection: TextFieldTextDirection;
    };
}

