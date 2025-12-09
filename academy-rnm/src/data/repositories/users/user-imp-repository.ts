import { inject } from "@angular/core";
import {UserRepository} from "../../../domain/repositories/users/users-repository"
import {UserRemoteDataSource} from "../../datasources/users/source/user-remote-data-source"
import { LoginResponseDto, UserDto } from "src/data/datasources/users/remote/user-dto";
import { UserLocalDataSource } from "src/data/datasources/users/source/user-local-data-source";
import { LoginResponseDtoToEntityMapperService } from "./mapper/mapper-login-response-dto-to-entity";
import { LoginResponseDbo } from "src/data/datasources/users/local/user-dbo";
import { HttpHeaders } from "@angular/common/http";
import { UserEntity } from "src/domain/entities/users/user-entity";
import { LoginResponseDboToEntityMapperService } from "./mapper/mapper-login-response-dbo-to-entity";
import { UserDtoToEntityMapperService } from "./mapper/mapper-user-dto-to-entity";
import { from, map, Observable, of } from "rxjs";

export class UserImpRepository extends UserRepository{
  private remoteDataSource: UserRemoteDataSource = inject(UserRemoteDataSource);
  private localDataSource: UserLocalDataSource = inject(UserLocalDataSource);
  private mapperLoginResponseDboToEntity: LoginResponseDboToEntityMapperService = new LoginResponseDboToEntityMapperService();
  private mapperLoginResponseDtoToEntity: LoginResponseDtoToEntityMapperService = new LoginResponseDtoToEntityMapperService();
  private mapperUserDtoToEntity: UserDtoToEntityMapperService = new UserDtoToEntityMapperService();

  public tokens: LoginResponseDbo | undefined | null;

  public login(username: string, password: string): Promise<boolean>{
    return new Promise<boolean>( resolve => {
      this.remoteDataSource.login(username, password).subscribe({
        next: async (response: LoginResponseDto) =>{
          const tokens: LoginResponseDbo = this.mapperLoginResponseDboToEntity.mapFrom(this.mapperLoginResponseDtoToEntity.mapTo(response));
          await this.saveToken(tokens);
          resolve(true);
        },
        error: err => {
          console.log(`Error: `, err);
          resolve(false);
        }
      })
    })
  }

  private async saveToken(tokens: LoginResponseDbo): Promise<void>{
    this.tokens = tokens;
    await this.localDataSource.setTokens(this.tokens);
    await this.validateToken();
  }

  private async validateToken(): Promise<boolean>{
    this.tokens = await this.localDataSource.getTokens();
    
    if(!this.tokens){
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
        this.getUser().subscribe({
          next: async (response) =>{
            response ? resolve(true) : resolve(false);
          },
          error: err => {
            console.log(`ERROR`, err);
            resolve(false);
          }
        });
      
    });
  }

  public getUser(): Observable<UserEntity>{
    if(this.tokens){
      const headers = new HttpHeaders({
        'Authorization': this.tokens.accessToken
      })
      return from(this.remoteDataSource.getUser(headers).pipe(map(dto => {
        return this.mapperUserDtoToEntity.mapTo(dto);
      })));
    }else{
      const user: UserEntity = {
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
      }
      return of(user);
    }
  }

}