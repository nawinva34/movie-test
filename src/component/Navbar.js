import React from 'react';
import { Menu } from 'antd';

const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="home">Home</Menu.Item>
      <Menu.Item key="about">About</Menu.Item>
      <Menu.Item key="services">Services</Menu.Item>
    </Menu>
  );
};

export default Navbar;
