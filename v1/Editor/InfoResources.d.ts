/**
 * The info resource interface gives access to the storefront information.
 * - reading Editable content information
 * - reading user information
 * - reading department information
 * - reading product and category information
 * - adjusting category entity values
 * 
 * @module Editor / Resources / Info
 */

/**
 * Defines how the price adjustment is applied.
 */
declare enum ProductAttributePriceAdjustmentType {
    /**
     * The price adjustment is done based on a percentage of the base price.
     */
    Percent = 'Percent',
    /**
     * The price adjustment is adding a fixed amount to the base price.
     */
    Absolute = 'Absolute'
}

/**
 * Product attribute value information model - used for attributes which have a configurable set of values (dropdown/radio list).
 */
type ScriptProductAttributesPossibleValue = {
    /**
     * The id of the product attribute value.
     */
    Id: number;
    /**
     * The name of the attribute value.
     */
    Name: string;
    /**
     * The price adjustment this value has.
     */
    PriceAdjustment: number;
    /**
     * The type of the price adjustment defining how the price adjustment is applied.
     */
    PriceAdjustmentType: ProductAttributePriceAdjustmentType;
    /**
     * The HTML info is HTML content available to display for the attribute value.
     */
    HtmlInfo: string | null;
    /**
     * This flag indicates if the value is preselected by default. Should be only set for a single value per attribute.
     */
    IsPreSelected: boolean;
    /**
     * This flag indicates if the value is disabled. Disabled values cannot be selected.
     */
    IsDisabled: boolean;
    /**
     * The weight adjustment this value has (absolute adjustment).
     */
    WeightAdjustment: number;
    /**
     * The width adjustment this value has (absolute adjustment).
     */
    WidthAdjustment: number;
    /**
     * The height adjustment this value has (absolute adjustment).
     */
    HeightAdjustment: number;
    /**
     * The length adjustment this value has (absolute adjustment).
     */
    LengthAdjustment: number;
    /**
     * The display order defines in which order the values should be presented.
     */
    DisplayOrder: number;
    /**
     * The friendly name of the attribute value.
     */
    FriendlyName: string;
}

/**
 * The type of the product attribute (control type).
 */
declare enum AttributeControlType {
    /**
     * A dropdown list allowing to make a single selection.
     */
    DropdownList = 1,
    /**
     * A radio list allowing to make a single selection.
     */
    RadioList = 2,
    /**
     * Checkboxes with multiple values.
     */
    Checkboxes = 3,
    /**
     * A single line text box.
     */
    TextBox = 4,
    /**
     * A multiline text box.
     */
    MultilineTextbox = 10,
    /**
     * A date picker.
     */
    Datepicker = 20,
    /**
     * A file upload control.
     */
    FileUpload = 30,
    /**
     * A readonly label. Set via scripting (price scripts, MegaEdit scripts, etc.) only.
     */
    Info = 40,
    /**
     * A schema attribute is used to display the key/values of the product attribute in a hidden HTML entry - available for scripting and other code based retrieval.
     */
    HtmlSchema = 50,
    /**
     * A hidden attribute. Set via scripting (price scripts, MegaEdit scripts, etc.) only, but not visible to the user.
     * Only available in admin and via scripting/api.
     */
    Hidden = 999
}

/**
 * Product attribute information model, holding product info for the attribute as well as the current value of the job.
 */
type ScriptProductAttributes = {
    /**
     * Id of the product attribute.
     */
    Id: number;
    /**
     * Name of the product attribute.
     */
    Name: string;
    /**
     * The text prompt as configured for the product attribute.
     */
    TextPrompt: string | null;
    /**
     * The current value of the job for this product attribute.
     */
    Value: string;
    /**
     * Flagi indicating if the product attribute is required.
     */
    IsRequired: boolean;
    /**
     * The type of the product attribute (control type).
     */
    Type: AttributeControlType;
    /**
     * The display order of the product attribute.
     */
    DisplayOrder: number;
    /**
     * If this is an attribute with configurable values (dropdown/radio list), this property will contain the possible values.
     */
    PossibleValues: ScriptProductAttributesPossibleValue[];
}

/**
 * Product attribute combination information model for the attributes.
 */
type ScriptProductAttributeCombinationAttribute = {
    /**
     * The id of the product attribute
     */
    Id: number;
    /**
     * The name of the product attribute
     */
    Name: string;
    /**
     * The values of the product attribute to match the combination.
     */
    Value: string[];
}

/**
 * Product image information model.
 */
type ScriptProductImage = {
    /**
     * The id of the image
     */
    Id: number;
    /**
     * The display order of the image.
     */
    DisplayOrder: number;
    /**
     * The mime type of the image.
     */
    MimeType: string;
    /**
     * The search engine friendly name of the image.
     */
    SeoFilename: string;
    /**
     * The url to the product image.
     */
    PictureUrl: string;
}

/**
 * Product attribute combination information model.
 */
type ScriptProductAttributeCombination = {
    /**
     * The sku of the product attribute combination.
     */
    Sku: string;
    /**
     * The stock quantity of the product attribute combination.
     */
    StockQuantity: number;
    /**
     * Flag to control if the product attribute combination is published.
     */
    Published: boolean;
    /**
     * Allow out of stock orders or backorders for this combination.
     */
    AllowOutOfStockOrders: boolean;
    /**
     * The list of images specific to the product attribute combination.
     */
    Pictures: ScriptProductImage[];
    /**
     * The attributes and values making up the combination.
     */
    Attributes: ScriptProductAttributeCombinationAttribute[];
}

/**
 * Product information model - holding information of the product matched with the current job from a product perspective.
 */
type ScriptProductModel = {
    /**
     * The id of the product.
     */
    Id: number;
    /**
     * The name of the product (not localized).
     */
    Name: string;
    /**
     * The short description of the product (not localized).
     */
    ShortDescription: string;
    /**
     * The full description of the product (not localized).
     */
    FullDescription: string;
    /**
     * The additional description of the product (not localized).
     */
    AdditionalDescription: string;
    /**
     * Flag to indicate if the product is visible in the home page/main page.
     */
    ShowOnHomePage: boolean;
    /**
     * Flag to indicate if the product is visible and usable in the catalog.
     */
    Published: boolean;
    /**
     * Optional video code to embed a video in the product page.
     */
    EmbedVideoCode: string;
    /**
     * The list of all assigned category id's sorted by the display order.
     */
    CategoryIds: number[];
    /**
     * The product tags assigned to this product.
     */
    ProductTags: string[];
    /**
     * The product image url's sorted by the display order.
     */
    ProductImageUrls: string[];
    /**
     * The specification attributes as key value pairs.
     */
    SpecificationAttributes: { [key: string]: string };
    /**
     * The optional print location name assigned to this product.
     */
    PrintLocationName: string;
    /**
     * The score as configured in admin for the product (as a means of ranking).
     * If nothing is set, the score will be -1.
     */
    Score: number;
    /**
     * If views are tracked, this shows the number of views of the product landing page.
     */
    Views: number;
    /**
     * The created date of the product in UTC format as an object format string with ticks.
     */
    CreatedOnUtc: string;
    /**
     * The updated date of the product in UTC format as an object format string with ticks.
     */
    UpdatedOnUtc: string;
    /**
     * [Job] The custom name (if any) of the job.
     */
    CustomName: string;
    /**
     * The meta keywords as configured in the SEO part for this product.
     */
    MetaKeywords: string;
    /**
     * The meta description as configured in the SEO part for this product.
     */
    MetaDescription: string;
    /**
     * The meta title as configured in the SEO part for this product.
     */
    MetaTitle: string;
    /**
     * The search engine friendly name of the product.
     */
    SeName: string;
    /**
     * The open graph title as configured in the SEO part for this product.
     */
    OpenGraphTitle: string;
    /**
     * The open graph description as configured in the SEO part for this product.
     */
    OpenGraphDescription: string;
    /**
     * The open graph picture url as configured in the SEO part for this product (image uploaded in the SEO settings).
     */
    OpenGraphPictureUrl: string;
    /**
     * The configured product SKU of the base product.
     */
    Sku: string;
    /**
     * The configured attribute combinations for this product. Attribute combinations can have their own sku, stock quantity, images etc.
     */
    AttributeCombinations: ScriptProductAttributeCombination[];
    /**
     * [Job] The currently set quantity of the job.
     */
    Quantity: number;
    /**
     * [Job] The weight of the job in the configured weight unit.
     */
    Weight: number;
    /**
     * [Job] The width of the job in the configured dimension unit.
     */
    Width: number;
    /**
     * [Job] The height of the job in the configured dimension unit.
     */
    Height: number;
    /**
     * [Job] The length of the job in the configured dimension unit.
     */
    Length: number;
    /**
     * [Job][Product] The product attributes of the product (with the values of the job).
     */
    Attributes: ScriptProductAttributes[];
}

/**
 * Address Information model.
 */
type ScriptAddressModel = {
    /**
     * The id of the address.
     */
    Id: number;
    /**
     * Address line 1.
     */
    Address1: string;
    /**
     * Address line 2.
     */
    Address2: string;
    /**
     * The city.
     */
    City: string
    /**
     * The ZIP code.
     */;
    ZipPostalCode: string;
    /**
     * The phone number of the address.
     */
    PhoneNumber: string;
    /**
     * The fax number of the address.
     */
    FaxNumber: string;
    /**
     * The email of the address.
     */    
    Email: string;
    /**
     * The company name of the address.
     */
    Company: string;
    /**
     * The first name of the recipient.
     */
    FirstName: string;
    /**
     * The last name of the recipient.
     */
    LastName: string;
    /**
     * The country name of the address.
     */
    Country: string;
    /**
     * The 3 letter ISO code of the country.
     */
    CountryCode: string;
    /**
     * The state or province of the address.
     */
    StateProvince: string;
    /**
     * Flag indicating if the address should not be shown to the customer.
     */
    HideAddressFromCustomer: boolean;
}

/**
 * Customer information model.
 */
type ScriptCustomerModel = {
    /**
     * The customer id.
     */
    Id: number;
    /**
     * The created date of the customer in UTC format as an object format string with ticks.
     */
    CreatedOnUtc: string;
    /**
     * The updated date of the customer in UTC format as an object format string with ticks.
     */
    UpdatedOnUtc: string;
    /**
     * The customer guid
     */
    CustomerGuid: string;
    /**
     * The user name of the customer.
     */
    Username: string;
    /**
     * The email address of the customer.
     */
    Email: string;
    /**
     * The preferred language of the customer as the language name.
     */
    Language: string;
    /**
     * The preferred currency of the customer as the currency code.
     */
    Currency: string;
    /**
     * The customer title (Mr, Mrs, etc.)
     */
    Title: string;
    /**
     * The department id or null if the customer is not assigned to a department.
     */
    DepartmentId: number | null;
    /**
     * The print location name if the user is assigned to a print location.
     */
    PrintLocation: string;
    /**
     * An array of all assigned customer roles by name.
     */
    CustomerRoles: string[];
    /**
     * If the user has an avatar, this property will contain the relative link to the avatar image.
     */
    AvatarUrl: string;
    /**
     * All customer attributes as key value pairs.
     */
    Attributes: { [key: string]: string };
    /**
     * An object with all relationships wher the current user is the subordinate.
     * The key is the relationship type, and the value is an array of customer id's with all principals.
     * This is a restricted property and will not always be filled.
     */
    SubordinateRelationShips: { [key: string]: number[] };
    /**
     * An object with all relationships wher the current user is the principal.
     * The key is the relationship type, and the value is an array of customer id's with all subordinates.
     * This is a restricted property and will not always be filled.
     */
    PrincipalRelationShips: { [key: string]: number[] };
    /**
     * All addresses of the customer.
     * This is a restricted property and will not always be filled.
     */
    Addresses: ScriptAddressModel[];
    /**
     * The configured billing address or null if the user has no billing address set.
     * This is a restricted property and will not always be filled.
     */
    BillingAddress: ScriptAddressModel;
    /**
     * Flag indicating if the user has permissions to update category data. ACL permission _PublicStoreEditCategoryEntity_.
     */
    CanUpdateCategoryData: boolean;
    /**
     * Flag indicating if the user has permissions to insert category data. ACL permission _PublicStoreAddCategoryEntity_.
     */
    CanInsertCategoryData: boolean;
    /**
     * Flag indicating if the user has permissions to list all global additional data resource files. ACL permission _GlobalAdditionalDataListing_.
     */
    
    CanListGlobalAdditionalData: boolean;
    /**
     * Flag indicating if the user has permissions to load any global additional data resource file. ACL permission _GlobalAdditionalDataGet_.
     */
    CanGetGlobalAdditionalData: boolean;
}

/**
 * The type of the category entity entry.
 */
declare enum CategoryEntityValueType {
    Text = 'text',
    Textarea = 'textarea',
    Int = 'int',
    Float = 'float',
    Checkbox = 'checkbox',
    Dropdown = 'dropdown',
    Radio = 'radio'
}

/**
 * Category entity data model.
 */
type ScriptCategoryDataModel = {
    /**
     * The type of the category entity value.
     */
    Type: CategoryEntityValueType;
    /**
     * The type configuration allows optional or mandatory values to configure the type in more detail.
     * - Text & TextArea: Optional max length of the text value (integer only).
     * - Int: text with the format: min={integer};max={integer};step={integer}
     * - Float: text with the format: min={float};max={float};inc={float}
     * - Checkbox: not supported
     * - Dropdown & Radio: pipe separated list of values
     */
    TypeConfiguration: string;
    /**
     * The value of the category entity in string format.
     */
    Value: string;
    /**
     * The created date of the category entity in UTC format as an object format string with ticks.
     */
    CreatedOnUtc: string;
    /**
     * The updated date of the category entity in UTC format as an object format string with ticks.
     */
    UpdatedOnUtc: string;
}

/**
 * Category information model.
 */
type ScriptCategoryModel = {
    /**
     * The id of the category.
     */
    Id: number;
    /**
     * The name of the category (not localized)
     */
    Name: string;
    /**
     * The description of the category (not localized)
     */
    Description: string;
    /**
     * The products assigned to the category by id ordered by the display order.
     */
    ProductIds: number[];
    /**
     * The sub categories within the category by id.
     */
    CategoryIds: number[];
    /**
     * The parent category id or null if the category is a root category.
     */
    ParentCategoryId: number | null;
    /**
     * The page size configured for the product indicating how many products should be shown per page.
     */
    PageSize: number;
    /**
     * Flag to indicate if the category is visible in the home page/main page.
     */
    ShowOnHomePage: boolean;
    /**
     * Flag to indicate if the category is visible and usable in the catalog.
     */
    Published: boolean;
    /**
     * The display order of the category.
     */
    DisplayOrder: number;
    /**
     * The created date of the category in UTC format as an object format string with ticks.
     */
    CreatedOnUtc: string;
    /**
     * The updated date of the category in UTC format as an object format string with ticks.
     */
    UpdatedOnUtc: string;
    /**
     * The category picture url if an image has been uploaded.
     */
    CategoryPictureUrl: string;
    /**
     * The category data available for the category. Category data are key/value pairs stored against a category and available to be retrieved by products within that category.
     * With the right permissions, the user can also edit/change those values.
     * The key here is hte category entity key, and the value is the category data model.
     */
    CategoryData: { [key: string]: ScriptCategoryDataModel };
    /**
     * The meta keywords as configured in the SEO part for this category.
     */
    MetaKeywords: string;
    /**
     * The meta description as configured in the SEO part for this category.
     */
    MetaDescription: string;
    /**
     * The meta title as configured in the SEO part for this category.
     */
    Metatitle: string;
    /**
     * The search engine friendly name of the category.
     */
    SeName: string;
    /**
     * The open graph title as configured in the SEO part for this category.
     */
    OpenGraphTitle: string;
    /**
     * The open graph description as configured in the SEO part for this category.
     */
    OpenGraphDescription: string;
    /**
     * The open graph picture url as configured in the SEO part for this category (image uploaded in the SEO settings).
     */
    OpenGraphPictureUrl: string;
}

/**
 * The editable content list model is used to retrieve the listing of all available editable content entries.
 */
type ScriptEditableContentListModel = {
    /**
     * The id of the editable content.
     */
    Id: number;
    /**
     * The system name of the editable content.
     */
    SystemName: string;
}

/**
 * Editable content information model.
 */
type ScriptEditableContentModel = {
    /**
     * The id of the editable content.
     */
    Id: number;
    /**
     * The system name of the editable content.
     */
    SystemName: string;
    /**
     * The title as configured for the editable content.
     */
    Title: string;
    /**
     * The body of the editable content.
     */
    Content: string;
}

/**
 * Department information model.
 */
type ScriptDepartmentModel = {
    /**
     * The id of the department.
     */
    Id: number;
    /**
     * The name of the department.
     */
    Name: string;
    /**
     * The department description.
     */
    Description: string;
    /**
     * The costcode as configured for the department.
     */
    CostCode: string;
    /**
     * The PL code as configured for the department.
     */
    PLCode: string;
    /**
     * The list of all assigned customer id's.
     */
    CustomerIds: number[];
    /**
     * All linked addresses for that department.
     */
    Addresses: ScriptAddressModel[];
    /**
     * The created date of the department in UTC format as an object format string with ticks.
     */
    CreatedOnUtc: string;
    /**
     * The updated date of the department in UTC format as an object format string with ticks.
     */
    UpdatedOnUtc: string;
}

/**
 * Numeric identifier for the script info to retrieve.
 */
declare enum ScriptInfoType {
    /**
     * Product entity.
     */
    Product = 1,
    /**
     * Category entity.
     */
    Category = 2,
    /**
     * Customer entity.
     */
    UserInfo = 3,
    /**
     * Department entity.
     */
    DepartmentInfo = 4,
    /**
     * Editable content entity.
     */
    EditableContent = 5,
}

/**
 * Generic holder for the script info response.
 */
interface ScriptInfoResponse<T> {
    /**
     * The data holder. May be null if the dat adoes not exist.
     */
    Data: T | null;
    /**
     * The type of the response.
     */
    Type: ScriptInfoType;
    /**
     * The entity identifier.
     */
    Id: number;
}

/**
 * Load specific resources of the storefront. This can be used to load multiple entries in one go by specifying the id's of the resources to load.
 * If you pass _null_ or _0_ as the id, the resource will be loaded for the current product, category, user etc.
 * 
 * Note that there may be additional restrictions on what can be loaded. For example, the user may not have the necessary permissions to load the requested resource.
 */
interface InfoResource {
    /**
     * Load user information. See {@link ScriptCustomerModel} for more information.
     * Usually this is used to load the current user information by passing _null_ or _0_ as the id.
     * But you can load other customer id's as well, in which case the user must have the necessary permissions to load the requested customer:
     * - the current user is an administrator
     * - the current user and the requested users are in the same department and the current user has the _RequestDepartmentInformation_ ACL permission.
     * - the current user and the requested user are in relationship where the current user is the principal and the requested user is the subordinate.
     * 
     * In case of the last option (principal vs subordinate), the information included will be limited.
     * 
     * @param callback The callback function to execute when the server response is received.
     * @param idOrIds If not specified or 0, return the current user information. Alternatively the customers to load. Note that the user must have the necessary permissions to load the requested customers.
     */
    User(callback: (customers: ScriptInfoResponse<ScriptCustomerModel>[]) => void, idOrIds: number | number[] | null): void;
    /**
     * Load product information. See {@link ScriptProductModel} for more information.
     * Usually this is used to load the current product information by passing _null_ or _0_ as the id. This will also include the job information and populate the data in the model.
     * But you can load other product id's as well, in which case the user must have access to those products (access permission).
     * @param callback The callback function to execute when the server response is received.
     * @param idOrIds If not specified or 0, return the current product information. Alternatively the products to load. Note that the user must have access to the requested products.
     */
    Product(callback: (data: ScriptInfoResponse<ScriptProductModel>[]) => void, idOrIds?: number | number[] | null): void;
    /**
     * Load category information. See {@link ScriptCategoryModel} for more information.
     * Usually this is used to load the current category information by passing _null_ or _0_ as the id.
     * But you can load other category id's as well, in which case the user must have access to those categories (access permission).
     * @param callback The callback function to execute when the server response is received.
     * @param idOrIds If not specified or 0, return the current category information. Alternatively the categories to load. Note that the user must have access to the requested categories.
     */
    Category(callback: (data: ScriptInfoResponse<ScriptCategoryModel>[]) => void, idOrIds?: number | number[] | null): void;
    /**
     * The department information. See {@link ScriptDepartmentModel} for more information.
     * Usually this is used to load the department information of the current user by passing _null_ or _0_ as the id.
     * But you can load other department id's as well, in which case the user must have the necessary permissions to load the requested department:
     * - the current user is an administrator
     * - the user is in the specified department
     * - the user has the _RequestDepartmentInformation_ ACL permission.
     * @param callback The callback function to execute when the server response is received.
     * @param idOrIds If not specified or 0, return the current department information. Alternatively the departments to load. Note that the user must have the necessary permissions to load the requested departments.
     */
    Department(callback: (data: ScriptInfoResponse<ScriptDepartmentModel>[]) => void, idOrIds?: number | number[] | null): void;
    /**
     * Load the specified editable content entries. See {@link ScriptEditableContentModel} for more information.
     * The editable content can be used to display the HTML within the editor and have it configurable in admin.
     * @param callback The callback function to execute when the server response is received.
     * @param idOrIds The id or ids of the editable content entries to load.
     */
    EditableContent(callback: (data: ScriptInfoResponse<ScriptEditableContentModel>[]) => void, idOrIds?: number | number[]): void;
    /**
     * Load a list of all available editable content entries on the storefront. See {@link ScriptEditableContentListModel} for more information.
     * @param callback The callback function to execute when the server response is received.
     */
    EditableContentList(callback: (data: ScriptInfoResponse<ScriptEditableContentListModel[]>) => void): void;
    /**
     * Sets the category entity for a specific category and key. This can be used to store additional data against a category.
     * This can only be used if the user has the necessary permissions to edit category data:
     * - has access to the category (access permission)
     * - has the _PublicStoreEditCategoryEntity_ ACL permission for an existing key or
     * - has the _PublicStoreAddCategoryEntity_ ACL permission for a new key.
     * 
     * Note: this method will not apply any validation and setting invalid values may cause issues with the storefront.
     * @param callback Callback will be triggered with the success flag indicating if the value was set.
     * @param categoryId The category id to set the value for.
     * @param key The key of the category entity to adjust.
     * @param value The new value
     */
    SetCategoryValue(callback: (success: boolean) => void, categoryId: number, key: string, value: string): void;
}

