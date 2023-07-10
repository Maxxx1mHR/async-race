import { IInput } from '../../../../../types/types';
import View from '../../../../view';
import ButtonCarView from '../buttonView/button-view';
import InputCarView from '../inputView/input-car-setting-view';

const cssClasses = {
  CUSTOMIZE_CREATE: 'customize__create',
  CUSTOMIZE_INPUT_TEXT: 'customize__input-text',
  CUSTOMIZE_INPUT_COLOR: 'customize__input-color',
};

const input = {
  INPUT_TEXT: {
    CLASSES: cssClasses.CUSTOMIZE_INPUT_COLOR,
    TYPE: 'text',
  },
  INPUT_COLOR: {
    CLASSES: cssClasses.CUSTOMIZE_INPUT_COLOR,
    TYPE: 'color',
    VALUE: '#ffffff',
  },
};
const CREATE = 'update';

export default class CarSettingUpdateView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.CUSTOMIZE_CREATE],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const inputs = this.getInputs();
    inputs.forEach((inputItem) => {
      const inputCar = new InputCarView(inputItem);
      this.elementCreator.addInnerElement(inputCar.getHTMLElement() as HTMLElement);
    });
    const buttonParams = {
      name: CREATE,
      callback: (): void => {},
    };
    const button = new ButtonCarView(buttonParams);
    this.elementCreator.addInnerElement(button.getHTMLElement() as HTMLElement);
  }

  private getInputs(): IInput[] {
    const inputs = [
      {
        className: [input.INPUT_TEXT.CLASSES],
        type: input.INPUT_TEXT.TYPE,
      },
      {
        className: [input.INPUT_COLOR.CLASSES],
        type: input.INPUT_COLOR.TYPE,
        value: input.INPUT_COLOR.VALUE,
      },
    ];
    return inputs;
  }
}
