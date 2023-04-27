import * as cheerio from 'cheerio';
import { iidxApi } from './axios';

const regex = /[+-]?\d+(\.\d+)?/g;

const infoParser = async () => {
  const info = await iidxApi.getStatus();
  const infoArray = cheerio
    .load(info.data)('.dj-profile')
    .text()
    .split(' ')
    .filter((item) => item !== '');
  const anotherInfoArray = cheerio
    .load(info.data)('.dj-rank')
    .text()
    .split(' ')
    .filter((item) => item !== '');
  const djData = {
    'DJ NAME': infoArray[2],
    REGION: infoArray[4],
    'IIDX ID': infoArray[7],
    CLASS: {
      SP: anotherInfoArray[26],
      DP: anotherInfoArray[28],
    },
    ARENA: {
      SP: anotherInfoArray[31],
      DP: anotherInfoArray[33],
    },
    RADAR: {
      SP: {
        NOTES: anotherInfoArray[2].match(regex),
        CHORD: anotherInfoArray[3].match(regex),
        PEAK: anotherInfoArray[4].match(regex),
        CHARGE: anotherInfoArray[5].match(regex),
        SCRATHCH: anotherInfoArray[6].match(regex),
        SOFLAN: anotherInfoArray[7].match(regex),
        TOTAL: anotherInfoArray[8].match(regex),
      },
      DP: {
        NOTES: anotherInfoArray[10].match(regex),
        CHORD: anotherInfoArray[11].match(regex),
        PEAK: anotherInfoArray[12].match(regex),
        CHARGE: anotherInfoArray[13].match(regex),
        SCRATHCH: anotherInfoArray[14].match(regex),
        SOFLAN: anotherInfoArray[15].match(regex),
        TOTAL: anotherInfoArray[16].match(regex),
      },
    },
  };
  return djData;
};
