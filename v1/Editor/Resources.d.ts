/**
 * The resource module gives access to all resources assigned to this product template.
 * Available resources include:
 * - media albums uploaded by the user
 * - clipart albums configured for the product used for static imagary
 * - background categories configured for the product used for canvas background
 * - spot color albums configured for the product used for color selection
 * - layout categories configured for the product used for layout selection
 * - mask albums configured for the product used for image fields
 * - fonts configured for the product
 * - placeholder categories configured for the product used for image fields
 * - info resource to retrieve information about the storefront
 * - global resource to retrieve global settings for the product (canvas, stock and output type options)
 * 
 * @module Editor / Resources
 */

/**
 * Filter based on the generalized image sizes.
 */
declare enum MediaItemFilterImageSize {
    /**
     * All images with less than 5 MegaPixels.
     */
    Small = 'Small',
    /**
     * All images with greater or equal than 5 MegaPixels and smaller than 14 MegaPixels.
     */
    Medium = 'Medium',
    /**
     * All images with greater or equal than 14 MegaPixels.
     */
    Large = 'Large',
    /**
     * Any image size.
     */
    Any = 'Any'
}

/**
 * Filter option to check for people within the images.
 * This is for front facing faces only. It will not detect faces in profile or back facing.
 */
declare enum MediaItemFilterPeopleMode {
    /**
     * Filter images with people (front facing faces only).
     */
    WithPeople = 'WP',
    /**
     * Filter for images without people (checking for front facing faces only).
     */
    WithoutPeople = 'WOP'
}

/** 
 * Filter object specifies the available media filter options usable when retrieving media items. 
 * Construct a new object and call all filter methods you want to use. Then pass it to the {@link Resources.MediaItems} method.
 * The result will return media items which match all filter options.
 * 
 * @example
 * // find all images from January 2019
 * var filter = new MediaItemFilter();
 * filter.SetDateRange(new Date(2019, 1, 1), new Date(2019, 1, 31));
 * Editor.Resources.MediaItems(album, (items) => { ... }, filter);
 * 
 * // alternative way to call
 * Editor.Resources.MediaItems(album, (items) => { ... }, new MediaItemFilter().SetDateRange(new Date(2019, 1, 1), new Date(2019, 1, 31)));
 */
interface MediaItemFilter {
    /**
     * Filter by file name. The filter is case insensitive and the filter string must exist within the file name to match.
     * @param filter The name to filter for. Case insensitive non exact match. Pass _null_ to disable the filter.
     * @returns The filter object.
     */
    SetFileNameFilter(filter: string): MediaItemFilter;
    /**
     * Filter based on the generalized image sizes.
     * @param size The size to filter for.
     * @returns The filter object.
     */
    SetImageSize(size: MediaItemFilterImageSize): MediaItemFilter;
    /**
     * Filter based a bespoke make for the capture device. See the meta data for relevant values.
     * @param make The make to filter for.
     * @returns The filter object.
     */
    SetMake(make: string): MediaItemFilter;
    /**
     * Filter based a bespoke model (in combination with the make) for the capture device. See the meta data for relevant values.
     * @param make The make to filter for.
     * @param model The model to filter for.
     * @returns The filter object.
     */
    SetMakeAndModel(make: string, model: string): MediaItemFilter;
    /**
     * Filter based on a given date range. Note that both start and end date are required.
     * @param start The start date to look for (inclusive).
     * @param end The end date to look for (inclusive).
     * @returns The filter object.
     */
    SetDateRange(start: string | Date, end: string | Date): MediaItemFilter;
    /**
     * Filter based on a given tag. See the meta data for relevant values.
     * @param tag The tag to filter for.
     * @returns The filter object.
     */
    SetTag(tag: string): MediaItemFilter;
    /**
     * Filter based on the fact if the image contains people or not.
     * This will check from facing faces only. It will not detect faces in profile or back facing.
     * @param mode Flag if the image should contain people or not.
     * @returns The filter object.
     */
    SetPeopleMode(mode: MediaItemFilterPeopleMode): MediaItemFilter;
    /**
     * Returns images where the main color of the CSS color (see meta data) matches the given value.
     * @param col The color value to check.
     * @returns The filter object.
     */
    SetColor(col: string): MediaItemFilter;
    /**
     * Returns images shot in a given city. The location filters (city, country, GPS info) are mutually exclusive and the last call will override any previous calls.
     * See meta data for additional information.
     * @param city The city to filter for.
     * @returns The filter object.
     */
    SetCity(city: string): MediaItemFilter;
    /**
     * Returns images shot in a given country. The location filters (city, country, GPS info) are mutually exclusive and the last call will override any previous calls.
     * See meta data for additional information.
     * @param country The country to filter for.
     * @returns The filter object.
     */
    SetCountry(country: string): MediaItemFilter;
    /**
     * Returns images which have GPS information or do not have GPS information based on the filter value. The location filters (city, country, GPS info) are mutually exclusive and the last call will override any previous calls.
     * See meta data for additional information.
     * @param gpsMustBeAvailable If the flag is true, only images with GPS information will be returned. If the flag is false, only images without GPS information will be returned.
     * @returns The filter object.
     */
    SetFilterByGPSInfo(gpsMustBeAvailable: boolean): MediaItemFilter;
}

/**
 * This response object is available for certain upload calls when a preflight check is required.
 */
type PreflightInfo = {
    /**
     * A link to trigger a fix profile which will modify the upload. Available if the upload failed and a fix profile has been configured for this product.
     */
    fixLink: string;
    /**
     * An internal identifier for this preflight check. This can be used to retrieve to work with the check later on.
     */
    internalId: string;
    /**
     * A link for the report PDF generated, available if reported has been enabled for this profile and product.
     */
    reportLink: string;
    /**
     * The report XML - can be used to parse additional information directly within the script. The format is the Enfocus Pitstop report format. See https://www.enfocus.com/Manuals/UserGuide/SW/09/enUS/Switch/en-us/reference/r_enfocus_pitstop_server.html
     */
    reportXml: string;
    /**
     * Flag to indicate if the preflight check was successful or not.
     */
    result: boolean;
}

/**
 * This response object is available for certain upload calls when the data is directly specified.
 */
type MediaDirectUploadResult = {
    /**
     * The media item which was created.
     */
    mediaItem: UserMediaItem;
    /**
     * Optional preflight info object.
     */
    preflightInfo: PreflightInfo;
}




/**
 * This interface gives access to all resources assigned to this product template.
 */
interface Resources {
    /**
     * Retrieve all available media albums the user has access to.
     * There are hidden albums which are not shown in the UI. By default this method will not return those, but via an additional flag they can be included.
     * There is always at least one hidden album for special media (e.g. Avatar images).
     * 
     * @param callback The callback function that will be called once the albums are retrieved.
     * @param includeHidden Optional flag, if set to true, hidden albums will be included in the result. Default value is false.
     */
    MediaAlbums(callback: (albums: MediaAlbum[]) => void, includeHidden?: boolean): void;
    /**
     * Create a new media album with the given name. The name must be unique per user and the process will fail if the name is already in use.
     * @param name The new name of the media album.
     * @param callback The callback function that will be called once the album is created. The callback will be called with the newly created album object.
     */
    CreateMediaAlbum(name: string, callback: (album: MediaAlbum) => void): void;
    /**
     * Returns the special album - a hidden album used for internal media items like avatar images.
     * @param callback The callback function that will be called once the album is retrieved.
     */
    SpecialAlbum(callback: (album: MediaAlbum) => void): void;
    /**
     * Returns the media item which represents the avatar image for the current customer (if any).
     * The avatar image is managed via the customer account page and is always available in the special album which is hidden from the UI.
     * @param callback The callback function that will be called once the media item is retrieved. If no avatar image is available, the callback will be called with null.
     */
    AvatarMediaItem(callback: (item: UserMediaItem) => void): void;
    /**
     * Retrieve all media items within a given album, optionally filtered by the given filter object.
     * @param albumOrId The album object or id to retrieve the media items for.
     * @param callback The callback function that will be called once the media items are retrieved.
     * @param filter Optional filter object to filter the media items. 
     */
    MediaItems(albumOrId: string | MediaAlbum, callback: (items: UserMediaItem[]) => void, filter?: MediaItemFilter): void;
    /**
     * Retrieve child media items for a given media item. This is used for multi page images (e.g. PDF files) when extracting all pages is enabled.
     * Then the first page will be the default media item within the album, the subsequent pages will be child items.
     * @param media The parent media item - aka the first page
     * @param callback Returns the child media items for the given parent media item. If this is only a single page document, the callback will be called with an empty array.
     */
    MediaChildItems(media: MediaItem, callback: (items: UserMediaItem[]) => void): void;
    /**
     * This returns all media items in the currently selected album. If the user changes the current album, this method will return the new items.
     * @param callback The callback function that will be called once the media items are retrieved. Same output as {@link MediaItems}.
     */
    UserSelectedItems(callback: (items: UserMediaItem[]) => void): void;
    /**
     * Deletes the media item with the given id. Note that not all media items can be deleted and the response should be checked.
     * @param id The media item id to delete.
     * @param callback Callback function that will be called once the media item is deleted.
     */
    DeleteMediaItem(id: string, callback?: (response: GeneralServerResponse) => void): void;
    /**
     * Upload a media item. This triggers the upload dialog for a single upload.
     * This will upload into the default album.
     * 
     * The editor supports the following file types:
     * - PNG
     * - BMP
     * - JPEG
     * - GIF
     * - TIFF
     * - PDF
     * 
     * @param albumOrId [Unsupported]: the album parameter is currently not supported.
     * @param callback The callback will be called once the upload is finished. The callback will be called with the newly created media item or _null_ if it failed. It will also optionally contain a preflight info object.
     */
    UploadMediaItems(albumOrId: MediaAlbum | number | null, callback: (mediaItem?: UserMediaItem, preflightInfo?: PreflightInfo) => void): void;
    /**
     * Uploads multiple media items. This triggers the upload dialog for multiple uploads.
     * This will upload into the default album. Preflight info is not available for this method.
     * 
     * The same upload restrictions apply as for the regular upload.
     * 
     * @param callback The callback will be called once the upload is finished. The callback will be called with the newly created media items or an empty array.
     */
    UploadMultipleMediaItems(callback: (mediaItems: UserMediaItem[]) => void): void;
    /**
     * Uploads a media item directly. The item is fully specified in this call via:
     * - the file name
     * - the mime type
     * - the base64 encoded data
     * 
     * The same upload restrictions apply as for the regular upload.
     * 
     * @param albumOrId The album to upload the media item to.
     * @param mimeType The mime type of the file. E.g. 'image/gif', 'image/jpeg', 'image/png', 'application/pdf', etc.
     * @param base64Data The base 64 encoded data of the image to upload.
     * @param fileName The filename of the image to upload.
     * @param callback The callback will be called once the upload is finished. The callback will be called with the newly created media item or _null_ if it failed. It will also optionally contain a preflight info object.
     */
    UploadMediaDirect(albumOrId: MediaAlbum | number | null, mimeType: string, base64Data: string, fileName: string, callback: (result: MediaDirectUploadResult) => void): void;

    /**
     * Retrieve all configured clipart albums.
     * @param callback The callback function that will be called once the albums are retrieved.
     */
    ClipartAlbums(callback: (albums: ClipartAlbum[]) => void): void;
    /**
     * Retrieve all clipart items within an album.
     * @param albumOrId The clipart album or the id.
     * @param callback The callback function that will be called once the clipart items are retrieved.
     */
    ClipartItems(albumOrId: string | ClipartAlbum, callback: (items: ClipartItem[]) => void): void;
    /**
     * Shortcut helper function to retrieve a clipart item directly in a single call by the names of the clipart album and the clipart item.
     * @param albumName The name of the clipart album for the item to retrieve.
     * @param itemName The name of the clipart item to retrieve.
     * @param callback The callback function that will be called once the clipart item is retrieved. If the item is not found, the callback will be called with _null_.
     */
    ClipartItem(albumName: string, itemName: string, callback: (item: ClipartItem) => void): void;

    /**
     * Retrieve all background categories.
     * @param callback The callback function that will be called once the categories are retrieved.
     */
    BackgroundCategories(callback: (categories: BackgroundCategory[]) => void): void;
    /**
     * Retrieve all background items within a category.
     * @param categoryOrId The background category or the id.
     * @param callback The callback function that will be called once the background items are retrieved.
     */
    BackgroundItems(categoryOrId: string | BackgroundCategory, callback: (items: BackgroundItem[]) => void): void;

    /**
     * Retrieve all spot color albums.
     * @param callback The callback function that will be called once the albums are retrieved.
     */
    SpotColorAlbums(callback: (albums: SpotColorAlbum[]) => void): void;
    /**
     * Retrieve all spot color items within an album..
     * @param albumOrId The spot color album or id.
     * @param callback The callback function that will be called once the spot colors are retrieved.
     */
    SpotColorItems(albumOrId: string | SpotColorAlbum, callback: (items: SpotColorItem[]) => void): void;

    /**
     * Retrieve all layout categories, optionally filtered by a page tag.
     * You can tag layouts to be available for specific pages only via the template configuration.
     * Those prefiltered lists can be retrieved via this method.
     * 
     * @param callback The layout categories are returned via the callback function.
     * @param tag If not specified all layout categories are returned. Otherwise it will be the ones linked ot that specified page tag
     */
    LayoutCategories(callback: (categories: LayoutCategory[]) => void, tag?: string): void;
    /**
     * Retrieve the layout items within the category.
     * @param albumOrId The layout category or the id.
     * @param callback The callback function that will be called once the layout items are retrieved.
     */
    LayoutItems(albumOrId: string | LayoutItem, callback: (items: LayoutItem[]) => void): void;

    /**
     * Load all mask albums. Mask albums are used for image fields.
     * @param callback The callback function that will be called once the albums are retrieved.
     */
    MaskCategories(callback: (albums: MaskAlbum[]) => void): void;
    /**
     * Load all mask items within a mask album.
     * @param albumOrId The mask album or the id.
     * @param callback The callback function that will be called once the mask items are retrieved.
     */
    MaskItems(albumOrId: string | MaskAlbum, callback: (items: MaskItem[]) => void): void;

    /**
     * Load all available fonts for the current setup.
     * @param callback The callback function that will be called once the fonts are retrieved.
     */
    Fonts(callback: (fonts: FontItem[]) => void): void;
    
    /**
     * Load all placeholder categories. Placeholder categories are used for image fields to render an image if the field has no value.
     * Currently a product can have only one placeholder category to be used within the UI.
     * @param callback The callback function that will be called once the categories are retrieved.
     */
    PlaceholderCategories(callback: (albums: PlaceholderCategory[]) => void): void;
    /**
     * Load all placeholder items within a placeholder category.
     * @param albumOrId The placeholder category or the id.
     * @param callback The callback function that will be called once the items are retrieved.
     */
    PlaceholderItems(albumOrId: string | PlaceholderCategory, callback: (items: PlaceholderItem[]) => void): void;
    /**
     * The info resource allows to retrieve information about the Infigo storefront in general.
     */
    Info: InfoResource;
    /**
     * Global resources allow to retrieve global settings for the product.
     */
    Global: GlobalResources;
}

/**
 * The dynamic size settings control how the canvas size can be adjusted by the user.
 */
interface DynamicSizeSettings {
    /**
     * Flag to control if the user can adjust the canvas size for each page individually or if the aspect ratio for all pages need to be the same.
     * If the aspect ratio can be adjusted it will give the most freedom to the user, and this is the mode required to match file upload in MegaEdit.
     */
    maintainAspectRatio: boolean;
    /**
     * The maximum height of the canvas in points.
     */
    maxHeight: number;
    /**
     * The maximum width of the canvas in points.
     */
    maxWidth: number;
    /**
     * The minimum height of the canvas in points.
     */
    minHeight: number;
    /**
     * The minimum width of the canvas in points.
     */
    minWidth: number;
    /**
     * Flag to control if the size of all pages should be identical or if each page can have a different size. 
     */
    sameForAllPages: boolean;
    /**
     * Step value by which the height should be increased in points when the user adjusts the height (UI only, not enforced).
     */
    stepHeight: boolean;
    /**
     * Step value by which the width should be increased in points when the user adjusts the width (UI only, not enforced).
     */
    stepWidth: boolean;
}

/**
 * The global resources interface allows to retrieve global settings for the product.
 * This includes the available options for:
 * - canvas options
 * - stock options
 * - output type options
 * - dynamic size settings
 */
interface GlobalResources {
    /**
     * Retrieve the available canvas options for dynamic sizing. If dynamic sizing is not enabled, this will return an empty object.
     * @param callback The callback function that will be called once the canvas options are retrieved.
     */
    DynamicSizeSettings(callback: (settings: DynamicSizeSettings) => void): void;
    /**
     * Retrieve all linked canvas options.
     * @param callback The callback function that will be called once the canvas options are retrieved.
     */
    Canvases(callback: (canvases: Canvas[]) => void): void;
    /**
     * Retrieve all linked stock options.
     * @param callback The callback function that will be called once the stock options are retrieved.
     */
    StockItems(callback: (items: StockItem[]) => void): void;
    /**
     * Retrieve all linked output type options.
     * @param callback The callback function that will be called once the output type options are retrieved.
     */
    OutputTypes(callback: (types: OutputType[]) => void): void;
}

/**
 * The _Loc_ interface allows to retrieve localized strings for the current storefront.
 */
interface Loc {
    /**
     * Retrieves the localized string for the given key.
     * Note that the key will always have a fixed prefix of "me2k.editor.script.". The key is always lowercase.
     * Please use a naming convention to avoid conflicts with other scripts. E.g. "me2k.editor.script.my_script.".
     * The optional data parameter can be used to replace placeholders in the localized string.
     * 
     * @param key The key of the localized string. Please ensure to exclude the prefix.
     * @param data If specified, the localized string will be replaced with the given data. The data object should be a dictionary with the placeholder name as key and the replacement value as value.
     * @returns The localized string, optionally formated with the given data.
     */
    Get(key: string, data?: {[key: string]: string}): string;
    /**
     * Performs the replace method on the given format string with the given data.
     * The format has to use "<<" and ">>" as key delimiters.
     * @param format The format string to replace.
     * @param data The data object should be a dictionary with the placeholder name as key and the replacement value as value.
     * @returns The final formatted string.
     */
    Replace(format: string, data: {[key: string]: string}): string;
}