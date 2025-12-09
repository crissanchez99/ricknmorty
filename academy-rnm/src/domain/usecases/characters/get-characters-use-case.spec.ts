import { CharacterImpRepository } from "../../../data/repositories/characters/characters-imp-repository"
import { GetCharactersUseCase } from "./get-characters-use-case"
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { CharacterEntity } from "../../../domain/entities/characters/character-entity";
import { mockCharactersEntity } from "../../../../test/mocks/characters/characters.mock";
import { of } from "rxjs";

describe(`GetCharactersUseCase`, () => {
  let useCase: GetCharactersUseCase;
  let repository: jest.Mocked<CharacterImpRepository>;

  const mockRepository = {
    getCharacters: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterImpRepository,
        {provide: CharacterImpRepository, useValue: mockRepository},
      ],
    });
    useCase = TestBed.inject(GetCharactersUseCase);
    repository = TestBed.inject(CharacterImpRepository) as jest.Mocked<CharacterImpRepository>;
  })

  it(`WHEN request characters THEN get them`, fakeAsync(() => {
    const mockPage = 2;
    let response: CharacterEntity[] = [];

    repository.getCharacters.mockReturnValue(of(mockCharactersEntity));
    useCase.getCharacters(mockPage).subscribe(result => {
      response = result;
    });

    tick();
    expect(response.length).toEqual(mockCharactersEntity.length);
  }));

})