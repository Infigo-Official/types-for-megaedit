interface MEImageField extends MEBaseField {
    type: 'ImageField';
    issues: {
        ignoreIssues: boolean;
        hasPositionIssues: boolean;
        customIssues: boolean;
        hasResolutionIssues: boolean;
    };
    image: {
        transform: {
            translateX: number;
            translateY: number;
            scale: number;
            flippedV: boolean;
            alignment: 'lt' | 'ct' | 'rt' | 'lc' | 'cc' | 'rc' | 'lb' | 'cb' | 'rb';
            blendMode: ImageBlendMode;
            flippedH: boolean;
            angle: number;
            isAutoScaling: boolean;
            isAutoTranslatingX: boolean;
            isAutoTranslatingY: boolean;
        };
        isClipArt: boolean;
        totalRotationAngle: number;
        data: any;
        effects: {
            effect: 'None' | 'BlackAndWhite' | 'Sepia' | 'Emboss';
            sharpness: 'Normal' | 'Blur' | 'Sharp';
            invert: boolean;
            brightness: boolean;
            brightnessValue: number;
            contrast: boolean;
            contrastValue: number;
            gamma: boolean;
            gammaValue: number;
            pixelate: boolean;
            pixelateValue: number;
            tint: boolean;
            tintValue: number;
            tintColor: string;
            opacity: number;
        };
        mask: MaskItem;
    };
}