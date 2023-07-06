interface Field {
    ReArrange: (mode: ReArrangeMode, callback: (result: boolean) => void, triggerEvent: boolean) => void;
    Refresh: (callback?: (result: boolean, field: MEFieldTypes) => void) => void;
    SaveDirect: (callback: (result: boolean) => void, addUndo: boolean) => boolean;
    Align2PixelsAtTarget: (target: string, targetPoints: object, sourcePoints: object) => void;
    AlignPixelAtTarget: (target: string, targetPoint: object, sourcePoint: object) => void;
    ConvertPixelPositionToGlobalPosition: (point: number) => void;
    ConvertPixelPositionToRelativeFieldPosition: (point: number) => void;
    ConvertRelativeFieldPositionToGlobalLocation: (point: number) => void;
    GetBoundingBox: () => FieldBoundingBox;
    Save: (callback?: (result?: any) => void, addUndo?: boolean) => void;
}

interface FieldConstructor {
    new (): Field;
    readonly prototype: Field;
}

declare const Field: FieldConstructor;

interface MEBaseField extends Field {
    id: string;
    area: {
        x: number;
        y: number;
        w: number;
        h: number;
        rotation: number;
        page: number;
        subPage: number;
        zIndex: number;
        hidden: boolean;
    };
    info: {
        name: string;
        tags: Array<string>;
        sequence: number;
        customData: string;
    };
    issues: {
        ignoreIssues: boolean;
        hasPositionIssues: boolean;
        customIssues: boolean;
    };
    restrictions: {
        doNotOpenPopup: boolean;
        doNotPrint: boolean;
        showNoPrintInPreview: boolean;
        allowRotation: boolean;
        allowZOrderArrangement: boolean;
        allowFlipping: boolean;
        allowImageScaling: boolean;
        allowClipArtImages: boolean;
        doNotDelete: boolean;
        allowSizeChange: boolean;
        movementMode: 'Free' | 'Fixed' | 'Horizontal' | 'Vertical' | 'Area';
        areaLeft: number;
        areaTop: number;
        areaBottom: number;
        areaRight: number;
        doNotSelect: boolean;
        doNotParticipateOnLayout: boolean;
        maintainTextOnLayout: boolean;
        noRichTextSupport: boolean;
        fixedText: boolean;
        fitWithoutCropping: boolean;
        allowClipArtDistortion: boolean;
        skipPageZoom: boolean;
    };
    uioptions: {
        hideFxOptions: boolean;
        hideOpacity: boolean;
        hideImageSliderOptions: boolean;
        noImageDropTarget: boolean;
        hideSharpnessOptions: boolean;
        hideBorder: boolean;
        hideShadow: boolean;
        hideMask: boolean;
        hideFormat: boolean;
        hideAdvancedTextOptions: boolean;
        hideFontsOptions: boolean;
        hideBoldItalicOptions: boolean;
        hideFontSizeOption: boolean;
        showRenderMode: boolean;
        showBackgroundColorOption: boolean;
        hideTextColorOption: boolean;
        hideTextDecorationOption: boolean;
        hideAlignmentOption: boolean;
        margin: string;
        snapToObject: boolean;
        placeholderText: string;
        placeholderImage: string;
        helpText: string;
        selectedGroupStyle: string;
    };
    shadow: null;
    border: {
        applyBackground: boolean;
        backgroundColor: string;
        backgroundOpacity: number;
        borderColor: string;
        borderOpacity: number;
        borderRadius: number;
        borderStrokeWidth: number;
        borderStyle: 'None' | 'Solid' | 'Outline' | 'Distance';
        borderWidth: number;
    };
}