export declare class ConnectionTransport {
    private _name;
    readonly name: string;
    constructor(name: string);
    toString(): string;
    equals(other: ConnectionTransport): boolean;
}
