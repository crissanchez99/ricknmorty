import { TestBed } from "@angular/core/testing";
import { RickNMortyService } from "../../../../core/services/rick-n-morty-api/rick-n-morty-api";
import { CharactersDTO } from "./character-dto";
import { CharacterImpRemoteDataSource } from "./character-imp-remote-data-source";
import { mockDataCharactersDTO } from "../../../../../test/mocks/characters/characters.mock";
import { of } from "rxjs";

describe(`CharacterImpRemoteDataSource`, () => {
  let dataSource: CharacterImpRemoteDataSource;
  let service: jest.Mocked<RickNMortyService>;
  const page = 2;

  const mockService = {
    getCharactersByPage: jest.fn()
  } as unknown as jest.Mocked<RickNMortyService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterImpRemoteDataSource,
        {provide: RickNMortyService, useValue: mockService}
      ],
    });
    dataSource = TestBed.inject(CharacterImpRemoteDataSource);
    service = TestBed.inject(RickNMortyService) as jest.Mocked<RickNMortyService>;
  });

  it(`WHEN request for characters by page THEN get CharactersDTO`, () => {
    let response!: CharactersDTO;
    
    service.getCharactersByPage.mockReturnValue(of(mockDataCharactersDTO));
    dataSource.getCharactersByPage(page).subscribe(res => {
      response = res;
    });

    expect(service.getCharactersByPage).toHaveBeenCalledTimes(1);
    expect(service.getCharactersByPage).toHaveBeenCalledWith(page);
    expect(response).toEqual(mockDataCharactersDTO);
  });
})