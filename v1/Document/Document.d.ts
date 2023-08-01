/**
 * This module gives access to all document specific features including:
 * - pages
 * - fields
 * - batch data
 * - general data
 * - global components
 * - document specific properties like id or names
 * - document related functions like reset, saving, etc
 * 
 * @module Document
 */

/**
 * The parameter object for the AddCloneToBasket callback. 
 * It can be used to check success. If the flag is false, check the warnings for further information.
 * It is recommended to display the warnings to the user.
 * If the call was successful, the jobId value will be set for the clone added to the cart.
 */
type AddCloneToBasketResult = {
    /**
     * Indicates whether the call was successful or not.
     */
    success: boolean,
    /**
     * A list of warnings that occurred during the call. Only set if success is false.
     */
    warnings: string[],
    /**
     * The job id of the clone added to the cart. Only set if success is true.
     */
    jobId: number
}

/**
 * The possible values for the global text direction configuration.
 */
declare enum GlobalTextDirection {
    /**
     * The text direction is left to right.
     */
    LTR = 'LTR',
    /**
     * The text direction is right to left.
     */
    RTL = 'RTL',
    /**
     * The text direction is based on the language of the current user.
     */
    BasedOnLanguage = 'BasedOnLanguage'
}

/**
 * The document handler defines functions and properties that allow to control the current job/document.
 */
interface DocumentHandler {
    /**
     * The batch object allows to control elements related to batch operations including the records and the mapping.
     */
    readonly Batch: Batch;
    /**
     * The global object allows to control elements related to the global settings of the job. This includes the canvas, stock or output type as well as dynamic canvas sizes if enabled.
     */
    readonly Global: Global;
    /**
     * The fields object gives access to the fields of the job including field management functions like adding, removing or editing fields.
     */
    readonly Fields: object;
    /**
     * The data object gives access to the data stored against the job itself.
     */
    readonly Data: Data;
    /**
     * The pages object gives access to the pages of the job including page management functions like adding, removing or editing pages.
     */
    readonly Pages: object;    
    /**
     * Retrieve the product id of the product currently being edited.
     * @returns {number} Returns the product id of the product currently being edited. 
     */
    ProductId(): number;
    /**
     * Retrieve the job id of the job currently being edited. Every job will always have a unique job id.
     * @returns {number} Returns the job id of the job currently being edited.
     */
    JobId(): number;
    /**
     * Retrieve the order product variant id of the job being edited. Only available if the job has been ordered already.
     * Otherwise this will return -1.
     * @returns {number} Returns the order product variant id of the job being edited.
     */
    OpvId(): number;
    /**
     * Resets the current job to the default state. This will clear any custom adjustments made to the job.
     * Including pages added, layouts selected, fields added or edited, etc.
     * The editor will reload after the reset has been initiated, meaning that the script will stop executing shortly after this call.
     */
    Reset(): void;
    /**
     * Adds the current job to the basket. If the item is already in the cart it will simply be saved.
     * This will make any changes made to the job permanent. The editor will unload once the job has been saved and the item has been added to cart.
     * The script will stop executing shortly after this call.
     * If the job was previously saved as a project it will be removed, as a job can be only in one place at a time - either cart or saved project.
     */
    AddToBasket(): void;
    /**
     * Adds the current job to the basket as a clone, but keeps the editor and the job open.
     * This is useful if you want to allow the user to continue editing the job after adding it to the cart.
     * 
     * Once the clone has been added, the optional callback will be triggered with information about the result. 
     * @param callback The callback function that will be triggered once the process has finished. Check the parameter about success, warnings and the job id of the clone.
     */
    AddCloneToBasket(callback: (result: AddCloneToBasketResult) => void): void;
    /**
     * Sets the custom name of the job. The custom name is stored against the basket item and later against the order line item and can be used by the user to identify and label the job.
     * The custom name is also available in other areas of the system like invoices and MIS connections.
     * @param name The custom name to set. Maximum lengths is 254 characters. Can be an empty string.
     * @param callback The callback function that will be triggered once the process has finished. Check the parameter about success, to control if the custom name could be set.
     */
    SetCustomName(name: string, callback: (success: boolean) => void): void;
    /**
     * Sets the job quantity. This will be stored against the basket item and later against the order line item.
     * If the job has been ordered already, this function will fail and return false.
     * Setting the quantity will also update the price if displayed in the editor and will log price script messages
     * @param quantity The new quantity to set. Must be a positive number. Note: the code will not validate if the quantity is valid (e.g. pack quantity, quantity tiers etc). The code is responsible to provide a valid quantity value.
     * @param callback The callback will be triggered once the process has finished. Check the parameter about success, to control if the quantity could be set.
     */
    SetQuantity(quantity: number, callback: (success: boolean) => void): void;
    /**
     * Sets a product attribute specified by name with the given value. 
     * If the product attribute does not exist it will create it on the fly and add it to the product. This is the only situation where the optional parameter createHidden is relevant.
     * 
     * The product attribute value will not be validated. It is the responsibility of the code to provide a valid value. For enumerated values (dropdown, radio buttons, etc), the value must be the id of the option.
     * @param attributeName The name of the product attribute to set. If the product attribute does not exist it will be created on the fly and added to the product.
     * @param value The new value to set. The value will not be validated.
     * @param callback The callback will be triggered once the process has finished. Check the parameter about success, to control if the product attribute could be set. Note that the calls to set product attributes are debounced in case of many subsequent calls, only a single AJAX call will be triggered.
     * @param createHidden Boolean flag to control if the new attribute should be created hidden or as an info type attribute. This only applies if the attribute does not exist yet.
     */
    SetProductAttribute(
        attributeName: string,
        value: string | number | boolean,
        callback?: () => void,
        createHidden?: boolean
    ): void;
    /**
     * Sets multiple product attributes at once. This is a convenience function to set multiple attributes at once. See SetProductAttribute for more details.
     * @param attributes A dictionary of attributes to set. The key is the attribute name, the value is the attribute value. The value will not be validated. Unknown attributes will be created on the fly and added to the product.
     * @param callback The callback will be triggered once the process has finished. Check the parameter about success, to control if the product attributes could be set. Note that the calls to set product attributes are debounced in case of many subsequent calls, only a single AJAX call will be triggered.
     * @param createHidden Boolean flag to control if the new attribute should be created hidden or as an info type attribute. This only applies if the attribute does not exist yet.
     */
    SetProductAttributes(attributes: { [key: string]: string | number | boolean }, callback?: () => void, createHidden?: boolean): void;
    /**
     * This function saves the current job as a project. This will then unload the editor and load the saved project list.
     * If the job was previously added to the cart it will be removed, as a job can be only in one place at a time - either cart or saved project.
     * @param callback 'The callback will be called once it has been saved. Note that the editor will unload after the save has been initiated, meaning that the script will stop executing shortly after this call.
     */
    SaveAsProject(callback?: () => void): void;
    /**
     * Saves the current setup as the product default. The product default is the clean template version of the current job. This means all content will be removed (text/images/etc).
     * This function can only be called in an administration context. 
     * If the product is currently in use (aka has been ordered already) this function will trigger a confirmation dialog to warn the user that the product is in use and that the product default will not be used by existing orders.
     * @param callback The callback will be triggered if the default product has been saved correctly. It will not be triggered if it couldn't be saved or if the user cancelled the confirmation dialog.
     */
    SaveAsProductDefault(callback?: () => void): void;
    /**
     * Method to check if there have been any changes to the job since it was last saved.
     * @returns Returns true if the job is dirty and needs to be saved. Returns false if the job is clean and does not need to be saved.
     */
    NeedSave(): boolean;
    /**
     * This function can be used in an embedded context to save the job.
     * It will only work in an embedded context when the editor is embedded in a 3rd party application. E.g. in our external store plugins for Shopify and Magento.
     * @param callback The callback will be called once the save has finished. Check the parameter about success, to control if the save was successful. If the context is incorrect, it will not trigger the callback.
     */
    SaveEmbedded(callback?: (success: boolean) => void): void;
    /**
     * This function can be used in a non-embedded context to save the job.
     * It will only work in a non-embedded context.
     * Note: for normal operations, add to cart and saved project should be used. Save should only be used for internal purposes.
     * @param callback The callback will be called once the save has finished. Check the parameter about success, to control if the save was successful. If the context is incorrect, it will not trigger the callback.
     * @param callback 
     */
    Save(callback?: () => void): void;
    /**
     * This function helps to retrieve the current price of the product to use within the scripting context.
     * The price will be automatically calculated based on the product configuration, number of pages and global configuration, quantity and attributes as well as optional media costs.
     * @param callback The callback to return the price. The price will be passed as a parameter to the callback function. Can be null to use the non-callback version.
     * @param unitPriceOnly Flag to control if the price should be the unit price or the total price based on the quantity.
     * @param skipFormat Flag to control if the price should be formatted or not. If true, the price will be returned as a number. If false, the price will be returned as a formatted string.
     * @returns The final price.
     */
    Price(callback?: (number) => void, unitPriceOnly?: boolean, skipFormat?: boolean): number;
    /**
     * Little helper to get the localized name of the product.
     * @returns Returns the localized name of the product.
     */
    Name(): string;
    /**
     * This will return the current global text direction of the editor.
     * @returns The text direction of the editor.
     */
    GetBaseDirection(): GlobalTextDirection;
    /**
     * Sets the new global text direction of the editor.
     * @param direction The new text direction of the editor.
     */
    SetBaseDirection(direction: GlobalTextDirection): void;
}

/**
 * The Document object is the entry point for all items related to the current document or job. 
 * This includes the content of the job (fields, pages), the data stored against the document, product attributes, ids or name and provides functions to save the job or add it to the cart.
 */
declare const Document: DocumentHandler;