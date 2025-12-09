import { inject } from '@angular/core';
import { LocalStorageService } from 'src/core/services/local-storage/local-storage-service';
import { UserLocalDataSource } from '../source/user-local-data-source';
import { KeysLocalStorage } from 'src/core/enums/key-local-storage';
import { LoginResponseDbo } from './user-dbo';

export class UserImpLocalDataSource extends UserLocalDataSource{
  private localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly keyToken: number = KeysLocalStorage.keyUser;

  async getTokens(): Promise<LoginResponseDbo | null> {
    return await this.localStorage.getItem(String(this.keyToken));
  }

  async setTokens(tokens: LoginResponseDbo): Promise<void>{
    return await this.localStorage.setItem(String(this.keyToken), tokens);
  }

}

