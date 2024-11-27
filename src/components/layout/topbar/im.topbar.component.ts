import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../services/im.layout.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentification/authentication.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'im-topbar',
  templateUrl: './im.topbar.component.html',
  imports: [NgClass, RouterLink, TranslatePipe],
  standalone: true,
})
export class IMTopBarComponent {
  items!: MenuItem[];

  private readonly authenticationService = inject(AuthenticationService);

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) {}

  protected signout() {
    this.authenticationService.logout();
  }
}
