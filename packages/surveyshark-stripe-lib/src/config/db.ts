// Libraries
import { Matches, Loader } from '@atomly/config-loader';

export class MongoDBLoader extends Loader<'db'> {
  public readonly __name: 'db' = 'db';

  @Matches(
    /^mongodb:\/\/.*$/i,
    {
      message: Loader.errorMessageTemplate(
        'the database connection string is not valid',
        'check that the database connection string matches a MongoDB connection URI and try again',
      ),
    },
  )
  dbConnectionString: string;
}
