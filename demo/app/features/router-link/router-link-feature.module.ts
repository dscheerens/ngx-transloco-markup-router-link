import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoMarkupModule } from 'ngx-transloco-markup';

import { RouterLinkFeatureComponent } from './router-link-feature.component';
import { CurrentRouteComponent } from './current-route.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        TranslocoModule,
        TranslocoMarkupModule,
        RouterModule.forChild([
            { path: 'one', component: CurrentRouteComponent },
            { path: 'two', component: CurrentRouteComponent },
            { path: 'three', component: CurrentRouteComponent }
        ])
    ],
    declarations: [
        RouterLinkFeatureComponent,
        CurrentRouteComponent
    ],
    exports: [
        RouterLinkFeatureComponent
    ]
})
export class RouterLinkFeatureModule { }
