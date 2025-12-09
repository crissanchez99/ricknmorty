import { inject } from "@angular/core";
import { UserRemoteDataSource } from "../source/user-remote-data-source"
import { LoginResponseDto, UserDto } from "./user-dto";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class UserImpRemoteDataSource extends UserRemoteDataSource{
  private http: HttpClient = inject(HttpClient);

  public login(username: string, password: string): Observable<LoginResponseDto>{
    return this.http.post<LoginResponseDto>(`${environment.urlBaseAuthentication}/login`, {username: username, password: password});
  }

  public getUser(headers: HttpHeaders): Observable<UserDto>{
    return this.http.get<UserDto>(`${environment.urlBaseAuthentication}/me`, {headers})
  }

}