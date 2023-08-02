/**
 * This module holds definitions which are shared across other modules.
 * 
 * @module Helper / General Types
 */

/**
 * The dimension of an object in points.
 * 
 * @example
 * {
            "width": 2087.9999999987303,
            "height": 2807.9999999983906
        }
 */
type Size = {
    /**
     * The width in points.
     */
    width: number;
    /**
     * The height in points.
     */
    height: number;
}

/**
 * A specific position on the canvas defined in points. Origin is the top left corner.
 */
type Point = {
    /**
     * The horizontal coordinate of the position in points. Origin is the top left corner.
     */
    x: number;
    /**
     * The vertical coordinate of the position in points. Origin is the top left corner.
     */
    y: number;
}

/**
 * Rectangle definition in points or pixels (depending on the context).
 */
type Rect = {
    /**
     * The x coordinate of the rectangle as the top left corner.
     */
    x: number;
    /**
     * The y coordinate of the rectangle as the top left corner.
     */
    y: number;
    /**
     * The width of the rectangle.
     */
    w: number;
    /**
     * The height of the rectangle.
    */
    h: number;
}

/**
 * The base interface for all resource categories.
 */
interface ResourceCategory {
    /**
     * The unique id of the resource category (GUID)
     */
    readonly id: string;
    /**
     * The name of the resource category.
     */
    readonly name: string;
}

/**
 * Generic multi purpose server response.
 */
type GeneralServerResponse = {
    /**
     * Success flag of the operation.
     */
    result: boolean;
    /**
     * If the operation was not successful, this property will contain the error message (if any).
     */
    errorDesc: string;
    /**
     * If the operation was successful, this property will contain the success message (if any).
     */
    successDesc: string;
}

/**
 * A field bounding box defines the area vertically and horizontally a field occupies. If the field is not rotated, that is the same as the field position and size.
 * But rotation will cause a change to the bounding box.
 * This object can be easily used to understand the final positioning of the field on the canvas.
 * 
 * All properties are in points.
 */
type FieldBoundingBox = {
    /**
     * The x coordinate of the bounding box as the top left corner. Value in points.
     */
    x: number;
    /**
     * The y coordinate of the bounding box as the top left corner. Value in points.
     */
    y: number;
    /**
     * The width of the bounding box. Value in points.
     */
    width: number;
    /**
     * The height of the bounding box. Value in points.
     */
    height: number;
    /**
     * The left edge of the bounding box. Value in points. Same as {@link x}.
     */
    left: number;
    /** 
     * The right edge of the bounding box. Value in points. 
     */
    right: number;
    /**
     * The top edge of the bounding box. Value in points. Same as {@link y}.
     */
    top: number;
    /**
     * The bottom edge of the bounding box. Value in points.
     */
    bottom: number;
    /**
     * The position of the top left corner of the field on the actual canvas. This position is always within or on the bounding box.
     */
    topLeft: Point;
    /**
     * The position of the top right corner of the field on the actual canvas. This position is always within or on the bounding box.
     */
    topRight: Point;
    /**
     * The position of the bottom left corner of the field on the actual canvas. This position is always within or on the bounding box.
     */
    bottomLeft: Point;
    /**
     * The position of the bottom right corner of the field on the actual canvas. This position is always within or on the bounding box.
     */
    bottomRight: Point;
}