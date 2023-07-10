import { ICar } from '../types/types';

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
    return data;
  }

  public async createCar<T>(car: ICar): Promise<T> {
    const response = await fetch(`${baseUrl}${path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    return data;
  }
}
