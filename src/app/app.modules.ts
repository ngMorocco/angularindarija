import { HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgAisModule } from 'angular-instantsearch';
// import {
//   NgxGoogleAnalyticsModule,
//   NgxGoogleAnalyticsRouterModule
// } from 'ngx-google-analytics';
import { routes } from './app-routing.module';

export const modules = [
  BrowserTransferStateModule,
  BrowserModule.withServerTransition({ appId: 'serverApp' }),
  RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled'
  }),
  HttpClientModule,
  LoadingBarRouterModule,
  NgAisModule.forRoot() // TODO: provide with lazt loaded component
  // NgxGoogleAnalyticsModule.forRoot('G-32WYWRYZQF'),
  // NgxGoogleAnalyticsRouterModule,
];
