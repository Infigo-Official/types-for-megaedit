/**
 * The color helper allows to convert between different color spaces.
 * @module Helper / Color Helper
 */

/**
 * Color object for RGB color space.
 */
type RGBColorObject = {
    /**
     * The red component of the color as an integer between 0 and 255.
     */
    r: number;
    /**
     * The green component of the color as an integer between 0 and 255.
     */
    g: number;
    /**
     * The blue component of the color as an integer between 0 and 255.
     */
    b: number;
}

/**
 * Color object for CMYK color space.
 */
type CMYKColorObject = {
    /**
     * The cyan component of the color as an integer between 0 and 100.
     */
    c: number;
    /**
     * The magenta component of the color as an integer between 0 and 100.
     */
    m: number;
    /**
     * The yellow component of the color as an integer between 0 and 100.
     */
    y: number;
    /**
     * The black component of the color as an integer between 0 and 100.
     */
    k: number;
}

/**
 * This interface contains helper functions for colors to convert between different color spaces.
 */
interface ColorHelper {
    /**
     * Flag indicating if the color is in CMYK format.
     * @param color The color to check.
     * @returns True if the color is in CMYK format.
     */
    isCmykColor(color: string): boolean;
    /**
     * Converts a CMYK color to RGB.
     * There is a feature to do the conversion server side using color profiles.
     * If that is enabled, the callback version has to be used.
     * If not, the converted color will be returned.
     * @param color The color in CMYK format.
     * @param callback The callback to call when the conversion is done. This will be triggered no matter if the conversion is done client or server side.
     * @returns The converted color if the conversion is done client side.
     */
    convertCmykToRgb(color: string, callback: (success: boolean, value: string) => void): string;
    /**
     * Converts the RGB color defined by the 3 components to CMYK.
     * @param red The red component of the color.
     * @param green The green component of the color.
     * @param blue The blue component of the color.
     */
    convertRgbToCmyk(red: number, green: number, blue: number): string;
    /**
     * Converts the CMYK color string to a CMYK color object.
     * @param color The color in CMYK format.
     * @returns The color as a CMYK color object or undefined if the color is not in CMYK format.
     */
    getColorAsCmyk(color: string): CMYKColorObject | undefined;
    /**
     * Converts the CMYK color object to a CMYK color string.
     * @param cmykObject The color as a CMYK color object.
     * @returns The color as a CMYK color string.
     */
    getColorFromCmyk(cmykObject: CMYKColorObject): string;
    /**
     * Converts the RGB color string to a RGB color object.
     * @param hexColor The color in hex format.
     * @returns The color as a RGB color object or null if the color is not in hex format.
     */
    getColorAsRGB(hexColor: string): RGBColorObject | null;
    /**
     * Converts the RGB color object to a RGB color string.
     * @param rgbObject The color as a RGB color object.
     * @returns The color as a RGB color string in hex format.
     */
    getColorFromRGB(rgbObject: RGBColorObject): string;
}

/**
 * The color helper is used to convert between different color spaces.
 */
declare const ColorHelper: ColorHelper;