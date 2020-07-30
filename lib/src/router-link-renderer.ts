import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LinkRenderer } from 'ngx-transloco-markup';

import { RouterLink, isRouterLink, NavigationCommand } from './router-link.model';

/**
 * An implementation of `LinkRenderer` that supports the rendering of `RouterLink` values: links that target an (internal) Angular route.
 */
@Injectable()
export class RouterLinkRenderer implements LinkRenderer<RouterLink> {

    constructor(
        private readonly router: Router,
        private readonly locationStrategy: LocationStrategy
    ) { }

    /**
     * @inheritdoc
     */
    public supports(link: unknown): link is RouterLink {
        return isRouterLink(link);
    }

    /**
     * @inheritdoc
     */
    public render(link: RouterLink, targetElement: HTMLAnchorElement): void {
        this.setAnchorElementHref(targetElement, link);
        this.setAnchorElementTarget(targetElement, link);
        this.setAnchorElementClickHandler(targetElement, link);
    }

    private setAnchorElementHref(anchorElement: HTMLAnchorElement, link: RouterLink): void {
        anchorElement.href = this.getRouterLinkTargetUrl(link);
    }

    private setAnchorElementTarget(anchorElement: HTMLAnchorElement, link: RouterLink): void {
        if (link.target !== undefined) {
            anchorElement.target = link.target;
        }
    }

    private setAnchorElementClickHandler(anchorElement: HTMLAnchorElement, link: RouterLink): void {
        anchorElement.addEventListener('click', (clickEvent) => {
            const useDefaultClickHandling =
                clickEventTargetsDifferentWindow(clickEvent) ||
                routerLinkTargetsDifferentWindow(link);

            if (!useDefaultClickHandling) {
                clickEvent.preventDefault();
                this.navigateTo(link);
            }
        });
    }

    private navigateTo(link: RouterLink): void {
        this.router.navigateByUrl(this.convertRouterLinkToUrlTree(link), link);
    }

    private getRouterLinkTargetUrl(link: RouterLink): string {
        const urlTree = this.convertRouterLinkToUrlTree(link);
        const serializedUrl = this.router.serializeUrl(urlTree);

        return this.locationStrategy.prepareExternalUrl(serializedUrl);
    }

    private convertRouterLinkToUrlTree(link: RouterLink): UrlTree {
        const navigationCommands = getRouterLinkNavigationCommands(link);

        return this.router.createUrlTree(navigationCommands, link);
    }

}

function getRouterLinkNavigationCommands(link: RouterLink): NavigationCommand[] {
    return Array.isArray(link.route) ? link.route : [link.route];
}

function clickEventTargetsDifferentWindow(clickEvent: MouseEvent): boolean {
    return clickEvent.button !== 0 || clickEvent.ctrlKey || clickEvent.metaKey || clickEvent.shiftKey;
}

function routerLinkTargetsDifferentWindow(link: RouterLink): boolean {
    return link.target !== undefined && link.target !== '_self';
}
