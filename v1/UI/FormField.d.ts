/**
 * Form field control with a label and content. See Bulma documentation for more information: https://bulma.io/documentation/form/general/
 * 
 * @module UI / Bulma / Form Field
 */

/**
 * Form field interface
 */
interface MEUIFormField extends MEUILayout {
    /**
     * The type of the UI element. Always "FormField".
     */
    readonly Type: "FormField";  
    /**
     * Flag to indicate if controls should be added together. See https://bulma.io/documentation/form/general/#form-addons
     */  
    HasAddons: boolean;
    /**
     * Allows the controls to fill up multiple lines: https://bulma.io/documentation/form/general/#form-group
     */
    IsMultiline: boolean;
    /**
     * Flag to indicate if the label and content should be aligned: https://bulma.io/documentation/form/general/#form-group
     */
    IsAligned: boolean;
    /**
     * The label text. Can be full HTML.
     */
    Text: string;
    /**
     * Add one or more items as controls.
     * @param items Add one or more items as controls.
     */
    Add(...items: MEUIBase[]): void;
    /**
     * Removes a single item from the form field.
     * @param item 
     */
    Remove(item: MEUIBase): void;
}

/**
 * Form field constructor interface
 */
interface MEUIFormFieldConstructor {
    /**
     * Creates a new form field
     * @param text The label text. Can be full HTML.
     * @param hasAddons Flag to indicate if controls should be added together. See https://bulma.io/documentation/form/general/#form-addons
     * @param isMultiline Allows the controls to fill up multiple lines: https://bulma.io/documentation/form/general/#form-group
     * @param IsAligned Flag to indicate if the label and content should be aligned: https://bulma.io/documentation/form/general/#form-group
     * @returns A new form field.
     */
    new (text: string, hasAddons: boolean, isMultiline: boolean, IsAligned: boolean): MEUIFormField;
    readonly prototype: MEUIFormField;
}

/**
 * The form field class.	
 */
declare const MEUIFormField: MEUIFormFieldConstructor;