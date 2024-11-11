import { Component } from '@angular/core';
import { LayoutService } from '../services/im.layout.service';

@Component({
    selector: 'im-footer',
    templateUrl: './im-footer.component.html',
    standalone: true
})
export class ImFooterComponent {
    constructor(public layoutService: LayoutService) { }
}
