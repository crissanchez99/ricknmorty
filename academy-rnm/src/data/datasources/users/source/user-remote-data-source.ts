import { Observable } from "rxjs";
import { LoginResponseDto, UserDto } from "../remote/user-dto";
import { HttpHeaders } from "@angular/common/http";

export abstract class UserRemoteDataSource {
  abstract login(userName: string, password: string): Observable<LoginResponseDto>;
  abstract getUser(headers: HttpHeaders): Observable<UserDto>;
}