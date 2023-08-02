/**
 * This module works with the editor UI including custom user interface within the editor and modal dialogs.
 * @module Editor / UI Methods
 */

/**
 * The shape format option is used to define how shapes are being drawn. See {@link UI.ShowRectAreaOnPage} for an example.
 */
type ShapeFormatOption = {
    /**
     * The fill color to use. Default is an empty value, meaning no fill color.
     */
    fill: string;
    /**
     * The stroke color to use. Default is an empty value, meaning no stroke color.
     */
    stroke: string;
}

/**
 * The editor Ui data flag identifies a UI element within the editor to change data for.
 */
declare enum EditorUiDataFlag {
    /**
     * The free target is a special UI element to add to the editor to have custom user interface. Usually this is a column to the right or a row at the bottom of the editor.
     * The data element here would be either:
     * - a size object with width and height - see {@link Size} for details.
     * - a number defining the width or height (if it is a column or a row) of the free target.
     */
    FreeTarget = 'FreeTarget'
}

/**
 * Flags to identify the editor UI elements to show or hide. See {@link UI.ShowEditorUi} for details.
 */
declare enum EditorUiVisibilityFlag {
    /**
     * Shows or hides the save as project option in the editor UI.
     */
    SaveProject = 'SaveProject',
    /**
     * Shows or hides the add to basket option in the editor UI.
     */
    AddToBasket = 'AddToBasket',
    /**
     * Shows or hides the preview button in the editor UI.
     */
    PreviewButton = 'PreviewButton',
    /**
     * Shows or hides the free target area for custom user interface in the editor UI.
     */
    FreeTarget = 'FreeTarget',
    /**
     * Shows or hides a custom tab on the left hand side tab area of the editor.
     */
    CustomTab = 'CustomTab',
    /**
     * Shows or hides the top view controls area.
     */
    ViewControls = 'ViewControls',
    /**
     * Shows or hides the entire tab area.
     */
    TabArea = 'TabArea',
    /**
     * Shows or hides the page selector area.
     */
    Pages = 'Pages'  
}

/**
 * Defines the target to add custom UI to. See {@link UI.Add} for details.
 */
declare enum UiDestinationTarget {
    /**
     * The new fields tab when enabled within the editor.
     * Generally used to house draggable buttons which will create fields.
     */    
    FieldsTab = 'FieldsTab',
    /**
     * The new tools tab when enabled within the editor.
     * Used to house any tools and other features specific to the product.
     */
    ToolsTab = 'ToolsTab',
    /**
     * The new custom tab when enabled within the editor.
     */
    CustomTab = 'CustomTab',
    /**
     * This is the area to the right or bottom of the editor canvas. Note: do not use this when in direct preview mode.
     */
    FreeTarget = 'FreeTarget',
    /**
     * This should be used instead of {@link FreeTarget} when in direct preview mode.
     */
    FreeTargetPreview = 'FreeTargetPreview',
    /**
     * The view control area at the top of the editor.
     */
    ViewControls = 'ViewControls',
    /**
     * The text field popup can have a custom tab. This is the area to add custom UI to.
     */
    TextField = 'TextField',
    /**
     * The batch area to hold batch related features.
     */
    BatchArea = 'BatchArea',
    /**
     * The custom UI which is added to the loading overlay.
     */
    Overlay = 'Overlay',
    /**
     * The top right area of the editor.
     */
    TopRightArea = 'TopRightArea',
    /**
     * The bototm right area of the editor.
     */
    BottomRightArea = 'BottomRightArea',
    /**
     * The main center area of the editor.
     */
    MainControlsArea = 'MainControlsArea',
    /**
     * On the gallery tab above the main ui of the tab.
     */
    AboveGalleryTab = 'LeftTopSidebarGallery',
    /**
     * On the gallery tab below the main ui of the tab.
     */
    BelowGalleryTab = 'LeftBottomSidebarGallery',
    /**
     * On the background tab above the main ui of the tab.
     */
    AboveBackgroundTab = 'LeftTopSidebarBackground',
    /**
     * On the background tab below the main ui of the tab.
     */
    BelowBackgroundTab = 'LeftBottomSidebarBackground',
    /**
     * On the layout tab above the main ui of the tab.
     */
    AboveLayoutTab = 'LeftTopSidebarLayout',
    /**
     * On the layout tab below the main ui of the tab.
     */
    BelowLayoutTab = 'LeftBottomSidebarLayout',
    /**
     * On the clipart tab above the main ui of the tab.
     */
    AboveClipArtTab = 'LeftTopSidebarClipArt',
    /**
     * On the clipart tab below the main ui of the tab.
     */
    BelowClipArtTab = 'LeftBottomSidebarClipArt',
    /**
     * On the drawing tab above the main ui of the tab.
     */
    AboveDrawingTab = 'LeftTopSidebarDrawing',
    /**
     * On the drawing tab below the main ui of the tab.
     */
    BelowDrawingTab = 'LeftBottomSidebarDrawing',
    /**
     * Outside the main editor container.
     */
    OutsideContainer = 'OutsideContainer',
}

/**
 * Callback function to be triggered by the dialog. The dialog id is is passed as parameter to the callback.
 */
type DialogCallback = (dialogId: string) => void;

/**
 * Object to define actions for a dialog. The key is the label of the button and the value is the callback function to trigger when the button is clicked.
 * The dialog id is is passed as parameter to the callback.
 * 
 * @example
 * Editor.UI.ShowDialog("Help Centre", new MEUILabel("Should we help?"), {
                "Ok": function (dialogId) {
                    Editor.UI.CloseDialog(dialogId);
                    Editor.UI.ShowMessage("Helpful notification.");
                },
                "Cancel": function (dialogId) {
                    Editor.UI.CloseDialog(dialogId);
                }
            });
 */
type DialogActions = { [label: string]: DialogCallback };

/**
 * The type of a notification. This will impact the style of the notification as well as the behaviour.
 */
declare enum NotificationType {
    /**
     * Error notifications will not disappear automatically.
     */
    Error = 'Error',
    /**
     * Warning notifications will disappear automatically after a short time by default.
     */
    Warning = 'Warning',
    /**
     * Info notifications will disappear automatically after a short time by default.
     */
    Info = 'Info'
}

/**
 * Options object to pass to {@link UI.ShowMappingDialog}.
 */
type MappingDialogOptions = {
    /**
     * This is an array for all placeholders/keys which are images. This is used to allow for static image mapping and ensure the dialog works correctly.
     */
    mappingImgItems: string[];
}

/**
 * Interact with the user interface of the editor and generate custom UI.
 */
interface UI {
    /**
     * Adjusts the currently selected album in the gallery control.
     * @param albumOrId The media album or its ID.
     */
    SetSelectedAlbum(albumOrId: MediaAlbum | string): void;
    /**
     * Returns the currently selected album in the gallery control.
     * @returns The currently selected album.
     */
    GetSelectedAlbum(): MediaAlbum;
    /**
     * Set the default album for the current job. This will be loaded as default and will receive all new media items.
     * @param albumOrId The media album or its ID to set as the new default.
     */
    SetDefaultAlbum(albumOrId: MediaAlbum | string): void;
    /**
     * Shows a waiting overlay over the entire editor. Used to indicate that the editor is busy and to avoid user interaction.
     * If the editori s already showing an overlay, the message and/or other options will be updated.
     * @param msg The message to show in the overlay.
     * @param showTransparent If true, the overlay will be transparent, otherwise it will be opaque. Default is false.
     * @param showUi You can add custom UI to the overlay. If that should be visible, set this to true. Default is false.
     * @param showFast There is a transition to show the overlay (fade in). If you want to skip that, set this to true and the overlay will show immediately. Default is false.
     */
    ShowOverlay(msg: string, showTransparent?: boolean, showUi?: boolean, showFast?: boolean): void;
    /**
     * Helper function to display the current progress of a long running operation - identified via the _DocumentUpdateHandler_ - in the overlay.
     * Does not automatically update the message over time, but can be called again with the same object to update the message.
     * @param msg The message prefix to show in the overlay. This will be separated then by the actual progress via a colon.
     * @param documentUpdateHandler The update handler to use to get the current progress.
     * @param showTransparent If true, the overlay will be transparent, otherwise it will be opaque. Default is false.
     * @param showUi You can add custom UI to the overlay. If that should be visible, set this to true. Default is false.
     * @param showFast There is a transition to show the overlay (fade in). If you want to skip that, set this to true and the overlay will show immediately. Default is false.
     */
    ShowOverlayWithProgress(msg: string, documentUpdateHandler: DocumentUpdateHandler, showTransparent?: boolean, showUi?: boolean, showFast?: boolean): void;
    /**
     * Removes the overlay display and restores the editor to its normal state.
     * Does nothing if the overlay is already hidden.
     */
    HideOverlay(): void;
    /**
     * Sets a new CSS rule or updates an existing rule for the editor directly. Normally CSS override can be used to change the appearance of the editor, but this function allows to set a new rule directly via scripting.
     * This function is used to set a single CSS attribute with a given value.
     * @param name The name of the CSS rule to set.
     * @param attr The CSS attribute to set.
     * @param value The CSS value to set.
     * 
     * @example
     * setCssRule(".galleryWrapper .galleryItem, .galleryWrapper .spinnerimage", "width", size + "%");
     */
    SetCssRule(name: string, attr: string, value: string): void;
    /**
     * Sets a new CSS rule or updates an existing rule for the editor directly. Normally CSS override can be used to change the appearance of the editor, but this function allows to set a new rule directly via scripting.
     * This function is used to set multiple CSS attributes with their values.
     * @param name The name of the CSS rule to set.
     * @param object The object with the CSS attributes and values to set.
     * 
     * @example
     * Editor.UI.SetCssClass(".exampleRecordEntry", {
    "display": "inline-block",
    "color": "Black",
    "font-weight": "bold",
    "padding-left": "10px",
    "cursor": "pointer"
});
     */
    SetCssClass(name: string, object: {[key: string]: string}): void;
    /**
     * Updates the media usage counter to the currently correct values. Some script operations will not update the counter automatically, so this function can be used to update it manually.
     */
    UpdateMediaUsageCounter(): void;
    /**
     * Displays a custom help message. For this to work, the help settings have to be enabled to display context help in the per product configuration.
     * The field is optional and will display the help message for the field if it is set. If not, the help message will be displayed for the entire page if the setting to show once per field is also disabled.
     * @param fieldOrId The optional field or its ID to display the help message for.
     * @param helpText The help text to display.
     */
    ShowHelp(fieldOrId: BaseField | string | null, helpText: string): void;
    /**
     * Adds a rectangular area on the canvas to highlight and interact with a special area. The rectangle will be added to the current page and switching pages will remove the rectangle as will do a call to {@link View.Refresh}.
     * This will return a unique identifier which can be used to remove the rectangle via scripting.
     * 
     * @param rect The rectanglular area to cover in points on the canvas.
     * @param normalFormat Optional format to use for the rectangle. If not set, this will not be drawn. This is used when the mouse is not over the rectangle.
     * @param hoverFormat Optional hover format to use for the rectangle. If not set, this will not be drawn. This is used when the mouse is over the rectangle and only active if we have a callback defined.
     * @param callback Optional callback which will be triggered when the rectangle is clicked.
     * @param rotation Optional rotation of the rectangle in degrees. Default is 0. Rotation is around the top left corner of the rectangle.
     * @returns The identifier of the rectangle which can be used to remove it later.
     */
    ShowRectAreaOnPage(rect: Rect, normalFormat?: ShapeFormatOption, hoverFormat?: ShapeFormatOption, callback?: () => void, rotation?: number): string;
    /**
     * Removes a previously added rectangle from the canvas.
     * @param id The identifier of the rectangle to remove. See the return value of {@link UI.ShowRectAreaOnPage}.
     */
    RemoveRect(id): void;
    /**
     * Sets the UI data for a specific target. This can be used to configure individual elements of the editor UI.
     * @param target The target to set the data for.
     * @param value The value to set. The type and format depends on the target. See {@link EditorUiDataFlag} for details.
     */
    SetEditorUiData(target: EditorUiDataFlag, value: unknown): void;
    /**
     * Shows or hides a specific element of the editor UI. See {@link EditorUiVisibilityFlag} for details.
     * @param target The target to show or hide.
     * @param visible Flag to indicate if the target should be visible or not.
     */
    ShowEditorUi(target: EditorUiVisibilityFlag, visible: boolean): void;
    /**
     * Helper method to display a mapping dialog to the user to map a list of items to a list of values.
     * An existing mapping can be passed which will be used to preload the data.
     * If no mapping is set, it will automap the items to the values if possible via {@link Helper.AutoMap}. The user can then change the mapping.
     * Based on the parameters, the user is able to link a static value instead of a mapped value.
     * 
     * @param message The message to display on the dialog.
     * @param title The title of the dialog.
     * @param mappingItems The placeholder list of items to map as the keys.
     * @param mappingValues The values are the list of values available for mapping.
     * @param mapping The initial mapping data to load. Can be _null_ to trigger an initial automap.
     * @param allowStatic Flag to indicate if the user should be able to link a static value instead of a mapped value.
     * @param callback The callback will be triggered once the user closes the dialog. If the user clicked OK, the mapping will be passed as the parameter, otherwise if he canceled it will be null.
     * @param cssClasses Adds one or more css classes (separated by space) to the dialog - used for custom styling.
     * @param options Optional object with options to configure the dialog.
     */
    ShowMappingDialog(message: string, title: string, mappingItems: string[], mappingValues: string[], mapping: BatchMapping, allowStatic: boolean, callback: (result: BatchMapping) => void, cssClasses?: string, options?: MappingDialogOptions): void;
    /**
     * Displays a dialog showing a specific editable content item identified by id.
     * @param editableContentId The id of the editable content to display.
     * @param callback The callback is triggered when the dialog is closed.
     */
    ShowEditableContentDialog(editableContentId: number, callback: () => void): void;
    /**
     * Shows a dialog for the user to enter a text value.
     * @param message The message to display on the dialog.
     * @param title The title of the dialog.
     * @param defaultValue The default value to display in the input field.
     * @param callback The callback will be triggered once the user closes the dialog. If the user clicked OK, the success parameter will be true, otherwise if he canceled it will be false.
     * @param cssClasses Adds one or more css classes (separated by space) to the dialog - used for custom styling.
     */
    GetUserInput(message: string, title: string, defaultValue: string, callback: (success: boolean, input: string) => void, cssClasses: string): void;
    /**
     * Shows a dialog for the user to enter a number value.
     * @param message The message to display on the dialog.
     * @param title The title of the dialog.
     * @param defaultValue The default value to display in the input field.
     * @param min The minimum value allowed.
     * @param max The maximum value allowed.
     * @param step The step size to use for the input field.
     * @param callback The callback will be triggered once the user closes the dialog. If the user clicked OK, the success parameter will be true, otherwise if he canceled it will be false.
     * @param cssClasses Adds one or more css classes (separated by space) to the dialog - used for custom styling.
     */
    GetUserNumber(message: string, title: string, defaultValue: number, min: number, max: number, step: number, callback: (success:boolean, input: number) => void, cssClasses: string): void;
    /**
     * Shows a dialog for the user to confirm a choice. The user has to click either a 'yes' or 'no' button.
     * @param msg The message to display on the dialog.
     * @param title The title of the dialog.
     * @param buttonYesText The text to display on the 'yes' button. Default is 'Yes'.
     * @param buttonNoText The text to display on the 'no' button. Default is 'No'.
     * @param yesCallback The callback will be triggered if the user clicked the 'yes' button.
     * @param noCallback The callback will be triggered if the user clicked the 'no' button.
     */
    ShowConfirm(msg: string, title: string, buttonYesText?: string, buttonNoText?: string, yesCallback?: () => void, noCallback?: () => void): void;
    /**
     * Displays an error message to the user. The message will not disappear automatically, but the user can close it via the close icon or the optional button.
     * Will also be logged to the console. 
     * @param msg The error message text to display.
     * @param buttonText An optional button showing on the notification. If not set, the notification will have no button.
     * @param callback The callback will be triggered if the user clicked the button.
     */
    ShowError(msg: string, buttonText?: string, callback?: () => void): void;
    /**
     * Displays a warning message to the user. The warning message will disappear automatically after a short time if no button is set.
     * Will also be logged to the console.
     * @param msg The message to show.
     * @param buttonText An optional button showing on the notification. If not set, the notification will have no button.
     * @param callback The callback will be triggered if the user clicked the button.
     */
    ShowWarning(msg: string, buttonText?: string, callback?: () => void): void;
    /**
     * Displays a message to the user. By default this will be an information message, but additional options are available.
     * The message will disappear automatically after a short time if no button is set.
     * Will also be logged to the console.
     * @param msg The message to display in the notification.
     * @param type The type of the notification. This will impact the style of the notification as well as the behaviour. Defaults to {@link NotificationType.Info}.
     * @param buttonText An optional button showing on the notification. If not set, the notification will have no button.
     * @param callback The callback will be triggered if the user clicked the button.
     * @param permanent Flag to indicate if the notification should be permanent and not disappear automatically. Default is false.
     * @param forbidClose Flag to indicate if the notification should not be closable by the user. Default is false. Note that this will not prevent the notification from disappearing automatically. If also _permanent_ is set to true, the notification will never disappear unless a button is used and clicked.
     * @param timeout The timeout in milliseconds after which the notification should disappear automatically. Default depends on the type. Is ignored if _permanent_ is set to true or a button is configured.
     * @returns The unique message identifier. Currently this cannot be used for anything, but it is returned for future use.
     */
    ShowMessage(msg: string, type?: NotificationType, buttonText?: string, callback?: () => void, permanent?: boolean, forbidClose?: boolean, timeout?: number): number;
    /**
     * Shows a modal popup dialog within the editor.
     * @param title The title of the dialog.
     * @param uiItem The UI item to display in the dialog. Usually a layout item like {@link MEUIStackLayout}, but can be any UI item of type {@link MEUIBase}.
     * @param actions The actions to display at the bottom of the dialog. Can be any number of buttons.
     * @param closeCallback The callback will be triggered when the dialog is closed.
     * @param callback The callback will be triggered when the dialog is ready. The dialog is is passed as parameter to the callback which is needed to further interact with it.
     * @param windowClass An optional CSS class to add to the dialog window.
     */    
    ShowDialog(title: string, uiItem: MEUIBase, actions: DialogActions, closeCallback?: () => void, callback?: DialogCallback, windowClass?: string): void;    
    /**
     * Updates an existing dialog
     * - title
     * - dialog actions / buttons
     * - close callback
     * @param dialogId The id of the dialog to update.
     * @param title The new title of the dialog if specified. If _null_ the title will not be changed.
     * @param actions The new actions to display at the bottom of the dialog. Can be any number of buttons. Will always be updated.
     * @param closeCallback The new callback will be triggered when the dialog is closed.
     */
    UpdateDialog(dialogId: string, title: string, actions: DialogActions, closeCallback?: () => void): void;
    /**
     * Closes a dialog.
     * @param dialogId The id of the dialog to close.
     */
    CloseDialog(dialogId: string): void;
    /**
     * Method for custom fields to set the UI for the field popup dialog.
     * Up to 3 individual tabs can be used. Each tab can have a custom UI item to display.
     */
    CustomFieldOptionDialogUi(config: CustomFieldOptionDialogConfig): void;        
    /**
     * Adds UI elements to the specified destination.
     * @param callback [Deprecated] The callback is not required anymore and should not be used. Pass _null_ instead.
     * @param destination The destination to add the UI to.
     * @param args A list of UI items to add to the destination.
     */
    Add(callback: null, destination: UiDestinationTarget, ...args: MEUIBase[]): void;
    /**
     * Update UI elements passed as parameters.
     * @param callback [Deprecated] The callback is not required anymore and should not be used. Pass _null_ instead.
     * @param includeChildren Flag to check if children of the UI element should be updated as well. Default is false.
     * @param args A list of UI items to update.
     */
    Update(callback: null, includeChildren: boolean, ...args: (MEUIBase|null)[]): void;
    /**
     * Removes UI elements from the editor interface.
     * @param callback [Deprecated] The callback is not required anymore and should not be used. Pass _null_ instead.
     * @param args The list of UI items to remove.
     */
    Delete(callback: null, ...args: MEUIBase[]): void;
    /**
     * Reloads the UI elements passed as parameters - so that the script version is updated to the current version.
     * Note that if you have callbacks configured for your UI elements, they reload automatically when the callbacks are triggered.
     * @param callback [Deprecated] The callback is not required anymore and should not be used. Pass _null_ instead.
     * @param args The list of UI items to update.
     */
    Reload(callback: null, ...args: MEUIBase[]): void;
    /**
     * Removes all custom UI elements from the editor interface.
     * @param destination The destination to clear.
     */
    Clear(destination: UiDestinationTarget): void;
}

/**
 * Defines a tab for the custom field option dialog.
 * Up to 3 tabs can be configured.
 */
type CustomFieldOptionDialogTabConfig = {
    /**
     * The title of the tab.
     */
    Title: string;
    /**
     * The tooltip of the tab.
     */
    ToolTip: string;
    /**
     * The UI item to display in the tab. Usually a layout item like {@link MEUIStackLayout}, but can be any UI item of type {@link MEUIBase}.
     */
    Item: MEUIBase;
    /**
     * Flag to indicate if the tab is enabled or not.
     */
    Enabled: boolean;
}

/**
 * Defines the configuration for the custom field option dialog.
 */
type CustomFieldOptionDialogConfig = {
    /**
     * The dialog title.
     */
    DialogTitle: string;
    /**
     * The first tab configuration. Use _null_ to disable the tab.
     */
    Tab1: CustomFieldOptionDialogTabConfig | null;
    /**
     * The second tab configuration. Use _null_ to disable the tab.
     */
    Tab2: CustomFieldOptionDialogTabConfig | null;
    /**
     * The third tab configuration. Use _null_ to disable the tab.
     */
    Tab3: CustomFieldOptionDialogTabConfig | null;
}