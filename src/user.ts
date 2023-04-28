import { parseInfo, parseAllSp, parseAllDp } from './parser';

export class User {
  private djData = {};
  private scoreData: musicData[] = [];

  async fetchInfo() {
    const djData = await parseInfo();
    this.djData = { ...djData };
  }

  async fetchScoreData() {
    console.log("sp data loading")
    const spData = await parseAllSp();
    console.log("dp data loading")
    const dpData = await parseAllDp();
    this.scoreData = [...spData, ...dpData];
  }

  getScoreData() {
    return this.scoreData;
  }

  getInfo() {
    return this.djData;
  }
}
