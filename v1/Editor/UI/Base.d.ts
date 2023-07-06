interface MEUIBase {
    Id: string;
    Type: 'TextBox' | 'TextArea' | 'Number' | 'ColorPicker' | 'CheckBox' | 'DropDown' | 'HtmlList' | 'DateTimePicker';
    Classes: string[];
    ParentClasses: string[];
    StandardClasses: string[];
    Events: object;
    Properties: object;
    Name: string;
    Tags: string[];
    Size: MEUISize;
    Position: string;
    Enabled: boolean;
    Visible: boolean;
    ToolTip: string;
    TextDirection: string;
}