/**
 * The data grid component is a flexible data grid component with type support for the columns, search and sort capability as well as editing features and custom actions.
 * 
 * @module UI / Control / Data Grid
 */

/**
 * Type of the header item/column of a data grid header.
 */
declare enum MEUIDataGridHeaderTypeEnum {
    /**
     * Text input field.
     */
    Text = 'Text',
    /**
     * Dropdown
     */
    DropDown = 'DropDown',
    /**
     * Number
     */
    Number = 'Number',
    /**
     * Checkbox
     */
    CheckBox = 'CheckBox',
    /**
     * Text Area
     */
    TextArea = 'TextArea',
    /**
     * Date
     */
    Date = 'Date',
    /**
     * Time
     */
    Time = 'Time',
    /**
     * Image
     */
    Image = 'Image'
}

/**
 * Type data for a header of type time.
 */
type TimeHeaderTypeData = {
    /**
     * Optional hour step. Defaults to 1.
     */
    HourStep?: number;
    /**
     * Optional minute step. Defaults to 1.
     */
    MinuteStep?: number;
    /**
     * Optional flag indicating if the meridian (AM/PM) should be shown. Defaults to false.
     */
    ShowMeridian?: boolean;
    /**
     * Optional flag indicating if the input controls are readonly (aka cannot be typed in directly). Defaults to false.
     */
    ReadOnly?: boolean;
    /**
     * Optional flag indicating if the mouse wheel should be used to change the value. Defaults to false.
     */
    MouseWheel?: boolean;
};

/**
 * Type data for a header of type dropdown as an array of strings for the options.
 */
type DropdownHeaderTypeData =  string[];

/**
 * Type data for a header of type date.
 */
type DateHeaderTypeData = {
    /**
     * Optional minimum date. Defaults to null.
     */
    min?: string;
    /**
     * Optional maximum date. Defaults to null.
     */
    max?: string;
};

/**
 * Type data for a header of type text.
 */
type TextHeaderTypeData = {
    /**
     * Optional maximum length of the text. Defaults to null aka no maximum length.
     */
    maxLength?: number;
    /**
     * Optional validation regex. Defaults to null meaning no validation.
     */
    validation: string;
};

/**
 * Type data for a header of type number.
 */
type NumberHeaderTypeData = {
    /**
     * Optional minimum value. Defaults to null.
     */
    min?: number;
    /**
     * Optional maximum value. Defaults to null.
     */
    max?: number;
    /**
     * Optional flag indicating if the value should be an integer. Defaults to false.
     */
    isFloat?: boolean;
};


/**
 * Defines a data grid header.
 */
interface MEUIDataGridHeaderItem {
    /**
     * The title of the header item.
     */
    Title: string;
    /**
     * The type of the header item.
     */
    Type: MEUIDataGridHeaderTypeEnum;
    /**
     * The type data. The exact format depends on the type.
     * Is optional for all types except for {@link MEUIDataGridHeaderTypeEnum.DropDown}.
     */
    TypeData: null | TextHeaderTypeData | NumberHeaderTypeData | DropdownHeaderTypeData | TimeHeaderTypeData | DateHeaderTypeData;
    /**
     * The default value of this header item (used e.g. when adding a new row).
     */
    DefaultData: unknown;
    /**
     * Flag indicating if this column should be editable. Default is true.
     */
    Editable: boolean;
    /**
     * The name of the property in the data object for this column.
     */
    Property: string;
    /**
     * Flag indicating if this column should be sortable. Default is true.
     */
    OrderChangable: boolean;
    /**
     * Flag indicating if this column should be filterable. Default is true.
     */
    Filterable: boolean;
}

/**
 * Data grid header item constructor interface.
 */
interface MEUIDataGridHeaderItemConstructor {
    /**
     * Creates a new data grid header item.
     * @param title The title of the header item.
     * @param property The name of the property in the data object for this column.
     * @param type The type of the header item.
     * @param typeData The type data. The exact format depends on the type. Is optional for all types except for {@link MEUIDataGridHeaderTypeEnum.DropDown}.
     * @param editable Flag indicating if this column should be editable. Default is true.
     * @param defaultData The default value of this header item (used e.g. when adding a new row).
     * @param orderChangable Flag indicating if this column should be sortable. Default is true.
     * @param filterable Flag indicating if this column should be filterable. Default is true.
     * @returns A new data grid header item.
     */
    new (
        title: string,
        property: string,
        type: MEUIDataGridHeaderTypeEnum,
        typeData?: object | null,
        editable?: boolean,
        defaultData?: unknown,
        orderChangable?: boolean,
        filterable?: boolean
    ): MEUIDataGridHeaderItem;
    readonly prototype: MEUIDataGridHeaderItem;
}

/**
 * The data grid header class.
 */
declare const MEUIDataGridHeaderItem: MEUIDataGridHeaderItemConstructor;

/**
 * The data grid interface.
 * Note that the properties of the grid will be checked first before the header.
 * E.g. if the grid is not editable, no row will be editable. But if the grid is editable, only the editable headers will be interactive.
 */
interface MEUIDataGrid extends MEUIBase {
    /**
     * The type of the UI element. Always "DataGrid".
     */
    readonly Type: 'DataGrid';
    /**
     * The data of the data grid. Can be any flat object. The header configuration will map the properties to the columns.
     */
    Data: unknown[];
    /**
     * The header configuration of the data grid.
     */
    Header: MEUIDataGridHeaderItem[];
    /**
     * The page size of the data grid. Defaults to no pagination.
     */
    PageSize: number;
    /**
     * The current page of the data grid as a zero based index. Defaults to 0.
     */
    CurrentPage: number;
    /**
     * For headers of type image, this is the width it will be displayed with. Defaults to 100.
     */
    ImageWidth: number;
    /**
     * For headers of type image, this is the height it will be displayed with. Defaults to 100.
     */
    ImageHeight: number;
    /**
     * Flag indicating if the rows can be edited. Defaults to false.
     */
    Editable: boolean;
    /**
     * Flag indicating if new rows can be added. Defaults to false.
     */
    Addable: boolean;
    /**
     * Flag indicating if rows can be deleted. Defaults to false.
     */
    Deletable: boolean;
    /**
     * Flag indicating if rows can be duplicated. Defaults to false.
     */
    Duplicable: boolean;
    /**
     * If there are only custom options to be shown (editing and deleting is disabled), the edit column would not show. Use this flag then to enforce the column. Defaults to false.
     */
    OnlyCustomActions: boolean;
    /**
     * Flag indicating if the edit column should be in the front as well. Defaults to false.
     */
    HasFrontControls: boolean;
    /**
     * Flag indicating if rows should be selectable. Defaults to false.
     */
    Selectable: boolean;
    /**
     * Flag indicating if multiple rows can be selected. Defaults to false.
     */
    MultiSelect: boolean;
    /**
     * The selected objects.
     */
    CurrentSelection: unknown[];
    /**
     * Flag indicating of the columns should be sortable.
     */
    OrderChangable: boolean;
    /**
     * Flag indicating if the columns should be filterable.
     */
    Filterable: boolean;
    /**
     * Register a change event handler. The selected item is passed as the third parameter.
     * @param grid The data grid which selection has changed
     * @param event The event name. Always "Selection".
     * @param selection The selected data.
     */
    OnSelection: (grid: MEUIDataGrid, event: 'Selection', selection: unknown) => void;
    /**
     * Register a change event handler. The changed item is passed as the third parameter.
     * @param grid The data grid where an item has been edited
     * @param event The event name. Always "Edit".
     * @param editedItem The edited data.
     */
    OnEdit: (grid: MEUIDataGrid, event: 'Edit', editedItem: unknown) => void;
    /**
     * Register a change event handler. The added item is passed as the third parameter.
     * @param grid The data grid where an item has been added
     * @param event The event name. Always "Add".
     * @param newItem The added data.
     */
    OnAdd: (grid: MEUIDataGrid, event: 'Add', newItem: unknown) => void;
    /**
     * Register a change event handler. The deleted item is passed as the third parameter.
     * @param grid The data grid where an item has been deleted
     * @param event The event name. Always "Delete".
     * @param deletedItem The deleted data.
     */
    OnDelete: (grid: MEUIDataGrid, event: 'Delete', deletedItem: unknown) => void;
    /**
     * Register a change event handler. The duplicated item is passed as the third parameter.
     * @param grid The data grid where an item has been duplicated
     * @param event The event name. Always "Duplicate".
     * @param duplicatedItem The duplicated data.
     */
    OnDuplicate: (grid: MEUIDataGrid, event: 'Duplicate', duplicatedItem: unknown) => void;
    /**
     * Adds a custom action to all rows. The callback will be called when the action is clicked.
     * The second parameter is the custom action key, the third parameter is the item of that row.
     * @param buttonText The button label for the custom action.
     * @param callback The callback to trigger when the custom action is clicked.
     * @returns The unique key for this action. Note that this key is also part of the callback parameters. Also used to delete the custom action.
     */
    AddCustomAction(buttonText: string, callback?: (dsg: any, event: string, item: unknown) => void): string;
    /**
     * Adds custom actions only for specific rows. The callback will be called when the action is clicked.
     * The second parameter is the custom action key, the third parameter is the item of that row.
     * @param rowIds The ids of the rows to add the custom action to.
     * @param buttonText The button label for the custom action.
     * @param callback The callback to trigger when the custom action is clicked.
     * @returns The unique key for this action and the row ids. Note that this key is also part of the callback parameters. Also used to delete the custom action.
     */
    AddCustomActionForRow(rowIds: number[], buttonText: string, callback?: (dsg: any, event: string, item: unknown) => void): { key: string; rowIds: number[] };
    /**
     * Remove a custom action. When adding a custom action, the key is returned. Use this key to remove the custom action.
     * @param key The custom action key to remove.
     */
    RemoveCustomAction(key: string): void;
    /**
     * Trigger this method to refresh the grid when the headers have been updated.
     */
    HeadersUpdated(): void;    
}

/**
 * Data grid constructor interface.
 */
interface MEUIDataGridConstructor {
    /**
     * Creates a new data grid.
     * @param data The data of the data grid. Can be any flat object. The header configuration will map the properties to the columns.
     * @param header The header configuration of the data grid.
     * @param pageSize The page size of the data grid. Defaults to no pagination.
     * @returns A new data grid.
     */
    new (data: unknown[], header: MEUIDataGridHeaderItem[], pageSize?: number): MEUIDataGrid;
    readonly prototype: MEUIDataGrid;
}

/**
 * The data grid class.
 */
declare const MEUIDataGrid: MEUIDataGridConstructor;

