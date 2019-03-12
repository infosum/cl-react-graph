
type Filter<T, U> = T extends U ? T : never;

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

// Will omit any key NOT a string, and any key name supplied in the args
type Omit<T, K extends Filter<keyof T, string>> = Pick<T, Diff<Filter<keyof T, string>, K>>;

export default Omit;
