declare interface DataItem<T = string> {
    name: string | number;
    value: T;
    pTag?: string;
}
declare const useDataPermission: <T>(
    items: DataItem<T>[]
) => (
    | DataItem<T>[]
    | {
          [key: string]: T;
      }
)[];
export { useDataPermission };
