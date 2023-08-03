/**
 * Tab layouts are used to have separate tabs in a single layout component.
 * Each tab has a header and a content area and are added to the tab layout always together.
 * 
 * @module UI / Layout / Tab Layout
 */

/**
 * Tab layout interface
 */
interface MEUITabLayout extends MEUILayout {
    /**
     * The type of the UI element. Always "TabLayout".
     */
    readonly Type: "TabLayout";
    /**
     * The list of available tabs
     */
    readonly Header: string[];
    /**
     * The currently selected tab by the header name.
     */
    CurrentTab: string;
    /**
     * Event is triggered when the tab changes.
     * @param self The tab layout itself.
     */
    OnTabSelected: (self: MEUITableLayout) => void;
    /**
     * Adds a new tab to the tab layout.
     * @param header The header of the new tab
     * @param item The base UI item (usually another layout item).
     */
    Add(header: string, item: MEUIBase): void;
    /**
     * Select a tab by index.
     * @param index The index of the tab to select.
     */
    Select(index: number): void;
}

/**
 * Tab layout constructor interface
 */
interface MEUITabLayoutConstructor {
    /**
     * Creates a new tab layout
     * @returns A new tab layout.
     */
    new (): MEUITabLayout;
    readonly prototype: MEUITabLayout;
}

/**
 * The tab layout class
 */
declare const MEUITabLayout: MEUITabLayoutConstructor;