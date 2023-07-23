import { IButton, ICar, ICarResponse, ICarResponseEngine, IInput } from '../../../types/types';
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

  private inputElements: InputView[];

  private selectedCarValue: number;

  public carElements: TrackView[];

  private win: WinnersView;

  private carAnimation: null[];

  private settingButtonElements: HTMLElement[];

  private creatorModal: ElementCreator | null;

  constructor(winnersView: WinnersView) {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);
    this.inputElements = [];
    this.selectedCarValue = 0;

    this.carElements = [];
    this.carAnimation = [];
    this.settingButtonElements = [];

    this.configureSettingsView();
    this.configureGarageCarView();
    this.currentPage = 1;
    this.win = winnersView;
    this.creatorModal = null;
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
      inputs.forEach((input) => {
        const inputElement = new InputView(input);

        this.inputElements.push(inputElement);

        const htmlLinkElement = inputElement.getHTMLElement();

        if (htmlLinkElement instanceof HTMLInputElement) {
          element.addInnerElement(htmlLinkElement);
        }
      });

      const buttonElement = new ButtonView(buttons[index]);
      const htmlButtonElement = buttonElement.getHTMLElement();
      if (htmlButtonElement instanceof HTMLElement) {
        element.addInnerElement(htmlButtonElement);
        this.settingButtonElements.push(htmlButtonElement);
      }

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
        this.settingButtonElements.push(htmlButtonElement);
      }

      if (htmlButtonElement instanceof HTMLElement) {
        createSettingGenerate.addInnerElement(htmlButtonElement);
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
        className: [cssClasses.BUTTON],

        name: inputButtons.CREATE,
        callback: async (): Promise<void> => {
          console.log(this.settingButtonElements);
          const textValueFromInputCreate = this.inputElements[0].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputCreate = this.inputElements[1].getHTMLElement() as HTMLInputElement;
          await serverQuery.createCar({
            name: textValueFromInputCreate.value,
            color: colorValueFromInputCreate.value,
          });
          this.updateContentGarage();
        },
      },
      {
        className: [cssClasses.BUTTON],

        name: inputButtons.UPDATE,
        callback: async (): Promise<void> => {
          const textValueFromInputUpdate = this.inputElements[2].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputUpdate = this.inputElements[3].getHTMLElement() as HTMLInputElement;
          await serverQuery.updateCar(this.selectedCarValue, {
            name: textValueFromInputUpdate.value,
            color: colorValueFromInputUpdate.value,
          });
          this.updateContentGarage();
          this.win.setContent();
        },
      },
    ];
    return buttons;
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
          this.settingButtonElements[0].classList.add('button-disabled');
          this.settingButtonElements[1].classList.add('button-disabled');
          this.settingButtonElements[2].classList.add('button-disabled');
          this.settingButtonElements[3].classList.add('button-disabled');
          this.settingButtonElements[4].classList.add('button-disabled');
          this.settingButtonElements[5].classList.add('button-disabled');
          this.settingButtonElements[6].classList.add('button-disabled');

          const serverQuery = new ServerQuery();

          const finishFlag = document.querySelector('.track__finish');

          // public testCarElement: [HTMLElement, number][];

          const startedCar: Promise<number[]>[] = [];
          // const requestIdArray: (number | null)[] = [];
          // const startedCar: Promise<number[]>[] = [];
          // const startedCarDrive: Promise<ICarResponseEngine>[] = [];

          this.carElements.forEach((item) => {
            item.createdButtons[0].classList.add('button-disabled');
            item.createdButtons[1].classList.add('button-disabled');
            item.createdButtons[2].classList.add('button-disabled');
            item.createdButtons[3].classList.add('button-disabled');
            // console.log(item);
            // // Анимация
            // let requestId: number | null = null;

            // function startAmination(duration: number, callback: (arg0: number) => void): void {
            //   let startAminations: number | null = null;

            //   requestId = requestAnimationFrame(function measure(times) {
            //     if (!startAminations) {
            //       startAminations = times;
            //     }

            //     if (startAminations) {
            //       const progress = (times - startAminations) / duration;

            //       callback(progress);

            //       if (progress < 1) {
            //         requestId = requestAnimationFrame(measure);
            //       }
            //     }
            //   });
            // }

            const time = serverQuery.getEngineStatus(item.car.id, 'started');
            startedCar.push(time);

            // console.log(time);

            // if (finishFlag instanceof HTMLElement) {
            //   const duration = time[1];
            //   const distance = finishFlag.offsetLeft - 40;
            //   const car = item.createdCar[0];

            //   startAmination(duration, (progress) => {
            //     const translate = progress * distance;
            //     car.style.transform = `translateX(${translate}px)`;
            //   });
            // }

            // await serverQuery
            //   .getDrive(item.car.id)
            //   .then(async () => {
            //     await serverQuery.getWinner(item.car.id).then(async (data) => {
            //       i += 1;
            //       if (oneCall) {
            //         if (data.id !== item.car.id) {
            //           console.log('1');
            //           await serverQuery.createWinner({
            //             wins: 1,
            //             time: Number((time[1] / 1000).toFixed(2)),
            //           });
            //         } else if (data.id === item.car.id && data.time <= Number((time[1] / 1000).toFixed(2))) {
            //           console.log('2');

            //           await serverQuery.updateWinner(item.car.id, {
            //             wins: Number(data.wins) + 1,
            //             time: data.time,
            //           });
            //         } else if (data.id === item.car.id && data.time >= Number((time[1] / 1000).toFixed(2))) {
            //           console.log('3');

            //           await serverQuery.updateWinner(item.car.id, {
            //             wins: Number(data.wins) + 1,
            //             time: Number((time[1] / 1000).toFixed(2)),
            //           });
            //         }
            //         this.win.setContent();
            //         oneCall = false;
            //       }
            //     });
            //   })
            //   .catch(() => {
            //     if (requestId) {
            //       i += 1;
            //       cancelAnimationFrame(requestId);
            //     }
            //   });
            // if (this.carElements.length === i) {
            //   this.settingButtonElements[3].classList.remove('button-disabled');
            // }
          });

          Promise.all(startedCar).then((data) =>
            data.forEach(async (item, index) => {
              console.log(this.carElements);
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

              if (finishFlag instanceof HTMLElement) {
                const duration = item[1];
                const distance = finishFlag.offsetLeft - 80;
                const car = this.carElements[index].createdCar[0];

                startAmination(duration, (progress) => {
                  const translate = progress * distance;
                  car.style.transform = `translateX(${translate}px)`;
                });
              }

              await serverQuery
                .getDrive(item[0])
                .then(async () => {
                  await serverQuery.getWinner(item[0]).then(async (winner) => {
                    console.log('item', item);
                    console.log(winner);
                    i += 1;
                    if (oneCall) {
                      oneCall = false;
                      if (winner.id !== item[0]) {
                        console.log('Машина еще не побеждала, записалось 1 победа и время');
                        await serverQuery.createWinner({
                          id: item[0],
                          wins: 1,
                          time: Number((item[1] / 1000).toFixed(2)),
                        });
                        this.win.setContent();
                      } else if (winner.id === item[0] && winner.time <= Number((item[1] / 1000).toFixed(2))) {
                        console.log('Машина уже побеждала, записалось +1 победа. Вреия осталось старое');
                        await serverQuery.updateWinner(item[0], {
                          id: item[0],
                          wins: Number(winner.wins) + 1,
                          time: winner.time,
                        });
                        this.win.setContent();
                      } else if (winner.id === item[0] && winner.time >= Number((item[1] / 1000).toFixed(2))) {
                        console.log('Машина уже побеждала, записалось +1 победа и обновлено время');
                        await serverQuery.updateWinner(item[0], {
                          id: item[0],
                          wins: Number(winner.wins) + 1,
                          time: Number((item[1] / 1000).toFixed(2)),
                        });
                        this.win.setContent();
                      }
                      console.log(this.carElements[index], '-', index, 'время', item[1]);
                      this.creatorModal?.setTextContent(
                        `${this.carElements[index].car.name} went first ${Number((item[1] / 1000).toFixed(2))}`,
                      );
                      // this.win.setContent();

                      console.log('сработал');
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
                this.settingButtonElements[3].classList.remove('button-disabled');
              }
            }),
          );
        },
      },
      {
        className: [cssClasses.BUTTON],

        name: settingButtons.RESET,
        callback: (): void => {
          this.creatorModal?.setTextContent('');
          this.settingButtonElements[0].classList.remove('button-disabled');
          this.settingButtonElements[1].classList.remove('button-disabled');
          this.settingButtonElements[2].classList.remove('button-disabled');
          // this.settingButtonElements[3].classList.add('button-disabled');
          this.settingButtonElements[4].classList.remove('button-disabled');
          this.settingButtonElements[5].classList.remove('button-disabled');
          this.settingButtonElements[6].classList.remove('button-disabled');

          this.carElements.forEach((item) => {
            item.createdButtons[0].classList.remove('button-disabled');
            item.createdButtons[1].classList.remove('button-disabled');
            item.createdButtons[2].classList.remove('button-disabled');
          });

          const serverQuery = new ServerQuery();
          // console.log(this.carAnimation);
          this.carElements.forEach(async (carElements) => {
            await serverQuery.getEngineStatus(carElements.car.id, 'stopped');
            // if (requestId) {
            // cancelAnimationFrame(requestId);
            // }

            const car = carElements.createdCar[0];
            car.style.transform = `translateX(${0}px)`;
          });
        },
      },
      {
        className: [cssClasses.BUTTON],
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
        name: `${mark} ${model}`,
        color: `#${color}`,
      });
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

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: `${PAGE} ${this.currentPage} / ${Math.ceil(cars.count / ITEM_PER_PAGE)}`,
    };
    const creatorSubtitle = new ElementCreator(paramsPage);
    createGarageCar.addInnerElement(creatorSubtitle);

    // this.testCarElement = [];
    this.carElements = [];

    cars.data.forEach((car) => {
      // console.log('cars', cars);
      const track = new TrackView(car, this.getCarButtons(car));

      // this.testCarElement.push([track.createdCar[0], track.car.id]);
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
      this.settingButtonElements.push(htmlbuttonPrev);
    }
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
    const htmlbuttonNext = buttonNext.getElement();
    if (htmlbuttonNext) {
      this.settingButtonElements.push(htmlbuttonNext);
    }
    creatorNav.addInnerElement(buttonNext);
  }

  private getCarButtons(car: ICar): IButton[] {
    const serverQuery = new ServerQuery();

    const buttons = [
      {
        className: [cssClasses.BUTTON, cssClasses.BUTTON_SMALL],
        name: carButtons.SELECT,
        callback: (): void => {
          // console.log(this.selectedCarValue);
          // console.log(this.linkElements);
          const textValueFromInputUpdate = this.inputElements[2].getHTMLElement() as HTMLInputElement;
          const colorValueFromInputUpdate = this.inputElements[3].getHTMLElement() as HTMLInputElement;
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
          this.updateContentGarage();
          this.win.setContent();
        },
      },
      // {
      //   name: carButtons.START,
      //   callback: () => console.log('start'),
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
