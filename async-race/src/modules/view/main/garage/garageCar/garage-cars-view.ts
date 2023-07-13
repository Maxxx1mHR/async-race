/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICar, ICarResponse } from '../../../../types/types';
import ElementCreator from '../../../../utils/element-creator';
import ServerQuery from '../../../../utils/server-query';
import View from '../../../view';
import WinnersView from '../../winners/winners-view';
import TrackView from './track/track-view';

// import CarSettingView from '../customizeCar/car-setting-view';

const cssClasses = {
  GARAGE: 'garage__cars',
  TITILE: 'title',
  SUBTITLE: 'subtitle',
  NAV: 'navigation-page',
  BUTTON: 'button',
};

const TITLE_TEXT = 'garage';
const PAGE = 'page';
const PREV = 'prev';
const NEXT = 'next';

const carButtons = {
  SELECT: 'select',
  REMOVE: 'remove',
  START: 'start',
  STOP: 'stop',
};

const ITEM_PER_PAGE = 2;

export default class GarageCarsView extends View {
  public selectedCar: ICar[];

  private currentPage: number;

  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);

    // this.configureSettingView();
    this.configureView();
    this.selectedCar = [];
    this.currentPage = 1;
  }

  private async configureView(): Promise<void> {
    const serverQuery = new ServerQuery();
    // const countCars = await serverQuery.getCountCars();

    const cars: ICarResponse = await serverQuery.getCars([
      { key: '_page', value: this.currentPage },
      { key: '_limit', value: ITEM_PER_PAGE },
    ]);

    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT} ${cars.count}`,
    };
    const creatorTitle = new ElementCreator(paramsTitle);
    this.elementCreator.addInnerElement(creatorTitle);

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: `${PAGE} ${this.currentPage} / ${Math.ceil(cars.count / ITEM_PER_PAGE)}`,
    };
    const creatorSubtitle = new ElementCreator(paramsPage);
    this.elementCreator.addInnerElement(creatorSubtitle);

    // const buttons = this.getButtons();
    // console.log(buttons);

    cars.data.forEach((car) => {
      const track = new TrackView(car, this.getButtons(car.id));
      // console.log(car.id);
      // const selectOneCarCallback = (): void => {
      // this.getSelectedCar(car);
      // this.selectedCar.push(this.getSelectedCar(car));
      // console.log(car.id);
      // console.log(car.color);
      // };
      // track.setCallback(selectOneCarCallback);
      const htmlTrack = track.getHTMLElement();
      if (htmlTrack instanceof HTMLElement) {
        this.elementCreator.addInnerElement(htmlTrack);
      }
    });

    const paramsNav = {
      tag: 'nav',
      className: [cssClasses.NAV],
    };

    const creatorNav = new ElementCreator(paramsNav);
    this.elementCreator.addInnerElement(creatorNav);

    const paramsButtonPrev = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: PREV,
      callback: (): void => {
        if (this.currentPage <= 1) {
          this.currentPage = 1;
        } else {
          this.currentPage -= 1;
          this.setContent();
        }
      },
    };
    const buttonPrev = new ElementCreator(paramsButtonPrev);
    creatorNav.addInnerElement(buttonPrev);

    const paramsButtonNext = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: NEXT,
      callback: (): void => {
        if (this.currentPage >= Math.ceil(cars.count / ITEM_PER_PAGE)) {
          this.currentPage = Math.ceil(cars.count / ITEM_PER_PAGE);
        } else {
          this.currentPage += 1;
          this.setContent();
        }
      },
    };
    const buttonNext = new ElementCreator(paramsButtonNext);
    creatorNav.addInnerElement(buttonNext);
  }

  public setContent(): void {
    const currentElement = this.elementCreator.getElement();

    while (currentElement?.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
    this.configureView();
  }

  public getSelectedCar(car: ICar): ICar {
    // console.log(car);
    return car;
  }

  private getButtons(carId: number): { name: string; callback: () => void }[] {
    const serverQuery = new ServerQuery();

    const buttons = [
      {
        name: carButtons.SELECT,
        callback: () => console.log('select'),
      },
      {
        name: carButtons.REMOVE,
        callback: async (): Promise<void> => {
          console.log('remove');
          await serverQuery.deleteCar(carId);
          await serverQuery.deleteWinner(carId);
          // console.log('this', tra);
          this.setContent();
          // eslint-disable-next-line no-new
        },
      },
      {
        name: carButtons.START,
        callback: () => console.log('start'),
      },
      {
        name: carButtons.STOP,
        callback: () => console.log('stop'),
      },
    ];
    return buttons;
  }
}
