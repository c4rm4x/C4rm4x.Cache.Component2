import { Injectable } from "@angular/core";
import { ICookieConfig, IStorageConfig } from "./cache-storage.interface"
import { Cookie } from "ng2-cookies/ng2-cookies"

const CookieConfigDefaults : ICookieConfig = {
    ttl: 1
}

const StorageConfigDefaults : IStorageConfig = {
    prefix: "cache-",
    cookie: CookieConfigDefaults
}

@Injectable()
export class StorageService {

    constructor(private config? : IStorageConfig) {        
        config = config || StorageConfigDefaults;
    }

    public getCache(scope: string) : any {
        let cache = sessionStorage.getItem(this.getFullScope(scope));

        if (!cache && this.config.cookie) {
            cache = Cookie.get(this.getFullScope(scope));

            if (cache) {
                sessionStorage.setItem(this.getFullScope(scope), cache);
            }
        }

        return JSON.parse(cache || '{}');
    }

    public setCache(scope: string, cache: any) : void {
        let cacheAsString = JSON.stringify(cache);
        
        sessionStorage.setItem(this.getFullScope(scope), cacheAsString);

        if (this.config.cookie) {
            Cookie.set(this.getFullScope(scope), cacheAsString, this.config.cookie.ttl || 1);
        }
    }

    private getFullScope(scope: string) : string {
        return this.config.prefix + scope;
    }
}