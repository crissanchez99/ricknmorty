import { MapperService } from "src/core/core-interface/mapper/mapper-service";
import { LoginResponseDbo } from "src/data/datasources/users/local/user-dbo";
import { LoginResponseEntity } from "src/domain/entities/users/user-entity";

export class LoginResponseDboToEntityMapperService extends MapperService<LoginResponseDbo, LoginResponseEntity>{
  public override mapFrom(loginResponse: LoginResponseEntity): LoginResponseDbo{
    return{
      accessToken:loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken
    } satisfies LoginResponseDbo
  }

  public override mapTo(loginResponse: LoginResponseDbo): LoginResponseEntity{
    return{
      accessToken:loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken
    } satisfies LoginResponseEntity
  }
}