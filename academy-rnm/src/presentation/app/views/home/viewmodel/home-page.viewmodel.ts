import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CharacterEntity } from "../../../../../domain/entities/characters/character-entity";
import { GetCharactersUseCase } from "../../../../../domain/usecases/characters/get-characters-use-case";
import { GetLastPageUseCase } from "../../../../../domain/usecases/characters/get-last-page-api-use-case";
import { UpdateCharacterUseCase } from "../../../../../domain/usecases/characters/update-character-use-case";
import { DeleteCharacterFromFavoritesUseCase } from "../../../../../domain/usecases/characters/delete-character-from-favorites-use-case";
import { AddCharacterToFavoritesUseCase } from "../../../../../domain/usecases/characters/add-character-to-favorites-use-case";
import { GetFavoriteCharactersUseCase } from '../../../../../domain/usecases/characters/get-favorite-characters-use-case';
import { HomeState, HomeViewState } from './home-state';

@Injectable({
  providedIn: 'root'
})
export class HomePageViewModel{
  private getCharactersUseCase: GetCharactersUseCase = inject(GetCharactersUseCase);
  private updateCharacterUseCase: UpdateCharacterUseCase = inject(UpdateCharacterUseCase);
  private getFavoriteCharactersUseCase: GetFavoriteCharactersUseCase = inject(GetFavoriteCharactersUseCase);
  private addCharacterToFavoritesUseCase: AddCharacterToFavoritesUseCase = inject(AddCharacterToFavoritesUseCase);
  private deleteCharacterFromFavoritesUseCase: DeleteCharacterFromFavoritesUseCase = inject(DeleteCharacterFromFavoritesUseCase);
  private getLastPageUseCase: GetLastPageUseCase = inject(GetLastPageUseCase);
  public nextPageSubject: Subject<string | null> = new Subject();

  private readonly _viewState = new HomeState();

  get viewState(): HomeViewState{
    return this._viewState;
  }

  public getCharacters(page: number): void {
    this.getCharactersUseCase.getCharacters(page).subscribe({
      next: value =>{
        this._viewState.characters.update((data) => data.concat(value));
      },
      error: err =>{
        console.log(err);
      }
    })
  }

  public async updateCharacter(character: CharacterEntity): Promise<void>{
    await this.updateCharacterUseCase.updateCharacter(character);
  }

  public getFavoriteCharacters(): void{
    this.getFavoriteCharactersUseCase.getFavoriteCharacters().subscribe({
      next: value =>{
        this._viewState.favoriteCharacters.update((data) => data = value);
      },
      error: err =>{
        console.log(err);
      }
    });
  }

  public async addOrDeleteCharacterToFavorites(character: CharacterEntity): Promise<void>{
    if(character.isFavorite){
      await this.addCharacterToFavoritesUseCase.addCharacterToFavorites(character);
    }else{
      await this.deleteCharacterFromFavoritesUseCase.deleteCharacterFromFavorites(character);
    }
  }

  public async getLastPage(): Promise<number>{
    return await this.getLastPageUseCase.getLastPage();
  }

}
