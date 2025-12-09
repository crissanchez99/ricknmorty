import { MapperService } from "src/core/core-interface/mapper/mapper-service";
import { UserDbo } from "src/data/datasources/users/local/user-dbo";
import { UserEntity } from "src/domain/entities/users/user-entity";

export class UserDboToEntityMapperService extends MapperService<UserDbo, UserEntity>{
  public override mapFrom(user: UserEntity): UserDbo{
    return{
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      maidenName: user.maidenName,
      age: user.age,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      birthDate: user.birthDate,
      image: user.image
    } satisfies UserDbo
  }

  public override mapTo(user: UserDbo): UserEntity{
    return{
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      maidenName: user.maidenName,
      age: user.age,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      birthDate: user.birthDate,
      image: user.image
    } satisfies UserEntity
  }
}