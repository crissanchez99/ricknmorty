import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharacterImpRepository } from "../../../data/repositories/characters/characters-imp-repository";
import { CharacterEntity } from "../../../domain/entities/characters/character-entity";
import { CharacterRepository } from "../../../domain/repositories/characters/characters-repository";

@Injectable({
  providedIn: 'root'
})
export class GetFavoriteCharactersUseCase{
  private characterRepository: CharacterRepository = inject(CharacterImpRepository);

  public getFavoriteCharacters(): Observable<CharacterEntity[]>{
    return this.characterRepository.getFavoriteCharacters();
  }

}
