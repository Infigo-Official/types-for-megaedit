/**
 * Number control for integer or floating point values.
 * @module UI / Control / Number control
 */

/**
 * Number control interface
 */
interface MEUINumber extends MEUIBase {
    /**
     * The type of the UI element. Always "Number".
     */
    readonly Type: "Number";
    /**
     * The current numeric value of the control.
     */
    Value: number;
    /**
     * The maximum value of the control.
     */
    Max: number;
    /**
     * The minimum value of the control.
     */
    Min: number;
    /**
     * The step value of the control. Use _1_ for integer values.
     */
    Step: number;
    /**
     * Change event of the number control when the value is changed.
     * @param number The number control.
     */
    OnChange: (number: MEUINumber) => void;
}

/**
 * Number control constructor interface
 */
interface MEUINumberConstructor {
    /**
     * Creates a new number control
     * @param value The initial value of the number control.
     * @param min The minimum value of the number control.
     * @param max The maximum value of the number control.
     * @param step The step value of the number control. Use _1_ for integer values.
     * @param change Change event of the number control.
     * @returns A new number control.
     */
    new (value: number, min?: number, max?: number, step?: number, change?: (number: MEUINumber) => void): MEUINumber;
    readonly prototype: MEUINumber;
}

/**
 * The number control class
 */
declare const MEUINumber: MEUINumberConstructor;