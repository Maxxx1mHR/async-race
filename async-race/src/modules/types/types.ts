export interface IElementParams {
  tag: string;
  className: string[];
  textContent?: string;
  callback?: CallableFunction;
  src?: string;
  alt?: string;
  backgroundColor?: string;
  type?: string;
  value?: string;
}

export interface IPage {
  name: string;
  callback: CallableFunction;
}

export interface IInput {
  // className: string[];
  type: string;
  value?: string;
}

export interface IButton {
  name: string;
  callback: CallableFunction;
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface ICarRequest {
  name: string;
  color: string;
  // id: number;
}

export interface ICarResponse {
  data: ICar[];
  count: number | 0;
}

export interface ICarResponseEngine {
  velocity: number;
  distance: number;
}

export interface IWinner {
  id?: number;
  wins: number;
  time: number;
}

export interface IWinnerResponse {
  data: IWinner[];
  count: number | 0;
}

export interface IQueryParams {
  key?: string;
  value?: number | string;
}

// export interface ICarResponse {
//   garage: ICar[];
// }
