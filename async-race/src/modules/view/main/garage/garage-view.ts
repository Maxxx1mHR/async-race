import { IButton, ICar, ICarResponse, IInput } from '../../../types/types';
import ElementCreator from '../../../utils/element-creator';
import ServerQuery from '../../../utils/server-query';
import View from '../../view';
import ButtonView from './buttons/button-view';
import TrackView from './garageCar/track/track-view';
import InputView from './inputs/inputs-view';

const cssClasses = {
  GARAGE: 'garage',
  SETTING: 'settings',
  GARAGE_CARS: 'garage__cars',
  SETTING_CREATE: 'settings__create',
  SETTING_UPDATE: 'settings__update',
  SETTING_GENERATE: 'settings__generate',
  TITILE: 'title',
  SUBTITLE: 'subtitle',
  NAV: 'navigation-page',
  BUTTON: 'button',
};

const inputTypes = {
  TYPE_TEXT: 'text',
  TYPE_COLOR: 'color',
};
const INPUT_COLOR_VALUE = '#ffffff';

const inputButtons = {
  CREATE: 'create',
  UPDATE: 'update',
};

const settingButtons = {
  RACE: 'race',
  RESET: 'reset',
  GENERAGE: 'generate cars',
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
const ITEM_PER_PAGE = 7;

const carMark = [
  'Porsche',
  'BMW',
  'Ford',
  'KIA',
  'Hyundai',
  'Audi',
  'Mercedes-Benz',
  'Mitsubishi',
  'Volkswagen',
  'Subaru',
  'Infiniti',
  'Bugatti',
  'Lamborghini',
  'Suzuli',
  'Mazda',
];
const carModel = [
  'Cayman',
  'Taycan',
  'Panamera',
  'Macan',
  'Focus',
  'Camry',
  'Rio',
  'Ceed',
  'Sportage',
  'Solaris',
  'Qashqai',
  'Mulsanne',
  'Huracan',
  'Aventador',
  'Phantom',
];

export default class GarageView extends View {
  private currentPage: number;

  private linkElements: InputView[];

  private selectedCarValue: number;

  public testCarElement: TrackView[];

  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);
    this.linkElements = [];
    this.selectedCarValue = 0;
    this.testCarElement = [];

    this.configureSettingsView();
    this.configureGarageCarView();
    this.currentPage = 1;
  }

  private configureSettingsView(): void {
    const parammsSetting = {
      tag: 'div',
      className: [cssClasses.SETTING],
    };
    const createSetting = new ElementCreator(parammsSetting);
    this.elementCreator.addInnerElement(createSetting);

    const parammsSettingCreate = {
      tag: 'div',
      className: [cssClasses.SETTING_CREATE],
    };
    const createSettingCreate = new ElementCreator(parammsSettingCreate);

    const parammsSettingUpdate = {
      tag: 'div',
      className: [cssClasses.SETTING_UPDATE],
    };
    const createSettingUpdate = new ElementCreator(parammsSettingUpdate);

    const innerSettingElements = [createSettingCreate, createSettingUpdate];
    const inputs = this.getInputs();
    const buttons = this.getInputButtons();

    innerSettingElements.forEach((element, index) => {
      const buttonElement = new ButtonView(buttons[index]);

      inputs.forEach((input) => {
        const inputElement = new InputView(input);

        this.linkElements.push(inputElement);

        const htmlLinkElement = inputElement.getHTMLElement();
        const htmlButtonElement = buttonElement.getHTMLElement();

        if (htmlLinkElement instanceof HTMLInputElement) {
          element.addInnerElement(htmlLinkElement);
        }
        if (htmlButtonElement instanceof HTMLElement) {
          element.addInnerElement(htmlButtonElement);
        }
      });
      createSetting.addInnerElement(element);
    });

    const parammsSettingGenerate = {
      tag: 'div',
      className: [cssClasses.SETTING_CREATE],
    };
    const createSettingGenerate = new ElementCreator(parammsSettingGenerate);
    createSetting.addInnerElement(createSettingGenerate);

    const buttonsSetting = this.getSettingButtons();
    buttonsSetting.forEach((button) => {
      const buttonElement = new ButtonView(button);
      const htmlButtonElement = buttonElement.getHTMLElement();

      if (htmlButtonElement instanceof HTMLElement) {
        createSetting.addInnerElement(htmlButtonElement);
      }
    });
  }

  private getInputs(): IInput[] {
    const inputs = [
      {
        type: inputTypes.TYPE_TEXT,
      },
      {
        type: inputTypes.TYPE_COLOR,
        value: INPUT_COLOR_VALUE,
      },
    ];
    return inputs;
  }

  private getInputButtons(): IButton[] {
    const serverQuery = new ServerQuery();

    const buttons = [
      {
        name: inputButtons.CREATE,
        callback: async (): Promise<void> => {
          const textValueFromInputCreate = this.linkElements[0].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputCreate = this.linkElements[1].getHTMLElement() as HTMLInputElement;
          await serverQuery.createCar({
            // id: 0,
            name: textValueFromInputCreate.value,
            color: colorValueFromInputCreate.value,
          });
          this.updateContentGarage();
        },
      },
      {
        name: inputButtons.UPDATE,
        callback: async (): Promise<void> => {
          const textValueFromInputUpdate = this.linkElements[2].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputUpdate = this.linkElements[3].getHTMLElement() as HTMLInputElement;
          await serverQuery.updateCar(this.selectedCarValue, {
            id: 0,
            name: textValueFromInputUpdate.value,
            color: colorValueFromInputUpdate.value,
          });
          this.updateContentGarage();
        },
      },
    ];
    return buttons;
  }

  private getSettingButtons(): IButton[] {
    const buttons = [
      {
        name: settingButtons.RACE,
        callback: () => console.log(this, 'race'),
      },
      {
        name: settingButtons.RESET,
        callback: () => console.log('reset'),
      },
      {
        name: settingButtons.GENERAGE,
        callback: (): void => {
          // console.log('generate');
          this.generateCars();
          this.updateContentGarage();
        },
      },
    ];
    return buttons;
  }

  private generateCars(): void {
    const serverQuery = new ServerQuery();
    let i = 0;
    while (i < 100) {
      const mark = carMark[Math.floor(Math.random() * carMark.length)];
      const model = carModel[Math.floor(Math.random() * carModel.length)];
      const color = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      serverQuery.createCar({
        // id: 0,
        name: `${mark} ${model}`,
        color: `#${color}`,
      });
      console.log(mark, model, color);
      i += 1;
    }
  }

  private async configureGarageCarView(): Promise<void> {
    const serverQuery = new ServerQuery();

    const cars: ICarResponse = await serverQuery.getCars([
      { key: '_page', value: this.currentPage },
      { key: '_limit', value: ITEM_PER_PAGE },
    ]);

    const paramsGarageCar = {
      tag: 'div',
      className: [cssClasses.GARAGE_CARS],
    };
    const createGarageCar = new ElementCreator(paramsGarageCar);
    this.elementCreator.addInnerElement(createGarageCar);

    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT} ${cars.count}`,
    };
    const creatorTitle = new ElementCreator(paramsTitle);
    createGarageCar.addInnerElement(creatorTitle);

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: `${PAGE} ${this.currentPage} / ${Math.ceil(cars.count / ITEM_PER_PAGE)}`,
    };
    const creatorSubtitle = new ElementCreator(paramsPage);
    createGarageCar.addInnerElement(creatorSubtitle);

    cars.data.forEach((car) => {
      const track = new TrackView(car, this.getCarButtons(car));
      this.testCarElement.push(track);

      const htmlTrack = track.getHTMLElement();
      if (htmlTrack instanceof HTMLElement) {
        createGarageCar.addInnerElement(htmlTrack);
      }
    });

    const paramsNav = {
      tag: 'nav',
      className: [cssClasses.NAV],
    };
    const creatorNav = new ElementCreator(paramsNav);
    createGarageCar.addInnerElement(creatorNav);

    const paramsButtonPrev = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: PREV,
      callback: (): void => {
        if (this.currentPage <= 1) {
          this.currentPage = 1;
        } else {
          this.currentPage -= 1;
          this.updateContentGarage();
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
          this.updateContentGarage();
        }
      },
    };
    const buttonNext = new ElementCreator(paramsButtonNext);
    creatorNav.addInnerElement(buttonNext);
  }

  private getCarButtons(car: ICar): { name: string; callback: () => void }[] {
    const serverQuery = new ServerQuery();

    const buttons = [
      {
        name: carButtons.SELECT,
        callback: (): void => {
          const textValueFromInputUpdate = this.linkElements[2].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputUpdate = this.linkElements[3].getHTMLElement() as HTMLInputElement;
          textValueFromInputUpdate.value = car.name;
          colorValueFromInputUpdate.value = car.color;
          this.selectedCarValue = car.id;
        },
      },
      {
        name: carButtons.REMOVE,
        callback: async (): Promise<void> => {
          await serverQuery.deleteCar(car.id);
          await serverQuery.deleteWinner(car.id);
          this.updateContentGarage();
        },
      },
      // {
      //   name: carButtons.START,
      //   callback: (): void => {
      //     this.startCar(3000);
      //     this.testCarElement.forEach((item) => console.log(item));

      //     console.log('start');
      //   },
      // },
      // {
      //   name: carButtons.STOP,
      //   callback: () => console.log('stop'),
      // },
    ];
    return buttons;
  }

  public updateContentGarage(): void {
    const currentElement = this.elementCreator.getElement();

    // while (currentElement?.firstElementChild) {
    if (currentElement?.lastElementChild) {
      currentElement?.lastElementChild.remove();
    }
    // }
    this.configureGarageCarView();
  }

  private startCar(duration: number): void {
    const finish = document.querySelector('.track__finish');
    const car = document.querySelector('.track__car');
    const framesCount = (duration / 1000) * 60;

    if (finish instanceof HTMLElement && car instanceof HTMLElement) {
      // console.log(finish.offsetLeft);
      // console.log(car.offsetLeft);

      // console.log(finish.offsetLeft - car.offsetLeft);
      // const end = finish.offsetLeft - car.offsetLeft;
      let current = 0;

      const dx = (finish.offsetLeft - car.offsetLeft) / framesCount;
      const tick = (): void => {
        current += dx;
        car.style.transform = `translateX(${current}px)`;
        if (current < finish.offsetLeft - 40) {
          requestAnimationFrame(tick);
        }
      };
      tick();
    }
  }
}
