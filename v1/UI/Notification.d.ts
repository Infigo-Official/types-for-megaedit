/**
 * A notification block to alert the user of something.
 * See https://bulma.io/documentation/elements/notification/ for more information.
 * 
 * @module UI / Bulma / Notification
 */

/**
 * The notification type as defined by Bulma.
 * https://bulma.io/documentation/elements/notification/#colors
 */
declare enum NotificationBlockType {
    /**
     * Primary notification
     */
    PrimaryNotification = "primary",
    /**
     * Link Notification
     */
    LinkNotification = "link",
    /**
     * Info Notification
     */
    InfoNotification = "info",
    /**
     * Success Notification
     */
    SuccessNotification = "success",
    /**
     * Warning Notification
     */
    WarningNotification = "warning",
    /**
     * Danger Notification
     */
    DangerNotification = "danger"
}

/**
 * Notification interface
 */
interface MEUINotification extends MEUILayout {
    /**
     * The text to display in the notification in a separate block. Can hold HTML code.
     */
    Text: string;
    /**
     * The notification type to use.
     */
    IsType: NotificationBlockType;
    /**
     * The type of the UI element. Always "Notification".
     */
    readonly Type: "Notification";    
    /**
     * Adds one or more items to the notification. Normally the text is sufficient, but additional controls can be added.
     * @param items Add one or more items to the notification.
     */
    Add(...items: MEUIBase[]): void;
    /**
     * Removes a single item from the notification.
     * @param item 
     */
    Remove(item: MEUIBase): void;
}

/**
 * Notification constructor interface
 */
interface MEUINotificationConstructor {
    /**
     * Creates a new notification
     * @param text The text to display in the notification in a separate block. Can hold HTML code.
     * @param isType The notification type to use.
     * @returns A new notification.
     */
    new (text: string, isType: NotificationBlockType): MEUINotification;
    readonly prototype: MEUINotification;
}

/**
 * The notification class.
 */
declare const MEUINotification: MEUINotificationConstructor;