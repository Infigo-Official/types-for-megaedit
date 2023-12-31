/**
 * The _Batch_ module can be used to handle batch functionality used within the job. Please note that a batch plugin has to be configured in admin for this product to be functional.
 * 
 * @example
 * // Example to load XLSX file - first workbook and map against 3 dummy variables
 * // Load Excel library for legacy excel files
 * Editor.Helper.LoadExternal("/Catfish.Web/Scripts/ME2k/lib/js/excel/jszip.js", function () {
 *  Editor.Helper.LoadExternal("/Catfish.Web/Scripts/ME2k/lib/js/excel/xlsx.js", function () {
 *    // Setup button
 *    let button = new MEUIUpload(Editor.Loc.Get("batchuploadoptions.uploadbutton.label"), null, 
 *      function(dummy, event, uploaded) {
        try {
            // load the excel file and convert to CSV
            let wb = XLSX.read(uploaded.originalData);
            var csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);

            // Save the CSV data now
            Job.Batch.Save(csv, function(shortInfo) {            
                Editor.UI.ShowMessage(shortInfo.Valid ? "Success" : "Failure: " + shortInfo.error);
                console.log(shortInfo);
            });
        } catch(e) {
            console.log(e);
        }    
 *    });
      Editor.UI.Add(null, Editor.Constants.EditorUITarget.BatchArea, button);
    });
 * });
 * 
 * 
 * @module Document / Batch Feature
 */

/**
 * This is the response object for the Load method of the Batch data when requesting only the info.
 * 
 * @example
 * {
    "Valid": true,
    "Header": [
        "Check / Issue",
        "Actions",
        "Comments"
    ],
    "RecordCount": 16,
    "ExampleRecord": [
        "Disk Space",
        "Alert...",
        ""
    ],
    "PricePerRecord": null,
    "Data": null
}
 */
type BatchLoadInfoResponse = {
    /**
     * This adds additional data availalbe for the batch data. This is controlled by the batch plugin.
     * The CSV plugin doesn't set this property.
     */
    Data?: unknown;
    /**
     * Boolean flag to indicate if the load was successful.
     */
    Valid: boolean;
    /**
     * The data of the first record in the batch data set.
     * This is helpful to get a preview and understanding of the data in the set.
     */
    ExampleRecord?: string[];
    /**
     * The headers of the batch data set. This can be used for mapping or preview purposes.
     */
    Header?: string[];
    /**
     * The record count of the batch data set.
     */
    RecordCount?: number;
    /**
     * The price per record of the batch data set. This can be controlled by the batch plugin. If null, the price per record is controlled outside of the batch plugin.
     * The CSV plugin doesn't set this property.
     */
    PricePerRecord?: number;
}

/**
 * This is the response object for the Load method of the Batch data when requesting the full data set.
 */
type BatchLoadFullResponse = {
    /**
     * Boolean flag to indicate if the load was successful.
     */
    Valid: boolean;
    /**
     * If the retrieval was successful, this holds the data set in the format controlled by the batch plugin applied against the product.
     */
    Data: string;
}

/**
 * The result of a batch save operation.
 */
type BatchSaveResult = {
    /**
     * Boolean flag to indicate if the save was successful.
     */
    Valid: boolean;
    /**
     * Error message if the save was not successful.
     */
    error: string;
}

/**
 * The batch mapping item defines the value part of how a variable item will be mapped using the batch data.
 */
type BatchMappingItem = {
    /**
         * The mapping controls the column index of the batch data source. This will be used if the value is >= 0.
         * For values smaller we will use the static value.
         */
    Mapping: number;
    /**
     * The static value will to use for this variable item. This will only be used if the mapping index is < 0.
     */
    StaticValue: string;
}

/**
 * The mapping elements defines how a variable item will be mapped using the batch data.
 * The item can be mapped either against a column through an index or mapped against a constant static value.
 */
type BatchMappingElement = {
    /**
     * The mapping key defines the variable item by name. What specifically this represents is fully controlled by the script.
     */
    MappingKey: string;
    /**
     * The mapping item then defines how this variable item relates to the batch data source.
     */
    MappingItem: BatchMappingItem;
}

/**
 * The _Batch_ interface holds methods used for the batch operation of MegaEdit. Note that in order for this to work, a batch plugin has to be configured against the product in admin.
 * The batch plugin will then control the format and functionality of the batch operation.
 */
interface Batch {    
    /**
     * Saves the batch data. The batch data format is controlled by the batch plugin applied against the product.
     * 
     * E.g. for the CSV batch plugin, the data is a string of comma separated values following the CSV specification.
     * 
     * This call will also update the pricing.
     * @param data The data to save in the correct format based on the batch plugin applied against the product.
     * @param callback The function will be triggered when the save operation is complete. The callback result will be passed a BatchSaveResult object.
     */
    Save(data: string, callback?: (shortInfo: BatchSaveResult) => void): void;
    /**
     * Load the currently stored batch data. 
     * The method can load only the info of the batch data (aka the headers) or the full data.
     * 
     * If you request only the info, the method will return a BatchLoadInfoResponse object.
     * Otherwise we will load the full data as a BatchLoadFullResponse object (note, this can be potentially quite large).
     * 
     * Note: the format of the data set is controlled by the batch plugin applied against the product.
     * 
     * You can control via the separate parameter _getPreviouslyLoaded_ if you want to load the data from the server or return the previously loaded data. 
     * Note: this will only work if you request the info only.
     * 
     * @param infoOnly Boolean flag to control if only the info object or the full data set should be loaded.
     * @param callback The callback is triggered once the data is loaded. The callback result will be passed a BatchLoadInfoResponse or BatchLoadFullResponse object, depending on the infoOnly flag.
     * @param getPreviouslyLoaded Boolean flag to control if the data should be loaded from the server or the previously loaded data should be returned. This will only work if you request the info only.
     */
    Load(infoOnly: boolean, callback: (response: BatchLoadInfoResponse | BatchLoadFullResponse) => void, getPreviouslyLoaded?: boolean): void;    
    /**
     * This method will clear and delete the batch data stored against the job.
     * This call will also update the pricing.
     * @param callback The callback will be triggered once the clear operation is complete.
     */
    Clear(callback: () => void): void;
    /**
     * Loads a preview of the batch data for the first numRecords records.
     * Note that we will not return more as the Infigo Settings value of BatchNumPreviewRecords, no matter the parameter value. But we can return less.
     * However the system will generate at least 1 record.
     * 
     * The call will load then the first n records. This is controlled by the batch plugin and for some types it may be not actual data.
     * The CSV plugin will return the first n rows.
     * 
     * Then the data will be mapped and a mapped result will be returned
     * @param numRecords The maximum number of records to load. Note that we will not return more as the Infigo Settings value of BatchNumPreviewRecords, no matter the parameter value. But we can return less.
     * @param callback The callback with the mapped data object. The keys are the mapping keys (or variable items), and the values the already mapped values.
     */
    LoadPreview(numRecords: number, callback: (mappedData: { [key: string]: string }) => void): void;
    /**
     * Saves the defined mapping against the job. The mapping is important to control how the batch data will be used.
     * You can use the Editor's UI helper to generate a mapping dialog easily.
     * @param mapping The mapping object is a dictionary where the key is the mapping key (or variable item) and the value is the BatchMappingElement object.
     * @param callback The callback is triggered once the mapping is saved.
     */
    SaveMapping(mapping: Record<string, BatchMappingItem>, callback?: (result: boolean) => void): void;
    /**
     * Load the mapping data from the job.
     * @param callback The callback is triggered once the mapping is loaded. The callback result will be passed a BatchMappingElement array.
     */
    GetMapping(callback?: (mappedData: BatchMappingElement[]) => void): void;            
}