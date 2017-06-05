import { ICacheBurstConfig } from "./cache-burst.interface";
import { StorageService } from "./cache-storage.service";
export declare class CacheBurstService {
    private storage;
    private config;
    constructor(storage: StorageService, config?: ICacheBurstConfig);
    get(url: string): string;
    burst(url: string): void;
    private isBaseApiUrl(url);
    private getResourceKey(url);
    private addRevision(url, rev);
    private increaseRevision(cache, key);
}
