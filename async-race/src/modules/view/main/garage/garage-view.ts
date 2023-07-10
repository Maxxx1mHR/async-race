import View from '../../view';
import CarSettingView from './customizeCar/car-setting-view';
import GarageCarsView from './garageCar/garage-cars-view';

const cssClasses = {
  GARAGE: 'garage',
};

export default class GarageView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);

    this.configureView();
  }

  private configureView(): void {
    const carSetting = new CarSettingView();
    this.elementCreator.addInnerElement(carSetting.getHTMLElement() as HTMLElement);
    const garageCarsView = new GarageCarsView();
    this.elementCreator.addInnerElement(garageCarsView.getHTMLElement() as HTMLElement);
  }
}
