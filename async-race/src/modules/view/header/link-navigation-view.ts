import { IPage } from '../../types/types';
import View from '../view';

const cssClasses = {
  ITEM: 'navigation__item',
  ITEM_SELECTED: 'navigation__item-active',
};

export default class LinkNavigationView extends View {
  private linkElements: LinkNavigationView[];

  constructor(pageParam: IPage, linkElements: LinkNavigationView[]) {
    const params = {
      tag: 'a',
      className: [cssClasses.ITEM],
      textContent: pageParam.name,
      callback: pageParam.callback,
    };
    super(params);

    this.linkElements = linkElements;
    this.configureView();
  }

  public setSelectedStatus(): void {
    // this.linkElements.forEach((linkElement) => linkElement.setNotSelectedStatus());
    // const element = this.elementCreator.getElement();
    // element?.classList.add(cssClasses.ITEM_SELECTED);
  }

  public setNotSelectedStatus(): void {
    // const element = this.elementCreator.getElement();
    // element?.classList.remove(cssClasses.ITEM_SELECTED);
  }

  private configureView(): void {
    // const element = this.elementCreator.getElement();
    // element?.addEventListener('click', this.setSelectedStatus.bind(this));
  }
}
