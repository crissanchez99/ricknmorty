import { TestBed } from "@angular/core/testing";
import { CharacterDboToEntityMapperService } from "./mapper-character-dbo-to-entity";
import { CharacterDBO } from "../../../..//data/datasources/characters/local/character-dbo";
import { mockCharacterDBO, mockCharacterEntity } from "../../../../../test/mocks/characters/characters.mock";
import { CharacterEntity } from "../../../../domain/entities/characters/character-entity";

describe(`CharacterDboToEntityMapperService`, () => {
  let mapperService: CharacterDboToEntityMapperService;

  const expectedTypes = {
    id: "number",
    name: "string",
    status: "string",
    species: "string",
    gender: "string",
    location: "object",
    image: "string",
    episode: "object",
    page: "number",
    isFavorite: "boolean",
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterDboToEntityMapperService
      ],
    });
    mapperService = TestBed.inject(CharacterDboToEntityMapperService);
  });

  it(`GIVEN a characterEntity THEN map to a characterDBO`, () => {
    let response: CharacterDBO = mapperService.mapFrom(mockCharacterEntity);
    expect(typeof response).toBe("object");
    expect(response).toEqual({
      id: mockCharacterEntity.id,
      name: mockCharacterEntity.name,
      status: mockCharacterEntity.status,
      species: mockCharacterEntity.species,
      gender: mockCharacterEntity.gender,
      location: mockCharacterEntity.location,
      image: mockCharacterEntity.image,
      episode: mockCharacterEntity.episode,
      page: mockCharacterEntity.page,
      isFavorite: mockCharacterEntity.isFavorite
    });

    for(const type in expectedTypes){
      expect(typeof (response as any)[type]).toBe((expectedTypes as any)[type]);
    }

  });

  it(`GIVEN a characterDBO THEN map to a characterEntity`, () => {
    let response: CharacterEntity = mapperService.mapTo(mockCharacterDBO);
    expect(typeof response).toBe("object");
    expect(response).toEqual({
      id: mockCharacterDBO.id,
      name: mockCharacterDBO.name,
      status: mockCharacterDBO.status,
      species: mockCharacterDBO.species,
      gender: mockCharacterDBO.gender,
      location: mockCharacterDBO.location,
      image: mockCharacterDBO.image,
      episode: mockCharacterDBO.episode,
      page: mockCharacterDBO.page,
      isFavorite: mockCharacterDBO.isFavorite
    });
    
    for(const type in expectedTypes){
      expect(typeof (response as any)[type]).toBe((expectedTypes as any)[type]);
    }

  });
})