import { Route } from '@angular/router';
import { HomeRoutes } from './home/index';

import { ConsignesRoutes } from './consignes/index';

import { AgentRoutes } from './agent/index';

import { ProfilRoutes } from './profil/index';

import { ChefComponent } from './index';


export const DashboardRoutes: Route[] = [
  	{
    	path: 'chef',
    	component: ChefComponent,
    	children: [

			 ...HomeRoutes,
        ...AgentRoutes,

        ...ConsignesRoutes,

        ...ProfilRoutes,
    	]
  	}
];
