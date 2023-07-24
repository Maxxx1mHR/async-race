import { IInput } from '../../../../types/types';
import View from '../../../view';

const cssClasses = {
  INPUT: 'input',
};

export default class InputView extends View {
  constructor(inputParams: IInput) {
    const params = {
      tag: 'input',
      className: [cssClasses.INPUT],
      type: inputParams.type,
      value: inputParams.value,
      maxLength: inputParams.maxlength,
      placeholder: inputParams.placeholder,
    };
    super(params);
  }
}
