export enum DataCollectStoreEnums {
}

export interface DataCollectStoreType {
  model: Record<string, number | string | Array<string | number>>,
  mountedComponentSet: Set<string | number>
}
