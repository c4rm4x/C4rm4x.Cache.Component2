import { NgModule, } from "@angular/core";
import { CacheBurstService } from "./cache-burst.service";
import { StorageService } from "./cache-storage.service";

@NgModule({
    imports: [],
    exports: [CacheBurstService],
    declarations: [CacheBurstService],
    providers: [StorageService],
})

export class CacheBurstModule { }