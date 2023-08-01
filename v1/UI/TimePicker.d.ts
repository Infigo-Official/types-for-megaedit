/**
 * A time picker control.
 * @module UI / Control / Time Picker
 */

/**
 * Time picker interface
 */
interface MEUITimePicker extends MEUIBase {
    /**
     * The type of the UI element. Always "TimePicker".
     */
    readonly Type: "TimePicker";
    /**
     * The current value of the time picker. Only the time part is used.
     */
    Value: Date;
    /**
     * The hour step of the time picker. Defaults to 1.
     */
    HourStep: number;
    /**
     * The minute step of the time picker. Defaults to 1.
     */
    MinuteStep: number;
    /**
     * Flag indicating if the time picker should show the meridian (AM/PM) or not.
     */
    ShowMeridian: boolean;
    /**
     * Readonly flag indicating if the input controls are readonly (aka cannot be typed in directly).
     */
    ReadOnly: boolean;
    /**
     * Flag indicating if the mouse wheel should be used to change the value.
     */
    MouseWheel: boolean;
    /**
     * Register a change event handler.
     * @param event Change event when the time picker value is changed.
     */
    OnChange(event: (data: MEUITimePicker) => void): void;
}

/**
 * Time picker constructor interface
 */
interface MEUITimePickerConstructor {
    /**
     * Creates a new time picker
     * @param value The initial value of the time picker. Only the time part is used.
     * @param change The event which is fired when the value of the time picker changes.
     * @returns A new time picker.
     */
    new (value?: Date, change?: (data: MEUITimePicker) => void): MEUITimePicker;
    readonly prototype: MEUITimePicker;
}

/**
 * The time picker class
 */
declare const MEUITimePicker: MEUITimePickerConstructor;