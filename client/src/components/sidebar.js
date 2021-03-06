import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/routes/list">
        Routes Management
      </a>

      <a className="menu-item" href="/users/list">
        User Management
      </a>

      <a className="menu-item" href="/vehicles/list">
        Vehicle Management
      </a>

      <a className="menu-item" href="/invoices/list">
        Invoices
      </a>

      <a className="menu-item" href="/">
        User Panel
      </a>

      <a className="menu-item" href="/Login">
        Log out
      </a>

    </Menu>
  );
};