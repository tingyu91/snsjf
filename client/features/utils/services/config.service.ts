// Config service - Use this service to pass the config of the app requried at the bootstrap.
// This service use must restricted to pass data at the boostrap.

import { Injectable } from '@angular/core';

export interface MenuConfig { label: string; route: string; roles: string[]; permission: string[]; visible: boolean; }

@Injectable()
export class ConfigService {
  user: any; // if page is refreshed while user is logged in, we pass user information to application bootsrap so authService get user
  appTitle: string;
  appName: string;
  description: string;
  keywords: string;
  appBaseUrl: string;
  imageUploadUrl: string;
  twitterHandle: string;
  appDefaultRoute: string;
  defaultPage: string;
  MENU_CONFIG: MenuConfig;
}
