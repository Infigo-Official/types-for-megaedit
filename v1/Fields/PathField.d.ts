/**
 * This defines the path field interface with the necessary types.
 * 
 * @module Field / Path Field
 */


/**
 * A path element is a string in a bespoke format supporting the SVG commands as shown in
 * https://www.w3.org/TR/SVG/paths.html#PathElement
 * 
 * So command character and parameters (number depends on the command) e.g.:
 * - M x y: Move  to x, y
 * - m x y: Move  to x, y
 * - L x y: Line  to x, y
 * - l x y: Line  to x, y
 * - C x1 y1 x2 y2 x y: Cubic bezier curve to x, y with control points x1, y1 and x2, y2
 * - Q x1 y1 x y: Quadratic bezier curve to x, y with control point x1, y1
 * - Z: Close path
 * 
 * for the commands you can use upper case letters for absolute coordinates and lower case letters for relative coordinates.
 */
type PathElement = string;

interface PathField extends BaseField {
    readonly path: {
        /**
         * The color of the path (stroke). Any valid MegaEdit color value is supported.
         */
        color: string;
        /**
         * The width of the stroke in points.
         */
        width: number;
        /**
         * The fill color. Any valid MegaEdit color value is supported.
         */
        background: string;
        /**
         * The opacity of the path. Value between 0 and 1. 0 is fully transparent, 1 is fully opaque.
         */
        opacity: number;
        /**
         * The path operator. This defines how the path is drawn.
         */
        data: PathElement[];
    };
}