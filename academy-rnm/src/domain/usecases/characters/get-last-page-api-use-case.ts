import { inject, Injectable } from "@angular/core";
import { CharacterImpRepository } from "../../../data/repositories/characters/characters-imp-repository";
import { CharacterRepository } from "../../../domain/repositories/characters/characters-repository";

@Injectable({
  providedIn: 'root'
})
export class GetLastPageUseCase{
  private characterRepository: CharacterRepository = inject(CharacterImpRepository);

  public async getLastPage(): Promise<number>{
    return await this.characterRepository.getLastPage();
  }
}
