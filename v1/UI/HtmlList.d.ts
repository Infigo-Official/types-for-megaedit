/**
 * A HTML list component allows to select a single item - similar to a dropdown, but allows to have HTML content for the options.
 * It has various modes on how it is being used.
 * - Collapsed mode: The list would not show all options, but just the current option. Clicking the list would show the options either in a popup or in a dropdown.
 * - Expanded mode: The list would show all options - highlighted the current option.
 * 
 * The is also a short label available which is used in the collapsed mode for the button and in the expanded mode for a label.
 * @module UI / Control / Html List
 */

/**
 * HTML list option item.
 */
type MEUIHtmlListOption = {
    /**
     * The label of the option. Can use full HTML.
     */
    Label: string;
    /**
     * Optional shor label of the option as plain text. Will be displayed instead of the HTML as a shorter summary.
     */
    ShortLabel?: string;
    /**
     * The value of the option.
     */
    Value: string;
}

/**
 * HTML list interface
 */
interface MEUIHtmlList extends MEUIBase {
    /**
     * The type of the UI element. Always "HtmlList".
     */
    readonly Type: 'HtmlList';
    /**
     * The list of options. When setting this value, strings can be used as well, which will be converted to MEUIHtmlListOption.
     * But it is recommended to only use {@link MEUIHtmlListOption} items.
     */
    Options: (MEUIHtmlListOption | string)[];
    /**
     * The currently selected value.
     */
    Value: string;
    /**
     * The Label of the element is only used when no value is selected. Can be full HTML.
     */
    Label: string;
    /**
     * The short label of the currently selected item.
     */
    ShortLabel: string;
    /**
     * The expanded width is used for the expanded UL element and for the collapsed dropdown UL element.
     * The valid values are CSS width values like "100px", "50%", "auto", etc.
     */
    ExpandedWidth: string;
    /**
     * The items per row to use. Results in the columns as shown here: https://bulma.io/documentation/columns/sizes/#12-columns-system
     * Note that the following values are allowed:
     * - 1 column
     * - 2 columns
     * - 3 columns
     * - 4 columns
     * - 6 columns
     * - 12 columns
     */
    ItemsPerRow: number;
    /**
     * Flag indicating the list is collapsed or expanded.
     */
    Collapsed: boolean;
    /**
     * Flag indicating that the list should use a popup or a dropdown.
     * Only relevant in the collapsed mode.
     */
    UsePopup: boolean;
    /**
     * Returns the currently selected option.
     */
    readonly CurrentObject: MEUIHtmlListOption;
    /**
     * Registers a change event handler.
     * @param event Change event when the list value is changed.
     */
    OnChange(event: (htmlList: MEUIHtmlList) => void): void;
}

/**
 * HTML list constructor interface
 */
interface MEUIHtmlListConstructor {
    /**
     * Creates a new HTML list
     * @param label The label of the list.
     * @param options The list of options. When setting this values, strings can be used as well, which will be converted to MEUIHtmlListOption.
     * @param current The currently selected value.
     * @param change Change event when the list value is changed.
     * @param collapsed Flag indicating the list is collapsed or expanded. Default value is false.
     * @param usePopup Flag indicating that the list should use a popup or a dropdown. Default value is false.
     * @returns A new HTML list.
     */
    new (
        label: string,
        options: (MEUIHtmlListOption | string)[],
        current?: string,
        change?: (htmlList: MEUIHtmlList) => void,
        collapsed?: boolean,
        usePopup?: boolean
    ): MEUIHtmlList;
    readonly prototype: MEUIHtmlList;
}

/**
 * The HTML list class
 */
declare const MEUIHtmlList: MEUIHtmlListConstructor;