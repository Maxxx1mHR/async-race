import ElementCreator from '../../../../../utils/element-creator';
import View from '../../../../view';
import img_finish from '../../../../../../assets/img/finish.png';
import { IButton, ICar } from '../../../../../types/types';
import ButtonView from '../../buttons/button-view';
import ServerQuery from '../../../../../utils/server-query';

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
  BUTTON_SMALL: 'button-small',
  BUTTON_DISABLED: 'button-disabled',
};

export default class TrackView extends View {
  public car: ICar;

  private buttons: IButton[];

  public createdCar: HTMLElement[];

  public createdFinish: HTMLElement[];

  public createdButtons: HTMLElement[];

  constructor(car: ICar, buttons: IButton[]) {
    const params = {
      tag: 'div',
      className: [cssClasses.TRACK],
    };
    super(params);

    this.buttons = buttons;
    this.car = car;
    this.createdCar = [];
    this.createdFinish = [];
    this.createdButtons = [];

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
      const buttonElement = new ButtonView(button);
      const htmlButtonElement = buttonElement.getHTMLElement();
      if (htmlButtonElement) {
        this.createdButtons.push(htmlButtonElement);
      }

      if (htmlButtonElement instanceof HTMLElement) {
        trackSettingButtons.addInnerElement(htmlButtonElement);
      }
    });

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

    const paramsStartButton = {
      tag: 'div',
      className: [cssClasses.BUTTON, cssClasses.BUTTON_SMALL],
      textContent: 'Start',
      callback: async (): Promise<void> => {
        this.createdButtons[0].classList.add('button-disabled');
        this.createdButtons[1].classList.add('button-disabled');
        this.createdButtons[2].classList.add('button-disabled');
        this.createdButtons[3].classList.remove('button-disabled');

        const serverQuery = new ServerQuery();

        const finishFlag = document.querySelector('.track__finish');

        const time = await serverQuery.getEngineStatus(this.car.id, 'started');

        if (finishFlag instanceof HTMLElement) {
          const duration = time[1];

          const distance = finishFlag.offsetLeft - 80;
          const car = this.createdCar[0];
          startAmination(duration, (progress) => {
            const translate = progress * distance;
            car.style.transform = `translateX(${translate}px)`;
          });
        }
        await serverQuery.getDrive(this.car.id).catch(() => {
          if (requestId) {
            cancelAnimationFrame(requestId);
          }
        });
      },
    };

    const startButton = new ElementCreator(paramsStartButton);
    const startButtonHTML = startButton.getElement();
    if (startButtonHTML) {
      this.createdButtons.push(startButtonHTML);
    }
    trackSettingButtons.addInnerElement(startButton);

    const paramsStopButton = {
      tag: 'div',
      className: [cssClasses.BUTTON, cssClasses.BUTTON_SMALL, cssClasses.BUTTON_DISABLED],
      textContent: 'Stop',
      callback: async (): Promise<void> => {
        this.createdButtons[0].classList.remove('button-disabled');
        this.createdButtons[1].classList.remove('button-disabled');
        this.createdButtons[2].classList.remove('button-disabled');
        this.createdButtons[3].classList.add('button-disabled');

        const serverQuery = new ServerQuery();
        await serverQuery.getEngineStatus(this.car.id, 'stopped');
        if (requestId) {
          cancelAnimationFrame(requestId);
          const car = this.createdCar[0];
          car.style.transform = `translateX(${0}px)`;
        }
      },
    };

    const stopButton = new ElementCreator(paramsStopButton);
    const stopButtonHTML = stopButton.getElement();
    if (stopButtonHTML) {
      this.createdButtons.push(stopButtonHTML);
    }
    trackSettingButtons.addInnerElement(stopButton);

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
    const carHtml = car.getElement();
    if (carHtml) {
      this.createdCar.push(carHtml);
    }
    carWrapper.addInnerElement(car);
  }

  public setContent(): void {
    const currentElement = this.elementCreator.getElement();

    while (currentElement?.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
  }

  // private async startCar(duration: number): Promise<void> {
  //   const finish = document.querySelector('.track__finish');

  //   const car = this.createdCar[0];
  //   const framesCount = (duration / 1000) * 60;

  //   if (finish instanceof HTMLElement && car instanceof HTMLElement) {
  //     let current = 0;

  //     const dx = (finish.offsetLeft - car.offsetLeft) / framesCount;
  //     const tick = (): void => {
  //       current += dx;
  //       car.style.transform = `translateX(${current}px)`;
  //       if (current < finish.offsetLeft - 40) {
  //         requestAnimationFrame(tick);
  //       }
  //     };
  //     tick();
  //   }
  // }
}
