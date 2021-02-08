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
  @IsInt()
  port: number;

  @IsString()
  host: string;
}

class HubfulRedis {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => HubfulRedisNodes)
  nodes: HubfulRedisNodes;

  @IsString()
  name: string;

  @IsEnum(RedisFamily)
  family: RedisFamily;

  @IsString()
  password: string;

  @IsInt()
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
