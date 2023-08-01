/**
 * A static image to be displayed within the UI. Can be an internal or external image.
 * Optional click event is available for interaction.
 * @module UI / Control / Static Image
 */

/**
 * Static image interface
 */
interface MEUIStaticImage extends MEUISizeBase {
    /**
     * The type of the UI element. Always "Image".
     */
    readonly Type: "Image";
    /**
     * The URL of the image to display.
     * Can also be an external link (note: CORS must be enabled on the server)
     */
    Url: string;
    /**
     * Optional onclick handler for the static image.
     * @param event The event handler. 
     */
    OnClick(event: (label: MEUIStaticImage) => void): void;
}

/**
 * Static image constructor interface
 */
interface MEUIStaticImageConstructor {    
    /**
     * Creates a new static image
     * @param url The URL of the image to display.
     * @param width The width of the image. If not set, it will use 'auto'
     * @param height The height of the image. If not set, it will use 'auto'
     * @returns A new static image.
     */
    new (url: string, width?: number, height?: number): MEUIStaticImage;
    readonly prototype: MEUIStaticImage;
}

/**
 * The static image class
 */
declare const MEUIStaticImage: MEUIStaticImageConstructor;