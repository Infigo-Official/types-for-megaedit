interface Serverside {
    RegisterForServerSideOutputCreation(callback: (data: ServerSideData) => void): void;
    BlockServerSideOutputCreation(block: boolean): void;
    GetServerSideDataObject(callback: (data: ServerSideData) => void): void;
    SavePersistent(data: { [key: string]: string }, callback: () => void): void;
    SaveMappedData(data: { [key: string]: string }, callback: () => void): void;
    SaveRecordData(data: { [key: string]: string }, callback: () => void): void;
}

interface ServerSideData {
    Identifier: string;
    RecordNumber: number;
    TotalRecords: number;
    CurrentRunRecords: number;
    OutputMode: string;

    RecordIdentifier: string;
    RecordMeta: { [key: string]: string };
    MappedRecord: { [key: string]: string };
    Meta: { [key: string]: string };
    PersistentData: { [key: string]: string };
    PrepareStringData: { [key: string]: string };

    Record: { [key: string]: string };
}
