declare type Filter<T, U> = T extends U ? T : never;
declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
declare type Omit<T, K extends Filter<keyof T, string>> = Pick<T, Diff<Filter<keyof T, string>, K>>;
export default Omit;
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
