import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UserEntity } from "src/domain/entities/users/user-entity";
import { UserRepository } from "src/domain/repositories/users/users-repository";

export class GetUserUseCase{
  private userRepository: UserRepository = inject(UserRepository);

  public getUser(): Observable<UserEntity>{
    return this.userRepository.getUser();
  }
}