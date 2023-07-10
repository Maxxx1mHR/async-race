import { IElementParams } from '../types/types';
import ElementCreator from '../utils/element-creator';

export default abstract class View {
  public elementCreator: ElementCreator;

  constructor(params: IElementParams) {
    this.elementCreator = this.createView(params);
  }

  public getHTMLElement(): HTMLElement | null {
    return this.elementCreator.getElement();
  }

  private createView(params: IElementParams): ElementCreator {
    const elementParams = {
      tag: params.tag,
      className: params.className,
      textContent: params.textContent,
      callback: params.callback,
      src: params.src,
      alt: params.alt,
      backgroundColor: params.backgroundColor,
      type: params.type,
      value: params.value,
    };
    const elementCreator = new ElementCreator(elementParams);
    return elementCreator;
  }
}
