// Setting up our configuration
import { setupEnv } from '../src/env';

setupEnv(setupEnv.ENodeEnvConfig.TEST);

export default async (): Promise<void> => {
  console.log('\nStarting tests...\n');
};
