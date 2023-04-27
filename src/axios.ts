import axios, { AxiosInstance } from 'axios';

class IidxApi {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: 'https://p.eagate.573.jp/game/2dx/30/',
    });
  }

  getStatus() {
    return this.client.get('/djdata/status.html');
  }

  getScore(level: number, mode: 'SP' | 'DP', offset: number) {
    switch (mode) {
      case 'SP':
        return this.client.get(
          `/djdata/music/difficulty.html?difficult=${level}&style=0&disp=1&offset=${offset}`
        );
      case 'DP':
        return this.client.get(
          `/djdata/music/difficulty.html?difficult=${level}&style=1&disp=1&offset=${offset}`
        );
    }
  }
}

export const iidxApi = new IidxApi();
