export interface IMerchant {
  id: number;
  code: string;
  name: string;
  address: string;
  tables?: ITable[]
}

export interface ITable {
  no:  number;
  status: ETableStatus;
}

export enum ETableStatus {
  EMPTY = 'EMPTY',
  NEW = 'NEW',
  USING = 'USING',
  FINISH = 'FINISH'
}
