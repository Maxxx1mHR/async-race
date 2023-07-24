import ElementCreator from '../../utils/element-creator';
import MainView from '../main/main-view';
import View from '../view';
import LinkNavigationView from './links/link-navigation-view';

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
  private linkButtons: LinkNavigationView[];

  constructor(mainComponent: MainView) {
    const params = {
      tag: 'header',
      className: [cssClasses.HEADER],
    };
    super(params);

    this.linkButtons = [];
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
      const linkElement = new LinkNavigationView(page, this.linkButtons);
      const htmlLinkElement = linkElement.getHTMLElement();
      if (htmlLinkElement instanceof HTMLElement) {
        creatorNav.addInnerElement(htmlLinkElement);
      }
      this.linkButtons.push(linkElement);
      if (index === START_PAGE_INDEX) {
        linkElement.setSelectedStatus();
      }
    });
  }

  private getPages(mainComponent: MainView): { name: string; callback: () => void }[] {
    const pages = [
      {
        name: NamePages.GARAGE,
        callback: (): void => {
          mainComponent.setContent(mainComponent.garageView);
        },
      },
      {
        name: NamePages.WINNERS,
        callback: () => mainComponent.setContent(mainComponent.winnersView),
      },
    ];
    return pages;
  }
}
