/**
 * A HTML node will add an empty div to the UI, assign a unique random class name to it and call the callback function when the div is added to the DOM.
 * The calling code can then use this to add any HTML code to the div.
 * Useful for Video embedded, 3D models and other libraries which require a div to be present in the DOM.
 * 
 * @example
 * const canvas = parent.document.createElement('canvas');

    const node = new MEUIHtmlNode((_, __, payload) => {
        const { className } = payload as {
            className: string;
        };

        const classSelector = `.${className}`;
        const element = parent.document.querySelector(classSelector);
        element.style.overflow = "hidden";
        element.append(canvas);
    });
 * @module UI / Special / Html Node
 */

/**
 * The payload of the callback function.
 */
type HtmlNodeInfo = {
    /**
     * The random and unique class name assigned to the HTML node.
     */
    className: string;
}

/**
 * Html Node interface
 */
interface MEUIHtmlNode extends MEUIBase {
    /**
     * The type of the UI element. Always "HtmlNode".
     */
    readonly Type: "HtmlNode";    
    /**
     * Optional onclick handler for the label.
     * @param event The callback function to call when the HTML node is added to the DOM.
     */
    Callback(event: (self: MEUIHtmlNode, event: 'Callback', payload: HtmlNodeInfo) => void): void;
}

/**
 * Html Node constructor interface
 */
interface MEUIHtmlNodeConstructor {
    /**
     * Creates a new HTML node
     * @param callback The callback function to call when the HTML node is added to the DOM.
     */
    new (callback: (self: MEUIHtmlNode, event: 'Callback', payload: HtmlNodeInfo) => void): MEUIHtmlNode;
    readonly prototype: MEUIHtmlNode;
}

/**
 * The HTML node class
 */
declare const MEUIHtmlNode: MEUIHtmlNodeConstructor;