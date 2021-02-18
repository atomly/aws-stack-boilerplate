// Libraries
import { IsString, Loader } from '@atomly/config-loader';

export class ExpressLoader extends Loader<'express'> {
  public readonly __name: 'express' = 'express';

  @IsString()
  sessionSecretKey: string;
}
