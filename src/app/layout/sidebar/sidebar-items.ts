import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard/main',
    title: 'MENUITEMS.HOME.TEXT',
    moduleName: 'dashboard',
    icon: 'menu-icon ti-home',
    class: '',
    groupTitle: false,
    submenu: []
  },

  {
    path: '/workers',
    title: 'MENUITEMS.MEMBERS.TEXT',
    moduleName: 'test',
    icon: 'menu-icon ti-user',
    class: '',
    groupTitle: false,
    submenu: []
  },

  {
    path: '',
    title: 'MENUITEMS.USERS.TEXT',
    moduleName: 'Users',
    icon: 'menu-icon ti-key',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/users',
        title: 'MENUITEMS.USERS.LIST.USER',
        moduleName: 'Users',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },

]
