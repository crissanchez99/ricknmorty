import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharactersDTO } from "../remote/character-dto";

@Injectable({
  providedIn: 'root'
})
export abstract class CharacterRemoteDataSource {
  abstract getCharactersByPage(page: number): Observable<CharactersDTO>;
}
