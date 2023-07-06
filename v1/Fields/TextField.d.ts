interface METextField extends MEBaseField {
    type: 'TextField';
    issues: {
        ignoreIssues: boolean;
        hasPositionIssues: boolean;
        customIssues: boolean;
        hasProfanityIssues: boolean;
    };
    text: {
        data: string;
        internalText: string;
        fieldType: 'Vertical';
        verticalAlignment: 'T' | 'M' | 'B';
        defaultFormat: {
            fontFamily: string;
            boldFlag: boolean;
            italicFlag: boolean;
            underlineFlag: boolean;
            strikeFlag: boolean;
            fontColor: string;
            bgColor: string;
            fontSize: number;
            fontSizeOptions: {
                min: number;
                max: number;
                step: number;
            };
            alignment: 'left' | 'center' | 'right';
            opacity: number;
            styleId: string;
        };
        options: {
            fitToBox: {
                enabled: boolean;
                withWrap: boolean;
                minFontSize: number;
                maxFontSize: number;
            };
            renderMode: {
                type: 'Fill' | 'Outline' | 'FillAndOutline';
                color: string;
                width: number | string;
            };
            textType: 'Untouched' | 'UpperCase' | 'LowerCase';
            textTypeMode: 'Normal' | 'TextFlow' | 'Restricted';
            textFlow: {
                next: null;
                prev: null;
            };
            paragraphOptions: {
                leading: number;
                wordSpacing: number;
                charSpacing: number;
                paragraphSpacing: number;
            };
        };
        styles: {
            lines: Record<string, Array<{
                start: number;
                end: number;
                format: {
                    fontSize?: number;
                }
            }>>
        };
        textDirection: 'Inherit' | 'LTR' | 'RTL';
    };
}
