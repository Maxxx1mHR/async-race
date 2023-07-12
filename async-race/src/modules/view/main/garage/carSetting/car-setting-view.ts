import ElementCreator from '../../../../utils/element-creator';
import ServerQuery from '../../../../utils/server-query';
import View from '../../../view';
import GarageCarsView from '../garageCar/garage-cars-view';

const cssClasses = {
  CUSTOMIZE: 'customize',
  CUSTOMIZE_CREATE: 'customize__create',
  CUSTOMIZE_UPDATE: 'customize__update',
  CUSTOMIZE_GENERATE: 'customize__generate',
  CUSTOMIZE_INPUT_TEXT: 'customize__input-text',
  CUSTOMIZE_INPUT_COLOR: 'customize__input-color',
  BUTTON: 'button',
};

const TYPE_TEXT = 'text';
const TYPE_COLOR = 'color';

const VALUE = '#ffffff';

const CREATE = 'create';
const UPDATE = 'update';
const RACE = 'race';
const RESET = 'recet';
const GENERATE = 'generate';

export default class CarSettingView extends View {
  constructor(garageCarsView: GarageCarsView) {
    const params = {
      tag: 'div',
      className: [cssClasses.CUSTOMIZE],
    };
    super(params);
    this.configureView(garageCarsView);
  }

  private async configureView(garageCarsView: GarageCarsView): Promise<void> {
    const serverQuery = new ServerQuery();
    const paramsCustomizeCreate = {
      tag: 'div',
      className: [cssClasses.CUSTOMIZE_CREATE],
    };
    const customizeCreate = new ElementCreator(paramsCustomizeCreate);
    this.elementCreator.addInnerElement(customizeCreate);
    const paramsCustomizeUpdate = {
      tag: 'div',
      className: [cssClasses.CUSTOMIZE_UPDATE],
    };
    const customizeUpdate = new ElementCreator(paramsCustomizeUpdate);
    this.elementCreator.addInnerElement(customizeUpdate);
    const paramsCustomizeGenerate = {
      tag: 'div',
      className: [cssClasses.CUSTOMIZE_GENERATE],
    };
    const customizeGenerate = new ElementCreator(paramsCustomizeGenerate);
    this.elementCreator.addInnerElement(customizeGenerate);
    // Create inputs
    const paramsInputText = {
      tag: 'input',
      className: [cssClasses.CUSTOMIZE_INPUT_TEXT],
      type: TYPE_TEXT,
    };
    const inputTextCreate = new ElementCreator(paramsInputText);
    const inputTextUpdate = new ElementCreator(paramsInputText);
    const paramsInputColor = {
      tag: 'input',
      className: [cssClasses.CUSTOMIZE_INPUT_COLOR],
      type: TYPE_COLOR,
      value: VALUE,
    };
    const inputColorCreate = new ElementCreator(paramsInputColor);
    const inputColorUpdate = new ElementCreator(paramsInputColor);

    function testFunc(): string[] {
      const text = inputTextCreate.getElement() as HTMLInputElement;
      const color = inputColorCreate.getElement() as HTMLInputElement;
      return [text.value, color.value];
    }
    // Create buttons
    const paramsButtonCreate = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: CREATE,
      callback: async (): Promise<void> => {
        await serverQuery.createCar({
          name: testFunc()[0],
          color: testFunc()[1],
        });
        garageCarsView.setContent();
      },
    };
    const buttonCreate = new ElementCreator(paramsButtonCreate);

    const paramsButtonUpdate = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: UPDATE,
      callback: (): void => {
        console.log('car-setting-view', garageCarsView.selectedCar);

        console.log('update');
      },
    };
    const buttonUpdate = new ElementCreator(paramsButtonUpdate);
    const paramsButtonRace = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: RACE,
    };
    const buttonRace = new ElementCreator(paramsButtonRace);
    const paramsButtonReset = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: RESET,
    };
    const buttonReset = new ElementCreator(paramsButtonReset);
    const paramsButtonGenerate = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: GENERATE,
    };
    const buttonGenerate = new ElementCreator(paramsButtonGenerate);
    customizeCreate.addInnerElement(inputTextCreate);
    customizeCreate.addInnerElement(inputColorCreate);
    customizeCreate.addInnerElement(buttonCreate);
    customizeUpdate.addInnerElement(inputTextUpdate);
    customizeUpdate.addInnerElement(inputColorUpdate);
    customizeUpdate.addInnerElement(buttonUpdate);
    customizeGenerate.addInnerElement(buttonRace);
    customizeGenerate.addInnerElement(buttonReset);
    customizeGenerate.addInnerElement(buttonGenerate);
  }
}
