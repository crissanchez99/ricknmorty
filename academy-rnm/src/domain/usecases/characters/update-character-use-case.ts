import { inject, Injectable } from "@angular/core";
import { CharacterImpRepository } from "../../../data/repositories/characters/characters-imp-repository";
import { CharacterEntity } from "../../../domain/entities/characters/character-entity";
import { CharacterRepository } from "../../../domain/repositories/characters/characters-repository";

@Injectable({
  providedIn: 'root'
})
export class UpdateCharacterUseCase{
  private characterRepository: CharacterRepository = inject(CharacterImpRepository);

  async updateCharacter(character: CharacterEntity): Promise<void>{
    return await this.characterRepository.updateCharacter(character);
  }
}
