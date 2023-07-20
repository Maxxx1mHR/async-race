import { IPage } from '../../../types/types';
import View from '../../view';

const cssClasses = {
  ITEM: 'navigation__item',
  ITEM_SELECTED: 'navigation__item-active',
};

export default class LinkNavigationView extends View {
  private linkButtons: LinkNavigationView[];

  constructor(pageParam: IPage, linkButtons: LinkNavigationView[]) {
    const params = {
      tag: 'a',
      className: [cssClasses.ITEM],
      textContent: pageParam.name,
      callback: pageParam.callback,
    };
    super(params);

    this.linkButtons = linkButtons;
    this.configureView();
  }

  public setSelectedStatus(): void {
    // console.log(this.linkButtons);
    this.linkButtons.forEach((linkButton) => linkButton.setNotSelectedStatus());
    const element = this.elementCreator.getElement();
    element?.classList.add(cssClasses.ITEM_SELECTED);
  }

  public setNotSelectedStatus(): void {
    const element = this.elementCreator.getElement();
    element?.classList.remove(cssClasses.ITEM_SELECTED);
  }

  private configureView(): void {
    const element = this.elementCreator.getElement();
    element?.addEventListener('click', this.setSelectedStatus.bind(this));
  }
}
