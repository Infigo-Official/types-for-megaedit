interface ConfigHelper {
    GetConfig: <T>() => T;
    HasConfig: boolean;
    Merge: <T>(target: T) => void;
}

interface TextHelper {
    PerformFieldDataReplacement: (
        fieldArray: MEFieldTypes[],
        replacementData: { [key: string]: string },
        optionalVariableTags?: { start: string; end: string },
        optionalImageRetrievalFunction?: () => void,
        replaceCaseInvariant?: boolean,
        textSuppressionMode?: 'Left' | 'Right' | 'Full',
        replacementText?: string,
        callback?: () => void
    ) => void;
}

interface Convert {
    mmToPoints: (mm: number) => number;
    pointsToMm: (pt: number) => number;
}

interface CSV {
    parse: (csv: string, options?: CSVOptions) => string[][];
    stringify: (table: string[][], options?: CSVOptions) => string;
    isContentValidCSV: (uploadedFile: any, checkFileExtension?: boolean, options?: CSVOptions) => boolean;
}

interface Helper {
    TextHelper: TextHelper;
    HtmlEscape: (text: string) => string;
    Config: ConfigHelper;
    Convert: Convert;
    CSV: CSV;
    ExecuteMegaScript: (megascriptInstanceName: string, script: string | null, config: string) => boolean;
    LoadExternal: (string: url, callback?: () => void) => void;
}