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
