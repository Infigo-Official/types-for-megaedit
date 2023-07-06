interface ScriptProductAttributesPossibleValue {
    DisplayOrder: number;
    FriendlyName: string;
    HeightAdjustment: number;
    HtmlInfo: string | null;
    Id: number;
    IsDisabled: boolean;
    IsPreSelected: boolean;
    LengthAdjustment: number;
    Name: string;
    PriceAdjustment: number;
    PriceAdjustmentType: string;
    WeightAdjustment: number;
    WidthAdjustment: number;
}

interface ScriptProductAttributes {
    Id: number;
    Name: string;
    TextPrompt: string | null;
    Value: string;
    PossibleValues: ScriptProductAttributesPossibleValue[];
}

interface ScriptProductModel {
    Attributes: ScriptProductAttributes[];
}