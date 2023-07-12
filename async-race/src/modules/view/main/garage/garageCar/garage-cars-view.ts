/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICar } from '../../../../types/types';
import ElementCreator from '../../../../utils/element-creator';
import ServerQuery from '../../../../utils/server-query';
import View from '../../../view';

// import CarSettingView from '../customizeCar/car-setting-view';
import TrackView from './track/track-view';

const cssClasses = {
  GARAGE: 'garage__cars',
  TITILE: 'garage__title',
  SUBTITLE: 'garage__subtitle',
};

const TITLE_TEXT = 'garage';
const PAGE = 'page';

export default class GarageCarsView extends View {
  public selectedCar: ICar[];

  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);

    // this.configureSettingView();
    this.configureView();
    this.selectedCar = [];
  }

  private async configureView(): Promise<void> {
    const serverQuery = new ServerQuery();
    const countCars = await serverQuery.getCountCars();

    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT}${countCars}`,
    };
    const creatorTitle = new ElementCreator(paramsTitle);
    this.elementCreator.addInnerElement(creatorTitle);

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: PAGE,
    };
    const creatorSubtitle = new ElementCreator(paramsPage);
    this.elementCreator.addInnerElement(creatorSubtitle);

    const cars: ICar[] = await serverQuery.getCars();

    cars.forEach((car) => {
      const track = new TrackView(car);
      const selectOneCarCallback = (): void => {
        this.getSelectedCar(car);
        this.selectedCar.push(this.getSelectedCar(car));
        // console.log(car.id);
        // console.log(car.color);
      };
      track.setCallback(selectOneCarCallback);
      const htmlTrack = track.getHTMLElement();
      if (htmlTrack instanceof HTMLElement) {
        this.elementCreator.addInnerElement(htmlTrack);
      }
    });
  }

  public setContent(): void {
    const currentElement = this.elementCreator.getElement();

    while (currentElement?.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
    this.configureView();
  }

  public getSelectedCar(car: ICar): ICar {
    console.log(car);
    return car;
  }

  // private configureSettingView(): void {
  //   const settings = new CarSettingView();
  //   const htmlSettings = settings.getHTMLElement();
  //   if (htmlSettings instanceof HTMLElement) {
  //     this.elementCreator.addInnerElement(htmlSettings);
  //   }
  // }
}
