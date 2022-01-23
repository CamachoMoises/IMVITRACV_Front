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
    icon: 'menu-icon ti-home',
    class: '',
    groupTitle: false,
    submenu: []
  },



  {
    path: '',
    title: 'MENUITEMS.FORMS.TEXT',
    moduleName: 'forms',
    icon: 'menu-icon ti-layout',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/workers',
        title: 'MENUITEMS.FORMS.LIST.CONTROLS',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/forms/advance-controls',
        title: 'MENUITEMS.FORMS.LIST.ADVANCE',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/forms/form-example',
        title: 'MENUITEMS.FORMS.LIST.EXAMPLE',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/forms/form-validation',
        title: 'MENUITEMS.FORMS.LIST.VALIDATION',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/forms/wizard',
        title: 'MENUITEMS.FORMS.LIST.WIZARD',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/forms/editors',
        title: 'MENUITEMS.FORMS.LIST.EDITORS',
        moduleName: 'forms',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },

  {
    path: '',
    title: 'MENUITEMS.EMPLOYEES.TEXT',
    moduleName: 'employees',
    icon: 'menu-icon ti-user',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/employees',
        title: 'MENUITEMS.EMPLOYEES.LIST.EMPLOYEE',
        moduleName: 'employees',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/employees/org-chart',
        title: 'MENUITEMS.EMPLOYEES.LIST.ORGANIZATION',
        moduleName: 'employees',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },


  {
    path: '',
    title: 'MENUITEMS.REQUESTS.TEXT',
    moduleName: 'email',
    icon: 'menu-icon ti-write',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/request',
        title: 'MENUITEMS.REQUESTS.LIST.REQUEST',
        moduleName: 'email',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
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
        path: '/Users',
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
