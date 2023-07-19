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
};

export default class TrackView extends View {
  public car: ICar;

  private buttons: IButton[];

  public createdCar: HTMLElement[];

  public createdFinish: HTMLElement[];

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
    this.configureView();
  }

  private configureView(): void {
    // console.log('this', this);
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
    // console.log('finish', finish.getElement());

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
      className: ['button'],
      textContent: 'Start',
      callback: async (): Promise<void> => {
        const serverQuery = new ServerQuery();

        const finishFlag = document.querySelector('.track__finish');

        const time = await serverQuery.getEngineStatus(this.car.id, 'started');

        if (finishFlag instanceof HTMLElement) {
          const duration = time[1];

          const distance = finishFlag.offsetLeft - 40;
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
    trackSettingButtons.addInnerElement(startButton);

    const paramsStopButton = {
      tag: 'div',
      className: ['button'],
      textContent: 'Stop',
      callback: async (): Promise<void> => {
        const serverQuery = new ServerQuery();
        const time = await serverQuery.getEngineStatus(this.car.id, 'stopped');
        if (requestId) {
          cancelAnimationFrame(requestId);
          const car = this.createdCar[0];
          car.style.transform = `translateX(${0}px)`;
        }
      },
    };

    const stopButton = new ElementCreator(paramsStopButton);
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

  private async startCar(duration: number): Promise<void> {
    const finish = document.querySelector('.track__finish');

    const car = this.createdCar[0];
    const framesCount = (duration / 1000) * 60;

    if (finish instanceof HTMLElement && car instanceof HTMLElement) {
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
