import ElementCreator from '../../../../utils/element-creator';
import View from '../../../view';

const cssClasses = {
  TRACK: 'track',
  TRACK_SETTING_MODIFICATION: 'track__setting-modification',
  SELECT: 'select-car',
  REMOVE: 'remove-car',
  NAME: 'name-car',
  TRACK_SETTING_ACTION: 'track__setting-modification',
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
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.TRACK],
    };
    super(params);
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
    };
    const select = new ElementCreator(paramsSelect);
    trackSettingModification.addInnerElement(select);

    const paramsRemove = {
      tag: 'div',
      className: [cssClasses.REMOVE, cssClasses.BUTTON],
    };
    const remove = new ElementCreator(paramsRemove);
    trackSettingModification.addInnerElement(remove);

    const paramsName = {
      tag: 'div',
      className: [cssClasses.NAME],
    };
    const name = new ElementCreator(paramsName);
    trackSettingModification.addInnerElement(name);

    const paramsTrackSettingAction = {
      tag: 'div',
      className: [cssClasses.TRACK_SETTING_ACTION],
    };
    const trackSettingAction = new ElementCreator(paramsTrackSettingAction);
    this.elementCreator.addInnerElement(trackSettingAction);

    const paramsStart = {
      tag: 'div',
      className: [cssClasses.START],
    };
    const start = new ElementCreator(paramsStart);
    trackSettingAction.addInnerElement(start);

    const paramsStop = {
      tag: 'div',
      className: [cssClasses.STOP],
    };
    const stop = new ElementCreator(paramsStop);
    trackSettingAction.addInnerElement(stop);

    const paramsTrackWrapper = {
      tag: 'div',
      className: [cssClasses.TRACK_WRAPPER],
    };
    const trackWrapper = new ElementCreator(paramsTrackWrapper);
    this.elementCreator.addInnerElement(trackWrapper);

    const paramsCar = {
      tag: 'div',
      className: [cssClasses.CAR],
    };

    const car = new ElementCreator(paramsCar);
    trackWrapper.addInnerElement(car);

    const paramsFinish = {
      tag: 'img',
      className: [cssClasses.FINISH],
    };

    const finish = new ElementCreator(paramsFinish);
    trackWrapper.addInnerElement(finish);
  }
}
