// Setting up our configuration
import { setupConfig } from '../src/config';

setupConfig(setupConfig.ENodeEnvConfig.TEST);

export default async (): Promise<void> => {
  console.log('\nStarting tests, and setting up module aliases.\n');
};
