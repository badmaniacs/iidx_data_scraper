import * as cheerio from 'cheerio';
import { iidxApi } from './axios';

const radarRegex = /[+-]?\d+(\.\d+)?/g;
const rankRegex = /score_icon\/(.+?)\.gif/;

const clearTypeStringParser = (src?: string) => {
  if (!src) {
    return '';
  }
  const clearTypeRegex = /score_icon\/(.+?)\.gif/;
  const srcName = src.match(clearTypeRegex)![1];
  switch (srcName) {
    case 'clflg1':
      return 'FAILED';
    case 'clflg2':
      return 'A-CLEAR';
    case 'clflg3':
      return 'E-CLEAR';
    case 'clflg4':
      return 'CLEAR';
    case 'clflg5':
      return 'H-CLEAR';
    case 'clflg6':
      return 'EXH-CLEAR';
    case 'clflg7':
      return 'F-COMBO';
    default:
      return '';
  }
};

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
        NOTES: anotherInfoArray[2].match(radarRegex),
        CHORD: anotherInfoArray[3].match(radarRegex),
        PEAK: anotherInfoArray[4].match(radarRegex),
        CHARGE: anotherInfoArray[5].match(radarRegex),
        SCRATHCH: anotherInfoArray[6].match(radarRegex),
        SOFLAN: anotherInfoArray[7].match(radarRegex),
        TOTAL: anotherInfoArray[8].match(radarRegex),
      },
      DP: {
        NOTES: anotherInfoArray[10].match(radarRegex),
        CHORD: anotherInfoArray[11].match(radarRegex),
        PEAK: anotherInfoArray[12].match(radarRegex),
        CHARGE: anotherInfoArray[13].match(radarRegex),
        SCRATHCH: anotherInfoArray[14].match(radarRegex),
        SOFLAN: anotherInfoArray[15].match(radarRegex),
        TOTAL: anotherInfoArray[16].match(radarRegex),
      },
    },
  };
  return djData;
};

const scoreParser = async (level: number, mode: 'SP' | 'DP') => {
  const scoreData: musicData[] = [];
  let offset = 0;
  while (true) {
    const score = await iidxApi.getScore(level, mode, offset * 50);
    const $ = cheerio.load(score.data);
    const html = cheerio.load(score.data)('.series-difficulty').html();
    if (html === null) {
      break;
    }
    const tableData = cheerio
      .load(html as string | Buffer)('tbody tr')
      .slice(2);
    tableData.each((i, item) => {
      const music_name = $(item).find('td:first-child a').text().trim();
      const difficulty = $(item).find('td:nth-child(2)').text().trim();
      const rank = $(item)
        .find('td:nth-child(3) img')
        .attr('src')
        ?.trim()
        .match(rankRegex);
      const score = $(item).find('td:nth-child(4)').text().trim();
      const clear_type = $(item)
        .find('td:nth-child(5) img')
        .attr('src')
        ?.trim();
      scoreData.push({
        music_name,
        level : level,
        difficulty,
        rank: rank![1],
        score,
        clear_type: clearTypeStringParser(clear_type),
      });
    });
    offset++;
    console.log(offset);
  }
  return scoreData;
};

const fetchingAllSp = async () => {
  const scoreArray: musicData[] = [];
  for (let level = 1; level <= 11; level++) {
    const data = await scoreParser(level, 'SP');
    scoreArray.push(...data);
  }
  return scoreArray
};
