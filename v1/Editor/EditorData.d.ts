/**
 * This module grants access to data configured against the storefront through various means.
 * - Scoped data can be used to read (and potentially write based on ACL's) data via scripting. This is good for small to medium data sets where the scope can help creating the correct functionality.
 * - Global additional data gives access to files uploaded in the administration interface. This is good for data which is available as files - potentially slightly larger - or for data in binary format.
 * - Custom data categories can be used to retrieve data available in a fast search engine (and optionally also modify). This is great for large data sets.
 * @module  Editor / Editor Data
 */

/**
 * Specifies the data target for the editor data. The target specifies how the data is stored and retrieved.
 * Note that wriate access is not available to all targets for all users.
 */
declare enum EditorDataTarget {
    /**
     * The job target stores the data against the current document. This is the same as when using {@link DocumentHandler.Data}. Can be always read and written.
     */
    Job = 'Job',
    /**
     * Stores data against the product. This data is available to all users when using this product, but only MegaEdit administrators or users with the 'ManageScriptDataPerProduct' ACL can write to this data.
     */
    Product = 'Product',
    /**
     * Stores data against the current user. This data is available for the current user only, but independent of product and job. Can be always read and written.
     */
    User = 'User',
    /**
     * Stores data against the current user and the current product. The current user can retrieve this data for the any jobs of the current product. Can be always read and written.
     */
    UserAndProduct = 'UserAndProduct',
    /**
     * Data is stored against the department. This data is available to all users of the department. Can be always read and written to.
     */
    Department = 'Department',
    /**
     * Data is stored in a general context. Everyone can access this data, but only MegaEdit administrators or users with the 'ManageScriptDataGeneral' ACL can write to this data.
     */
    General = 'General',
    /**
     * Access data stored in the external data store per product. This is read only, this can be configured in administration.
     */
    ProductExternal = 'ProductExternal'
}

/**
 * The result object returned as array by the {@link EditorData.GetProductExternalKeys} function.
 */
type ProductExternalKeysResponse = {
    /**
     * The key of the external product data entry.
     */
    Key: string;
}

/**
 * The result object returned as array by the {@link EditorData.GetAllProductExternalItems} function.
 */
type ProductExternalDataResponse = {
    /** 
     * The key of the external product data entry.
    */
    Key: string;
    /**
     * The actual data for the external product data entry.
     */
    Data: unknown;
}

/**
 * Response object for the list function (see {@link EditorData.GlobalAdditionalData}).
 */
type GlobalAdditionalDataListing = {
    /**
     * Flag indicating that the directory exists.
     */
    ok: boolean;
    /**
     * The files within the directory, only set if the directory exists.
     */
    files: string[];
}

/** 
 * Response object for the get function (see {@link EditorData.GlobalAdditionalData}).
 */
type GlobalAdditionalDataResult = {
    /**
     * Flag indicating that the file exists.
     */
    ok: boolean;
    /**
     * The content will either contain the file contents if _direct_ is true, or the URL to the file if _direct_ is false.
     */
    content: string;
}

/**
 * Retrieve data on the editor level through different mechanisms and scopes.
 */
interface EditorData {
    /**
     * Get arbitriary data from the editor. This data is stored against the _target_ scope which gives control how this data can be reused.
     * E.g. you could store the data against the user and product - so subsequent jobs of the same product can retrieve the data (e.g. for default values).
     * Or you can store data agains the user, so in any product the user can retrieve the data (e.g. personal calendar entries).
     * Or the data is available for all products and everyone (e.g. public bank holidays).
     * 
     * @param target The scope the data is stored against.
     * @param key The key of the data to retrieve. Please use a naming convention to avoid collissions.
     * @param callback The callback function which will be called with the data once ith as been retrieved.
     */
    Get<T>(target: EditorDataTarget, key: string, callback: (data: T) => void): void;
    /**
     * Store arbitriary data against the editor. This data is stored against the _target_ scope which gives control how this data can be reused.
     * See {@link EditorData.Get} for more information.
     * @param target The scope the data is stored against.
     * @param key The key of the data to store. Please use a naming convention to avoid collissions.
     * @param value The value to store.
     * @param callback The callback function which will be called with the success state of the operation.
     */
    Set<T>(target: EditorDataTarget, key: string, value: T, callback: (success: boolean) => void): void;
    /**
     * Get all available external product data entry keys.
     * @param callback The callback function which will be called with the data once it has been retrieved. It will return an array of keys.
     */
    GetProductExternalKeys(callback: (keys: ProductExternalKeysResponse[]) => void): void;
    /**
     * Return the product external data object by a given key.
     * @param key The key to retrieve.
     * @param callback The callback function which will be called with the data once it has been retrieved.
     */
    GetProductExternalByKey<T>(key: string, callback: (result: T) => void): void;
    /**
     * Get all product external items assigned to the product.
     * @param callback The callback function which will be called with the data once it has been retrieved.
     */
    GetAllProductExternalItems(callback: (result: ProductExternalDataResponse[]) => void): void;
    /**
     * Get global additional data resources uploaded in admin. Those are file based resources. 
     * Note that in order to use these resources, special ACL's have to be configured for the user.
     */
    readonly GlobalAdditionalData: {
        /**
         * Get a list of all available files in the specified directory. User must have the 'GlobalAdditionalDataListing' ACL.
         * @param directory The directory to check
         * @param callback The callback function which will be called with the result once the listing is available.
         */
        List(directory: string, callback: (result: GlobalAdditionalDataListing) => void): void;
        /**
         * Get the content of a specified file, either directly as the result or a link to load the file content. User must have the 'GlobalAdditionalDataGet' ACL.
         * @param file The relative file name including the directory and the file name.
         * @param direct Flag to indicate if the content should be returned directly or as a link to load the content. This is specifically important if the file is in a binary format (e.g. images).
         * @param callback The callback function which will be called with the result once the content is available.
         */
        Get(file: string, direct: boolean, callback: (result: GlobalAdditionalDataResult) => void): void;
    };
}

/**
 * The response object returned as array by the {@link CustomDataCategory.GetCategories} function.
 * This holds not only information about the category like id and name, but also how many items are stored in the category and an example item.
 */
type CustomDataCategoryResponse = {
    /**
     * The id of the category.
     */
    id: number;
    /**
     * The name of the category.
     */
    name: string;
    /**
     * The number of items stored in the category.
     */
    count: number;
    /**
     * The first item stored in the category. This is an example item to show the structure of the data stored in the category, and can be used to understand the columns as well as the potential values better.
     */
    exampleData: unknown;
}

/**
 * Interface to access the custom data category feature. Data is administrated in the administration interface, stored in a fast search engine and can be retrieved in the script.
 * The search data is stored schemaless and objects of any kind can be used within the category. The only requirement is that the objects are flat and do not contain any nested objects.
 * Note that every user has access to this (optionally filtered by department) to read, but writing to it will be controlled via ACL's.
 */
interface CustomDataCategory {
    /**
     * Get a list of all available custom data categories. Custom data categories can be linked to departments, meaning that only users of that department can use them. Unlinked categories are available to all users.
     * @param optionalNamePattern An optional name pattern to filter the categories. If not specified, all categories are returned.
     * @param callback The callback function which will be called with the result once the categories are available.
     */
    GetCategories(optionalNamePattern: string, callback: (categories: CustomDataCategoryResponse[]) => void): void;
    /**
     * Return data from a custom data category in a paged manner. The data is returned as an array of objects, where each object represents one row in the category.
     * Every item will always have a unique identifier generated by the system. This identifier can be used to delete or update the item.
     * This is used to retrieve essentially a list of available data. See also {@link CustomDataCategory.Search} to search for specific data.
     * 
     * @param categoryOrId The category to retrieve the data from. This can either be the category object returned by the {@link CustomDataCategory.GetCategories} function, or the id of the category.
     * @param page The page to retrieve. The first page is 0.
     * @param pageSize The page size to retrieve. The maximum page size is 100 and is currently not configurable.
     * @param callback The callback function which will be called with the result once the data is available.
     */
    Get(categoryOrId: CustomDataCategoryResponse | number, page: number, pageSize: number, callback: (data: unknown[]) => void): void;
    /**
     * Deletes a given item from the data category. Requires either a MegaEdit administrator user or the 'ManageScriptDataGeneral' ACL
     * @param categoryOrId The category object or id of the category to delete the item from. Must be a category the user has access too.
     * @param itemKey The item key to delete. This is the unique identifier of the item.
     * @param callback The callback function which will be called with the result once the item has been deleted.
     */
    Delete(categoryOrId: CustomDataCategoryResponse | number, itemKey: string, callback: (success: boolean) => void): void;
    /**
     * Saves a given item to the data category. This works in two modes:
     * - Update operation by providing an item key. The values of the object will be update based on the parameters provided.
     * - Create operation by passing 'null' as the item key. The system will then automatically generate a new identifier and insert the item. Note: currently there is no way to retrieve the id of the newly created item.
     * @param categoryOrId The category object or id of the category to save the item to. Must be a category the user has access too.
     * @param itemKey The item key to update. Use _null_ to create a new item.
     * @param obj The object to update or create. Must be a flat object and have the data properties as defined for the objects within the category.
     * @param callback The callback function which will be called with the result once the item has been saved.
     */
    Save(categoryOrId: CustomDataCategoryResponse | number, itemKey: string, obj: unknown, callback: (success: boolean) => void): void;
    /**
     * Performs a search in the data category. Every property can be searched, specified via the _key_ parameter and the given _value_.
     * @param categoryOrId The category object or id of the category to search in. Must be a category the user has access too.
     * @param key The property to search for.
     * @param value The value to search for.
     * @param page The page to retrieve. The first page is 0.
     * @param pageSize The page size to retrieve. The maximum page size is 100 and is currently not configurable.
     * @param exactMatch Flag to control if the search should be an exact match or a partial match.
     * @param callback The callback function which will be called with the result once the data is available.
     */
    Search(categoryOrId: CustomDataCategoryResponse | number, key: string, value: string, page: number, pageSize: number, exactMatch: boolean, callback: (data: unknown[]) => void): void;
}