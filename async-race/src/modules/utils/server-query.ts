const baseUrl = 'http://localhost:3000';

const path = {
  garage: '/garage',
};

export default class ServerQuery {
  public async getCountCars<T>(): Promise<T> {
    const response = await fetch(`${baseUrl}${path.garage}`);
    const data = await response.json();
    return data.length;
  }

  public async getCars<T>(): Promise<T> {
    const response = await fetch(`${baseUrl}${path.garage}`);
    const data = await response.json();
    // console.log(data);
    return data;
  }
}
