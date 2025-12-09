import { Observable } from "rxjs";
import { UserEntity } from "src/domain/entities/users/user-entity";

export abstract class UserRepository{
  abstract login(userName: string, password: string): Promise<boolean>;
  abstract getUser():Observable<UserEntity>;
}