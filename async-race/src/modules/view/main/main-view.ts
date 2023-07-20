import View from '../view';
import GarageView from './garage/garage-view';
import WinnersView from './winners/winners-view';

const cssClasses = {
  MAIN: 'main',
};

export default class MainView extends View {
  constructor() {
    const params = {
      tag: 'main',
      className: [cssClasses.MAIN],
    };
    super(params);
    const winnersView = new WinnersView();

    // const garageView = new GarageView(winnersView);
    // const htmlGaragView = garageView.getHTMLElement();
    // if (htmlGaragView instanceof HTMLElement) {
    //   this.elementCreator.addInnerElement(htmlGaragView);
    // }
  }

  public setContent(view: View): void {
    const element = view.getHTMLElement();
    const currentElement = this.elementCreator.getElement();

    while (currentElement?.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
    if (element instanceof HTMLElement) {
      this.elementCreator.addInnerElement(element);
    }
  }
}
