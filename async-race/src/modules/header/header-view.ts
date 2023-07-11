/* eslint-disable no-new */
import GarageView from '../view/main/garage/garage-view';
import MainView from '../view/main/main-view';
import WinnersView from '../view/main/winners/winners-view';

const pages = `
    <div class="header">
      <div class="button button-garage">Garage</div>
      <div class="button button-winners">Winners</div>
    </div>`;

export default class HeaderVIew {
  constructor() {
    this.createView();
    this.switchView();
  }

  private createView(): void {
    document.body.innerHTML = pages;
  }

  private switchView(): void {
    document.addEventListener('click', (event) => {
      const { target } = event;
      if (target instanceof HTMLElement) {
        if (target.closest('.button-garage')) {
          const garage = new GarageView();
          const main = document.querySelector('.main');
          main!.innerHTML = '';
          main?.append(garage.createElement());
        }
        if (target.closest('.button-winners')) {
          const winners = new WinnersView();
          const main = document.querySelector('.main');
          main!.innerHTML = '';
          main?.append(winners.createElement());
          // const winners = new WinnersView();
        }
      }
    });
  }
}
