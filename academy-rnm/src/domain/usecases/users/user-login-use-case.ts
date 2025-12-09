import { inject } from "@angular/core";
import { UserRepository } from "src/domain/repositories/users/users-repository";

export class UserLoginUseCase{
  private userRepository: UserRepository = inject(UserRepository);

  public userLogin(userName: string, password: string): Promise<boolean>{
    return this.userRepository.login(userName, password);
  }
}