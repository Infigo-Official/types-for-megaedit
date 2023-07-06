interface MECustomField extends MEBaseField {
    type: 'CustomField';
    custom: {
        data: {
            value?: string;
            drawCode?: string;
            draw?: boolean;
            datasets?: Array<object>;
            labels?: string[];
            type?: string;
            settings: {
                fillChart: boolean;
                showScale: boolean;
                showScaleLines: boolean;
                bezierCurve: boolean;
                pointDots: boolean;
                innerCoutout: number;
                strokeWidth: number;
                scaleStartAtZero: boolean;
            };
        };
    };
}