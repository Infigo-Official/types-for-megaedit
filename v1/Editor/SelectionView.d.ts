/**
 * This module allows to interact with the editor interface in general by adjusting the view and the selection.
 * 
 * @module Editor / Selection and View
 */

/**
 * This interface allows to interact with the current selection within the editor.
 */
interface Selection {
    /**
     * Adds text to the current cursor location/selection.
     * Will only do something if a text field is currently being edited.
     * If text is selected, it will perform a replacement action.
     * @param text The text to insert.
     */
    AddAtCurrentCursorSelection(text: string): void;
    /**
     * Get the currently selected field.
     * @returns The currently selected field or null if no field is selected.
     */
    GetSelectedField(): BaseField | null;
    /**
     * Clears the current selection if any in the editor.
     */
    ClearSelection(): void;
    /**
     * Selects the specified field - will change the page if necessary.
     * @param fieldOrId The field or the id of the field to select.
     * @returns True if the field was selected, false otherwise.
     */
    SelectField<T>(fieldOrId: string | BaseField): boolean;
    /**
     * Adjusts the popup dialog for the current selection.
     * @param visible If true, it will show the popup dialog, otherwise it will hide it if it is currently visible.
     * @returns True if there is a selected field.
     */
    ShowPopupDialog(visible: boolean): boolean;
    /**
     * Selects the given field (only valid for image and text fields). Will change the page if necessary.
     * It will then, based on the showDialog parameter, show the popup dialog for the field and initiate the text editing for text fields.
     * @param fieldOrId The image or text field to select, either by id or by reference.
     * @param showDialog Boolean value indicating if the popup dialog should be shown.
     * @returns True if the field was selected and the popup dialog was shown, false otherwise.
     */
    SelectForEdit(fieldOrId: string | BaseField, showDialog: boolean): boolean;
}

/**
 * The current view port information of the editor defined the by the current scale and translation parameters.
 * Can be used to save and restore the view port later.
 */
type ViewPortInfo = {
    /**
     * The current zoom factor of the view port.
     */
    zoom: number;
    /**
     * The horizontal translation of the view port.
     */
    x: number;
    /**
     * The vertical translation of the view port.
     */
    y: number;
}

/**
 * Interfact with the current view of the editor.
 */
interface View {
    /**
     * Adjust the zoom by adding the given amount to the current zoom factor. Note that the min/max zoom levels are being maintained.
     * This can be used to increase or decrease the zoom by a given quantity.
     * @param amount Positive or negative number to adjust the zoom level by adding/substracting the given amount to the current zoom scale.
     */
    Zoom(amount: number): void;
    /**
     * Adjusts the view by zooming to the given field. This will adjust the scale factor and translate the view port to the center of the field.
     * Note: the method will not change the page. If the field is not on the current page, the method will still zoom to the area where the field would be.
     * 
     * @param field The field object to zoom to.
     * @param padding The mandatory padding parameter adds the given amount of points on all 4 sides of the field to the zoomed area. Use 0 to zoom to the exact size of the field.
     */
    ZoomToField(field: BaseField, padding: number): void;
    /**
     * Zooms to a specific area on the page. This will adjust the scale factor and translate the view port to the center of the given area.
     * 
     * @param x The x coordinate of the area (top left corner) to zoom to.
     * @param y The y coordinate of the area (top left corner) to zoom to.
     * @param w The width of the area to zoom to.
     * @param h The height of the area to zoom to.
     * @param padding The padding to add to the zoomed area. Use 0 to zoom to the exact size of the area.
     */
    ZoomTo(x: number, y: number, w: number, h: number, padding: number): void;
    /**
     * Get the current view port information. Can be used to save and restore the view port later or to manipulate the view port based on the current context.
     * @returns The current view port information.
     */
    GetViewPortInfo(): ViewPortInfo;
    /**
     * Updates the current view port to the specified values.
     * All parameters are optional. If a parameter is not specified, the current value will be used.
     * @param zoom The new zoom value.
     * @param x The new horizontal translation value.
     * @param y The new vertical translation value.
     */
    SetViewPortInfo(zoom?: number, x?: number, y?: number): void;
    /**
     * Refreshes the current page. This will reload the entire page and re-render all objects.
     * This is useful to ensure any update on the fields is being reflected in the editor.
     * The viewport will be reset to the default view and it has a noticable impact on the user experience.
     */
    Refresh(): void;
    /**
     * Redraw will enforce the canvas to be redrawn with the content the page has currently. It will not reinitialize the page nor change the viewport.
     * It has a minimal impact on performance and has not visible artifacts, but not all changes on the contents may be reflected.
     */
    ReDraw(): void;
    /**
     * Causes text and image fields to be redrawn. Based on the flag, the redraw will be forced to be asap or it can be queued up.
     * This will also ensure for image fields that the positioning for auto fit is being recalculated.
     * @param force Flag to control if the redraw should be forced to be asap or if it can be queued up.
     */
    RenderObjects(force: boolean): void;
    /**
     * Get the currently active page by index:
     * @returns The current page index.
     */
    CurrentPage(): number;
    /**
     * Changes the current page.
     * @param pageOrIndexOrId The page to change to. Can be either the page index, the page id or the page object.
     * @returns Flag indicating if the page was changed.
     */
    SetCurrentPage: (pageOrIndexOrId: number | string | Page) => boolean;    
    /**
     * Opens the preview mode. Would not do anything if the editor is already in preview mode or if there is no preview available.
     */
    OpenPreview: () => void;
    /**
     * Closes the preview mode. Would not do anything if the editor is not in preview mode or if there is no preview available.
     */
    ClosePreview(): void;
    /**
     * Test if the editor is currently in preview mode and showing the preview instead of the editor.
     * @returns True if the editor is currently in preview mode.
     */
    IsInPreview(): boolean;
    /**
     * Toggles the current preview mode. If we are in the preview it will show the editor. If we are in the editor it will show the preview.
     * @returns True if the editor is showing the preview _after_ the call to this method.
     */
    TogglePreview(): void;
    /**
     * Toggles the full screen mode of the editor. Full screen mode is using the operating system to display the page in full screen.
     * @returns True if the editor is showing in full screen _after_ the call to this method.
     */
    ToggleFullScreen(): boolean;
    /**
     * This sub interface will allow to interact with the preview mode of the editor.
     * All communication calls to the preview go through a message queue and are executed asynchronously.
     */
    Preview: {
        /**
         * Get the page currently displayed within the preview. Note that this will only work for previews which support the page information.
         * Installed previews:
         * - standard: supports page information
         * - 3D: does not support page information
         * - flip: does not support page information
         * 
         * @param callback The callback will be triggered once the page information is available. The callback will receive the page index as parameter.
         */
        GetCurrentPage(callback: (pageIndex: number) => void): void;
        /**
         * Sets the page currently displayed within the preview. Note that this will only work for previews which support the page information.
         * Installed previews:
         * - standard: supports page information
         * - 3D: does not support page information
         * - flip: does not support page information
         * 
         * @param index The page index to display.
         */
        SetCurrentPage(index: number): void;
        /**
         * Runs a command in the preview. The list of supported commands depends on the preview implementation.
         * This allows to trigger actions in the preview from the editor.
         * 
         * Installed previews:
         * - standard: "pageUpdate" - will update the page with the latest appearance changes
         * - 3D: "pageUpdate" - will update full page textures with the latest appearance changes
         *       "fieldUpdate" - will update field textures with the latest appearance changes
         *       "changeView" - will update the 3D camera as well as the mesh position/rotation all with an animated transition
         * @param command The command name to trigger.
         * @param parameter The parameter to pass to the command.
         */
        RunCommand(command: string, parameter: unknown): void;
        /**
         * Registers a script command. This allows to trigger actions in the editor from the preview.
         * @param command The command name to register.
         * @param callback The callback will be triggered if the preview triggers the command. The callback will receive the parameter passed from the preview.
         */
        RegisterCommand(command: string, callback: (parameter: unknown) => void): void;
    }
}