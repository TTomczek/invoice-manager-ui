import { Component, ElementRef } from '@angular/core';
import { IMMenuComponent } from '../menu/im.menu.component';
import { LayoutService } from '../services/im.layout.service';

@Component({
  selector: 'im-sidebar',
  templateUrl: './im-sidebar.component.html',
  standalone: true,
  imports: [IMMenuComponent, IMMenuComponent],
})
export class IMSidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) {}
}

