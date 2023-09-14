import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentLayout = ({ children }) => {
  return (
    <Layout>
      <Content style={{ padding: '50px' }}>{children}</Content>
    </Layout>
  );
};

export default ContentLayout;
