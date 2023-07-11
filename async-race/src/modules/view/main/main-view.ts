export default class MainView {
  constructor() {
    this.createView();
  }

  private createView(): void {
    const main = document.createElement('div');
    main.classList.add('main');
    document.body.append(main);
  }
}
