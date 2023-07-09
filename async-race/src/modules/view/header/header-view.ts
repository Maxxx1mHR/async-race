// import ElementCreator from '../utils/element-creator';
import ElementCreator from '../../utils/element-creator';
import GarageView from '../main/garage/garage-view';
import MainView from '../main/main-view';
import WinnersView from '../main/winners/winners-view';
import View from '../view';
import LinkNavigationView from './link-navigation-view';

const cssClasses = {
  HEADER: 'header',
  NAV: 'navigation',
};

const NamePages = {
  GARAGE: 'to garage',
  WINNERS: 'to winners',
};

const START_PAGE_INDEX = 0;

export default class HeaderView extends View {
  private linkElements: LinkNavigationView[];

  constructor(mainComponent: MainView) {
    const params = {
      tag: 'header',
      className: [cssClasses.HEADER],
    };
    super(params);

    this.linkElements = [];
    this.configureView(mainComponent);
  }

  private configureView(mainComponent: MainView): void {
    const paramsNav = {
      tag: 'nav',
      className: [cssClasses.NAV],
    };

    const creatorNav = new ElementCreator(paramsNav);
    this.elementCreator.addInnerElement(creatorNav);

    const pages = this.getPages(mainComponent);

    pages.forEach((page, index) => {
      const linkElement = new LinkNavigationView(page, this.linkElements);
      const htmlLinkElement = linkElement.getHTMLElement();
      if (htmlLinkElement instanceof HTMLElement) {
        creatorNav.addInnerElement(htmlLinkElement);
      }
      this.linkElements.push(linkElement);
      if (index === START_PAGE_INDEX) {
        linkElement.setSelectedStatus();
      }
    });
  }

  private getPages(mainComponent: MainView): { name: string; callback: () => void }[] {
    const garageView = new GarageView();
    const winnersView = new WinnersView();
    const pages = [
      {
        name: NamePages.GARAGE,
        callback: () => mainComponent.setContent(garageView),
      },
      {
        name: NamePages.WINNERS,
        callback: () => mainComponent.setContent(winnersView),
      },
    ];
    return pages;
  }
}
