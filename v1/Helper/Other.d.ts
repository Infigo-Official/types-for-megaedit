/**
 * This module contains miscellaneous helper which are small in nature and do not fit into any other category.
 * @module Helper / Misc Helper
 */

/**
 * The console object is used to log messages for debugging purposes.
 */
interface Console {
    /**
     * Logs a message for debugging purposes.
     * On the browser this will show up in the console (simialr to console.log).
     * On the server side and output creation this will show up in the log file.
     * @param message The message to log. Can be a string or an object.
     */
    Log(message: string | object): void;
}

/**
 * The console object is used to log messages for debugging purposes.
 */
declare const Console: Console;

/**
 * The round helper is used to round numbers to a given scale.
 */
interface RoundHelper {
    /**
     * Rounds a number to a given scale.
     * @param num The number to round.
     * @param scale The scale to which to round.
     */
    RoundNumber(num: number, scale: number): number;
}

/**
 * The round helper is used to round numbers to a given scale.
 */
declare const RoundHelper: RoundHelper;