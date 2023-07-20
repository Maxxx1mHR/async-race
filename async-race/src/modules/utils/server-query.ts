/* eslint-disable no-console */
import {
  ICar,
  ICarRequest,
  ICarResponse,
  ICarResponseEngine,
  IQueryParams,
  IWinner,
  IWinnerResponse,
} from '../types/types';

const baseUrl = 'http://localhost:3000';

const path = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
};

const generateQueryString = (queryParams: IQueryParams[] = []): string =>
  queryParams.length ? `?${queryParams.map((x: IQueryParams) => `${x.key}=${x.value}`).join('&')}` : '';

export default class ServerQuery {
  public async getCars(queryParams: IQueryParams[]): Promise<ICarResponse> {
    const response = await fetch(`${baseUrl}${path.garage}${generateQueryString(queryParams)}`);
    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  public async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${baseUrl}${path.garage}/${id}`);
    const data = await response.json();
    return data;
  }

  public async createCar(car: ICarRequest): Promise<void> {
    await fetch(`${baseUrl}${path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public async updateCar(id: number, car: ICarRequest): Promise<void> {
    await fetch(`${baseUrl}${path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public async deleteCar(id: number): Promise<void> {
    await fetch(`${baseUrl}${path.garage}/${id}`, {
      method: 'DELETE',
    });
  }

  public async getEngineStatus(id: number, status: 'started' | 'stopped'): Promise<number[]> {
    const response = await fetch(`${baseUrl}${path.engine}/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return [id, data.distance / data.velocity];
  }

  public async getDrive(id: number, status = 'drive'): Promise<ICarResponseEngine> {
    const response = await fetch(`${baseUrl}${path.engine}/?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    if (response.status === 500) {
      console.log('Я дальше не поеду', response.status);
    }
    if (response.status === 429) {
      console.log('Не тыкай так часто', response.status);
    }
    const data = await response.json();
    return data;
  }

  public async getWinners(queryParams: IQueryParams[]): Promise<IWinnerResponse> {
    const response = await fetch(`${baseUrl}${path.winners}${generateQueryString(queryParams)}`);
    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  public async deleteWinner(id: number): Promise<void> {
    await fetch(`${baseUrl}${path.winners}/${id}`, {
      method: 'DELETE',
    });
  }

  public async createWinner(winner: IWinner): Promise<void> {
    await fetch(`${baseUrl}${path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  public async getWinner(id: number): Promise<IWinner> {
    const response = await fetch(`${baseUrl}${path.winners}/${id}`);
    const data = await response.json();
    return data;
  }

  public async updateWinner(id: number, winner: IWinner): Promise<void> {
    await fetch(`${baseUrl}${path.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }
}
