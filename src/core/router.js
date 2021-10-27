import { dedupeMixin } from "@open-wc/dedupe-mixin";
import { Router } from "@vaadin/router";

export const RouterMixin = dedupeMixin( superClass =>
    class RouterMixin extends  superClass {
        constructor() {
            super();
        }

        firstUpdated() {
            if(this.routes.length) {
                const router = new Router(this.shadowRoot.querySelector('#render-router'));
                router.setRoutes(this.routes);
            } else {
                console.error('no tienes ruta')
            }
        }
    }
);

export const RouterProvider = dedupeMixin( superClass =>
    class RouterProvider extends superClass {
        navigator(path) {
            Router.go(path);
        }
    }
)
