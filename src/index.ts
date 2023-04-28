import { User } from './user';

const user = new User();

const testing = async () => {
  console.log('info data loading');
  await user.fetchInfo();
  console.log('score data loading');
  await user.fetchScoreData();
  console.log('fetching complete');
  console.log(user.getInfo());
  console.log(user.getScoreData());
};

testing();