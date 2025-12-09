import { TestBed } from "@angular/core/testing";
import { GetCharactersUseCase } from "../../../../../domain/usecases/characters/get-characters-use-case";
import { HomePageViewModel } from "./home-page.viewmodel"
import { mockCharactersEntity } from "../../../../../../test/mocks/characters/characters.mock";
import { of } from "rxjs";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe(`HomePageViewModel`, () => {
  let viewModel: HomePageViewModel;
  let useCase: jest.Mocked<GetCharactersUseCase>;

  const mockUseCase = {
    getCharacters: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomePageViewModel,
        {provide: GetCharactersUseCase, useValue: mockUseCase},
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    viewModel = TestBed.inject(HomePageViewModel);
    useCase = TestBed.inject(GetCharactersUseCase) as jest.Mocked<GetCharactersUseCase>;
  })

  it(`WHEN request characters THEN update their value in the viewState`, () => {
    const mockPage = 2;

    const mockUpdateViewState = jest.spyOn(
      viewModel['_viewState'].characters,
      'update'
    )

    useCase.getCharacters.mockReturnValue(of(mockCharactersEntity));
    viewModel.getCharacters(mockPage);

    expect(mockUpdateViewState).toHaveBeenCalledWith(expect.any(Function));
  });
})