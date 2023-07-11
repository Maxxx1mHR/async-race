import View from '../../view';
import CarSettingView from './carSetting/car-setting-view';
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
    const garageCarsView = new GarageCarsView();
    const carSetting = new CarSettingView(garageCarsView);
    this.elementCreator.addInnerElement(carSetting.getHTMLElement() as HTMLElement);
    this.elementCreator.addInnerElement(garageCarsView.getHTMLElement() as HTMLElement);
  }
}
