import { IButton } from '../../../../../types/types';
import View from '../../../../view';
import ButtonCarView from '../buttonView/button-view';

const cssClasses = {
  CUSTOMIZE_ACTION: 'customize__action',
};

const NameButton = {
  RACE: 'race',
  RESET: 'reset',
};

export default class CarSettingActionView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.CUSTOMIZE_ACTION],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const buttons = this.getButtons();
    buttons.forEach((button) => {
      const actionCar = new ButtonCarView(button);
      this.elementCreator.addInnerElement(actionCar.getHTMLElement() as HTMLElement);
    });
  }

  private getButtons(): IButton[] {
    const buttons = [
      {
        name: NameButton.RACE,
        callback: (): void => {},
      },
      {
        name: NameButton.RESET,
        callback: (): void => {},
      },
    ];
    return buttons;
  }
}
