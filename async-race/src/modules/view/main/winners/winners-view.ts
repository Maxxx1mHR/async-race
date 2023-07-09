import View from '../../view';

const cssClasses = {
  WINNERS: 'winners',
};

export default class WinnersView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.WINNERS],
    };
    super(params);
  }
}
