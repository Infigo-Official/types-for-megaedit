interface Selection {
    SelectField<T>(fieldOrId: number | Field, callback?: (field: T) => void): void;
    AddAtCurrentCursorSelection(text: string): void;
    GetSelectedField<T>(callback: (field: T) => void): void;
    ClearSelection(callback?: Function): void;
    ShowPopupDialog(visible: boolean, callback: Function): void;
}