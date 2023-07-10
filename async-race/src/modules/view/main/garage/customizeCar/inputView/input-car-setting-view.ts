import { IInput } from '../../../../../types/types';
import View from '../../../../view';

export default class InputCarView extends View {
  constructor(inputParam: IInput) {
    const params = {
      tag: 'input',
      className: inputParam.className,
      type: inputParam.type,
      value: inputParam.value,
    };
    super(params);
  }
}
