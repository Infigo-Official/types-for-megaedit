/**
 * This module gives access to all editor specific features including:
 * - view
 * - selection
 * - ui
 * - external API's
 * - Invent connectivity
 * - data
 * - events
 * - resources
 * - localization
 * - server side functionality (code which will execute only when this script runs during output generation)
 * - helper functions

 * 
 * @module Editor
 */

/**
 * Defines a specific megascript. Used to generate a link to the MegaScript handler.
 */
type MegaScriptIdentifier = {
    /**
     * The instance name of the megascript.
     */
    instanceName: string;
    /**
     * The storefront id the megascript belongs to.
     */
    accountId: number;
}

/**
 * Defines the scope of a permission. This can be used to check if the current user has the necessary permissions to execute a specific action.
 */
declare enum PermissionScope {
    /**
     * This permission is to administer general data available for everyone.
     */
    ManageDataGeneral = 'ManageDataGeneral',
    /**
     * This permission is to administer data available per product.
     */
    ManageDataPerProduct = 'ManageDataPerProduct'
}

/**
 * Status items of the editor. Can be used to set the status of the editor. See {@link Editor.SetEditorStatus} for more information.
 * Each status would require a certain type of value as identified in the description.
 */
declare enum EditorStatusItems {
    /**
     * Controls the capability to add to cart. Boolean value. Default value is true.
     */
    AddToBasket = 'AddToBasket',
    /**
     * Controls the capability to save as project. Boolean value. Default value is true.
     * Note: this has to be configured in the administration interface as well.
     */
    SaveAsProject = 'SaveAsProject',
    /**
     * Controls if the canvas should be grayed out outside the bleed/canvas area. Boolean value. Default value is true.
     * Can be disabled for performance improvemenets.
     */
    GrayOutCanvas = 'GrayOutCanvas',
    /**
     * Controls the visibility of a custom tab on the text field. Boolean value. Default value is false.
     * Note: custom UI controls can be added to the custom tab via the {@link Editor.UI} methods.
     */
    TextFieldCustomTab = 'TextFieldCustomTab',
    /**
     * Controls the title of the custom tab on the text field. String value. Default value is 'Custom'.
     */
    TextFieldCustomTabTitle = 'TextFieldCustomTabTitle',
    /**
     * Controls the capabilty to initiate the global settings popup dialog. Default value is true.
     * Note: global options must be configured on the product for the dialog to exist in the first place (e.g. multiple canvas, stock or output type options).
     */
    GlobalOptionsDialog = 'GlobalOptionsDialog',
    /**
     * Controls if, in case an uploaded file result will include a preflight info, if the popup dialog should be shown. Boolean value. Default value is true.
     * Note: preflight profiles have to be enabled and a matching file type has to be uploaded to trigger the preflight info.
     */
    ShowPreflightPopup = 'ShowPreflightPopup',
}

/**
 * The editor handler defines functions and properties that allow to control the editor session.
 */
interface EditorHandler {
    /**
     * Test if the current execution is client or server side.
     * @returns True if the script is running server side, and false if it runs on the editor.
     */
    IsRunningServerSide(): boolean;
    /**
     * Test if the editor is running in an embedded context.
     * @returns True if the editor is running in an embedded context, and false if it runs standalone. 
     */
    IsEmbedded(): boolean;
    /**
     * Test if the editor is running in an iframe.
     * @returns True if the editor is running in an iframe, and false if it runs standalone.
     */
    IsInIFrame(): boolean;
    /**
     * Test if the current user is an administrator (aka user with administration rights for MegaEdit).
     * @returns True if the current user is an administrator, and false if it is not.
     */
    IsAdmin(): boolean;
    /**
     * Returns the specified price with the formatting configured for that storefront (e.g. currency symbol, decimal separator, etc.)
     * @param price The price to format.
     * @returns The formatted price.
     */
    FormatPrice(price: number): number;
    /**
     * Helper function to generate a link to the MegaScript handler for a specific instance. This allows you to add custom functionality to the editor.
     * @param parameters The megascript identifier.
     * @param additionalValues Additional dictionary which will be added to the query string of the generated URL.
     * @returns The absolute URL for the mega script handler.
     */
    GenerateMegaScriptLink(parameters: MegaScriptIdentifier, additionalValues: {[Key: string]: string}): string;
    /**
     * Checks if the current user has the specified permission. This should be used before attemting to execute any action that requires a specific permission.
     * @param type The scope of the permission to check.
     * @returns True if the current user has the specified permission, and false if it does not.
     */
    CheckSecurity(type: PermissionScope): boolean;
    /**
     * Reports a custom load step. Load steps allow to add additional custom steps to the loading process of the editor. The loading overlay will be extended with each step.
     * Steps can be configured within the administration interface and scripts have to report the steps once they are done. Multiple custom steps are supported.
     * The script should report the step only once it would be ok with the user interface to show.
     * @param loadStep The load step to report. This should be the name of the step as configured in the administration interface.
     */
    ReportLoadStep(loadStep: string): void;
    /**
     * Clears the current undo stack. As script operations can generate a series of undo items, this function can be used to clear the undo stack.
     */
    ClearUndoItems(): void;
    /**
     * Set the editor status for the given status item. This allows to enable/disable certain editor functionality via a script.
     * @param stat The status item to control.
     * @param value The value to set. The type of the value depends on the status item.
     */
    SetEditorStatus(stat: EditorStatusItems, value: unknown): void;
    /**
     * Interface giving access to the field selection functionality including getting and setting the selection.
     */
    readonly Selection: Selection;
    /**
     * Interface giving access to the current canvas view including the zoom level and the scroll position.
     * Function to retrieve and change the current view.
     */
    readonly View: View;
    /**
     * Interface giving access to data stored via the editor session.
     * - data stored against the user or deparmtnet
     * - data stored against the current product or in general
     * - data files available in the global data folder
     */
    readonly Data: EditorData;
    /**
     * Interface to give access to the custom data category to search for data in a very high performance mode.
     */
    readonly CustomDataCategory: CustomDataCategory;
    /**
     * Interface to give access to all resources:
     * - cliparts
     * - backgrounds
     * - fonts
     * - spot colors
     * - media items
     * - layouts
     * - masks
     * - placeholders
     */
    readonly Resources: Resources;
    /**
     * Localization interface to translate language strings to the current locale variant.
     */
    readonly Loc: Loc;
    /**
     * Interface to give access to the UI functionality. Used to generate custom UI and access other UI elements.
     */
    readonly UI: UI;
    /**
     * Helper methods to do a wide range of tasks.
     */
    readonly Helper: Helper;
    /**
     * The event interface helps for events generated by the editor as well as establish communications between different scripts.
     */
    readonly Events: Events;
    /**
     * The external API gives access to external functionality which is available as server to server communication.
     */
    readonly ExternalApi: ExternalApi;
    /** 
     * The Invent interface gives access to the Invent integration.
    */
    readonly Invent: Invent;
    /**
     * Server side only functionality for batch output creation.
     */
    readonly ServerSide: Serverside;  
    /**
     * The immediate actions interface gives access to the immediate actions functionality. Internal use only.
     */  
    readonly ImmediateActions: ImmediateActions;
}

/**
 * The Editor object is the entry point for all items related to the current editor session.
 */
declare const Editor: EditorHandler;