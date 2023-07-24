import { ICar, IWinnerResponse } from '../../../types/types';
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
  NAV: 'navigation-page',
  BUTTON: 'button',
  BUTTON_DISABLED: 'button-disabled',
  ARROW: 'arrow',
};

const TITLE_TEXT = 'Winners';
const PAGE = 'page';
const PREV = 'prev';
const NEXT = 'next';

const ITEM_PER_PAGE = 10;

const tableHeader = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];

export default class WinnersView extends View {
  public currentPage: number;

  public countWinners: number;

  private sort: string;

  private order: string;

  constructor() {
    const params = {
      tag: 'div',
      className: [cssClasses.WINNERS],
    };
    super(params);
    this.currentPage = 1;
    this.countWinners = 0;
    this.sort = '';
    this.order = '';
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const serverQuery = new ServerQuery();

    const winners: IWinnerResponse = await serverQuery.getWinners([
      { key: '_page', value: this.currentPage },
      { key: '_limit', value: ITEM_PER_PAGE },
      { key: '_sort', value: this.sort },
      { key: '_order', value: this.order },
    ]);

    // if (this.currentPage !== 1 && winners.count % 10 === 0) {
    //   console.log('сработало');
    //   this.currentPage -= 1;
    //   // this.setContent();
    //   const currentElement = this.elementCreator.getElement();
    //   console.log(currentElement);
    //   if (currentElement) {
    //     currentElement.innerHTML = '';
    //   }
    //   // currentElement?.remove();
    // }
    const countPage = Math.ceil(winners.count / ITEM_PER_PAGE) || 1;

    this.countWinners = winners.count;

    const paramsTitle = {
      tag: 'h2',
      className: [cssClasses.TITILE],
      textContent: `${TITLE_TEXT} ${winners.count}`,
    };
    const creatorTitle = new ElementCreator(paramsTitle);
    this.elementCreator.addInnerElement(creatorTitle);

    const paramsPage = {
      tag: 'h3',
      className: [cssClasses.SUBTITLE],
      textContent: `${PAGE} ${this.currentPage} / ${countPage}`,
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

    const paramsScoreList = {
      tag: 'ul',
      className: [cssClasses.SCORE_LIST],
    };
    const scoreList = new ElementCreator(paramsScoreList);
    scoreTable.addInnerElement(scoreList);

    tableHeader.forEach((head) => {
      const paramsScoreTableName = {
        tag: 'span',
        className: [cssClasses.SCORE_TABLE_NAME],
        textContent: head,
      };
      const scroreTableName = new ElementCreator(paramsScoreTableName);
      scoreTableHeader.addInnerElement(scroreTableName);
      if (head === 'Wins') {
        scroreTableName.setCssClasses([cssClasses.ARROW]);
        if (this.order === 'DESC' && this.sort === 'wins') {
          scroreTableName.setCssClasses([cssClasses.ARROW, 'arrow-desc']);
        }
        if (this.order === 'ASC' && this.sort === 'wins') {
          scroreTableName.setCssClasses([cssClasses.ARROW, 'arrow-asc']);
        }
        scroreTableName.setCallback(() => {
          this.sort = 'wins';
          if (this.order === 'ASC') {
            scroreTableName.getElement()?.classList.remove('arrow-asc');
            scroreTableName.getElement()?.classList.add('arrow-desc');
            this.order = 'DESC';
          } else {
            scroreTableName.getElement()?.classList.remove('arrow-desc');
            scroreTableName.getElement()?.classList.add('arrow-asc');
            this.order = 'ASC';
          }
          this.setContent();
        });
      }
      if (head === 'Best time (seconds)') {
        scroreTableName.setCssClasses([cssClasses.ARROW]);
        if (this.order === 'DESC' && this.sort === 'time') {
          scroreTableName.setCssClasses([cssClasses.ARROW, 'arrow-desc']);
        }
        if (this.order === 'ASC' && this.sort === 'time') {
          scroreTableName.setCssClasses([cssClasses.ARROW, 'arrow-asc']);
        }
        scroreTableName.setCallback(() => {
          this.sort = 'time';
          if (this.order === 'ASC') {
            scroreTableName.getElement()?.classList.remove('arrow-asc');
            scroreTableName.getElement()?.classList.add('arrow-desc');
            this.order = 'DESC';
          } else {
            scroreTableName.getElement()?.classList.remove('arrow-desc');
            scroreTableName.getElement()?.classList.add('arrow-asc');
            this.order = 'ASC';
          }
          this.setContent();
        });
      }
    });

    winners.data.forEach(async (winner, index) => {
      const car: ICar = await serverQuery.getCar(Number(winner.id));

      const paramsScoreItem = {
        tag: 'li',
        className: [cssClasses.SCORE_ITEM],
      };

      const scoreItem = new ElementCreator(paramsScoreItem);

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
        textContent: String(winner.wins),
      };
      const scoreItemWins = new ElementCreator(paramsScoreItemWins);

      const paramsScoreItemTime = {
        tag: 'span',
        className: [cssClasses.SCORE_ITEM_CAR],
        textContent: String(winner.time),
      };
      const scoreItemTime = new ElementCreator(paramsScoreItemTime);

      scoreList.addInnerElement(scoreItem);
      scoreItem.addInnerElement(scoreItemNumber);
      scoreItem.addInnerElement(scoreItemCar);
      scoreItem.addInnerElement(scoreItemName);
      scoreItem.addInnerElement(scoreItemWins);
      scoreItem.addInnerElement(scoreItemTime);
    });
    const paramsNav = {
      tag: 'nav',
      className: [cssClasses.NAV],
    };

    const creatorNav = new ElementCreator(paramsNav);
    this.elementCreator.addInnerElement(creatorNav);

    const paramsButtonPrev = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: PREV,
      callback: (): void => {
        if (this.currentPage <= 1) {
          this.currentPage = 1;
        } else {
          this.currentPage -= 1;
          this.setContent();
        }
      },
    };
    const buttonPrev = new ElementCreator(paramsButtonPrev);
    creatorNav.addInnerElement(buttonPrev);

    const paramsButtonNext = {
      tag: 'div',
      className: [cssClasses.BUTTON],
      textContent: NEXT,
      callback: (): void => {
        if (this.currentPage >= Math.ceil(winners.count / ITEM_PER_PAGE)) {
          this.currentPage = Math.ceil(winners.count / ITEM_PER_PAGE);
        } else {
          this.currentPage += 1;
          this.setContent();
        }
      },
    };
    const buttonNext = new ElementCreator(paramsButtonNext);
    creatorNav.addInnerElement(buttonNext);

    if (countPage === 1) {
      buttonPrev.setCssClasses([cssClasses.BUTTON_DISABLED]);
      buttonNext.setCssClasses([cssClasses.BUTTON_DISABLED]);
    }
    if (this.currentPage === 1) {
      buttonPrev.setCssClasses([cssClasses.BUTTON_DISABLED]);
    }
    if (this.currentPage === countPage) {
      buttonNext.setCssClasses([cssClasses.BUTTON_DISABLED]);
    }
  }

  public setContent(): void {
    const currentElement = this.elementCreator.getElement();

    while (currentElement?.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
    this.configureView();
  }
}
