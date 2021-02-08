// Libraries
import { Matches, Loader } from '@atomly/config-loader';

export class MongoDBLoader extends Loader<'db'> {
  public readonly __name: 'db' = 'db';

  @Matches(/^(mongodb?(\+srv)?):\/\/.*$/i)
  dbConnectionString: string;
}
