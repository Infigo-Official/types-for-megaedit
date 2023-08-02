
/**
 * The server side module defines code which only exist when running server side for batch output creation.
 * It can be used to modify the output further and use the batch information of the current record to populate the output.
 * 
 * As multiple scripts can be assigned to the output, it is important to sync them up accordingly.
 * There is a flag available to block the output creation until the data is prepared. Then other scripts can use the data once it is ready.
 * They can do that by registering for the {@link Serverside.RegisterForServerSideOutputCreation} event.
 * To ensure this works, the execution order of the scripts are important and the block call should be the first operation in the script outside of any function call.
 * 
 * @example
// We block first the server side output creation to ensure we have the data available before any output is generated.
Editor.ServerSide.BlockServerSideOutputCreation(true);

// Next we get the data object for the current record.
Editor.ServerSide.GetServerSideDataObject(function (data) {
    // and we update the mapped data for the current record.
    Editor.ServerSide.SaveMappedData({ "jobId": Job.JobId(), "recordId": data.RecordNumber }, function () {
        // now we can unblock so other scripts (e.g. batch script) can use that information.
        Editor.ServerSide.BlockServerSideOutputCreation(false);
    });
});
 * 
 * @module Editor / Server side only code
 */

/**
 * The output mode for the server side output creation. This can be used by the scripts to determine the output mode and adjust the output accordingly.
 */
declare enum ServerSideOutputMode {
    /**
     * The normal output mode is used to generate the final output.
     */
    Normal = 'Normal',
    /**
     * The preview output mode is used to generate a preview of the output.
     */
    Preview = 'Preview',
    /**
     * The symphony output mode is used to generate the output for Symphony print actions.
     */
    Symphony = 'Symphony'
}

/**
 * The server side data object is passed to the callback of the {@link Serverside.RegisterForServerSideOutputCreation} function.
 * It gets triggered for batch output creation and can be used to access the data for the current record as well as the context.
 */
interface ServerSideData {
    /**
     * The unique identifier for the job. This is linked to the dynamic job id or for Symphony the print item id.
     */
    Identifier: string;
    /**
     * The zero based index of the current record.
     */
    RecordNumber: number;
    /**
     * The total number of records to process.
     */
    TotalRecords: number;
    /**
     * The total number of records in the current run.
     * This may be a smaller number than the total number of records if the batch is limited (e.g. for preview purposes).
     */
    CurrentRunRecords: number;
    /**
     * The output mode for the current run.
     */
    OutputMode: ServerSideOutputMode;
    /**
     * Unique identifier for the current record. Generally a running zero based counter.
     */
    RecordIdentifier: string;
    /**
     * Optional meta data per record. Meta data is identified by a unique GUID as the key and the corresponding value.
     * The meta data has to be set by a separate process which supports this. 
     * This is only available for Symphony at the moment and can be used to include address validation information.
     */
    RecordMeta: { [key: string]: string };
    /**
     * The mapped record data.
     * This is an object mapping the placeholder names to the values of the current data set based on the preconfigured mapping.
     */
    MappedRecord: { [key: string]: string };
    /**
     * Optional meta data for the job. Meta data is identified by a unique GUID as the key and the corresponding value.
     * The meta data has to be set by a separate process which supports this.
     * This is only available for Symphony at the moment.
     */
    Meta: { [key: string]: string };
    /**
     * Persistent data allows to store data between different records of the batch operation.
     * This allows to carry over information record by record and adjust accordingly.
     */
    PersistentData: { [key: string]: string };
    /**
     * The prepare string data as configured in administration for the current job.
     * This can hold additional information which can be used by the script.
     */
    PrepareStringData: { [key: string]: string };
    /**
     * The original record data. This is currently only set for Symphony records.
     */
    Record: { [key: string]: string };
}

/**
 * The server side module defines code which only exist when running server side for batch output creation.
 */
interface Serverside {
    /**
     * Registers for the server side output creation event. This event is triggered for batch output creation and can be used to access the data for the current record as well as the context.
     * This is helpful in combination with multiple scripts which modify the data and ensure that the consuming scripts only continue once the data is ready.
     * @param callback The callback is called when the output creation can continue. All preparation of data should have happened by that point. The callback will receive the server side data object.
     */
    RegisterForServerSideOutputCreation(callback: (data: ServerSideData) => void): void;
    /**
     * Function used to block/unblock server side output creation. Generally there are two type of scripts which can be used for server side output creation:
     * - scripts which modify and prepare the data of the current record
     * - scripts which use the data to generate the content/output
     * 
     * In order to sync those up, consuming scripts should register for the {@link Serverside.RegisterForServerSideOutputCreation} event and only continue operation once the callback is triggered.
     * The preparation scripts will be able to block the output creation until the data is ready and unblock later. 
     * If the scripts are running in the correct order and the code is at the root level, this ensures that there is a deterministic order of execution.
     * @param block Flag indicating if the server side output creation should be blocked or unblocked.
     */
    BlockServerSideOutputCreation(block: boolean): void;
    /**
     * This method can be used to retrieve the server side data object for the current record.
     * The object can be used to read current information about the record and the context.
     * This can be used by any server side script, but it is partically useful for scripts which have blocked first the output creation and then modify the data further.
     * @param callback The callback function to call when the data is available.
     */
    GetServerSideDataObject(callback: (data: ServerSideData) => void): void;
    /**
     * Updates data in the persistent data object. This allows to store data between different records of the batch operation.
     * Note that those updates will be persitant for the current batch operation and will be reset once the batch operation is finished.
     * @param data The data object to save in the persistent data object. This will be merged with the existing data and overwrite any existing keys.
     * @param callback The callback is triggered once the data is saved.
     */
    SavePersistent(data: { [key: string]: string }, callback: () => void): void;
    /**
     * Updates the currently saved mapped data for the current record.
     * This would allow to update the mapping so that the consuming scripts, which usually read the mapped data, can use the updated data transparently.
     * @param data The data object to save in the mapped data object. This will be merged with the existing data and overwrite any existing keys.
     * @param callback The callback is triggered once the data is saved.
     */
    SaveMappedData(data: { [key: string]: string }, callback: () => void): void;
    /**
     * Updates data in the saved record data object. This allows to store data between different records of the batch operation.
     * @param data The data object to save in the record data object. This will be merged with the existing data and overwrite any existing keys.
     * @param callback The callback is triggered once the data is saved.
     */
    SaveRecordData(data: { [key: string]: string }, callback: () => void): void;
    /**
     * A script can mark the output as failed. This will prevent the output from being generated and the record will be marked as failed.
     * This is useful as the output may syntactically correct, but semantically defined by the script logic it is not valid.
     * @param value Flag indicating if the output should be marked as failed. The flag value at the end of the script execution will be used as the final result.
     * @param errorMessage The error message to use for the failed output. This will be shown within the administration interface.
     */
    MarkOutputAsFailed(value: boolean, errorMessage: string): void;
}