interface ScriptCustomerModel {
    Attributes: { [key: string]: string };
    SubordinateRelationShips: { [key: string]: number[] };
    PrincipalRelationShips: { [key: string]: number[] };
    Addresses: ScriptAddressModel[];
    BillingAddress: ScriptAddressModel;
    Id: number;
    CreatedOnUtc: Date | string;
    UpdatedOnUtc: Date | string;
    CustomerGuid: string;
    Username: string;
    Email: string;
    Language: string;
    Currency: string;
    Title: string;
    DepartmentId: number | null;
    PrintLocation: string;
    CanUpdateCategoryData: boolean;
    CanInsertCategoryData: boolean;
    CustomerRoles: string[];
    AvatarUrl: string;
    CanListGlobalAdditionalData: boolean;
    CanGetGlobalAdditionalData: boolean;
}