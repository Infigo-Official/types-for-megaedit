/**
 * A field editor component. This can be used to provide a field within the UI.
 * The field editor component can be interactive or readonly (and render the field only within the UI).
 * 
 * @module UI / Special / Field Editor
 */

/**
 * Field editor interface
 */
interface MEUIFieldEditor extends MEUIBase {
    /**
     * The type of the UI element. Always "FieldEditor".
     */
    readonly Type: "FieldEditor";
    /**
     * The field id of the field to render.
     */
    FieldId: string;
    /**
     * The width of the field editor. Defaults to 400.
     */
    Width: number;
    /**
     * The height of the field editor. Defaults to 200.
     */
    Height: number;
    /**
     * Flag indicating the field editor is readonly or interactive. Defaults to false.
     */
    ReadOnly: boolean;
    /**
     * The margin of the field vs the component. Defaults to 20.
     */
    Margin: number;
    /**
     * The background color of the field editor. Defaults to white.
     * Should be an RGB hex value.
     */
    BackgroundColor: string;
    /**
     * Flag indicating if the field editor should add the actual field background. Defaults to false.
     * Note: this is an experimental feature and might not work for all fields.
     * There are issues with rotation, moving fields and should be used only under controlled and tested circumstances.
     */
    AddFieldBackground: boolean;    
}

/**
 * Field editor constructor interface
 */
interface MEUIFieldEditorConstructor {
    /**
     * Creates a new field editor
       @param fieldOrId The field or field id to render.
       @param width The width of the field editor. Defaults to 400.
       @param height The height of the field editor. Defaults to 200.
       @param readonly Flag indicating the field editor is readonly or interactive. Defaults to false.
       @returns A new field editor.
     */
    new (fieldOrId: string | BaseField, width?: number, height?: number, readonly?: boolean): MEUIFieldEditor;
    readonly prototype: MEUIFieldEditor;
}

/**
 * The field editor class
 */
declare const MEUIFieldEditor: MEUIFieldEditorConstructor;