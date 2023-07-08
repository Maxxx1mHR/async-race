// import ElementCreator from '../utils/element-creator';
import ElementCreator from '../utils/element-creator';
import View from './view';

export default class HeaderView extends View {
  constructor() {
    const params = {
      tag: 'header',
      className: ['header'],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const paramsNav = {
      tag: 'nav',
      className: ['navigation'],
    };
    const creatorNav = new ElementCreator(paramsNav);
    this.elementCreator.addInnerElement(creatorNav);
  }
}
