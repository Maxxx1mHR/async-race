import { ICar, IWinner } from '../../../types/types';
import ElementCreator from '../../../utils/element-creator';
import ServerQuery from '../../../utils/server-query';
import View from '../../view';

const cssClasses = {
  TITILE: 'title',
  SUBTITLE: 'subtitle',
  WINNERS: 'winners',
  SCORE_TABLE: 'score__table',
  SCORE_TABLE_HEADER: 'score__header-table',
  SCORE_TABLE_NAME: 'score__header-name',
  SCORE_LIST: 'score__list',
  SCORE_ITEM: 'score__item',
  SCORE_ITEM_CAR: 'score__item-car',
  CAR: 'car',
  CAR_SMALL: 'car-small',
};

const TITLE_TEXT = 'Winners';
const PAGE = 'page';

const tableHeader = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];

export default class WinnersView extends View {
  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.WINNERS],
    };
    super(params);
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const serverQuery = new ServerQuery();
    const countWinners = await serverQuery.getCountWinners();

    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT} ${countWinners}`,
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

    const paramsScoreTable = {
      tag: 'div',
      className: [cssClasses.SCORE_TABLE],
    };
    const scoreTable = new ElementCreator(paramsScoreTable);
    this.elementCreator.addInnerElement(scoreTable);

    const paramsScoreTableHeader = {
      tag: 'div',
      className: [cssClasses.SCORE_TABLE_HEADER],
    };
    const scoreTableHeader = new ElementCreator(paramsScoreTableHeader);
    scoreTable.addInnerElement(scoreTableHeader);

    tableHeader.forEach((head) => {
      const paramsScoreTableName = {
        tag: 'span',
        className: [cssClasses.SCORE_TABLE_NAME],
        textContent: head,
      };
      const scroreTableName = new ElementCreator(paramsScoreTableName);
      scoreTableHeader.addInnerElement(scroreTableName);
    });

    const paramsScoreList = {
      tag: 'ul',
      className: [cssClasses.SCORE_LIST],
    };
    const scoreList = new ElementCreator(paramsScoreList);
    scoreTable.addInnerElement(scoreList);

    const winners: IWinner[] = await serverQuery.getWinners();

    winners.forEach(async (winner, index) => {
      const car: ICar = await serverQuery.getCar(winner.id);

      const paramsScoreItem = {
        tag: 'li',
        className: [cssClasses.SCORE_ITEM],
      };

      const scoreItem = new ElementCreator(paramsScoreItem);
      scoreList.addInnerElement(scoreItem);

      const paramsScoreItemNumber = {
        tag: 'span',
        className: [cssClasses.SCORE_ITEM_CAR],
        textContent: String(index + 1),
      };
      const scoreItemNumber = new ElementCreator(paramsScoreItemNumber);

      const paramsScoreItemCar = {
        tag: 'div',
        className: [cssClasses.CAR, cssClasses.CAR_SMALL],
        backgroundColor: car.color,
      };
      const scoreItemCar = new ElementCreator(paramsScoreItemCar);

      const paramsScoreItemName = {
        tag: 'span',
        className: [cssClasses.SCORE_ITEM_CAR],
        textContent: car.name,
      };
      const scoreItemName = new ElementCreator(paramsScoreItemName);

      const paramsScoreItemWins = {
        tag: 'span',
        className: [cssClasses.SCORE_ITEM_CAR],
        textContent: winner.wins,
      };
      const scoreItemWins = new ElementCreator(paramsScoreItemWins);

      const paramsScoreItemTime = {
        tag: 'span',
        className: [cssClasses.SCORE_ITEM_CAR],
        textContent: winner.time,
      };
      const scoreItemTime = new ElementCreator(paramsScoreItemTime);

      scoreItem.addInnerElement(scoreItemNumber);
      scoreItem.addInnerElement(scoreItemCar);
      scoreItem.addInnerElement(scoreItemName);
      scoreItem.addInnerElement(scoreItemWins);
      scoreItem.addInnerElement(scoreItemTime);
    });
  }
}
