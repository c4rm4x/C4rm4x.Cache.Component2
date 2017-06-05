export interface ICookieConfig {
    ttl: number;
}
export interface IStorageConfig {
    prefix: string;
    cookie: ICookieConfig;
}
