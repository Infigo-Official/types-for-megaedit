/**
 * Column Layout is used to layout items within columns - uses the Bulma 12 columns system as shown here: https://bulma.io/documentation/columns/sizes/
 * See https://bulma.io/documentation/columns/options/ for the general concept and the properties used here.
 * 
 * @module UI / Layout / Column Layout
 */

/**
 * Column Layout interface
 */
interface MEUIColumnLayout extends MEUILayout {
    /**
     * The type of the UI element. Always "ColumnLayout".
     */
    readonly Type: "ColumnLayout";
    /**
     * Flag indicating that the columns should wrap if there is not enough space.
     * See https://bulma.io/documentation/columns/options/#multiline
     */
    IsMultiline: boolean;
    /**
     * Flag indicating that the columns should be vertically aligned.
     * See https://bulma.io/documentation/columns/options/#vertical-alignment
     */
    IsVerticalAligned: boolean;
    /**
     * The columns per row to use. Results in the columns as shown here: https://bulma.io/documentation/columns/sizes/#12-columns-system
     * Note that the following values are allowed:
     * - 1 column
     * - 2 columns
     * - 3 columns
     * - 4 columns
     * - 6 columns
     * - 12 columns
     */
    ColumnsPerRow: number;
    /**
     * The column padding to use. See https://bulma.io/documentation/columns/gap/
     */
    ColumnPadding: string;
    /**
     * Adds one or more items to the column layout.
     * @param items The items to add.
     */
    Add(...items: MEUIBase[]): void;
    /**
     * Removes a single item from the column layout.
     * @param item The item to remove.
     */
    Remove(item: MEUIBase): void;
}

/**
 * Column Layout constructor interface
 */
interface MEUIColumnLayoutConstructor {
    /**
     * Creates a new column layout
     * @param isMultiline Flag indicating that the columns should wrap if there is not enough space. Default value is false.
     * @param isVerticalAligned Flag indicating that the columns should be vertically aligned. Default value is false.
     * @param columnsPerRow The columns per row to use.
     * @param columnPadding The column padding to use.
     * @returns A new column layout.
     */
    new (
        isMultiline: boolean,
        isVerticalAligned?: boolean,
        columnsPerRow?: number,
        columnPadding?: number
    ): MEUIColumnLayout;
    readonly prototype: MEUIColumnLayout;
}

/**
 * The column layout class
 */
declare const MEUIColumnLayout: MEUIColumnLayoutConstructor;