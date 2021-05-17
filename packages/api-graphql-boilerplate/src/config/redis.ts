// Libraries
import {
  IsInt,
  IsString,
  IsEnum,
  Loader,
} from '@atomly/config-loader';

enum RedisFamily {
  IPv4 = 4,
  IPv6 = 6
}

export class RedisLoader extends Loader<'redis'> {
  public readonly __name: 'redis' = 'redis';

  @IsInt()
  port: number;

  @IsString()
  host: string;

  @IsEnum(RedisFamily)
  family: RedisFamily;

  @IsString()
  password: string;

  @IsInt()
  db: number;
}
