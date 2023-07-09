export interface IElementParams {
  tag: string;
  className: string[];
  textContent?: string;
  callback?: CallableFunction;
}

export interface IPage {
  name: string;
  callback: CallableFunction;
}
