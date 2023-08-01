/**
 * Displays a separate page in an iFrame.
 * It has built in support for inter iFrame communication via the messaging API.
 * 
 * @module UI / Special / iFrame
 */

/**
 * iFrame interface
 */
interface MEUIIFrame extends MEUISizeBase {
    /**
     * The type of the UI element. Always "IFrame".
     */
    readonly Type: "IFrame";
    /**
     * The source URL of the iFrame.
     */
    Src: string;
    /**
     * Registers a callback for the Load event.
     * @param callback The callback is triggered when the iFrame has been loaded.
     */
    OnLoad(callback: (iframe: MEUIIFrame, event: "Load") => void): void;
    /**
     * Registers for the Message event when the iFrame sends data to the script.
     * @param callback The callback is triggered when the iFrame sends data to the script.
     */
    OnMessage(callback: (iframe: MEUIIFrame, event: "Message", message: string) => void): void;
    /**
     * Sends a message to the iFrame.
     * @param message The message to send
     */
    SendMessage(message: string): void;
}

/**
 * iFrame constructor interface
 */
interface MEUIIFrameConstructor {
    /**
     * Creates a new iFrame
     * @param src The source URL of the iFrame.
     * @param messageHandler The message handler for the iFrame.
     * @returns A new iFrame.
     */
    new (src: string, messageHandler: (iframe: MEUIIFrame, event: "Message", message: string) => void): MEUIIFrame;
    readonly prototype: MEUIIFrame;
}

/**
 * The iFrame class
 */
declare const MEUIIFrame: MEUIIFrameConstructor;