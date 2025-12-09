import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRepository } from 'src/domain/repositories/users/users-repository';
import { UserLoginUseCase } from 'src/domain/usecases/users/user-login-use-case';
import { UserImpRepository } from '../repositories/users/user-imp-repository';
import { UserLocalDataSource } from '../datasources/users/source/user-local-data-source';
import { UserImpLocalDataSource } from '../datasources/users/local/user-imp-local-data-source';
import { UserRemoteDataSource } from '../datasources/users/source/user-remote-data-source';
import { UserImpRemoteDataSource } from '../datasources/users/remote/user-imp-remote-data-source';
import { GetUserUseCase } from 'src/domain/usecases/users/get-user-use-case';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserLoginUseCase,
    GetUserUseCase,
    {provide: UserRepository, useClass: UserImpRepository},
    {provide: UserLocalDataSource, useClass: UserImpLocalDataSource},
    {provide: UserRemoteDataSource, useClass: UserImpRemoteDataSource}
  ]
})
export class UserDI{}