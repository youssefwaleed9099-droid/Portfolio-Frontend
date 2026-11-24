import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home as LayoutHome } from './layout/home/home';
import { About as LayoutAbout } from './layout/about/about';
import { Projects as LayoutProjects } from './layout/projects/projects';
import { Skills as LayoutSkills } from './layout/skills/skills';
import { Contact as LayoutContact } from './layout/contact/contact';
import { Education as LayoutEducation } from './layout/education/education';

import { Dashboard } from './dashboard/dashboard';
import { Home as DashboardHome } from './dashboard/home/home';
import { Projects as DashboardProjects } from './dashboard/projects/projects';
import { Education as DashboardEducation } from './dashboard/education/education';
import { About as DashboardAbout } from './dashboard/about/about';
import { Skills as DashboardSkills } from './dashboard/skills/skills';
import { Contact as DashboardContact } from './dashboard/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: LayoutHome },
      { path: 'projects', component: LayoutProjects },
      { path: 'education', component: LayoutEducation },
      { path: 'about', component: LayoutAbout },
      { path: 'skills', component: LayoutSkills },
      { path: 'contact', component: LayoutContact },
    ],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHome },
      { path: 'projects', component: DashboardProjects },
      { path: 'education', component: DashboardEducation },
      { path: 'about', component: DashboardAbout },
      { path: 'skills', component: DashboardSkills },
      { path: 'contact', component: DashboardContact },
    ],
  },
];
