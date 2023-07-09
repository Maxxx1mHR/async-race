export interface IElementParams {
  tag: string;
  className: string[];
  textContent?: string;
  callback?: CallableFunction;
  src?: string;
  alt?: string;
}

export interface IPage {
  name: string;
  callback: CallableFunction;
}
