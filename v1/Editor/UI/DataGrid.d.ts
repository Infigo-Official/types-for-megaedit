interface MEUIDataGridHeaderItem {
    Title: string;
    Type: MEUIDataGridHeaderTypeEnum;
    TypeData: object;
    DefaultData: unknown;
    Editable: boolean;
    Property: string;
    OrderChangable: boolean;
    Filterable: boolean;
}

interface MEUIDataGridHeaderItemConstructor {
    new (
        title: string,
        property: string,
        type: MEUIDataGridHeaderTypeEnum,
        typeData: object | null,
        editable: boolean,
        defaultData: unknown,
        orderChangable: boolean,
        filterable: boolean
    ): MEUIDataGridHeaderItem;
    readonly prototype: MEUIDataGridHeaderItem;
}

declare const MEUIDataGridHeaderItem: MEUIDataGridHeaderItemConstructor;

enum MEUIDataGridHeaderTypeEnum {
    Text = 'Text',
    DropDown = 'DropDown',
    Number = 'Number',
    CheckBox = 'CheckBox',
    TextArea = 'TextArea',
    Date = 'Date',
    Time = 'Time',
    Image = 'Image'
}

interface MEUIDataGrid extends MEUIBase {
    Type: 'DataGrid';
    CurrentPage: number;
    ImageWidth: number;
    ImageHeight: number;
    CurrentSelection: object[];
    Addable: boolean;
    OnlyCustomActions: boolean;
    Editable: boolean;
    Deletable: boolean;
    Duplicable: boolean;
    Selectable: boolean;
    MultiSelect: boolean;
    OrderChangable: boolean;
    Filterable: boolean;
    HasFrontControls: boolean;

    AddCustomAction: (buttonText: string, callback?: (dsg: any, event: string, row: object) => void) => string;
    AddCustomActionForRow: (
        rowIds: number,
        buttonText: string,
        callback?: (dsg: any, event: string, row: object) => void
    ) => { key: string; rowIds: number };
    RemoveCustomAction: (key: string) => void;
    HeadersUpdated: () => void;
    OnSelection: (grid: MEUIDataGrid, e: string, selection: object) => void;
}

interface MEUIDataGridConstructor {
    new (data: object[], header: MEUIDataGridHeaderItem[], pageSize: number): MEUIDataGrid;
    readonly prototype: MEUIDataGrid;
}

declare const MEUIDataGrid: MEUIDataGridConstructor;