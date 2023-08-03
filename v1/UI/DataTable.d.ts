/**
 * A very simple data table to provide an excel like experience.
 * 
 * @module UI / Control / Data Table
 */

/**
 * The data table interface.
 */
interface MEUIDataTable extends MEUISizeBase {
    /**
     * The type of the UI element. Always "DataTable".
     */
    readonly Type: "DataTable";    
    /**
     * The context menu items to support. Must be an array of the following:
     * - row_above
     * - row_below
     * - remove_row
     * - col_left
     * - col_right
     * - remove_col
     * - undo
     * - redo
     */
    ContextMenu: string[];
    /**
     * The column headers of the data table.
     */
    ColumnHeaders: string[];
    /**
     * Flag indicating that the data table has row headers.
     */
    HasRowHeaders: boolean;
    /**
     * Flag indicating that the data table has column headers.
     */
    HasColumnHeaders: boolean;
    /**
     * The data as an array of arrays. Each inner array represents a row of data.
     */
    Data: (string | number)[][];
    /**
     * Registers a callback for the change event.
     * @param dataTable The data table component.
     */
    OnChange: (dataTable: MEUIDataTable) => void;
}

/**
 * Data table constructor interface
 */
interface MEUIDataTableConstructor {
    /**
     * Creates a new data table
     * @param data The data as an array of arrays. Each inner array represents a row of data.
     * @param change Change event when the data table is changed.
     * @returns A new data table.
     */
    new (data: (string | number)[][], change: (dataTable: MEUIDataTable) => void): MEUIDataTable;
    readonly prototype: MEUIDataTable;
}

/**
 * The data table class.
 */
declare const MEUIDataTable: MEUIDataTableConstructor;