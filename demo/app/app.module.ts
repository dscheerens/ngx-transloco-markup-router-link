import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, Translation, TranslocoLoader, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { defaultTranslocoMarkupTranspilers } from 'ngx-transloco-markup';
import { translocoMarkupRouterLinkRenderer } from 'ngx-transloco-markup-router-link';

import { environment } from '../environments/environment';

import { NavigationBarModule } from './common/view/navigation-bar';
import { RouterLinkFeatureModule } from './features/router-link';
import { AppComponent } from './app.component';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    public getTranslation(language: string): Observable<Translation> {
        return this.httpClient.get<Translation>(`/assets/translations/${language}.json`);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        NavigationBarModule,
        RouterLinkFeatureModule,
        TranslocoModule,
    ],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ['en', 'nl'],
                defaultLang: 'en',
                reRenderOnLangChange: true,
                prodMode: environment.production,
            }),
        },
        {
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader,
        },
        defaultTranslocoMarkupTranspilers(),
        translocoMarkupRouterLinkRenderer(),
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
