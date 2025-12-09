import { LoginResponseDbo } from "../local/user-dbo";

export abstract class UserLocalDataSource {
  abstract getTokens(): Promise<LoginResponseDbo | null>;
  abstract setTokens(tokens: LoginResponseDbo): Promise<void>;
}