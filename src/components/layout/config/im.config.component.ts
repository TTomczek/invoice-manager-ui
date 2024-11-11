import { Component, Input } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { LayoutService } from '../services/im.layout.service';
import { MenuService } from '../menu/im.menu.service';

@Component({
    selector: 'im-config',
    templateUrl: './im.config.component.html',
    standalone: true,
    imports: [
        SidebarModule,
        ButtonModule,
        NgFor,
        NgClass,
        NgIf,
        RadioButtonModule,
        FormsModule,
        InputSwitchModule,
    ],
})
export class IMConfigComponent {
    @Input() minimal = false;

    scales: number[] = [12, 13, 14, 15, 16];

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService
    ) {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            const theme = this.layoutService._config.theme;
            const darkTheme = theme.replace('light', 'dark');
            this.changeTheme(darkTheme, 'dark');
        }
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService._config.scale;
    }
    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
    }

    get menuMode(): string {
        return this.layoutService._config.menuMode;
    }
    set menuMode(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuMode: _val,
        }));
    }

    get inputStyle(): string {
        return this.layoutService._config.inputStyle;
    }
    set inputStyle(_val: string) {
        this.layoutService._config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService._config.ripple;
    }
    set ripple(_val: boolean) {
        this.layoutService.config.update((config) => ({
            ...config,
            ripple: _val,
        }));
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }
    get theme(): string {
        return this.layoutService._config.theme;
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }
    get colorScheme(): string {
        return this.layoutService._config.colorScheme;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    decrementScale() {
        this.scale--;
    }

    incrementScale() {
        this.scale++;
    }
}
