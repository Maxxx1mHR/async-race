import ElementCreator from '../../../../../utils/element-creator';
import View from '../../../../view';
import img_finish from '../../../../../../assets/img/finish.png';
import { IButton, ICar } from '../../../../../types/types';
import ButtonView from '../../buttons/button-view';

const img = new Image();

const cssClasses = {
  TRACK: 'track',
  TRACK_SETTING_BUTTONS: 'track__setting-buttons',
  TRACK_WRAPPER: 'track__wrapper',
  TRACK_CAR: 'track__car-wrapper',
  NAME: 'track__car-name',
  CAR: 'track__car',
  FINISH: 'track__finish',
  BUTTON: 'button',
};

export default class TrackView extends View {
  private car: ICar;

  private buttons: IButton[];

  constructor(car: ICar, buttons: IButton[]) {
    const params = {
      tag: 'div',
      className: [cssClasses.TRACK],
    };
    super(params);

    this.buttons = buttons;
    this.car = car;
    this.configureView();
  }

  private configureView(): void {
    const paramsTrackWrapper = {
      tag: 'div',
      className: [cssClasses.TRACK_WRAPPER],
    };
    const trackWrapper = new ElementCreator(paramsTrackWrapper);
    this.elementCreator.addInnerElement(trackWrapper);

    const paramsFinish = {
      tag: 'img',
      className: [cssClasses.FINISH],
      src: (img.src = img_finish),
      alt: 'finish',
    };

    const finish = new ElementCreator(paramsFinish);
    this.elementCreator.addInnerElement(finish);

    const paramsTrackSettingButtons = {
      tag: 'div',
      className: [cssClasses.TRACK_SETTING_BUTTONS],
    };
    const trackSettingButtons = new ElementCreator(paramsTrackSettingButtons);
    trackWrapper.addInnerElement(trackSettingButtons);

    this.buttons.forEach((button) => {
      // console.log(this.car);
      const buttonElement = new ButtonView(button);
      const htmlButtonElement = buttonElement.getHTMLElement();
      if (htmlButtonElement instanceof HTMLElement) {
        trackSettingButtons.addInnerElement(htmlButtonElement);
      }
    });

    const paramsCarWrapper = {
      tag: 'div',
      className: [cssClasses.TRACK_CAR],
    };
    const carWrapper = new ElementCreator(paramsCarWrapper);

    trackWrapper.addInnerElement(carWrapper);

    const paramsName = {
      tag: 'div',
      className: [cssClasses.NAME],
      textContent: this.car.name,
    };
    const name = new ElementCreator(paramsName);
    carWrapper.addInnerElement(name);

    const paramsCar = {
      tag: 'div',
      className: [cssClasses.CAR],
      backgroundColor: this.car.color,
    };

    const car = new ElementCreator(paramsCar);
    carWrapper.addInnerElement(car);
  }

  public setContent(): void {
    const currentElement = this.elementCreator.getElement();

    while (currentElement?.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
  }
}
