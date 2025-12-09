import { Observable } from "rxjs";
import { CharacterEntity } from "src/domain/entities/characters/character-entity";

export abstract class CharacterRepository{
  abstract getCharacters(page: number): Observable<CharacterEntity[]>;
  abstract updateCharacter(character: CharacterEntity): Promise<void>;
  abstract addCharacterToFavorites(favoriteCharacter: CharacterEntity): Promise<void>;
  abstract deleteCharacterFromFavorites(favoriteCharacter: CharacterEntity): Promise<void>;
  abstract getFavoriteCharacters(): Observable<CharacterEntity[]>;
  abstract getLastPage(): Promise<number>;
}
