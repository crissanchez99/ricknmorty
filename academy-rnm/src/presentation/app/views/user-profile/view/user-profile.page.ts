import { Component, inject, OnInit } from '@angular/core';
import { ImagesRutes } from 'src/core/enums/images-rutes';
import { UserEntity } from 'src/domain/entities/users/user-entity';
import { UserProfileViewModel } from '../viewmodel/user-profile-page.viewmodel';
import { UserProfileViewState } from '../viewmodel/user-profile-state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: false
})
export class UserProfilePage implements OnInit {
  private viewModel: UserProfileViewModel = inject(UserProfileViewModel);
  public viewState!: UserProfileViewState;

  protected userImg: string = ImagesRutes.userImg;
  protected user: UserEntity | undefined;

  constructor() {
    this.viewState = this.viewModel.viewState;
    this.getUser();
  }

  ngOnInit() {
  }

  private getUser(){
    this.viewModel.getUser();
  }

}
