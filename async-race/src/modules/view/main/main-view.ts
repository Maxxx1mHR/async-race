import View from '../view';
import GarageView from './garage/garage-view';
// import TrackView from './garage/garageCar/track/track-view';
import WinnersView from './winners/winners-view';
// import GarageView from './garage/garage-view';
// import WinnersView from './winners/winners-view';

const cssClasses = {
  MAIN: 'main',
};

export default class MainView extends View {
  public winnersView: WinnersView;

  public garageView: GarageView;

  constructor() {
    const params = {
      tag: 'main',
      className: [cssClasses.MAIN],
    };
    super(params);

    this.winnersView = new WinnersView();
    this.garageView = new GarageView(this.winnersView);

    const garage = this.garageView.getHTMLElement();
    if (garage instanceof HTMLElement) {
      this.elementCreator.addInnerElement(garage);
    }
    // const winnersView = new WinnersView();

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
