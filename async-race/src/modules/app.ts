import GarageView from './view/garage-view';
import HeaderView from './view/header-view';

export default class App {
  constructor() {
    this.createView();
  }

  private createView(): void {
    const headerView = new HeaderView();
    const garageView = new GarageView();

    const headerHtmleElement = headerView.getHTMLElement();
    const garageHtmlElement = garageView.getHTMLElement();
    if (headerHtmleElement && garageHtmlElement) {
      document.body.append(headerHtmleElement, garageHtmlElement);
    }
  }
}
