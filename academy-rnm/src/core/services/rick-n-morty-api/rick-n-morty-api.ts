import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharactersDTO } from "../../../data/datasources/characters/remote/character-dto";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RickNMortyService{
  private readonly http: HttpClient = inject(HttpClient);

  constructor(){}

  getCharactersByPage(page: number): Observable<CharactersDTO>{
    return this.http.get<CharactersDTO>(`${environment.urlBase}/?page=${page}`);
  }
}
