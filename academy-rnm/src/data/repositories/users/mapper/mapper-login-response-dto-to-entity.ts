import { MapperService } from "src/core/core-interface/mapper/mapper-service";
import { LoginResponseDto } from "src/data/datasources/users/remote/user-dto";
import { LoginResponseEntity } from "src/domain/entities/users/user-entity";

export class LoginResponseDtoToEntityMapperService extends MapperService<LoginResponseDto, LoginResponseEntity>{
  public override mapFrom(loginResponse: LoginResponseEntity): LoginResponseDto{
    return{
      accessToken:loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken,
      id: 0,
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      image: ""
    } satisfies LoginResponseDto
  }

  public override mapTo(loginResponse: LoginResponseDto): LoginResponseEntity{
    return loginResponse.accessToken && loginResponse.refreshToken  ? { 
      accessToken:loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken
    } satisfies LoginResponseEntity : {
      accessToken: "",
      refreshToken: ""
    }
  }
}