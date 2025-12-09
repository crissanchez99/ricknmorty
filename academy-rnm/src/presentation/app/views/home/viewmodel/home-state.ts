import { signal, WritableSignal } from "@angular/core";
import { ViewState } from "src/core/core-interface/view-state/view-state";
import { CharacterEntity } from "src/domain/entities/characters/character-entity";

export type HomeViewState = ViewState<HomeState>;

export class HomeState{
  characters: WritableSignal<CharacterEntity[]> = signal([]);
  favoriteCharacters: WritableSignal<CharacterEntity[]> = signal([]);
  isFiltering: WritableSignal<boolean> = signal(false);
}
