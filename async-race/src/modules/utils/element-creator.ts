import { IElementParams } from '../types/types';

export default class ElementCreator {
  private element: HTMLElement | null;

  constructor(param: IElementParams) {
    this.element = null;
    this.createElement(param);
  }

  private createElement(param: IElementParams): void {
    this.element = document.createElement(param.tag);
    this.setCssClasses(param.className);
    if (param.textContent) {
      this.setTextContent(param.textContent);
    }
    if (param.callback) {
      this.setCallback(param.callback);
    }
  }

  public getElement(): HTMLElement | null {
    return this.element;
  }

  public addInnerElement(element: HTMLElement | ElementCreator): void {
    if (element instanceof ElementCreator) {
      const htmlElement = element.getElement();
      if (htmlElement instanceof HTMLElement) {
        this.element?.append(htmlElement);
      }
    } else if (element instanceof HTMLElement) {
      this.element?.append(element);
    }
  }

  private setCssClasses(cssClasses: string[]): void {
    cssClasses.forEach((className) => {
      if (this.element) {
        this.element.classList.add(className);
      }
    });
  }

  private setTextContent(text: string): void {
    if (this.element) {
      this.element.innerHTML = text;
    }
  }

  private setCallback(callback: CallableFunction): void {
    if (typeof callback === 'function') {
      this.element?.addEventListener('click', (event) => callback(event));
    }
  }
}
