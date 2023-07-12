import ElementCreator from '../../../../../utils/element-creator';
import View from '../../../../view';
import img_finish from '../../../../../../assets/img/finish.png';
import { ICar } from '../../../../../types/types';

const img = new Image();

const cssClasses = {
  TRACK: 'track',
  TRACK_SETTING_MODIFICATION: 'track__setting-modification',
  SELECT: 'select-car',
  REMOVE: 'remove-car',
  NAME: 'name-car',
  TRACK_SETTING_ACTION: 'track__setting-action',
  START: 'start-car',
  STOP: 'srop-car',
  TRACK_WRAPPER: 'track__wrapper',
  CAR: 'car',
  FINISH: 'track__finish',
  BUTTON: 'button',
};

const SELECT = 'select';
const REMOVE = 'remove';
const START = 'start';
const STOP = 'stop';

export default class TrackView extends View {
  private car: ICar;

  private callback: CallableFunction | null;

  constructor(car: ICar) {
    const params = {
      tag: 'div',
      className: [cssClasses.TRACK],
    };
    super(params);

    this.callback = null;
    this.car = car;
    this.configureView();
  }

  private configureView(): void {
    const paramsTrackSettingModification = {
      tag: 'div',
      className: [cssClasses.TRACK_SETTING_MODIFICATION],
    };
    const trackSettingModification = new ElementCreator(paramsTrackSettingModification);
    this.elementCreator.addInnerElement(trackSettingModification);

    const paramsSelect = {
      tag: 'div',
      className: [cssClasses.SELECT, cssClasses.BUTTON],
      textContent: SELECT,
      callback: this.buttonClickHandler.bind(this),
    };
    const select = new ElementCreator(paramsSelect);
    trackSettingModification.addInnerElement(select);

    const paramsRemove = {
      tag: 'div',
      className: [cssClasses.REMOVE, cssClasses.BUTTON],
      textContent: REMOVE,
    };
    const remove = new ElementCreator(paramsRemove);
    trackSettingModification.addInnerElement(remove);

    const paramsName = {
      tag: 'div',
      className: [cssClasses.NAME],
      textContent: this.car.name,
    };
    const name = new ElementCreator(paramsName);
    trackSettingModification.addInnerElement(name);

    const paramsTrackWrapper = {
      tag: 'div',
      className: [cssClasses.TRACK_WRAPPER],
    };
    const trackWrapper = new ElementCreator(paramsTrackWrapper);
    this.elementCreator.addInnerElement(trackWrapper);

    const paramsTrackSettingAction = {
      tag: 'div',
      className: [cssClasses.TRACK_SETTING_ACTION],
    };
    const trackSettingAction = new ElementCreator(paramsTrackSettingAction);
    // this.elementCreator.addInnerElement(trackSettingAction);
    trackWrapper.addInnerElement(trackSettingAction);

    const paramsStart = {
      tag: 'div',
      className: [cssClasses.START, cssClasses.BUTTON],
      textContent: START,
    };
    const start = new ElementCreator(paramsStart);
    trackSettingAction.addInnerElement(start);

    const paramsStop = {
      tag: 'div',
      className: [cssClasses.STOP, cssClasses.BUTTON],
      textContent: STOP,
    };
    const stop = new ElementCreator(paramsStop);
    trackSettingAction.addInnerElement(stop);

    const paramsCar = {
      tag: 'div',
      className: [cssClasses.CAR],
      backgroundColor: this.car.color,
    };

    const car = new ElementCreator(paramsCar);
    trackSettingAction.addInnerElement(car);

    const paramsFinish = {
      tag: 'img',
      className: [cssClasses.FINISH],
      src: (img.src = img_finish),
      alt: 'finish',
    };

    const finish = new ElementCreator(paramsFinish);
    trackWrapper.addInnerElement(finish);
  }

  public setCallback(callback: CallableFunction): void {
    if (typeof callback === 'function') {
      this.callback = callback;
    }
  }

  private buttonClickHandler(): void {
    if (this.callback) {
      this.callback();
    }
  }
}
