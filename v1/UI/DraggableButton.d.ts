/**
 * A draggable button with a click event.
 * This does provide a click event, but can also be dragged onto the canvas or onto fields.
 * 
 * @module UI / Control / Draggable Button
 */

/**
 * Specifies the potential drop targets.
 */
declare enum DropTarget {
    /**
     * Can be dropped on a page.
     */
    Page = "Page",
    /**
     * Can be dropped on a field.
     */
    Field = "Field",
    /**
     * Can be dropped on field and page.
     */
    Both = "Both"
}

/**
 * Draggable Button interface
 */
interface MEUIDraggableButton extends MEUIBase {
    /**
     * The type of the UI element. Always "DraggableButton".
     */
    readonly Type: "DraggableButton";
    /**
     * The button label text.
     */
    ButtonText: string;
    /**
     * The potential drop target. Defaults to pages.
     */
    Target: DropTarget;
    /**
     * The click event of the draggable button.
     * @param button The button which was clicked.	
     */
    OnClick: (button: MEUIDraggableButton) => void;
    /**
     * Registers a callback when the button has been dropped. The callback will be called with the button and the position where it was dropped.
     * @param button The button which was dragged
     * @param event The event which was triggered. Always "Dragged"
     * @param position The position where the button was dropped on the canvas.
     */
    OnDragged: (button: MEUIDraggableButton, event: "Dragged", position: Point) => void;
}

/**
 * Draggable button constructor interface
 */
interface MEUIDraggableButtonConstructor {
    /**
     * Creates a new draggable button
     * @param text The button label text.
     * @param click The click event of the button.
     * @param drag The drag event of the button.
     * @returns A new draggable button.
     */
    new (text: string, click?: (button: MEUIDraggableButton) => void, drag?: (button: MEUIDraggableButton) => void): MEUIDraggableButton;
    readonly prototype: MEUIDraggableButton;
}

/**
 * The draggable button class
 */
declare const MEUIDraggableButton: MEUIDraggableButtonConstructor;