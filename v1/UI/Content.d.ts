/**
 * Simple Container element for other UI elements. The elements are layed out simply in div.
 * Based on the construction parameters, the Bulma Content class is added.
 * https://bulma.io/documentation/elements/content/
 * 
 * @module UI / Bulma / Content
 */

/**
 * Content interface
 */
interface MEUIContent extends MEUILayout {
    /**
     * The type of the UI element. Always "Content".
     */
    readonly Type: "Content";    
    /**
     * Adds one or more items to the content.
     * @param items Add one or more items to the content.
     */
    Add(...items: MEUIBase[]): void;
    /**
     * Removes a single item from the content.
     * @param item 
     */
    Remove(item: MEUIBase): void;
}

/**
 * Content constructor interface
 */
interface MEUIContentConstructor {
    /**
     * Creates a new content
     * @param isBlock If true, the parent element is set as a Bulma Block: https://bulma.io/documentation/elements/block/
     * @param isNotContent If false, the element is set as a Bulma Content: https://bulma.io/documentation/elements/content/
     * @param isNotSmall If false and this is a content, the element will have a smaller font size set.
     * @returns A new content.
     */
    new (isBlock: boolean, isNotContent: boolean, isNotSmall: boolean): MEUIContent;
    readonly prototype: MEUIContent;
}

/**
 * The content class.
 */
declare const MEUIContent: MEUIContentConstructor;