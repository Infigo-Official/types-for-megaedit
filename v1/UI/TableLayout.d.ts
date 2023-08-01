/**
 * A table layout provides a table for standard configuration setups.
 * 
 * @module UI / Layout / Table Layout
 */


interface MEUITableLayout extends MEUILayout {
    /**
     * The type of the UI element. Always "TableLayout".
     */
    readonly Type: "TableLayout";
    /**
     * Based on the UI elements added, the max column count will be calculated.
     * This is the total number of columns in the table.
     */
    readonly MaxColumnCount: number;
    /**
     * The rows property is readonly and should not be adjusted.
     * It shows the total number of rows as the first dimension and then within each row the indizes within the _Items_ property for the UI elements in that row - column by column.
     * All indizes are zero based.
     */
    readonly Rows: number[][];
    /**
     * Store the indizes of the rows which should be hidden. This is an easy way to hide/show rows by updating this property.
     */
    HiddenRows: number[];
    /**
     * Adds a new row with a label and a UI element in it.
     * Used for standard configuration components.
     * @param text The text to display. This will be put into a {@link MEUILabel} element.
     * @param ui The UI component to display.
     */
    AddRowHelper(text: string, ui: MEUIBase): void;
    /**
     * A new section is just a single text within a new row with the section styling added to it.
     * @param text The text to display. This will be put into a {@link MEUILabel} element with a section class to differentiate it from the other rows.
     */
    AddSection(text: string): void;
    /**
     * Generic method to add a new row. This can be used to add any number of columns to the table.
     * The {@link MaxColumnCount} will be updated automatically.
     * @param row The ui elements to add to this row.
     */
    AddRow(row: MEUIBase[]): void;
}

/**
 * Table layout constructor interface
 */
interface MEUITableLayoutConstructor {
    /**
     * Creates a new table layout
     */
    new (): MEUITableLayout;
    readonly prototype: MEUITableLayout;
}

/**
 * The table layout class.
 */
declare const MEUITableLayout: MEUITableLayoutConstructor;