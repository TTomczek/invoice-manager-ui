import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'im-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
    icon = input<string>('');
    title = input<string>('');
    text = input<string | number>('');

    getIconClasses = computed(() => {
       return "pi text-blue-500 text-xl " + this.icon();
    });
}
