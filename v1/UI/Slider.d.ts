/**
 * A slider control to allow the user to select a numerical value from a specific range.
 * @module UI / Control / Slider control
 */

/**
 * Slider interface
 */
interface MEUISlider extends MEUIBase {
    /**
     * The type of the UI element. Always "Slider".
     */
    readonly Type: "Slider";
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
     * Flag indicating if the numerical value should be shown next to the slider. Defaults to true.
     */
    ShowValue: boolean;
    /**
     * Change event of the number control.
     * @param event Event gets fired when the value of the number control changes.
     */
    OnChange(event: (number: MEUISlider) => void): void;
}

/**
 * Slider control constructor interface
 */
interface MEUISliderConstructor {
    /**
     * Creates a new slider control
     * @param value The initial value of the slider.
     * @param min The minimum value of the slider.
     * @param max The maximum value of the slider.
     * @param step The step value of the slider. Use _1_ for integer values.
     * @param change Change event of the slider.
     * @returns A new slider control.
     */
    new (value: number, min: number, max: number, step: number, change?: (number: MEUISlider) => void): MEUISlider;
    readonly prototype: MEUISlider;
}

/**
 * The slider control class
 */
declare const MEUISlider: MEUISliderConstructor;