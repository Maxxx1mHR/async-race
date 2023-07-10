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
  className: string[];
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
  id?: number;
}

// export interface ICarResponse {
//   garage: ICar[];
// }
