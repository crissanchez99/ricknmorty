export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface UsersDto {
  users: UserDto[];
  total: number;
  skip: number;
  limit: number;
}
export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HairDto;
  ip: string;
  address: AddressDto;
  macAddress: string;
  university: string;
  bank: BankDto;
  company: CompanyDto;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoDto;
  role: string;
}
interface CryptoDto {
  coin: string;
  wallet: string;
  network: string;
}
interface CompanyDto {
  department: string;
  name: string;
  title: string;
  address: AddressDto;
}
interface BankDto {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}
interface AddressDto {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: CoordinatesDto;
  country: string;
}
interface CoordinatesDto {
  lat: number;
  lng: number;
}
interface HairDto {
  color: string;
  type: string;
}