/**
 * The ajax interface is used to make ajax calls. Not supported server side. Use external API for this.
 * @module Helper / Ajax
 */

/**
 * The ajax interface is used to make ajax calls. Not supported server side. Use external API for this.
 */
interface Ajax {
    /**
     * Performs a get request.
     * @param url The url to call.
     * @param data The query string data.
     * @param callback The callback with the parsed data or null if the call failed.
     * @param sync Flag indicating if the call should be synchronous or not.
     */
    get(url: string, data: Record<string, string>, callback: (data: unknown | null) => void, sync: boolean): void;
    /**
     * Performs a post request.
     * @param url The url to call.
     * @param data The data object to send. Will be serialized to JSON.
     * @param callback The callback with the parsed data or null if the call failed.
     * @param sync Flag indicating if the call should be synchronous or not.
     */
    post(url: string, data: unknown, callback: (data: any) => void, sync: boolean): void;
    /**
     * Performs a generic request where the method can be specified.
     * @param url The url to call.
     * @param callback The callback with the parsed data or null if the call failed.
     * @param method The HTTP method to use.
     * @param data The data to send. Should be already serialized to JSON or any other format which is supported.
     * @param sync Flag indicating if the call should be synchronous or not.
     */
    send(url: string, callback: (data: any) => void, method: string, data: unknown, sync: boolean): void;
}

/**
 * The ajax interface is used to make ajax calls. Not supported server side. Use external API for this.
 */
declare const Ajax: Ajax;