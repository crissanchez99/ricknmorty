import { Injectable } from "@angular/core";
import { AnimationOptions } from "ngx-lottie";

@Injectable({
  providedIn: 'root'
})
export class Animations{
  options: AnimationOptions = {
    path: 'assets/images/home-page/not-found.json',
  }
}
