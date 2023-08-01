/**
 * The events module give acces to work with the event system of the editor including:
 * - Register custom actions to replace standard functionality (currently only supported for auto fill)
 * - Registering custom fields: required to add custom field functionality to the editor
 * - Register to standard events in the editor: this allows to react on actions within the editor
 * - Listen and Broadcast to custom events: this allows scripts to communicate with each other
 * @module Editor / Events
 */

/**
 * Custom actions are used to add custom functionality to the editor for standard behaviour. This allows a script to adjust the functionality.
 */
declare enum CustomActionType {
    /**
     * When auto fill is used, this allows a scripted approac to perform the auto fill within the editor.
     * If multiple options are registered, the user can choose which one to use.
     */
    AutoFill = "autofill"
}

/**
 * Event data for the {@link EditorEventType.BeforeLayoutChanged} event.
 * Holds the page id and optional sub index as well as the layout id which should be applied.
 */
type BeforeLayoutChangedEventData = {
    /**
     * The target page where the layout should be applied to.
     */
    pageId: number;
    /**
     * The layout which should be applied.
     */
    layoutId: string;
    /**
     * The optional sub page index for spread setups where the layout should be applied to.
     */
    pageSubIndex: number;
}

/**
 * Event data for the {@link EditorEventType.AfterLayoutChanged} event.
 * This just returns the current page index of the editor.
 */
type AfterLayoutChangedEventData = number;

/**
 * Event data for the {@link EditorEventType.UploadStarted} and {@link EditorEventType.UploadFinished} event.
 * This holds the internal identifier of the upload image as well as the size of the upload queue at the time of the event.
 */
type UploadEventData = {
    /**
     * The internal identifier of the upload image.
     */
    internalId: string;
    /**
     * The size of the upload queue at the time of the event.
     */
    queueSize: number;
}

/**
 * Event data for the {@link EditorEventType.FieldTextFlowFinished} event.
 * This holds information about the specific text flow.
 */
type TextFlowEvent = {
    /**
     * The field id of the first {@link TextField} in the text flow.
     */
    firstField: string;
    /**
     * The field id of the {@link TextField} which triggered the flow operation.
     */
    triggerField: string;
}

/**
 * The Event data for various global options change events (before and after).
 * This is the id of the relevant global option item:
 * - {@link StockItem}
 * - {@link OutputType}
 */
type GlobalOptionsChangeEventData = string;

/**
 * The Event data for the {@link EditorEventType.BeforeEditorCanvasChanged} and {@link EditorEventType.AfterEditorCanvasChanged} events.
 * Holds information about the canvas which is about to be changed.
 */
type CanvasChangeEventData = {
    /**
     * The canvas id of the new canvas.
     */
    canvasId: string;
    /**
     * The size id of the new canvas.
     */
    sizeId: string;
    /**
     * Additional information about the selected sizes for dynamic canvas sizes.
     */
    selection: {
        /**
         * If applicable, the selected width of the dynamic canvas.
         */
        dynamicWidth: number;
        /**
         * If applicable, the selected height of the dynamic canvas.
         */
        dynamicHeight: number;
    };
    /**
     * Flag indicating if the field sizes should be maintained when changing the canvas.
     */
    maintainFieldSize: boolean;
    /**
     * The page id of the page which should be changed.
     */
    pageId: null | string;
}

/**
 * The Event data for the {@link EditorEventType.AddToBasket} event.
 * Holds information about the add to basket action.
 */
type AddToBasketEventData = {
        /**
         * Flag indicating if the item should be cloned before adding to the cart.
         */
        addClone: boolean;
        /**
         * Callback to trigger once the add to cart action has been completed.
         */
        callback: () => void;
}

/**
 * The event data for the {@link EditorEventType.BeforePageChanged} event.
 */
type PageChangeEventData = {
    /**
     * The current page id.
     */
    currentId: string;
    /**
     * The page id of the new page we change to.
     */
    nextId: string;
}

/**
 * The event data for the {@link EditorEventType.PageChanged} event - which is the index of the current (new) page.
 */
type PageChangedEventData = number;

/**
 * This event data is used by a range of events in {@link EditorEventType} and is the id of a page.
 */
type PageEventData = string;

/**
 * This event data is used by the {@link EditorEventType.BeforePageMoved} event.
 */
type PageMoveEventData = {
    /**
     * The page id of the page which should be moved.
     */
    pageId: string, 
    /**
     * The number of pages to move. Negative numbers move left, positive numbers move right.
     * Note: that the algorithm will ensure the page ends up in a valid position, even if the advance value would go out of bounds.
     */
    advance: number
}

/**
 * This event data is sued by the {@link EditorEventType.PageSetFill} event and represents the background fill data used in the event.
 */
type PageSetFillEventData = BackgroundItem | null;

/**
 * The event data for the {@link FieldEventType.BeforeFieldAdd} event used before adding fields via the UI.
 */
type FieldAddEventData = {
    /**
     * The field type to be added.
     */
    type: FieldAddType,
    /**
     * The data to hold for the field. This depends on the field type.
     */
    data: string | MediaItem | null,
    /**
     * The position to add the field on the current page.
     */
    pos: Point
}

/**
 * Event data for the {@link FieldEventType.BeforeFieldZIndexPage} and {@link FieldEventType.FieldZIndexPage} events.
 */
type FieldRearrangeEventData = {
    /**
     * The id of the page to rearrange.
     */
    page: string;
    /**
     * The field id's in the new order.
     */
    fieldIds: string[];
}

/**
 * Event data for the {@link FieldEventType.BeforeFieldZIndex} and {@link FieldEventType.FieldZIndex} events.
 */
type SingleFieldRearrangeEventData = {
    /**
     * The rearrange mode to use.
     */
    mode: ReArrangeMode;
}

/**
 * The event data for the {@link FieldEventType.TextFieldTextEditKeyPressed} event.
 */
type TextFieldTextChangeEventData = string;

/**
 * A union type of all possible event data types for the {@link EditorEventType} and {@link FieldEventType} events.
 */
type EventDataVariants = BeforeLayoutChangedEventData | AfterLayoutChangedEventData | UploadEventData | TextFlowEvent | 
                         GlobalOptionsChangeEventData | CanvasChangeEventData | AddToBasketEventData | PageChangeEventData | 
                         PageChangedEventData | PageEventData | PageMoveEventData | PageSetFillEventData | FieldAddEventData |
                         SingleFieldRearrangeEventData | FieldRearrangeEventData | TextFieldTextChangeEventData | unknown | null ;

/**
 * Event types related to the editor. Used for registering to events. See {@link Events.Register} for more information.
 */                         
declare enum EditorEventType {    
    /**
     * Called when the upload has been started already
     * - event data {@link UploadEventData}
     * - cannot be cancelled
     */
    UploadStarted = "Upload.Started",
    /**
     * Called when the upload has been finished.
     * - event data {@link UploadEventData}
     * - cannot be cancelled
     */
    UploadFinished = "Upload.Finished",
    /**
     * Called when the upload has been finalized and upload is not performed anymore.
     * - event data: _null_
     * - cannot be cancelled
     */
    UploadFinalized = "Upload.Finalized",
    /**
     * Called when the current upload failed.
     * - event data: _null_
     * - cannot be cancelled
     */
    UploadFailed = "Upload.Failed",
    /**
     * Called when the current upload stops.
     * - event data: _null_
     * - cannot be cancelled
     */
    UploadProcessStop = "Upload.Process.Stop",
    /**
     * Called when the text flow operation finished.
     * - event data: {@link TextFlowEvent}
     * - cannot be cancelled
     */
    FieldTextFlowFinished = "Field.TextFlowFinished",
    /**
     * Called before the output type is changed.
     * - event data: {@link GlobalOptionsChangeEventData}
     * - can be cancelled
     */
    BeforeEditorOutputTypeChanged = "Before.Editor.OutputTypeChanged",
    /**
     * Called after the output type has been changed.
     * - event data: {@link GlobalOptionsChangeEventData}
     * - cannot be cancelled
     */
    AfterEditorOutputTypeChanged = "Editor.OutputTypeChanged",
    /**
     * Called before the stock is changed.
     * - event data: {@link GlobalOptionsChangeEventData}
     * - can be cancelled
     */
    BeforeEditorStockChanged = "Before.Editor.StockChanged",
    /**
     * Called after the stock has been changed.
     * - event data: {@link GlobalOptionsChangeEventData}
     * - cannot be cancelled
     */
    AfterEditorStockChanged = "Editor.StockChanged",
    /**
     * Called before the canvas is changed.
     * - event data: {@link CanvasChangeEventData}
     * - can be cancelled
     */
    BeforeEditorCanvasChanged = "Before.Editor.CanvasChanged",
    /**
     * Called after the canvas has been changed.
     * - event data: {@link CanvasChangeEventData}
     * - cannot be cancelled
     */
    AfterEditorCanvasChanged = "Editor.CanvasChanged",
    /**
     * Called before the view is switched between normal and fullscreen mode.
     * - event data: _null_
     * - can be cancelled
     */
    BeforeToggleFullScreen = "Before.ToggleFullScreen",
    /**
     * Called after the view is switched between normal and fullscreen mode.
     * - event data: _null_
     * - cannot be cancelled
     */
    AfterToggleFullScreen = "ToggleFullScreen",
    /**
     * Called before the view switched to the preview.
     * - event data: _null_
     * - can be cancelled
     */
    BeforeOpenPreview = "Before.OpenPreview",
    /**
     * Called after the view switched to the preview.
     * - event data: _null_
     * - cannot be cancelled
     */
    AfterOpenPreview = "OpenPreview",
    /**
     * Called before the view switched back from the preview.
     * - event data: _null_
     * - can be cancelled
     */
    BeforeClosePreview = "Before.ClosePreview",
    /**
     * Called after the view switched back from the preview.
     * - event data: _null_
     * - cannot be cancelled
     */
    AfterClosePreview = "ClosePreview",
    /**
     * Used in an iFrame context only. Can be used to receive data from the hosting application.
     * Generally used to share and exchange data, like options selected for the product or information about the user.
     * - event data: _unknown_ (as it can be anything coming from the outside)
     * - cannot be cancelled
     */
    EditorExternalDataUpdate = "Editor.ExternalDataUpdate",
    /**
     * Called when the editor is fully loaded and ready to be used.
     * - event data: _null_
     * - cannot be cancelled
     */
    EditorLoaded = "Editor.Loaded",
    /**
     * Called before attempting to save the project.
     * - event data: _null_
     * - can be cancelled
     */
    BeforeSaveAsProject = "SaveAsProjectPreSave",
    /**
     * Called instead of the save as project action. This is only used if saving as project is disabled, but the attempt has been made - see {@link EditorStatusItems.SaveAsProject}.
     * If saving as project would not be disabled, the editor will save and exit, so the script would not receive that event.
     * - event data: _null_
     * - cannot be cancelled
     */
    SaveAsProject = "SaveAsProject",
    /**
     * Called before attempting to add the item to the cart.
     * - event data: _null_
     * - can be cancelled
     */
    BeforeAddToBasket = "AddToBasketPreSave",
    /**
     * Called instead of the add to basket action. This is only used if adding to basket is disabled, but the attempt has been made - see {@link EditorStatusItems.AddToBasket}.
     * - event data: {@link AddToBasketEventData}
     * - cannot be cancelled    
     */
    AddToBasket = "AddToBasket",
    /**
     * Called when the batch mapping has been saved server side.
     * - event data: _null_
     * - cannot be cancelled
     */
    MappingSaved = "MappingSaved",
    /**
     * Called when the batch data has been saved server side.
     * - event data: _null_
     * - cannot be cancelled
     */
    BatchDataSaved = "BatchDataSaved",
    /**
     * Called before a page change is performed.
     * - event data: {@link PageChangeEventData}
     * - can be cancelled
     */
    BeforePageChanged = "Before.PageChanged",
    /**
     * Called after the page has changed
     * - event data: {@link PageChangedEventData}
     * - cannot be cancelled
     */
    PageChanged = "PageChanged",
    /**
     * Called before a page is added.
     * - event data: {@link PageEventData} - this is the id after which the new page is to be added
     * - can be cancelled
     */
    BeforePageAdded = "Before.PageAdded", 
    /**
     * Called after a page has been added.
     * - event data: {@link PageEventData} - this is the id of the newly added page
     * - cannot be cancelled
     */
    PageAdded = "PageAdded", 
    /**
     * Called before a page is moved.
     * - event data: {@link PageMoveEventData}
     * - can be cancelled
     */
    BeforePageMoved = "Before.PageMoved",
    /**
     * Called after a page has been moved.
     * - event data: {@link PageEventData}
     * - cannot be cancelled
     */
    PageMoved = "PageMoved",
    /**
     * Called before a page will be deleted.
     * - event data: {@link PageEventData}
     * - can be cancelled
     */
    BeforePageDeleted = "Before.PageDeleted",
    /**
     * Called after a page has been deleted.
     * - event data: {@link PageEventData}
     * - cannot be cancelled
     */
    PageDeleted = "PageDeleted", 
    /**
     * Called when the background of a page is set
     * - event data: {@link PageSetFillEventData}
     * - cannot be cancelled
     */
    PageSetFill = "Page.SetFill", //background data
    /**
     * Called before the layout is changed.
     * - event data {@link BeforeLayoutChangedEventData}
     * - can be cancelled
     */
    BeforeLayoutChanged = "Before.LayoutChanged",
    /**
     * Called after the layout has been changed.
     * - event data {@link AfterLayoutChangedEventData}
     * - cannot be cancelled
     */
    AfterLayoutChanged = "LayoutChanged",   
    /**
     * Called before performing an embedded save. Embedded saves are used for iFrame implementations.
     * - event data: _null_
     * - can be cancelled
     */ 
    BeforeSaveEmbedded = "SaveEmbeddedPreSave"    
}

/**
 * Field type enumeration used when adding fields to the editor via the UI.
 */
declare enum FieldAddType {
    /**
     * Adding an image field for user media.
     */
    ImageField = 'imageField',
    /**
     * Adding a text field.
     */
    TextField = 'textField',
    /**
     * Adding a clipart field for static images.
     */
    ClipartField = 'clipartField'
}

/**
 * Event types related to fields. Used for registering to events. See {@link Events.Register} for more information.
 * Those events will hold optionally also a field in the callback for reference.
 */ 
declare enum FieldEventType {
    /**
     * Called before the field is inserted to the editor. 
     * Used only when pasting fields.
     * - event data: _null_
     * - can be cancelled
     * - field object holds the field which should be inserted. Note that the field does not exist and is just the copy of the field which will be inserted.
     */
    BeforeFieldInsert = "Before.Field.Insert", //field object -> only for paste events
    /**
     * Called before a field is being added to the editor via the UI.
     * - event data: {@link FieldAddEventData}
     * - can be cancelled
     * - no field object
     */
    BeforeFieldAdd = "Before.Field.Add",
    /**
     * Called when a field has been added to the document.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the newly added field.
     */
    AfterFieldAdd = "Field.Add",
    /**
     * Called when the image has been changed on an {@link ImageField}.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the field which has been changed.
     */
    FieldImageChanged = "Field.ImageChanged",
    /**
     * Called when a field has been repositioned and/or resized.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the field which has been changed.
     */
    FieldMoveAndSize = "Field.MoveAndSize",
    /**
     * Called before a field is being deleted from the editor.
     * - event data: _null_
     * - can be cancelled
     * - field object holds the field which should be deleted.
     */
    BeforeFieldDelete = "Before.Field.Delete",
    /**
     * Called after a field has been deleted from the editor.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the field which has been deleted.
     */
    AfterFieldDelete = "Field.Delete",
    /**
     * Called before fields are rearranged on a page
     * - event data: {@link FieldRearrangeEventData}
     * - can be cancelled
     * - no field objects
     */
    BeforeFieldZIndexPage = "Before.Field.ZIndex.Page",
    /**
     * Called after fields are rearranged on a page
     * - event data: {@link FieldRearrangeEventData}
     * - cannot be cancelled
     * - no field objects
     */
    FieldZIndexPage = "Field.ZIndex.Page",
    /**
     * Called before a field is rearranged (z-index changed).
     * - event data: {@link SingleFieldRearrangeEventData}
     * - can be cancelled
     * - field object holds the field which should be rearranged.
     */
    BeforeFieldZIndex = "Before.Field.ZIndex", 
    /**
     * Called after a field is rearranged (z-index changed).
     * - event data: {@link SingleFieldRearrangeEventData}
     * - cannot be cancelled
     * - field object holds the field which has been rearranged.
     */
    FieldZIndex = "Field.ZIndex",
    /**
     * Called when text is being entered in a text field. 
     * Can be a single character or multiple characters (e.g. pasting text or composition).
     * - event data: {@link TextFieldTextChangeEventData}
     * - cannot be cancelled
     * - field object holds the field which has been changed.
     */
    TextFieldTextEditKeyPressed = "TextField.Text.Edit.KeyPressed",
    /**
     * Called when the text edit operation starts for a given text field.
     * This means that the user can now enter text via the keyboard.
     * On touch devices, this means that the on screen keyboard may show.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the active field
     */
    TextFieldTextEditStart = "TextField.Text.Edit.Start", 
    /**
     * Called when the text edit operation ends for a given text field.
     * This means that the user can no longer enter text via the keyboard.
     * On touch devices, this means that the on screen keyboard may hide.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the active field
     */
    TextFieldTextEditEnd = "TextField.Text.Edit.End",
    /**
     * Called when the editor selection changes.
     * - event data: _null_
     * - cannot be cancelled
     * - field object holds the selected field(s). If nothing is selected, the array will be empty.
     */
    FieldSelectionChanged = "Editor.Selection",
}

/**
 * The event object is available to control the event flow.
 * It has methods to cancel the default action and stop event propagation.
 */
type MegaEditEventObject = {
    /**
     * The type of the event.
     */
    type: EditorEventType | FieldEventType,
    /**
     * The event data.
     */
    data: EventDataVariants,
    /**
     * Call this method to stop the default behaviour. This means that the action will not be performed.
     */
    preventDefault(): void;
    /**
     * Call this method to stop propagration. Subsequent scripts will not receive this event.
     */
    stopPropagation(): void;    
}

interface Events {
    /**
     * Register for custom actions. Custom actions are used to add custom functionality to the editor for standard behaviour. This allows a script to adjust the functionality.
     * Depending on the type of custom action, the user may even have a choice in case multiple implementations are registered.
     * @param type The type of custom action this applies to.
     * @param name The name of the custom action. This is used to identify the custom action in the UI.
     * @param desc The description of the custom action. This is used to describe the custom action in the UI.
     * @param callback The callback function to call when the custom action is triggered.
     */
    RegisterCustomAction(type: CustomActionType, name: string, desc: string, callback: () => void): void;
    /**
     * Registers a custom field and makes it usable in this editor session.
     * Custom fields which are part of the job but the type has not been registered cannot work as expected.
     * @param definition The custom field definition.
     * @param callback The callback function to call when the custom field is fully registered.
     */
    RegisterCustomField(definition: CustomFieldDefinition, callback: () => void): void;
    /**
     * This function will ensure that the the custom field is fully functional. With asyncronous loading of scripts and depending on the actions of those scripts it could take some time until the custom field is fully registered and available.
     * This method can be used to ensure that the setup of that field has finished and is available for use.
     * 
     * It will wait a maximum of 2 seconds for the field to be registered. If it is not registered by then, the callback will be called immediately.
     * @param fieldOrType The field we want to ensure the custom field definition is registered for. Either as the field directly or the sub type as string.
     * @param callback The callback will be triggered as soon as the field is available and fully registered with the value _true_. Otherwise, if the field is not found after 2 seconds, the callback will be triggered immediately with _false_. The field should not be used in that case.
     */
    RegisterForCustomField(fieldOrType: CustomField | string, callback: (fieldRegisteredAndAvailable: true) => void): void;
    /**
     * Register for an internal editor or field event.
     * Events can be registered multiple times, by the same or separate scripts.
     * 
     * Some events can be cancelled, which means the default operation triggering the event will not be performed.
     * Events can also be stopped from propagating to other scripts, which means that other scripts will not receive the event.
     * For both actions, use the event object passed to the callback function.
     * 
     * The data provided depends on the event type. See the {@link EditorEventType} and {@link FieldEventType} for more information.
     * The field events will also pass the relevant fields in a separate parameter.
     * @param event The event to register for.
     * @param callback The callback function to call when the event is triggered.
     * @returns A unique identifier for the event registration.
     */
    Register(event: FieldEventType | EditorEventType, callback: (fields: BaseField[] | null, data: EventDataVariants, event: FieldEventType | EditorEventType, eventObj: MegaEditEventObject) => void): string;
    /**
     * Scripts can unregister for events by passing the identifier returned by the {@link Events.Register} method.
     * This would mean that the script will no longer receive the event.
     * @param id The unique identifier for the event registration.
     * @returns True if the event has been unregistered, false if the event was not registered in the first place.
     */
    UnRegister(id: string): boolean;
    /**
     * Scripts can listen to arbitriary events from the same or other scripts. To avoid collissions, the event name should follow a reasonable naming convention.
     * @param event The event to listen for.
     * @param callback The callback is triggered when the event is being received. The callback will receive the event name and the data passed to the event.
     * @returns A unique identifier for this listener.
     */
    Listen<T>(event:string, callback: (eventName: string, data: T) => void): string;
    /**
     * Scripts can unregister a listener for custom events by passing the identifier returned by the {@link Events.Listen} method.
     * @param id The listener to unregister.
     * @returns True if the listener has been unregistered, false if the listener was not registered in the first place.
     */
    UnListen(id: string): boolean;
    /**
     * Broadcast a custom event. This will trigger all listeners for this event.
     * To avoid collissions, the event name should follow a reasonable naming convention.
     * 
     * Optioanlly you can use broadcast to send 
     * @param event The event to broadcast.
     * @param value The value to send. Note this will be serialized and deserialized.
     * @param targetEditorParent Flag to indicate if the event should be sent to the parent editor. This is only applicable in an iFrame context. Default value is false.
     */
    Broadcast<T>(event: string, value?: T, targetEditorParent?: boolean): void;
}