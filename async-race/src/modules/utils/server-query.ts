import { ICar, ICarResponse, IQueryParams, IWinnerResponse } from '../types/types';

const baseUrl = 'http://localhost:3000';

const path = {
  garage: '/garage',
  winners: '/winners',
};

const generateQueryString = (queryParams: IQueryParams[] = []): string =>
  queryParams.length ? `?${queryParams.map((x: IQueryParams) => `${x.key}=${x.value}`).join('&')}` : '';

export default class ServerQuery {
  // public async getCountCars<T>(): Promise<T> {
  //   const response = await fetch(`${baseUrl}${path.garage}`);
  //   const data = await response.json();
  //   return data.length;
  // }

  public async getCars(queryParams: IQueryParams[]): Promise<ICarResponse> {
    const response = await fetch(`${baseUrl}${path.garage}${generateQueryString(queryParams)}`);
    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  public async getCar<T>(id: number): Promise<T> {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
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

  // public async getCountWinners<T>(): Promise<T> {
  //   const response = await fetch(`${baseUrl}${path.winners}`);
  //   const data = await response.json();
  //   return data.length;
  // }

  public async getWinners(queryParams: IQueryParams[]): Promise<IWinnerResponse> {
    const response = await fetch(`${baseUrl}${path.winners}${generateQueryString(queryParams)}`);
    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }
}
