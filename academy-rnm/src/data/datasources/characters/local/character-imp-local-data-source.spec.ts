import { TestBed } from "@angular/core/testing";
import { CharacterImpLocalDataSource } from "./character-imp-local-data-source";
import { CharacterDBO } from "./character-dbo";
import { LocalStorageService } from "../../../../core/services/local-storage/local-storage-service";
import { mockCharactersDBO } from "../../../../../test/mocks/characters/characters.mock";

describe(`CharacterImpLocalDataSource`, () => {
  let dataSource: CharacterImpLocalDataSource;
  let service: jest.Mocked<LocalStorageService>;
  const mockKeyCharacters = 0;
  const mockKeyPage = 2;
  const mockKeyFavorites = 1;

  const mockService = {
    getItems: jest.fn(),
    setItems: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn()
  } as jest.Mocked<LocalStorageService>

  const mockLastPage = 40;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterImpLocalDataSource,
        {provide: LocalStorageService, useValue: mockService}
      ],
    });
    dataSource = TestBed.inject(CharacterImpLocalDataSource);
    service = TestBed.inject(LocalStorageService) as jest.Mocked<LocalStorageService>;
  });

  it(`WHEN request for characters THEN get them`, async() => {
    let response: CharacterDBO[] | null;

    service.getItems.mockReturnValue(Promise.resolve(mockCharactersDBO));
    response = await dataSource.getCharacters();    
    
    expect(service.getItems).toHaveBeenCalledTimes(1);
    expect(service.getItems).toHaveBeenCalledWith(String(mockKeyCharacters));
    expect(Promise.resolve(response)).toEqual(Promise.resolve(mockCharactersDBO));
  });

  it(`WHEN request setting characters THEN save them`, async() => {
    service.setItems.mockReturnValue(Promise.resolve());
    await dataSource.setCharacters(mockCharactersDBO);

    expect(service.setItems).toHaveBeenCalledTimes(1);
    expect(service.setItems).toHaveBeenCalledWith(
      String(mockKeyCharacters),
      mockCharactersDBO
    );
  });

  it(`WHEN request for last page THEN get it`, async() => {
    let response!: number | null;

    service.getItem.mockReturnValue(Promise.resolve(mockLastPage));
    response = await dataSource.getLastPage();
    
    expect(service.getItem).toHaveBeenCalledTimes(1);
    expect(service.getItem).toHaveBeenCalledWith(String(mockKeyPage));
    expect(response).toEqual(mockLastPage);
  });

  it(`WHEN request setting last page THEN save it`, async() => {
    service.setItem.mockReturnValue(Promise.resolve());
    await dataSource.setLastPage(mockLastPage);

    expect(service.setItem).toHaveBeenCalledTimes(1);
    expect(service.setItem).toHaveBeenCalledWith(
      String(mockKeyPage),
      mockLastPage
    );
  });

  it(`WHEN request for favorite chracters THEN get them`, async() => {
    let response!: CharacterDBO[] | null;

    service.getItems.mockReturnValue(Promise.resolve(mockCharactersDBO));
    response = await dataSource.getFavoriteCharacters();
    
    expect(service.getItems).toHaveBeenCalledTimes(2);
    expect(service.getItems).toHaveBeenCalledWith(String(mockKeyFavorites));
    expect(response).toEqual(mockCharactersDBO);
  });

  it(`WHEN request setting favorite chracters THEN save them`, async() => {
    service.setItems.mockReturnValue(Promise.resolve());
    await dataSource.setFavoriteCharacters(mockCharactersDBO);

    expect(service.setItems).toHaveBeenCalledTimes(2);
    expect(service.setItems).toHaveBeenCalledWith(
      String(mockKeyFavorites),
      mockCharactersDBO
    );
  });

})