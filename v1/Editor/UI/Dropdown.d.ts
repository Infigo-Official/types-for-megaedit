interface MEUIDropDownOption {
    Id: string;
    Value: string;
    Label: string;
}

interface MEUIDropDown extends MEUIBase {
    OnChange: (dropDown: MEUIDropDown) => void;
    Options: MEUIDropDownOption[];
    Value: string;
    Type: 'DropDown';
}

interface MEUIDropDownConstructor {
    new (options: any[], current: string, change?: (dropDown: MEUIDropDown) => void): MEUIDropDown;
    readonly prototype: MEUIDropDown;
}

declare const MEUIDropDown: MEUIDropDownConstructor;