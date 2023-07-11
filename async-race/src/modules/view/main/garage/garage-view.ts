// const garageCars = `
//   <div class="garage__cars"></div>
// `;
import img_finish from '../../../../assets/img/finish.png';

const img = new Image();
const countItem = `
  <h2 class="garage__title">Garage</h2>
  <h3 calss="garage__subtitle">page</h3>
`;
const track = `
      <div class="track">
        <div class="track__setting-modification">
          <div class="select-car button">select</div>
          <div class="remove-car button">remove</div>
          <div class="name-car">name</div>
          <input></input>
        </div>
        <div class="track__setting-action">
          <div class="start-car button">start</div>
          <div class="srop-car button">stop</div>
        </div>
        <div class="track__wrapper">
          <div class="car"></div>
          <img src="${img_finish}" alt="finish" class="track__finish" />
        </div>

      </div>
      `;
export default class GarageView {
  // constructor() {
  // this.createView(this.createElement());
  // }

  // private createView(element: HTMLElement): void {
  //   document.body.append(element);
  // }

  public createElement(): HTMLElement {
    const garage = document.createElement('div');
    garage.classList.add('garage');
    const garageCars = document.createElement('div');
    garageCars.classList.add('garage__cars');
    garage.append(garageCars);
    garageCars.innerHTML = countItem;
    garageCars.innerHTML = track;
    return garage;
    // document.body.append(garage);
  }
}
