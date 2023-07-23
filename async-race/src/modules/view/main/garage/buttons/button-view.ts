import { IButton } from '../../../../types/types';
import View from '../../../view';

// const cssClasses = {
//   BUTTON: 'button',
// };

export default class ButtonView extends View {
  constructor(buttonParams: IButton) {
    const params = {
      tag: 'div',
      // className: [cssClasses.BUTTON],
      className: buttonParams.className,
      textContent: buttonParams.name,
      callback: buttonParams.callback,
    };
    super(params);
  }
}
