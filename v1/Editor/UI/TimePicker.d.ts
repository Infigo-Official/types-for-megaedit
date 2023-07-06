interface MEUITimePickerConstructor {
    new (value?: Date, format?: string, change?: (data: MEUITimePicker) => void): MEUITimePicker;
    readonly prototype: MEUITimePicker;
}

declare const MEUITimePicker: MEUITimePickerConstructor;