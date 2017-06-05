import { Injectable } from "@angular/core"
import { ICacheBurstConfig } from "./cache-burst.interface"
import { StorageService } from "./cache-storage.service"

const CacheBurstConfigDefaults : ICacheBurstConfig = {
    scope: "",
    baseApiUrl: "",
    console: false,
    param: "rev"
}

@Injectable()
export class CacheBurstService {

    constructor(private storage: StorageService, private config?: ICacheBurstConfig) {        
        config = config || CacheBurstConfigDefaults;
    }

    public get(url: string) : string {
        if (!this.isBaseApiUrl(url)) {
            return url;
        }        

        let cache = this.storage.getCache(this.config.scope);
        let rev = cache[this.getResourceKey(url)];

        if (!rev) {
            return url;
        }

        return url + this.addRevision(url, rev);
    }

    public burst(url: string) : void {
        if (!this.isBaseApiUrl(url)) {
            return;
        }

        let cache = this.storage.getCache(this.config.scope);
        let key = this.getResourceKey(url);

        if (cache[key]) {
            this.increaseRevision(cache, key);
        } else {
            cache[key] = 1;
        }

        this.storage.setCache(this.config.scope, cache);
    }

    private isBaseApiUrl(url: string) : boolean {
        return url.indexOf(this.config.baseApiUrl) >= 0;
    }

    private getResourceKey(url: string) : string {
        return url.replace(this.config.baseApiUrl, "");
    }
 
    private addRevision(url: string, rev: number) {
        let join = "?";

        if (url.indexOf("?") >= 0) {
            join = "&";
        }       

        return join + this.config.param + "=" + rev;
    }

    private increaseRevision(cache: any, key: string) : void {
        cache[key] = cache[key] + 1;

        if (this.config.console) {
            console.log("Invalidating cache for key " + this.config.scope + "-" + key);
        }
    }
}