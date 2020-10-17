// Libraries
import {
  IsInt,
  IsString,
  IsEnum,
  Loader,
  Type,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@atomly/config-loader';

enum RedisFamily {
  IPv4 = 4,
  IPv6 = 6
}

class HubfulRedisNodes {
  @IsInt({
    message: Loader.errorMessageTemplate(
      'the port is not valid',
      'check that the port is an integer and try again',
    ),
  })
  port: number;

  @IsString({
    message: Loader.errorMessageTemplate(
      'the host is not valid',
      'check that the host is a valid string and try again',
    ),
  })
  host: string;
}

class HubfulRedis {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => HubfulRedisNodes)
  nodes: HubfulRedisNodes;

  @IsString({
    message: Loader.errorMessageTemplate(
      'the name is not valid',
      'check that the name is a valid string and try again',
    ),
  })
  name: string;

  @IsEnum(
    RedisFamily,
    {
      message: Loader.errorMessageTemplate(
        'the family is not valid',
        'check that the family value is "4" (IPv4) or "6" (IPv6) and try again',
      ),
    },
  )
  family: RedisFamily;

  @IsString({
    message: Loader.errorMessageTemplate(
      'the password is not valid',
      'check that the password is a valid string and try again',
    ),
  })
  password: string;

  @IsInt({
    message: Loader.errorMessageTemplate(
      'db is not valid',
      'check that db is a valid integer and try again',
    ),
  })
  db: number;
}

export class HubfulLoader extends Loader<'hubful'> {
  public readonly __name: 'hubful' = 'hubful';

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => HubfulRedis)
  redis: HubfulRedis;
}
