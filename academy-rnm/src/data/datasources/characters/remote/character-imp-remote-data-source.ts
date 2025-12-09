import { CharacterRemoteDataSource } from "../source/character-remote-data-source";
import { RickNMortyService } from "../../../../../src/core/services/rick-n-morty-api/rick-n-morty-api";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharactersDTO } from "./character-dto";

@Injectable({
  providedIn: 'root'
})
export class CharacterImpRemoteDataSource extends CharacterRemoteDataSource{
  private api: RickNMortyService = inject(RickNMortyService);

  getCharactersByPage(page: number): Observable<CharactersDTO>{
    return this.api.getCharactersByPage(page);
  }
}
