/**
 * This module holds information about media resources.
 * 
 * @module Resource / Media
 */

/**
 * A media album holds media items uploaded by the user categorized by a name. Media items can be used for image fields.
 */
interface MediaAlbum extends ResourceCategory {
    /**
     * The description of the media album.
     */
    readonly description: string;
    /**
     * The item limit defines a maximum number of elements within the album.
     */
    readonly itemLimit: number;
    /**
     * The total number of images within.
     */
    readonly numItems: number;
    /**
     * Flag to control if the album is readonly or if media items can be removed/added.
     */
    readonly readOnly: number;
    /**
     * Flag to control if this is the default album. Only a single album is the default for each job. This is the location where new media items are being added by default.
     */
    readonly isDefault: boolean;
}

/**
 * A clipart album holds cliparts - similar to a media album. Cliparts can be used for image fields and are configured in the administration interface.
 */
interface ClipartAlbum extends ResourceCategory {
}

/**
 * Defines the type of the media item.
 */
declare enum MediaType {
    /**
     * The media type has not been defined. This is not actively used.
     */
    Undefined = '',
    /**
     * This media item has been uploaded by the end user.
     */
    Media = 'Media',
    /**
     * This media item has been provided as part of the configuration (template, libraries).
     */
    Clipart = 'Clipart'
}

/**
 * Defines a front facing face identified by the algorithm.
 */
type Face = {
    /**
     * The main area of the face.
     */
    readonly area: Rect;
    /**
     * The area of the left eye.
     */
    readonly leftEye: Rect;
    /**
     * The area of the right eye.
     */
    readonly rightEye: Rect;
    /**
     * The area of the mouth.
     */
    readonly mouth: Rect;
    /**
     * The area of the nose.
     */
    readonly nose: Rect;
}

/**
 * Defines an address object.
 */
type Address = {
    /**
     * The street value of the address.
     */
    readonly street: string;
    /**
     * The house number or house name of the address.
     */
    readonly house: string;
    /**
     * The city of the address.
     */
    readonly city: string;
    /**
     * The county/state/province of the address.
     */
    readonly county: string;
    /**
     * The ZIP code of the address.
     */
    readonly zip: string;
    /**
     * The country of the address.
     */
    readonly country: string;
    /**
     * The country as a two letter code.
     */
    readonly countryCode: string;
    /**
     * An object holding POI's (point of interest) as key-value pairs.
     */
    readonly tags: Record<string, string>;
}

/**
 * The image meta object provides additional information about the image. Most details are extracted from the EXIF metadata available in some image formats (see {@link https://www.media.mit.edu/pia/Research/deepview/exif.html}).
 * Additional information is available for the colors used within the image and for the pattern recognition. Note that the extraction as to be enabled via the administration settings.
 */
type ImageMetaData = {
    /**
     * The data around the camera settings and details available from the EXIF information.
     */
    readonly apex: {
        /**
         * The exposure time in seconds.
         */
        readonly exposureTime: number;
        /**
         * The F Number or F-stop of the lens when the image was taken.
         */
        readonly fNumber: number;
        /**
         * The actual aperture value of the lens when the image was taken. Can be converted to the F-number via {@link https://en.wikipedia.org/wiki/F-number#Calculation|this formula}.
         */
        readonly apertureValue: number;
        /**
         * The Brightness of taken subject in EV
         */
        readonly brightnessValue: number;
        /**
         * The exposure bias value of the taken picture. Unit is in EV.
         */
        readonly exposureBiasValue: number;
        /**
         * Flag to indicate if flahs has been used (1 = flash used, 0 = no flash used)
         */
        readonly flash: number;
        /**
         * The focal length of the lens used to take the image. Unit is millimeter.
         */
        readonly focalLength: number;
        /**
         * The focal length used as an 35 mm film equivalent.
         */
        readonly focalLength35mm: number;
    };
    /**
     * The color information extracted from the image.
     */
    readonly color: {
        /**
         * The main or primary color found in the image defined as a range defined as a hexademical color value. The range is defined by the start and end color. RGB value: #RRGGBB
         */
        readonly mainColorStart: string | null;
        /**
         * The main or primary color found in the image defined as a range defined as a hexademical color value. The range is defined by the start and end color. RGB value: #RRGGBB
         */
        readonly mainColorEnd: string | null;
        /**
         * The secondary color found in the image as a hexidecimal color value. RGB value: #RRGGBB
         */
        readonly secondColor: string | null;
        /**
         * The primary color defined as the nearest CSS color.
         */
        readonly nearestCssColor: string | null;
        /**
         * The primary color defined as the nearest HTML color.
         */
        readonly nearestHtmlColor: string | null;        
    };
    /**
     * Information about the dates available from within the EXIF data and the file uploaded (when preserved).
     */
    readonly date: {
        /**
         * The date when the image has been taken on a digital camera as extracted from the EXIF data as a JS tick value.
         */
        readonly digitized: number;
        /**
         * The date when the image file has been last modified as a JS tick value.
         */
        readonly lastFileModification: number;
        /**
         * The date form the EXIF values 'DateTime' or 'DateTimeOriginal' as a JS tick value.
         */
        readonly normal: number;
    };
    /**
     * Information about the location this image has been taken.
     */
    readonly gps: {
        /**
         * The recorded altitude information.
         */
        readonly altitude: number;
        /**
         * The altitude zero point (usually 0 or sea level).
         */
        readonly altitudeReference: number;
        /**
         * The 360 degree direction of the internal compass.
         */
        readonly direction: number;
        /**
         * The direction reference point.
         */
        readonly directionReference: number;
        /**
         * The latitude coordinate of the gps location.
         */
        readonly latitude: number;
        /**
         * The latitude reference point.
         */
        readonly latitudeReference: number;
        /**
         * The longitude coordinate of the gps location.
         */
        readonly longitude: number;
        /**
         * The longitude reference point.
         */
        readonly longitudeReference: number;
        /**
         * If reverse geocoding is enabled, this will hold the address information if one could be retrieved based on teh GPS coordinates.
         */
        readonly address: Address | null;
    };
    /**
     * The camera information extracted from the EXIF data.
     */
    readonly info: {
        /**
         * The make of the camera.
         */
        readonly make: string | null;
        /**
         * The model of the camera.
         */
        readonly model: string | null;
        /**
         * The EXIF orientation value of the image. Usually would be 0 as the image gets auto-correctied during import.
         */
        readonly orientation: number;
        /**
         * The orientation of the image when it was taken.
         */
        readonly originalOrientation: number;
        /**
         * The horziontal resoulution of the image in pixels per inch.
         */
        readonly resolutionX: number;
        /**
         * The vertical resoulution of the image in pixels per inch.
         */
        readonly resolutionY: number;
        /**
         * The rectangle specifies the subject area in original pixel coordinates. Subject area defines the area of interest as identified by an algorithm.
         */
        readonly subjectArea: Rect | null;
    };
    /**
     * The extracted semantical information from the image.
     */
    readonly pattern: {
        /**
         * All found frontrales within the image.
         */
        readonly frontalFaces: Face[] | null;
        /**
         * The region with the highest entropy favoring the center of the image.
         */
        readonly regionOfInterest: Rect | null;
    }
}

/**
 * A media item represents either a user uploaded image or a clip art image.
 * It can be a raster image (PNG, JPG, TIFF and GIF) or a PDF document.
 * In case of PDF's multi page media items are supported. Within MegaEdit, the first page would be the main media item, the other pages then children.
 * This is an abstract interface - in actual use there are either {@link UserMediaItem} or {@link ClipartItem} instances.
 */
interface MediaItem {    
    /**
     * The media item name - usually the file name
     */
    readonly name: string;
    /**
     * The width in pixels
     */
    readonly width: number;
    /**
     * The height in pixels
     */
    readonly height: number;
    /**
     * The relative URL for the preview of the media item. The preview has a medium resolution.
     */
    readonly preview: string;
    /**
     * The relative URL for the thumbnail. The thumbnail has a low resolution.
     */
    readonly thumbnail: string;
    /**
     * The original media item URL in full resolution. This is only available for user uploaded images and for cliparts if configured in admin to provide the full asset.
     */
    readonly original: string;
    /**
     * The type of the media item. This can be either Media or Clipart.
     */
    readonly type: MediaType; 
}

/**
 * This media item represents a media uploaded or provided by the end user.
 */
interface UserMediaItem extends MediaItem {
    /**
     * The media item id (number)
     */
    readonly id: number;
    /**
     * The id of the parent media album the media item belongs to.
     */
    readonly parentAlbum: number;
    /**
     * The media item creation date (extracted if possible from the Metadata).
     */
    readonly date: string;
    /**
     * The number of usages within the document of the media item.
     */
    readonly numUsages: number;
    /**
     * Number of children if this is a multi page media item and this is the first element. Otherwise 0.
     */
    readonly numChildren: number;
    /**
     * The image meta data. Only set when meta data extraction is enabled. Note: there are individual flags for individual meta data types.
     */
    readonly meta: ImageMetaData | null;
}

/**
 * This media item represents a media provided by the template configuration via admin.
 */
interface ClipartItem extends MediaItem {
    /**
     * The media id (file name) of the clipart.
     */
    readonly id: string;
    /**
     * The id of the clipart album the media item belongs to. Only set for clipart type items.
     */
    readonly parentId: string;
}