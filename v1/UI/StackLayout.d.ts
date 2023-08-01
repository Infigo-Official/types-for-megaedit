/**
 * Stack layouts are used to arrange elements in a horizontal or vertical stack.
 * 
 * @module UI / Layout / Stack Layout
 */

/**
 * Stack layout interface
 */
interface MEUIStackLayout extends MEUILayout {
    /**
     * The type of the UI element. Always "StackLayout".
     */
    readonly Type: "StackLayout";
    /**
     * Flag indicating the stack layout is horizontal or vertical.
     */
    IsHorizontal: boolean;
    /**
     * Adds one or more items to the stack layout.
     * @param items Add one or more items to the stack layout.
     */
    Add(...items: MEUIBase[]): void;
    /**
     * Removes a single item from the stack layout.
     * @param item 
     */
    Remove(item: MEUIBase): void;
}

/**
 * Stack layout constructor interface
 */
interface MEUIStackLayoutConstructor {
    /**
     * Creates a new stack layout
     * @param horizontal Flag indicating the stack layout is horizontal or vertical.
     * @returns A new stack layout.
     */
    new (horizontal: boolean): MEUIStackLayout;
    readonly prototype: MEUIStackLayout;
}

/**
 * The stack layout class
 */
declare const MEUIStackLayout: MEUIStackLayoutConstructor;