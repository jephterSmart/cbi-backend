import * as path from 'path';

console.log(path.join(__dirname, `${process.env.NODE_ENV}.env`), 'ENVIRONMENT');
const configurations = {
  envFilePath: `src/env/${process.env.NODE_ENV}.env`,
};

export default configurations;
