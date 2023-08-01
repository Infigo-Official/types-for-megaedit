/**
 * The base interfaces for the UI components of MegaEdit.
 * @module UI / General
 */

/**
 * The base interface for all UI elements within MegaEdit.
 */
interface MEUIBase {
    /**
     * The id of the UI element.
     */
    readonly Id: string;
    /**
     * The type of the UI element.
     */
    readonly Type: string;
    /**
     * Additional CSS classes to add to the control.
     */
    Classes: string[];
    /** 
     * Additional CSS classes to add to the parent control when supported.
    */
    ParentClasses: string[];
    /**
     * The standard classes of the control. Modify this property only if you know what you are doing.
     */
    StandardClasses: string[];
    /**
     * Name of the UI element. For form fields that would be the name otherwise used for reference only.
     */
    Name: string;
    /**
     * Tags for the UI element. Used for reference only.
     */
    Tags: string[];
    /**
     * Enabled state of the UI element. When the type supports this, the UI element will be disabled when set to false.
     */
    Enabled: boolean;
    /**
     * Visibility flag of the UI element. When not visible it will be hidden from the UI.
     */
    Visible: boolean;
    /**
     * Tooltip text of the UI element.
     */
    ToolTip?: string;
    /**
     * The text direction of the UI element. Defaults to {@link TextFieldTextDirection.Inherit}, meaning it will use the editor default.
     */
    TextDirection: TextFieldTextDirection;
}

/**
 * The base interface for all UI elements which can be sized.
 */
interface MEUISizeBase  extends MEUIBase {
    /**
     * The size of the UI element.
     */
    Size?: MEUISize;
}

/**
 * The base interface for all UI elements which can hold other UI elements.
 */
interface MEUILayout extends MEUIBase {
    /**
     * The UI elements which are children of this UI element.
     */
    readonly Items: MEUIBase[];
}

/**
 * Defines the size of a UI element.
 */
interface MEUISize {
    /**
     * The width of the UI element used for the HTML width attribute.
     */
    readonly width: number;
    /**
     * The height of the UI element used for the HTML height attribute.
     */
    readonly height: number;
}

/**
 * Creates a new size element
 */
interface MEUISizeConstructor {
    /**
     * Creates a new size element
     * @param width The width of the UI element used for the HTML width attribute.
     * @param height The height of the UI element used for the HTML height attribute.
     * @returns The new size object.
     */
    new (width: number, height: number): MEUISize;
    readonly prototype: MEUISize;
}

/**
 * The MEUISize class
 */
declare const MEUISize: MEUISizeConstructor;