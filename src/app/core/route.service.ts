import { Routes, Route } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { HostComponent } from '../shared/components/host.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

/**
 * Provides helper methods to create routes.
 */
export class RouteExtensions {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Routes} The new routes using shell as the base.
   */
  static withShell(routes: Routes): Routes {
    return [{
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard]
    }];
  }

  /**
   * Creates routes using the host(blank) component and authentication.
   * @param path The path.
   * @param routes The routes to add.
   * @return {Routes} The new routes using shell as the base.
   */
  static withHost(parent: Route , routes: Routes): Routes {
    return [parent, {
      path: parent.path,
      component: HostComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      data: parent.data
    }];
  }

  static withHost1(parent: Route , routes: Routes): Routes {
    return RouteExtensions.withHost(parent, routes);
  }

  static withHost2(parent: Route , routes: Routes): Routes {
    return RouteExtensions.withHost(parent, routes);
  }

  static withHost3(parent: Route , routes: Routes): Routes {
    return RouteExtensions.withHost(parent, routes);
  }
}
