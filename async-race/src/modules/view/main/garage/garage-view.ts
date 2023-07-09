/* eslint-disable @typescript-eslint/no-explicit-any */
import ElementCreator from '../../../utils/element-creator';
import ServerQuery from '../../../utils/server-query';
import View from '../../view';

const cssClasses = {
  GARAGE: 'garage',
  TITILE: 'garage__title',
  SUBTITLE: 'garage__subtitle',
};

const TITLE_TEXT = 'garage';
const PAGE = 'page';

export default class GarageView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.GARAGE],
    };
    super(params);

    this.configureView();
  }

  private async configureView(): Promise<void> {
    const serverQuery = new ServerQuery();

    // console.log(serverQuery.getCars());

    const countCars = await serverQuery.getCountCars();
    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT}${countCars}`,
    };
    const creatorTitle = new ElementCreator(paramsTitle);
    this.elementCreator.addInnerElement(creatorTitle);

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: PAGE,
    };
    const creatorSubtitle = new ElementCreator(paramsPage);
    this.elementCreator.addInnerElement(creatorSubtitle);
  }
}
