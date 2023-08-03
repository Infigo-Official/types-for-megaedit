/**
 * A checkbox component for a single option.
 * @module UI / Control / Checkbox
 */

/**
 * Switch interface
 */
interface MEUISwitch extends MEUIBase {
    /**
     * The type of the UI element. Always "Switch".
     */
    readonly Type: "Switch";
    /**
     * The label of the switch. Can use full HTML.
     */
    Label: string;
    /**
     * The current value of the switch.
     */
    Value: boolean;
    /**
     * Change event when the switch is toggled.
     * @param checkbox The switch component which changed.
     */
    OnChange: (checkbox: MEUISwitch) => void;    
}

/**
 * Switch constructor interface
 */
interface MEUISwitchConstructor {
    /**
     * Creates a new switch
     * @param label The label of the switch. Can use full HTML.
     * @param value The initial value of the switch.
     * @param change Change event when the switch is toggled.
     * @returns A new switch.
     */
    new (label: string, value: boolean, change?: (checkbox: MEUISwitch) => void): MEUISwitch;
    readonly prototype: MEUISwitch;
}

/**
 * The switch class.
 */
declare const MEUISwitch: MEUISwitchConstructor;