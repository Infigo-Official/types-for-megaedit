interface ExternalApi {
    Get: (source: string, action: string, query: Record<string, string>, callback: (result: Record<string, string>) => void) => void;
}