import View from '../../view';

const cssClasses = {
  GARAGE: 'garage',
};

export default class GarageView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);
  }
}
