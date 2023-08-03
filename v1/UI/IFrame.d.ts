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
     * Registers a callback for the Load event called when the iFrame has been loaded.
     * @param iframe The iFrame which was loaded.
     * @param event The event name. Always "Load".
     */
    OnLoad: (iframe: MEUIIFrame, event: "Load") => void;
    /**
     * Registers for the Message event when the iFrame sends data to the script.
     * @param iframe The iFrame which sent the message.
     * @param event The event name. Always "Message".
     * @param message The message received from the iframe.
     */
    OnMessage: (iframe: MEUIIFrame, event: "Message", message: string) => void;
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