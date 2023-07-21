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
    if (param.src && param.alt) {
      this.setSrc(param.src);
      this.setAlt(param.alt);
    }
    if (param.backgroundColor) {
      this.setBackgroundColor(param.backgroundColor);
    }
    if (param.type) {
      this.setType(param.type);
    }
    if (param.value) {
      this.setValue(param.value);
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

  public setTextContent(text: string): void {
    if (this.element) {
      this.element.innerHTML = text;
    }
  }

  private setCallback(callback: CallableFunction): void {
    if (typeof callback === 'function') {
      this.element?.addEventListener('click', (event) => callback(event));
    }
  }

  private setSrc(src: string): void {
    if (this.element instanceof HTMLImageElement) {
      this.element.src = src;
    }
  }

  private setAlt(alt: string): void {
    if (this.element instanceof HTMLImageElement) {
      this.element.alt = alt;
    }
  }

  private setBackgroundColor(backgroundColor: string): void {
    if (this.element instanceof HTMLElement) {
      this.element.style.backgroundColor = backgroundColor;
    }
  }

  private setType(type: string): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
  }

  private setValue(value: string): void {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
  }
}
