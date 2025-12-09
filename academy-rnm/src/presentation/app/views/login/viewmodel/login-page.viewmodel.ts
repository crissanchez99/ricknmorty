import { inject } from "@angular/core";
import { UserLoginUseCase } from "src/domain/usecases/users/user-login-use-case";

export class LoginPageViewModel{
  private userLoginUseCase: UserLoginUseCase = inject(UserLoginUseCase);

  public userLogin(userName: string, password: string): Promise<boolean>{
    return this.userLoginUseCase.userLogin(userName, password);
  }
}