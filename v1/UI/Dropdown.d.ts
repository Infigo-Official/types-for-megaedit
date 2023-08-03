/**
 * A simple drop down control for a single selection.
 * @module UI / Control / Drop Down component
 */

/**
 * A drop down option item.
 */
type MEUIDropDownOption = {
    /**
     * The value of the option.
     */
    Value: string;
    /**
     * The label to show for the option.
     */
    Label: string;
}

/**
 * Drop down interface.
 */
interface MEUIDropDown extends MEUIBase {
    /**
     * The type of the UI element. Always "DropDown".
     */
    readonly Type: 'DropDown';
    /**
     * The options of the drop down. You would set either a {@link MEUIDropDownOption} or a string.
     * In the case of the string, the value and label will be the same.
     */
    Options: (MEUIDropDownOption | string)[];
    /**
     * Registers a change event handler when the drop down value is changed.
     * @param dropDown The drop down which changed.
     */
    OnChange: (dropDown: MEUIDropDown) => void;
    /**
     * The currently selected value. Must match the value of one of the options.
     */
    Value: string;
    
}

/**
 * Drop down constructor interface
 */
interface MEUIDropDownConstructor {
    /**
     * Creates a new drop down
     * @param options The options of the drop down. You would set either a {@link MEUIDropDownOption} or a string.
     * @param current The currently selected value. Must match the value of one of the options.
     * @param change Change event when the dropdown value is changed.
     * @returns A new drop down.
     */
    new (options: (MEUIDropDownOption | string)[], current: string, change?: (dropDown: MEUIDropDown) => void): MEUIDropDown;
    readonly prototype: MEUIDropDown;
}

/**
 * The drop down class
 */
declare const MEUIDropDown: MEUIDropDownConstructor;