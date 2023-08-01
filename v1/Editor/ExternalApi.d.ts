/**
 * The external API gives access to external functionality which is available server to server.
 * Only elements available to the current user can be accessed.
 * 
 * External API's are defined in the administration interface and can be accessed by the name of the source and the name of the action.
 * The actions then are defined by
 * - the method (GET, POST, PUT, DELETE)
 * - the url
 * - the body
 * - the header
 * 
 * A lot of that is abstracted away 
 * 
 * @module Editor / External API
 */

/**
 * Configuration object for an external API request.
 */
type ExternalApiData = {
    /**
     * The name of the source to use.
     */
    source: string;
    /**
     * The name of the action to use.
     */
    action: string;
    /**
     * The key value pairs of all headers to use.
     * Note some additional headers may be injected and may overwrite existing headers.
     */
    header: Record<string, string>;
    /**
     * The query parameters to use.
     */
    query: Record<string, string>;
    /**
     * The body for basic form posts and JSON posts.
     */
    body: Record<string, string>;
    /**
     * Url parameter can be used to replace variable parts within the URL.
     */
    parameter: Record<string, string>;
    /**
     * The raw body to send. If set, the body will be ignored.
     */
    raw: string;
    /**
     * Flag indicating if we should send the body as a form or as JSON. Used only when the body is set and raw is not set.
     */
    sendAsForm: boolean;
}

/**
 * The external API interface gives access to trigger the configured and available external API's.
 */
interface ExternalApi {
    /**
     * Helper to perform a get request to the external API.
     * Allows to simply set the query parameters as a record of key value pairs.
     * 
     * @param source The name of the external api source.
     * @param action The name of the external api action.
     * @param query The query parameters to use.
     * @param callback The callback function to call when the request is finished and the response is available.
     */
    Get<T>(source: string, action: string, query: Record<string, string>, callback: (result: T) => void): void;    
    /**
     * Helper to perform a post request to the external API via a form post.
     * Allows to pass in the form dictionary which will be used for the body of hte request.
     * 
     * @param source The name of the external api source.
     * @param action The name of the external api action.
     * @param body The body as a form dictionary.
     * @param callback The callback function to call when the request is finished and the response is available.
     */
    PostForm<T>(source: string, action: string, body: Record<string, string>, callback: (result: T) => void): void;
    /**
     * Helper to perform a post request in JSON format to the external API.
     * Allows to pass in the body as a dictionary which will be serialized to JSON.
     * 
     * @param source The name of the external api source.
     * @param action The name of the external api action.
     * @param body The body as a dictionary - which will be serialized to JSON.
     * @param callback The callback function to call when the request is finished and the response is available.
     */
    PostJson<T>(source: string, action: string, body: Record<string, string>, callback: (result: T) => void): void;
    /**
     * Heler to perform a post request in raw format to the external API. The data has to be seriaized already.
     * 
     * @param source The name of the external api source.
     * @param action The name of the external api action.
     * @param body The body to send.
     * @param callback The callback function to call when the request is finished and the response is available.
     */
    PostRaw<T>(source: string, action: string, body: string, callback: (result: T) => void): void;
    /**
     * Entry point for the external API 
     * @param obj The configuration object for the request. Used by the other helpers, but available to use directly giving the most flexibility.
     * @param callback The callback function to call when the request is finished and the response is available.
     */
    Execute<T>(obj: ExternalApiData, callback: (result: T) => void): void;
}

/**
 * Result object for an immediate action tool execution.
 */
type ImmediateActionResult = {
    /**
     * Flag indicating if the execution was successful.
     */
    success: boolean;
    /**
     * The data returned by the tool.
     */
    data: string;
    /**
     * The progress as a number between 0 and 100.
     */
    progress: number;
    /**
     * If the exeuction has not finished, this will contain the message to display to the user.
     */
    message: string;
};

/**
 * This interface gives access to the immediate actions available to the current user.
 * Those are long running tasks on the server.
 * Internal use only.
 */
interface ImmediateActions {
    /**
     * Starts an internal tool by name.
     * @param executableType The name of the internal tool.
     * @param executableParameters The parameters to pass to the tool.
     * @param callback The callback with the information of the process.
     */
    ExecuteExternalTool(executableType: string, executableParameters: Record<string, object>, callback: (result: ImmediateActionResult) => void): void;
    /**
     * Cancels a running process by id.
     * @param identifier The id to cancel.
     * @param callback Is triggered once the cancel request has been sent.
     */
    Cancel(identifier: string, callback: () => void): void;
}