import { IButton } from '../../../../types/types';
import View from '../../../view';

export default class ButtonView extends View {
  constructor(buttonParams: IButton) {
    const params = {
      tag: 'div',
      className: buttonParams.className,
      textContent: buttonParams.name,
      callback: buttonParams.callback,
    };
    super(params);
  }
}
