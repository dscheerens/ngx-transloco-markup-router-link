import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { ROUTER_LINK_FEATURE_TRANSLATION_KEYS } from './router-link-feature-translation-keys';

@Component({
    selector: 'app-current-route',
    template: '<transloco [key]="TRANSLATIONS.CURRENT_ROUTE" [params]="{ route: currentRoute$ | async }"></transloco>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentRouteComponent implements OnInit {
    public currentRoute$!: Observable<string>;

    public readonly TRANSLATIONS = ROUTER_LINK_FEATURE_TRANSLATION_KEYS;

    constructor(
        private readonly router: Router,
    ) { }

    public ngOnInit(): void {
        this.currentRoute$ = this.router.events.pipe(
            startWith(undefined),
            map(() => this.router.url),
            distinctUntilChanged(),
        );
    }
}
