import View from '../../../../view';

const GENERATE = 'generate car';

const cssClasses = {
  BUTTON: 'button',
};

export default class CarSettingGenerateView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: GENERATE,
      callback: (): void => {},
    };
    super(params);
  }
}
