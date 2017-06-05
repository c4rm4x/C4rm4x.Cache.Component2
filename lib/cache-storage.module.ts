import { NgModule, } from "@angular/core";
import { StorageService } from "./cache-storage.service";

@NgModule({
    imports: [],
    exports: [StorageService],
    declarations: [StorageService],
    providers: [],
})

export class CacheStorageModule { }