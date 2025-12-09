import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "./local-storage-service";
import { mockCharactersDTO } from "../../../../test/mocks/characters/characters.mock";
import { Preferences } from "@capacitor/preferences";

  jest.mock('@capacitor/preferences', () => ({
    Preferences: {
      get: jest.fn(),
      set: jest.fn(),
    },
  }));

describe(`LocalStorageService`, () =>{
  let service: LocalStorageService;
  const mockKey = '';
  const mockItem = 2

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
      ],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it(`WHEN get items and exist THEN return them`, async() =>{
    (Preferences.get as jest.Mock).mockResolvedValue({
      value: JSON.stringify(mockCharactersDTO)
    });
    
    const result = await service.getItems(mockKey);

    expect(Preferences.get as jest.Mock).toHaveBeenCalledTimes(1);
    expect(Preferences.get as jest.Mock).toHaveBeenCalledWith({
      key: mockKey
    });

    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual(mockCharactersDTO);
  });

  it(`WHEN set items THEN save them`, async() => {
    await service.setItems(mockKey, mockCharactersDTO);

    expect(Preferences.set as jest.Mock).toHaveBeenCalledTimes(1);
    expect(Preferences.set as jest.Mock).toHaveBeenCalledWith({
      key: mockKey,
      value: JSON.stringify(mockCharactersDTO)
    });
  })

  it(`WHEN get item and exist THEN return it`, async() =>{
    (Preferences.get as jest.Mock).mockResolvedValue({
      value: JSON.stringify(mockItem)
    });
    
    const result = await service.getItem(mockKey);

    expect(Preferences.get as jest.Mock).toHaveBeenCalledTimes(2);
    expect(Preferences.get as jest.Mock).toHaveBeenCalledWith({
      key: mockKey
    });

    expect(typeof result).toBe('number');
    expect(result).toEqual(mockItem);

  });

  it(`WHEN set item THEN save it`, async() => {
    await service.setItem(mockKey, mockItem);

    expect(Preferences.set as jest.Mock).toHaveBeenCalledTimes(2);
    expect(Preferences.set as jest.Mock).toHaveBeenCalledWith({
      key: mockKey,
      value: JSON.stringify(mockItem)
    });
  })

});