const pages = `
    <div class="garage">
        <h2>Winners</h2>
    </div>`;

export default class WinnersView {
  // constructor() {
  // this.createView();
  // }

  public createElement(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = pages;
    return div;
    // document.body.append(div);
  }
}
