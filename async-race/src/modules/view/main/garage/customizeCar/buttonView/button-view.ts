import { IButton } from '../../../../../types/types';
import View from '../../../../view';

// const cssClasses = {
//   BUTTON: 'button',
// };

export default class ButtonCarView extends View {
  constructor(buttonParam: IButton) {
    const params = {
      tag: 'div',
      className: ['button'],
      textContent: buttonParam.name,
      callback: buttonParam.callback,
    };
    super(params);
  }
}
