import React from 'react';
import { Layout } from 'antd';

import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';

const { Header, Footer, Content } = Layout;

const AppLayout = ({ children }) => (
  <Layout>
    <Header style={{ boxShadow: '0 2px 8px rgb(222, 224, 226)' }}>
      <AppHeader />
    </Header>
    <Content>{children}</Content>
    <Footer>
      <AppFooter />
    </Footer>
  </Layout>
);

export default AppLayout;