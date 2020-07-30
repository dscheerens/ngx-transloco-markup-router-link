[![Build Status](https://travis-ci.com/dscheerens/ngx-transloco-markup-router-link.svg?branch=master)](https://travis-ci.com/dscheerens/ngx-transloco-markup-router-link) [![NPM Version](https://img.shields.io/npm/v/ngx-transloco-markup-router-link.svg)](https://www.npmjs.com/package/ngx-transloco-markup)

# ngx-transloco-markup-router-link

A plugin for **[ngx-transloco-markup](https://github.com/dscheerens/ngx-transloco-markup/blob/master/README.md)** that supports router links.
The support for such links has intentionally been excluded from the **ngx-transloco-markup** core library, as this would introduce a dependency to `@angular/router`.
Not all applications using **Transloco** will be using the Angular router.
For those that do, and which also need for router links in translations, this plugin delivers that support.

## Installation

This library is a plugin for **ngx-transloco-markup**, so first make sure that package is [installed](https://github.com/dscheerens/ngx-transloco-markup/blob/master/README.md#installation) and your application has been [configured](https://github.com/dscheerens/ngx-transloco-markup/blob/master/README.md#getting-started) to use it.

The next step is to install the `ngx-transloco-markup-router-link` package from NPM:

```shell
npm install --save ngx-transloco-markup-router-link
```

After having installed the NPM package the final step is to make the router link renderer available to the link markup transpilers of **ngx-transloco-markup**.
This is as simple as including `translocoMarkupRouterLinkRenderer()` in the providers array of your application's root module (usually called `AppModule`):

```typescript
import { translocoMarkupRouterLinkRenderer } from 'ngx-transloco-markup-router-link';

@NgModule({
  providers: [
    translocoMarkupRouterLinkRenderer() // <-- Add this line to the providers array
  ]
})
export class AppModule { }
```

## Usage

If you followed the installation instructions above, then your application now supports router links wherever you make use of one of the link markup transpilers.
A router link is defined as an object should conform to the following interface:

```typescript
import { NavigationExtras } from '@angular/router';

export interface RouterLink extends NavigationExtras {
    route: string | NavigationCommand[];
    target?: string;
}

export type NavigationCommand = any;
```

The `route` property defines the Angular router target, which can either be defined as string or as a sequence of navigation commands (similar to the input of [Angular's router link directive](https://angular.io/api/router/RouterLink)).
Like normal links you can also specify a target window or frame using the `target` property.

Since the `RouterLink` model is an extension of the [`NavigationExtras`](https://angular.io/api/router/NavigationExtras) interface you can also specify optional properties such a query parameters, the fragment and whether the route is relative to a certain [`ActivatedRoute`](https://angular.io/api/router/ActivatedRoute).

An example of how to use the `RouterLink` model in a component is shown below:

```typescript
import { Component } from '@angular/core';
import { RouterLink } from 'ngx-transloco-markup-router-link';

@Component({
  selector: 'app-router-link-example'
  template: `
    <transloco
      [key]="'EXAMPLE_WITH_LINK'"
      [params]="{ moreDetailsLink: projectLink }"
    ></transloco>
  `
})
export class RouterLinkExampleComponent {
  @Input() public projectId: string = '7357-C453';

  public get projectLink(): RouterLink {
    return {
      route: ['projects', this.projectId, 'details'],
      queryParams: { soundEffects: 'on' }
    };
  }
}
```

The corresponding English translation file for the example above could look like the following:

```json
{
  "EXAMPLE_WITH_LINK": "Show [link:moreDetailsLink]more details[/link] of the project."
}
```
