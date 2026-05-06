import Def from "../types/def";
export declare class ExtensionStorageModel {
    private static instance;
    private localStore;
    private syncStore;
    private sessionStore;
    private constructor();
    static getInstance(): ExtensionStorageModel;
    set(area: "local" | "sync" | "session", key: string, value: Def): void;
    get(area: "local" | "sync" | "session", key: string): Def | undefined;
    getAll(area: "local" | "sync" | "session"): Map<string, Def>;
    private getStore;
}
