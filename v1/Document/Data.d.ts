/**
 * The data stored against the document can be managed with this object.
 * This will include data as a key value pair, which can hold arbitrary data.
 * This data store is useful to have a permanent store of data and state against the document.
 * Ensure that the keys are unique to your script to avoid conflicts. We suggest an appropriate prefix as a good key.
 * The data is available to all scripts in all stages of the document processing, including the editor stages and output generation for single and batch.
 * 
 * In addition, you can define the meta data of the document. 
 * The meta data will be converted to a PDF schema and stored within the XmpMetaData under Custom/Properties.
 * There can be only a single meta data entry, so multiple scripts working with it would have to consider a merge or an overwrite strategy.
 * The benefit of the meta data is that this information will be available within the PDF document at output generation level - which is useful for future processing.
 * Either externally or internally within the MegaScript workflow engine.
 * 
 * Note that for batch processes, the meta data cannot be used properly as each record would be within the same file. Instead, the batch process will actually store optioanlly the page boundaries for each record as meta data.
 */
interface Data {
    /**
     * Retrieve the data for the given key. If the key does not exist, it will return null.
     * Otherwise the data value type will be preserved.
     * @param key The key for the data store.
     * @param callback The callback will be called with the data if it exists.
     */
    Get: <T>(key: string, callback: (data: T) => void) => void;
    /**
     * Sets the data for the given key as any type. If the data key exists already, it will be overwritten.
     * @param key The key for the data store.
     * @param value The new value to use.
     * @param callback The callback will be triggered once the save has finished.
     */
    Set: <T>(key: string, value: T, callback?: () => void) => void;
    /**
     * Returns the currently saved meta data object. If no meta data has been saved, it will return null.
     * @param callback This call will be triggered with the meta data object as parameter
     */
    GetMetaData: (callback: (data: unknown) => void) => void;
    /**
     * Saves the meta data object. Note that only a single meta data object can exist at any time. Different scripts would have to consider a merge or overwrite strategy. This cannot be used in a batch context. For further information, see the Data object.
     * @param value The new meta data object to save. The type will be preserved, but converted to an XmpSchema in the final PDF
     * @param callback The callback will be triggered once the save has finished.
     * @returns 
     */
    SetMetaData: (value: unknown, callback: () => void) => void;
}