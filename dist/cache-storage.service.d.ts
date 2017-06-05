import { IStorageConfig } from "./cache-storage.interface";
export declare class StorageService {
    private config;
    constructor(config?: IStorageConfig);
    getCache(scope: string): any;
    setCache(scope: string, cache: any): void;
    private getFullScope(scope);
}
