import type { Schema, Attribute } from '@strapi/strapi';

export interface MenuMenu extends Schema.Component {
  collectionName: 'components_menu_menus';
  info: {
    displayName: 'menu';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'menu.menu': MenuMenu;
    }
  }
}
