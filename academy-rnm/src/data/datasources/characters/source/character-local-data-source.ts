import { Injectable } from "@angular/core";
import { CharacterDBO } from "../local/character-dbo";

@Injectable({
  providedIn: 'root'
})
export abstract class CharacterLocalDataSource {
  abstract getCharacters(): Promise<CharacterDBO[] | null>;
  abstract setCharacters(characters: CharacterDBO[]): Promise<void>;

  abstract getFavoriteCharacters(): Promise<CharacterDBO[] |  null>;
  abstract setFavoriteCharacters(favoriteCharacters: CharacterDBO[]): Promise<void>;

  abstract getLastPage(): Promise<number | null>;
  abstract setLastPage(lastPage: number): Promise<void>
}
