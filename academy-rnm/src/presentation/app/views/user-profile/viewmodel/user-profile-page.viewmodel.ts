import { inject } from "@angular/core";
import { GetUserUseCase } from "src/domain/usecases/users/get-user-use-case";
import { UserProfileState, UserProfileViewState } from "./user-profile-state";

export class UserProfileViewModel{
  private getUserUseCase: GetUserUseCase = inject(GetUserUseCase);

  private readonly _viewState = new UserProfileState();

  get viewState(): UserProfileViewState{
    return this._viewState;
  }

  public getUser(): void{
    this.getUserUseCase.getUser().subscribe({
      next: value => {
        this._viewState.user.update((data) => data = value );
      },
      error: err => {
        console.log(err);        
      }
    });
  }
}