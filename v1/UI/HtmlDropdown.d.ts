/**
 * A html drop down variant for UI components. 
 * This is not a form element, but a drop out container.
 * The option items are other MegaEdit UI elements.
 * 
 * @module UI / Layout / Html Drop Down component
 */


interface MEUIHTMLDropdown extends MEUILayout {
    /**
     * The type of the UI element. Always "HTMLDropdown".
     */
    readonly Type: 'HTMLDropdown';
    /**
     * The trigger text of the dropdown. Can be full HTML.
     */
    Text: string;
    /**
     * Flag indicating the dropdown is active aka expanded.
     */
    IsActive: boolean;
    /**
     * Adds items to the dropdown.
     * @param items Add one or more items to the dropdown.
     */
    Add(...items: MEUIBase[]): void;
    /**
     * Removes a single item from the dropdown.
     * @param item 
     */
    Remove(item: MEUIBase): void;
}

/**
 * HTML dropdown constructor interface
 */
interface MEUIHTMLDropdownConstructor {
    /**
     * Creates a new html dropdown
     * @param text The trigger text of the dropdown. Can be full HTML.
     * @returns A new html dropdown.
     */
    new (text: string): MEUIHTMLDropdown;
    readonly prototype: MEUIHTMLDropdown;
}

/**
 * The html dropdown class
 */
declare const MEUIHTMLDropdown: MEUIHTMLDropdownConstructor;