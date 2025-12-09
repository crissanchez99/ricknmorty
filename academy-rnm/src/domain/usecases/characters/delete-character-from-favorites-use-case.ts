import { inject, Injectable } from "@angular/core";
import { CharacterImpRepository } from "../../../data/repositories/characters/characters-imp-repository";
import { CharacterEntity } from "../../../domain/entities/characters/character-entity";
import { CharacterRepository } from "../../../domain/repositories/characters/characters-repository";

@Injectable({
  providedIn: 'root'
})
export class DeleteCharacterFromFavoritesUseCase{
  private characterRepository: CharacterRepository = inject(CharacterImpRepository);

  public async deleteCharacterFromFavorites(character: CharacterEntity): Promise<void>{
    await this.characterRepository.deleteCharacterFromFavorites(character);
  }
}
