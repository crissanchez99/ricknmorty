import { Injectable } from "@angular/core";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{

  async setItems<T>(key: string, value: T[]){
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async getItems<T>(key: string): Promise<T[] | null>{
    const data = await Preferences.get({
      key: key,
    });
    return (data.value) ? JSON.parse(data.value) as T[] : null
  }

  async setItem<T>(key: string, value: T){
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async getItem<T>(key: string): Promise<T | null>{
    const data = await Preferences.get({
      key: key,
    });
    return (data.value) ? JSON.parse(data.value) as T : null
  }

}
