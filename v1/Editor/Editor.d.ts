interface Editor {
    Invent: Invent;
    IsRunningServerSide(): boolean;
    IsEmbedded(): boolean;
    IsInIFrame(): boolean;
    IsAdmin(): boolean;
    FormatPrice(price: number): number;
    GenerateMegaScriptLink(
        parameters: {
            instanceName: string;
            accountId: number;
        },
        additionalValues: object
    ): string;
    CheckSecurity(type: 'ManageDataPerProduct' | 'ManageDataGeneral'): boolean;
    ReportLoadStep(loadStep: string): void;
    ClearUndoItems(): void;
    SetEditorStatus(stat: MEvents | string, value: boolean): void;

    Selection: Selection;
    Constants: Constants;
    View: View;
    Data: EditorData;
    Resources: Resources;
    Loc: Loc;
    UI: UI;
    Events: Events;
    Helper: Helper;
    ServerSide: Serverside;
    ExternalApi: ExternalApi;
}

declare const Editor: Editor;