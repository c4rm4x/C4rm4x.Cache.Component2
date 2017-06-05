(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ng2-cookies/ng2-cookies')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'ng2-cookies/ng2-cookies'], factory) :
	(factory((global['cache-burst'] = global['cache-burst'] || {}),global._angular_core,global.ng2Cookies_ng2Cookies));
}(this, (function (exports,_angular_core,ng2Cookies_ng2Cookies) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}



function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var CookieConfigDefaults = {
    ttl: 1
};
var StorageConfigDefaults = {
    prefix: "cache-",
    cookie: CookieConfigDefaults
};
var StorageService = (function () {
    function StorageService(config) {
        this.config = config;
        config = config || StorageConfigDefaults;
    }
    StorageService.prototype.getCache = function (scope) {
        var cache = sessionStorage.getItem(this.getFullScope(scope));
        if (!cache && this.config.cookie) {
            cache = ng2Cookies_ng2Cookies.Cookie.get(this.getFullScope(scope));
            if (cache) {
                sessionStorage.setItem(this.getFullScope(scope), cache);
            }
        }
        return JSON.parse(cache || '{}');
    };
    StorageService.prototype.setCache = function (scope, cache) {
        var cacheAsString = JSON.stringify(cache);
        sessionStorage.setItem(this.getFullScope(scope), cacheAsString);
        if (this.config.cookie) {
            ng2Cookies_ng2Cookies.Cookie.set(this.getFullScope(scope), cacheAsString, this.config.cookie.ttl || 1);
        }
    };
    StorageService.prototype.getFullScope = function (scope) {
        return this.config.prefix + scope;
    };
    return StorageService;
}());
StorageService = __decorate([
    _angular_core.Injectable(),
    __metadata("design:paramtypes", [Object])
], StorageService);

var CacheBurstConfigDefaults = {
    scope: "",
    baseApiUrl: "",
    console: false,
    param: "rev"
};
exports.CacheBurstService = (function () {
    function CacheBurstService(storage, config) {
        this.storage = storage;
        this.config = config;
        config = config || CacheBurstConfigDefaults;
    }
    CacheBurstService.prototype.get = function (url) {
        if (!this.isBaseApiUrl(url)) {
            return url;
        }
        var cache = this.storage.getCache(this.config.scope);
        var rev = cache[this.getResourceKey(url)];
        if (!rev) {
            return url;
        }
        return url + this.addRevision(url, rev);
    };
    CacheBurstService.prototype.burst = function (url) {
        if (!this.isBaseApiUrl(url)) {
            return;
        }
        var cache = this.storage.getCache(this.config.scope);
        var key = this.getResourceKey(url);
        if (cache[key]) {
            this.increaseRevision(cache, key);
        }
        else {
            cache[key] = 1;
        }
        this.storage.setCache(this.config.scope, cache);
    };
    CacheBurstService.prototype.isBaseApiUrl = function (url) {
        return url.indexOf(this.config.baseApiUrl) >= 0;
    };
    CacheBurstService.prototype.getResourceKey = function (url) {
        return url.replace(this.config.baseApiUrl, "");
    };
    CacheBurstService.prototype.addRevision = function (url, rev) {
        var join = "?";
        if (url.indexOf("?") >= 0) {
            join = "&";
        }
        return join + this.config.param + "=" + rev;
    };
    CacheBurstService.prototype.increaseRevision = function (cache, key) {
        cache[key] = cache[key] + 1;
        if (this.config.console) {
            console.log("Invalidating cache for key " + this.config.scope + "-" + key);
        }
    };
    return CacheBurstService;
}());
exports.CacheBurstService = __decorate([
    _angular_core.Injectable(),
    __metadata("design:paramtypes", [StorageService, Object])
], exports.CacheBurstService);

exports.CacheBurstModule = (function () {
    function CacheBurstModule() {
    }
    return CacheBurstModule;
}());
exports.CacheBurstModule = __decorate([
    _angular_core.NgModule({
        imports: [],
        exports: [exports.CacheBurstService],
        declarations: [exports.CacheBurstService],
        providers: [StorageService],
    })
], exports.CacheBurstModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cache-burst.umd.js.map
