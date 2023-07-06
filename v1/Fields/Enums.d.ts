type MEFieldType = 'ImageField' | 'TextField' | 'PathField' | 'CustomField';

type ReArrangeMode = 'MoveFront' | 'MoveBack' | 'MoveToFront' | 'MoveToBack';

type ImageBlendMode =
    | 'Normal'
    | 'Multiply'
    | 'Screen'
    | 'Overlay'
    | 'Darken'
    | 'Lighten'
    | 'ColorDodge'
    | 'ColorBurn'
    | 'HardLight'
    | 'SoftLight'
    | 'Difference'
    | 'Exclusion'
    | 'Saturation'
    | 'Color'
    | 'Luminosity'
    | 'SourceOver';

    
    type MEFieldTypes = METextField | MEImageField | MECustomField;