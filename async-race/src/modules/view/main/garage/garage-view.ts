import { IButton, ICar, ICarResponse, IInput } from '../../../types/types';
import ElementCreator from '../../../utils/element-creator';
import ServerQuery from '../../../utils/server-query';
import View from '../../view';
import WinnersView from '../winners/winners-view';
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
  BUTTON_SMALL: 'button-small',
  BUTTON_DISABLED: 'button-disabled',
  MODAL: 'modal',
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
  'Suzuki',
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

  private inputElementsCreate: InputView[];

  private inputElementsUpdate: InputView[];

  private selectedCarValue: number;

  public carElements: TrackView[];

  private winnersView: WinnersView;

  private settingButton: HTMLElement[];

  private paginationGarageButton: HTMLElement[];

  private creatorModal: ElementCreator | null;

  constructor(winnersView: WinnersView) {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);

    this.inputElementsCreate = [];
    this.inputElementsUpdate = [];

    this.selectedCarValue = 0;
    this.carElements = [];
    this.settingButton = [];
    this.paginationGarageButton = [];
    this.currentPage = 1;
    this.winnersView = winnersView;
    this.creatorModal = null;
    this.configureSettingsView();
    this.configureGarageCarView();
  }

  private configureSettingsView(): void {
    const parammsSetting = {
      tag: 'div',
      className: [cssClasses.SETTING],
    };
    const createSetting = new ElementCreator(parammsSetting);
    this.elementCreator.addInnerElement(createSetting);
    this.configuteInputs().forEach((element) => {
      createSetting.addInnerElement(element);
    });
    const parammsSettingGenerate = {
      tag: 'div',
      className: [cssClasses.SETTING_GENERATE],
    };
    const createSettingGenerate = new ElementCreator(parammsSettingGenerate);
    createSetting.addInnerElement(createSettingGenerate);

    const buttonsSetting = this.getSettingButtons();
    buttonsSetting.forEach((button) => {
      const buttonElement = new ButtonView(button);
      const htmlButtonElement = buttonElement.getHTMLElement();
      if (htmlButtonElement) {
        this.settingButton.push(htmlButtonElement);
      }
      if (htmlButtonElement instanceof HTMLElement) {
        createSettingGenerate.addInnerElement(htmlButtonElement);
      }
    });
  }

  private configuteInputs(): ElementCreator[] {
    const parammsSettingCreate = {
      tag: 'div',
      className: [cssClasses.SETTING_CREATE],
    };
    const parammsSettingUpdate = {
      tag: 'div',
      className: [cssClasses.SETTING_UPDATE],
    };
    const createSettingCreate = new ElementCreator(parammsSettingCreate);
    const createSettingUpdate = new ElementCreator(parammsSettingUpdate);
    const buttonCreate = new ButtonView(this.getInputButtons()[0]);
    const htmlButtonCreate = buttonCreate.getHTMLElement();
    const buttonUpdate = new ButtonView(this.getInputButtons()[1]);
    const htmlButtonUpdate = buttonUpdate.getHTMLElement();

    const inputs = this.getInputs();
    inputs.forEach((input) => {
      const inputElementCreate = new InputView(input);
      const inputElementUpdate = new InputView(input);
      const htmlInputElementCreate = inputElementCreate.getHTMLElement();
      const htmlInputElementUpdate = inputElementUpdate.getHTMLElement();
      if (
        htmlInputElementCreate &&
        htmlButtonCreate instanceof HTMLElement &&
        htmlInputElementUpdate instanceof HTMLInputElement &&
        htmlButtonUpdate instanceof HTMLElement
      ) {
        htmlInputElementUpdate.disabled = true;
        createSettingCreate.addInnerElement(htmlInputElementCreate);
        createSettingCreate.addInnerElement(htmlButtonCreate);
        createSettingUpdate.addInnerElement(htmlInputElementUpdate);
        createSettingUpdate.addInnerElement(htmlButtonUpdate);
        this.inputElementsCreate.push(inputElementCreate);
        this.inputElementsUpdate.push(inputElementUpdate);
      }
    });
    if (htmlButtonCreate) {
      this.settingButton.push(htmlButtonCreate);
    }
    if (htmlButtonUpdate) {
      this.settingButton.push(htmlButtonUpdate);
    }
    return [createSettingCreate, createSettingUpdate];
  }

  private getInputs(): IInput[] {
    const inputs = [
      {
        type: inputTypes.TYPE_TEXT,
        maxlength: 20,
        placeholder: 'Max length 20 symbols',
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
        className: [cssClasses.BUTTON],
        name: inputButtons.CREATE,
        callback: async (): Promise<void> => {
          this.createCar(serverQuery);
        },
      },
      {
        className: [cssClasses.BUTTON, cssClasses.BUTTON_DISABLED],
        name: inputButtons.UPDATE,
        callback: async (): Promise<void> => {
          this.updateCar(serverQuery);
        },
      },
    ];
    return buttons;
  }

  private async createCar(serverQuery: ServerQuery): Promise<void> {
    const [textInput, colorInput] = this.inputElementsCreate;
    const textValueFromInputCreate = textInput.getHTMLElement() as HTMLInputElement;
    const colorValueFromInputCreate = colorInput.getHTMLElement() as HTMLInputElement;
    await serverQuery.createCar({
      name: textValueFromInputCreate.value,
      color: colorValueFromInputCreate.value,
    });
    textValueFromInputCreate.value = '';
    colorValueFromInputCreate.value = '#ffffff';
    this.updateContentGarage();
  }

  private async updateCar(serverQuery: ServerQuery): Promise<void> {
    this.settingButton[1].classList.add('button-disabled');
    const [textInput, colorInput] = this.inputElementsUpdate;
    const textValueFromInputUpdate = textInput.getHTMLElement() as HTMLInputElement;
    const colorValueFromInputUpdate = colorInput.getHTMLElement() as HTMLInputElement;
    await serverQuery.updateCar(this.selectedCarValue, {
      name: textValueFromInputUpdate.value,
      color: colorValueFromInputUpdate.value,
    });
    textValueFromInputUpdate.value = '';
    colorValueFromInputUpdate.value = '#ffffff';
    this.updateContentGarage();
    textValueFromInputUpdate.disabled = true;
    colorValueFromInputUpdate.disabled = true;
    this.winnersView.setContent();
  }

  private getSettingButtons(): IButton[] {
    const buttons = [
      {
        className: [cssClasses.BUTTON],
        name: settingButtons.RACE,
        callback: (): void => {
          let oneCall = true;
          let i = 0;

          const navButtons = document.querySelectorAll('.navigation__item');
          navButtons[1]?.classList.add('button-disabled');
          this.setSettingButtonsDisabled();
          this.setPaginationButtonsDisabled();

          const serverQuery = new ServerQuery();
          const finishFlag = document.querySelector('.track__finish');
          const startedCar = this.requestStartEngine(serverQuery);

          Promise.all(startedCar).then((data) =>
            data.forEach(async (item, index) => {
              navButtons[1]?.classList.remove('button-disabled');

              let requestId: number | null = null;
              function startAmination(duration: number, callback: (arg0: number) => void): void {
                let startAminations: number | null = null;

                requestId = requestAnimationFrame(function measure(times) {
                  if (!startAminations) {
                    startAminations = times;
                  }
                  if (startAminations) {
                    const progress = (times - startAminations) / duration;
                    callback(progress);
                    if (progress < 1) {
                      requestId = requestAnimationFrame(measure);
                    }
                  }
                });
              }

              const [idCurrentCar, time] = item;
              const currentTimeCar = Number((time / 1000).toFixed(2));

              if (finishFlag instanceof HTMLElement) {
                const duration = time;
                const distance = finishFlag.offsetLeft - 80;
                const car = this.carElements[index].createdCar[0];

                startAmination(duration, (progress) => {
                  const translate = progress * distance;
                  car.style.transform = `translateX(${translate}px)`;
                });
              }

              await serverQuery
                .getDrive(idCurrentCar)
                .then(async () => {
                  await serverQuery.getWinner(idCurrentCar).then(async (winner) => {
                    i += 1;
                    if (oneCall) {
                      oneCall = false;
                      if (winner.id !== idCurrentCar) {
                        await serverQuery.createWinner({
                          id: idCurrentCar,
                          wins: 1,
                          time: currentTimeCar,
                        });
                      } else if (winner.id === idCurrentCar && winner.time <= currentTimeCar) {
                        await serverQuery.updateWinner(idCurrentCar, {
                          id: idCurrentCar,
                          wins: Number(winner.wins) + 1,
                          time: winner.time,
                        });
                      } else if (winner.id === idCurrentCar && winner.time >= currentTimeCar) {
                        await serverQuery.updateWinner(idCurrentCar, {
                          id: idCurrentCar,
                          wins: Number(winner.wins) + 1,
                          time: currentTimeCar,
                        });
                      }
                      this.creatorModal?.setTextContent(
                        `${this.carElements[index].carsOnPage.name} went first ${currentTimeCar}`,
                      );
                      this.winnersView.setContent();
                    }
                  });
                })
                .catch(() => {
                  if (requestId) {
                    i += 1;
                    cancelAnimationFrame(requestId);
                  }
                });
              if (this.carElements.length === i) {
                this.settingButton[3].classList.remove('button-disabled');
              }
            }),
          );
        },
      },
      {
        className: [cssClasses.BUTTON, cssClasses.BUTTON_DISABLED],
        name: settingButtons.RESET,
        callback: (): void => {
          this.creatorModal?.setTextContent('');
          this.setSettingButtonsActive();
          this.setPaginationButtonsActive();
          this.carElements.forEach((item) => {
            const [select, remove, start] = [...item.createdButtons];
            select.classList.remove('button-disabled');
            remove.classList.remove('button-disabled');
            start.classList.remove('button-disabled');
          });
          const serverQuery = new ServerQuery();
          this.carElements.forEach(async (carElements) => {
            await serverQuery.getEngineStatus(carElements.carsOnPage.id, 'stopped');
            const car = carElements.createdCar[0];
            car.style.transform = `translateX(${0}px)`;
          });
          this.updateContentGarage();
        },
      },
      {
        className: [cssClasses.BUTTON],
        name: settingButtons.GENERAGE,
        callback: (): void => {
          this.settingButton[4].classList.add('button-disabled');
          this.generateCars();
          this.updateContentGarage();
        },
      },
    ];
    return buttons;
  }

  private setSettingButtonsDisabled(): void {
    this.settingButton.forEach((button) => {
      button.classList.add('button-disabled');
    });
  }

  private setSettingButtonsActive(): void {
    this.settingButton.forEach((button, index) => {
      if (index % 2 === 0) {
        button.classList.remove('button-disabled');
      } else {
        button.classList.add('button-disabled');
      }
    });
  }

  private setPaginationButtonsDisabled(): void {
    this.paginationGarageButton.forEach((button) => {
      button.classList.add('button-disabled');
    });
  }

  private setPaginationButtonsActive(): void {
    this.paginationGarageButton.forEach((button) => {
      button.classList.remove('button-disabled');
    });
  }

  private requestStartEngine(serverQuery: ServerQuery): Promise<number[]>[] {
    const startedCar: Promise<number[]>[] = [];
    this.carElements.forEach((item) => {
      item.createdButtons.forEach((btn) => btn.classList.add('button-disabled'));
      const time = serverQuery.getEngineStatus(item.carsOnPage.id, 'started');
      startedCar.push(time);
    });
    return startedCar;
  }

  private async generateCars(): Promise<void> {
    const serverQuery = new ServerQuery();
    let i = 0;
    const result = [];
    while (i < 100) {
      const mark = carMark[Math.floor(Math.random() * carMark.length)];
      const model = carModel[Math.floor(Math.random() * carModel.length)];
      const color = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
      result[i] = serverQuery.createCar({
        name: `${mark} ${model}`,
        color: `#${color}`,
      });
      i += 1;
    }
    Promise.all(result).then(() => {
      this.settingButton[4].classList.remove('button-disabled');
    });
  }

  private async configureGarageCarView(): Promise<void> {
    this.paginationGarageButton = [];
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

    const paramsModal = {
      tag: 'div',
      className: [cssClasses.MODAL],
    };
    const creatorMoodal = new ElementCreator(paramsModal);
    createGarageCar.addInnerElement(creatorMoodal);
    this.creatorModal = creatorMoodal;

    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT} ${cars.count}`,
    };
    const creatorTitle = new ElementCreator(paramsTitle);
    createGarageCar.addInnerElement(creatorTitle);

    const countPage = Math.ceil(cars.count / ITEM_PER_PAGE) || 1;

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: `${PAGE} ${this.currentPage} / ${countPage}`,
    };
    const creatorSubtitle = new ElementCreator(paramsPage);
    createGarageCar.addInnerElement(creatorSubtitle);
    this.carElements = [];

    cars.data.forEach((car) => {
      const track = new TrackView(car, this.getCarButtons(car), this.settingButton);

      this.carElements.push(track);

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
    const htmlbuttonPrev = buttonPrev.getElement();
    if (htmlbuttonPrev) {
      this.paginationGarageButton.push(htmlbuttonPrev);
    }

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
    const htmlbuttonNext = buttonNext.getElement();

    if (htmlbuttonNext) {
      this.paginationGarageButton.push(htmlbuttonNext);
    }

    if (countPage === 1) {
      buttonPrev.setCssClasses([cssClasses.BUTTON_DISABLED]);
      buttonNext.setCssClasses([cssClasses.BUTTON_DISABLED]);
    }
    if (this.currentPage === 1) {
      buttonPrev.setCssClasses([cssClasses.BUTTON_DISABLED]);
    }
    if (this.currentPage === countPage) {
      buttonNext.setCssClasses([cssClasses.BUTTON_DISABLED]);
    }

    creatorNav.addInnerElement(buttonPrev);
    creatorNav.addInnerElement(buttonNext);
  }

  private getCarButtons(car: ICar): IButton[] {
    const serverQuery = new ServerQuery();

    const buttons = [
      {
        className: [cssClasses.BUTTON, cssClasses.BUTTON_SMALL],
        name: carButtons.SELECT,
        callback: (): void => {
          const textValueFromInputUpdate = this.inputElementsUpdate[0].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputUpdate = this.inputElementsUpdate[1].getHTMLElement() as HTMLInputElement;
          this.settingButton[1].classList.remove('button-disabled');
          textValueFromInputUpdate.disabled = false;
          colorValueFromInputUpdate.disabled = false;
          textValueFromInputUpdate.value = car.name;
          colorValueFromInputUpdate.value = car.color;
          this.selectedCarValue = car.id;
        },
      },
      {
        className: [cssClasses.BUTTON, cssClasses.BUTTON_SMALL],
        name: carButtons.REMOVE,
        callback: async (): Promise<void> => {
          await serverQuery.deleteCar(car.id);
          await serverQuery.deleteWinner(car.id);
          const cars: ICarResponse = await serverQuery.getCars([
            { key: '_page', value: this.currentPage },
            { key: '_limit', value: ITEM_PER_PAGE },
          ]);
          if (this.currentPage !== 1 && cars.count % 7 === 0) {
            this.currentPage -= 1;
          }
          if (this.winnersView.currentPage !== 1 && this.winnersView.countWinners % 10 === 1) {
            this.winnersView.currentPage -= 1;
          }
          this.updateContentGarage();
          this.winnersView.setContent();
        },
      },
    ];
    return buttons;
  }

  public updateContentGarage(): void {
    const currentElement = this.elementCreator.getElement();
    if (currentElement?.lastElementChild) {
      currentElement?.lastElementChild.remove();
    }
    this.configureGarageCarView();
  }
}
