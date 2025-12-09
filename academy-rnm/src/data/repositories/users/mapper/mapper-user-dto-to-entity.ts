import { MapperService } from "src/core/core-interface/mapper/mapper-service";
import { UserDto } from "src/data/datasources/users/remote/user-dto";
import { UserEntity } from "src/domain/entities/users/user-entity";

export class UserDtoToEntityMapperService extends MapperService<UserDto, UserEntity>{
  public override mapFrom(user: UserEntity): UserDto{
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
      image: user.image,
      bloodGroup: '',
      height: 0,
      weight: 0,
      eyeColor: '',
      hair: {
        color: '',
        type: ''
      },
      ip: '',
      address: {
        address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: '',
      },
      macAddress: '',
      university: '',
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: '',
      },
      company: {
        department: '',
        name: '',
        title: '',
        address: {
          address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: '',
        },
      },
      ein: '',
      ssn: '',
      userAgent: '',
      crypto: {
        coin: '',
        wallet: '',
        network: ''
      },
      role: '',
      
    } satisfies UserDto
  }

  public override mapTo(user: UserDto): UserEntity{
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