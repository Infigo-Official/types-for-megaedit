/**
 * A media item control allowing to display a media item in custom UI.
 * This can also be optionally dragged onto the canvas and supports a click event.
 * 
 * When dragged, the item will behave as the elements from the gallery. So can be droppoed onto existing image fields or as a new field on the canvas.
 * 
 * @module UI / Special / Media Item
 */

/**
 * Media item interface
 */
interface MEUIMediaItem extends MEUISizeBase {
    /**
     * The type of the UI element. Always "DraggableImage".
     */
    readonly Type: "DraggableImage";
    /**
     * The URL to display the image as. Will be initialized with the thumbnail image of the media item upon creation.
     */
    Url: string;
    /**
     * The album identifier of the media item. Will be initialized upon creation with the media item's album identifier.
     */
    AlbumId: string;
    /**
     * The media item identifier of the media item. Will be initialized upon creation with the media item's identifier.
     */
    MediaItemId: string;
    /**
     * Flag indicating whether the media item can be dragged onto the canvas or not.
     * The item will behave as the elements from the gallery. So can be droppoed onto existing image fields or as a new field on the canvas.
     */
    IsDraggable: boolean;
    /**
     * The click event of the draggable button.
     * @param callback The callback function to call when the button is clicked.
     */
    OnClick(callback: (button: MEUIMediaItem) => void): void;
    /**
     * Register a callback for the drag start event.
     * @param callback The callback function to call when the media item is dragged.
     */
    OnDragStart(callback: (button: MEUIMediaItem, event: "DragStart") => void): void;
    /**
     * Register a callback for the drag stop event.
     * @param callback The callback function to call when the media item is not dragged anymore.
     */
    OnDragStop(callback: (button: MEUIMediaItem, event: "DragStop") => void): void;    
}

/**
 * Draggable button constructor interface
 */
interface MEUIMediaItemConstructor {
    /**
     * Creates a new media item
     * @param media The media item to display.
     * @param width The width of the media item - if not specified, the value will be 'auto'
     * @param height The height of the media item - if not specified, the value will be 'auto'
     * @returns A new media item.
     */
    new (media: MediaItem, width?: number, height?: number): MEUIMediaItem;
    readonly prototype: MEUIMediaItem;
}

/**
 * The media item class.
 */
declare const MEUIMediaItem: MEUIMediaItemConstructor;