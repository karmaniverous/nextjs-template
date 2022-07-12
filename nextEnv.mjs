// This script loads environmental variables with the same priority as Next.js.
// Useful for utility scripts intended to run in your dev environment.

import path from 'path';
import fs from 'fs';
import { parse, stringify } from 'envfile';
import { config } from 'dotenv';

const envPath = (filename) => path.resolve(process.cwd(), filename);

export default (environment) => {
  if (!environment) throw Error('no environment specified');

  switch (environment) {
    case 'development':
      config({ path: envPath('.env.development.local') });
      config({ path: envPath('.env.local'), override: true });
      config({ path: envPath('.env.development'), override: true });
      break;
    case 'preview':
    case 'production':
      config({ path: envPath('.env.production.local') });
      config({ path: envPath('.env.local'), override: true });
      config({ path: envPath('.env.production'), override: true });
      break;
    default:
      throw Error('unsupported environment');
  }

  config({ override: true });
};

export const write = (filename, key, value) => {
  const filePath = envPath(filename);
  const env = fs.existsSync(filePath) ? parse(fs.readFileSync(filePath)) : {};
  env[key] = value;
  fs.writeFileSync(filePath, stringify(env));
};
