/**
 * This module gives access to all editor specific features like
 * - accessing the variables
 * - registering to events
 * 
 * @module Editor / Invent
 */

/**
 * The InventConnector interface gives access to the Invent connector.
 */
interface InventConnector {
    /**
     * Flag indicating if the connector is initialized and ready to use.
     */
    readonly initialized: boolean;
    /**
     * Sub interface for variable access.
     */
    readonly variables: {
        /**
         * Get a list of all available variables.
         * @returns An array of variable names.
         */
        listVariableNames(): string[];
        /**
         * Get the value of a specific variable.
         * @param name The name of the variable to retrieve the value for.
         * @param originalValue Flag indicating if the original value should be retrieved. If not, any potential manipulations will be applied.
         * @returns The value of the variable or null if the variable does not exist.
         */
        get(name: string, originalValue: boolean): string | null;
        /**
         * Set the value of a specific variable.
         * @param name The name of the variable.
         * @param value The new value for the variable.
         * @returns True if the variable was set, false if the variable does not exist.
         */
        set(name: string, value: string | number | boolean): boolean;
    },
    /**
     * Sub interface for events.
     */
    readonly events: {
        /**
         * Register for variable updates.
         * @param callback The callback will be called when a variable is updated. The callback will receive the variable name and the new value.
         */
        registerForVariableUpdates(callback: (name: string, value: string | number | boolean) => void): void;
        /**
         * Register a value replacer. This will be called when a variable is used and allows a script to replace the value of the variable.
         * @param callback The callback will be called when a variable is used. The callback will receive the variable name and the current value. The callback should return the new value for the variable or null if the variable should not be replaced.
         */
        registerValueReplacer(callback: (name: string, value: string) => string | null | undefined): void;
    }
}

/**
 * The Invent interface gives access to the Invent integration.
 * The connector is the heart of the integration and allows to access all features of the Invent integration.
 * The other functions are convenience functions to access common features of the integration.
 */
interface Invent {
    /**
     * Retrieve the invent connector. This gives access to all features of the Invent integration.
     * This will search for the connector and return it when it is available. If the connector is not available, the callback will be called with null. This can be the case if the Invent script is not available or there have been errors in the initialization of the connector.
     * @param callback The callback is triggered when the connector is available. The callback will receive the connector as parameter or null if no connector can be found within a given time.
     */
    GetConnector(callback: (connector: InventConnector | null) => void): void;
    /**
     * Access to variables in Invent.
     */
    readonly Variables: {
        /**
         * Get the variable value
         * @param variableName The variable name to retrieve the value from.
         * @param callback The callback is triggered when the value is available. The callback will receive the value as parameter. Or null if the variable does not exist.
         */
        Get(variableName: string, callback: (value: string | null) => void): void;
        /**
         * Sets a variable value
         * @param variableName The variable name to set the value for.
         * @param value The new value for the variable.
         * @param callback The callback is triggered when the value is set.
         */
        Set(variableName: string, value: string, callback?: () => void): void;
    }
    /**
     * The events available for the Invent connection.
     */
    readonly Events: {
        /**
         * Register for variable update events. The callback will be called when a variable is updated.
         * @param updateCallback The update callback gets triggered when a variable is updated. The callback will receive the variable name and the new value.
         * @param registerSuccessCallback The register success callback gets triggered when the registration was successful. The callback will receive a boolean indicating if the registration was successful.
         */
        RegisterForVariableUpdates(updateCallback: (variableName: string, value: string | number | boolean) => void, registerSuccessCallback: (succes: boolean) => void): void;
        /**
         * Register a value replacer. This will be called when a variable is used and allows a script to replace the value of the variable.
         * @param replaceFunction The replace function will be called when a variable is used. The function will receive the variable name and the current value. The function should return the new value for the variable or null if the variable should not be replaced.
         * @param registerSuccessCallback The register success callback gets triggered when the registration was successful. The callback will receive a boolean indicating if the registration was successful.
         */
        RegisterValueReplacer(replaceFunction: (variableName: string, value: string) => string | null, registerSuccessCallback: (succes: boolean) => void): void;
    }
}