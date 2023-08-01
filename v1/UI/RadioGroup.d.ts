/**
 * A radio button group to have multiple mutually exclusive options.
 * @module UI / Control / Radio Button Group
 */

/**
 * A radio button item.
 */
type MEUIRadioButtonItem = {
    /**
     * Textual value and label for this radio entry.
     */
    text: string;
    /**
     * Tooltip for this radio entry.
     */
    tooltip: string;
}

/**
 * Radio button group interface.
 */
interface MEUIRadioGroup extends MEUIBase {
    /**
     * The type of the UI element. Always "RadioGroup".
     */
    readonly Type: 'RadioGroup';
    /**
     * The radio button elements. You would set either a {@link MEUIRadioButtonItem} which supports tooltips or a string.     
     */
    Options: (MEUIRadioButtonItem | string)[];
    /**
     * Registers a change event handler.
     * @param event Change event when the radio button value is changed.
     */
    OnChange(event: (dropDown: MEUIRadioGroup) => void): void;
    /**
     * The currently selected value. Must match the value of one of the options.
     */
    Value: string;
    /**
     * The name of the radio group. If not set, the group will get a random name.
     */
    Group: string;
    
}

/**
 * Radio button group constructor interface
 */
interface MEUIRadioGroupConstructor {
    /**
     * Creates a new radio button group
     * @param options The radio button elements. You would set either a {@link MEUIRadioButtonItem} which supports tooltips or a string.
     * @param current The currently selected value. Must match the value of one of the options.
     * @param change Change event when the radio button value is changed.
     * @param groupName The name of the radio group. If not set, the group will get a random name.
     * @returns A new radio button group.
     */
    new (options: any[], current: string, change?: (dropDown: MEUIRadioGroup) => void, groupName?: string): MEUIRadioGroup;
    readonly prototype: MEUIRadioGroup;
}

/**
 * The radio button group class
 */
declare const MEUIDroMEUIRadioGrouppDown: MEUIRadioGroupConstructor;