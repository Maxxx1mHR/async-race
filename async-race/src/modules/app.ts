import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';

export default class App {
  constructor() {
    this.createView();
  }

  private createView(): void {
    const mainView = new MainView();
    const headerView = new HeaderView(mainView);
    const headerHtmleElement = headerView.getHTMLElement();
    const mainHtmlView = mainView.getHTMLElement();
    if (headerHtmleElement && mainHtmlView) {
      document.body.append(headerHtmleElement, mainHtmlView);
    }
  }
}
