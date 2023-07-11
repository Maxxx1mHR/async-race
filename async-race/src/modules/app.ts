/* eslint-disable no-new */
import HeaderVIew from './header/header-view';
import MainView from './view/main/main-view';

// const pages = `
//     <div class="header">
//       <div class="button">Garage</div>
//       <div class="button">Winners</div>
//     </div>`;

export default class App {
  constructor() {
    new HeaderVIew();
    new MainView();
  }
}
