export interface CharacterEntity{
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: LocationEntity;
  image: string;
  episode: string[];
  page: number;
  isFavorite: boolean;
}

export interface LocationEntity{
  name: string;
  url: string;
}
