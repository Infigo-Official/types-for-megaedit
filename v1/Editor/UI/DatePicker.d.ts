type weekDays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface MEUIDateTimePicker extends MEUIBase {
    Value: Date;
    Format: string;
    ReadOnly: boolean;
    OnChange: (data: MEUIDateTimePicker) => void;

    MinDate?: Date;
    MaxDate?: Date;
    EnabledWeekDays: { [K in weekDays]?: boolean };
}

interface MEUITimePicker extends MEUIBase {
    Value: Date;
    ShowMeridian: boolean;
    MouseWheel: boolean;
    ShowMinutes: boolean;
    OnChange: (data: MEUITimePicker) => void;

    Min?: Date;
    Max?: Date;
}

interface MEUIDateTimePickerConstructor {
    new (value?: Date, format?: string, change?: (data: MEUIDateTimePicker) => void): MEUIDateTimePicker;
    readonly prototype: MEUIDateTimePicker;
}

declare const MEUIDateTimePicker: MEUIDateTimePickerConstructor;