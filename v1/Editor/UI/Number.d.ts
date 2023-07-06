interface MEUINumber extends MEUIBase {
    Value: number;
    Max: number;
    Min: number;
    Step: number;
    OnChange: (number: MEUINumber) => void;
}

interface MEUINumberConstructor {
    new (value: number, min?: number, max?: number, step?: number, change?: (number: MEUINumber) => void): MEUINumber;
    readonly prototype: MEUINumber;
}

declare const MEUINumber: MEUINumberConstructor;