import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationMarkupTranspiler, ContextualLinkTranspilerFactory } from 'ngx-transloco-markup';

import { ROUTER_LINK_FEATURE_TRANSLATION_KEYS } from './router-link-feature-translation-keys';

@Component({
    selector: 'app-router-link-feature',
    templateUrl: './router-link-feature.component.html',
    styleUrls: ['./router-link-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterLinkFeatureComponent implements OnInit {

    public readonly TRANSLATIONS = ROUTER_LINK_FEATURE_TRANSLATION_KEYS;

    public transpilers!: TranslationMarkupTranspiler[];

    constructor(
        private readonly contextualLinkTranspilerFactory: ContextualLinkTranspilerFactory,
    ) { }

    public ngOnInit(): void {
        this.transpilers = [
            this.contextualLinkTranspilerFactory.createBlockTranspiler('link'),
        ];
    }

}
