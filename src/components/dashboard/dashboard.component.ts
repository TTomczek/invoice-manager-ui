import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
    selector: 'im-dashboard',
    standalone: true,
    imports: [TileComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    protected tiles = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
}
