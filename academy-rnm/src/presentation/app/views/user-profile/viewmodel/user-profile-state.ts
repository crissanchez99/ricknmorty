import { signal, WritableSignal } from "@angular/core";
import { ViewState } from "src/core/core-interface/view-state/view-state";
import { UserEntity } from "src/domain/entities/users/user-entity";

export type UserProfileViewState = ViewState<UserProfileState>;

export class UserProfileState{
  user: WritableSignal<UserEntity> = signal({
    id: -1,
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
  });
}