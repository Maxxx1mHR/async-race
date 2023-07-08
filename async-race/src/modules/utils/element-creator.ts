import { IElement } from '../types/types';

class ElementCreator {
  private element: HTMLElement | null;

  constructor(param: IElement) {
    this.element = null;
    this.createElement(param);
  }

  private createElement(param: IElement): void {
    this.element = document.createElement(param.tag);
    this.setCssClasses(param.className);
    this.setTextContent(param.textContent);
    this.setCallback(param.callback);
  }

  private getElement(): HTMLElement | null {
    return this.element;
  }

  private addInnerElement(element: HTMLElement | ElementCreator): void {
    if (element instanceof ElementCreator) {
      const htmlElement = element.getElement();
      if (htmlElement instanceof HTMLElement) {
        this.element?.append(htmlElement);
      }
    } else if (element instanceof HTMLElement) {
      this.element?.append(element);
    }
  }

  private setCssClasses(...cssClasses: string[]): void {
    this.element?.classList.add(...cssClasses);
    // cssClasses.forEach((className) => {
    //   if (this.element) {
    //     this.element.classList.add(className);
    //   }
    // });
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

export default ElementCreator;
