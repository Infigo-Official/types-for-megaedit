/**
 * A date picker component with constraints about the date range and the days of the week.
 * @module UI / Control / Date Picker
 */

/**
 * Specifies a specific day of the week.
 */
declare enum WeekDay { 
    /**
     * Monday
     */
    Monday = 'monday',
    /**
     * Tuesday
     */
    Tuesday = 'tuesday',
    /**
     * Wednesday
     */
    Wednesday = 'wednesday',
    /**
     * Thursday
     */
    Thursday = 'thursday',
    /**
     * Friday
     */
    Friday = 'friday',
    /**
     * Saturday
     */
    Saturday = 'saturday',
    /**
     * Sunday
     */
    Sunday = 'sunday' 
}

/**
 * Specifies the configuration to indicate which day in the week is enabled.
 * 
 * @example
 * {
  WeekDay.Monday: true,
  WeekDay.Tuesday: false,
  WeekDay.Wednesday: true,
  WeekDay.Friday: true
 }
 */
type WeekDayConfiguration = { [day in WeekDay]?: boolean };

/**
 * Date time picker interface.
 */
interface MEUIDateTimePicker extends MEUIBase {
    /**
     * The type of the UI element. Always "DateTimePicker".
     */
    readonly Type: "DateTimePicker";
    /**
     * The current value of the date time picker as a Date object.
     */
    Value: Date;
    /**
     * The format option for the date. Defaults to 'dd MMMM yyyy' if not specified.
     * Supported format:
     * - yyyy: 4 digit year
     * - yy: 2 digit year
     * - MMMM: full month name
     * - MMM: short month name
     * - MM: 2 digit month
     * - M: 1 or 2 digit month
     * - dd: 2 digit day
     * - d: 1 or 2 digit day
     * - EEEE: full day name
     * - EEE: short day name
     * - Z: timezone offset
     * - ww: 2 digit week number
     * - w: 1 or 2 digit week number
     * - G: era
     * - GGGG: full era
     * 
     * In addition it supports template literals between single quotes.
     */
    Format: string;
    /**
     * Flag indicating if the input control is readonly (aka cannot be typed directly).
     */
    ReadOnly: boolean;    
    /**
     * If set, the date time picker will not allow dates before this date.
     */
    MinDate?: Date;
    /**
     * If set, the date time picker will not allow dates after this date.
     */
    MaxDate?: Date;
    /**
     * Restrict the date time picker to specific days of the week.
     */
    EnabledWeekDays: WeekDayConfiguration;
    /**
     * Register a change event handler.
     * @param event Change event when the date time picker value is changed.
     */
    OnChange(event: (data: MEUIDateTimePicker) => void): void;
}

/**
 * Date time picker constructor interface.
 */
interface MEUIDateTimePickerConstructor {
    /**
     * Creates a new date time picker.
     * @param value The initial value of the date time picker.
     * @param format The format option for the date. Defaults to 'dd MMMM yyyy' if not specified.
     * @param change Change event when the date time picker value is changed.
     * @returns A new date time picker.
     */
    new (value?: Date, format?: string, change?: (data: MEUIDateTimePicker) => void): MEUIDateTimePicker;
    readonly prototype: MEUIDateTimePicker;
}

/**
 * The date time picker class.
 */
declare const MEUIDateTimePicker: MEUIDateTimePickerConstructor;