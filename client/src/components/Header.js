import React from 'react';
import { Button, message, Avatar, Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

import { useUser } from '../hooks';

import Wrapper from './Wrapper';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 64px;
`;

const HeaderRight = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AppTitle = styled.h1`
  color: #557DE8;
  letter-spacing: 0.5px;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 0px;
`;

const Header = ({ history }) => {
  const isAuth = useUser(state => state.isAuth);
  const userInfo = useUser(state => state.userInfo);
  const { logout } = useUser(state => state.actions);

  return (
    <Wrapper>
      <HeaderWrapper>
        <HeaderLeft>
          <AppTitle><Link to='/'>upload.innoteq.vn</Link></AppTitle>
        </HeaderLeft>
        <HeaderRight>
          {/* <Button
            onClick={() => {
              if (isAuth) {
                history.push('/upload');
              } else {
                message.info('Cần đăng ký hoặc đăng nhập trước khi upload!');
                history.push('/register');
              }
            }}
            style={{ marginRight: 10 }}
            type="primary"
            icon="upload"
          >
            Tải lên
          </Button> */}
          <Button
            onClick={() => history.push('/docs')}
            style={{ marginRight: 20 }}
            type="primary"
          >
            Restful API
          </Button>
          {isAuth ? (
            <Dropdown
              overlay={(
                <Menu>
                  <Menu.Item onClick={() => history.push('/profile')}>
                    <Icon type="user" style={{ marginRight: 5 }} /> Tài khoản
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      logout();
                      history.push('/');
                      message.success('Đăng xuất thành công!');
                    }}
                  >
                    <div>
                      <Icon type="logout" style={{ marginRight: 5 }} /> Đăng xuất
                    </div>
                  </Menu.Item>
                </Menu>
              )}
              placement="bottomRight"
            >
              <div style={{ cursor: 'pointer' }}>
                <Avatar src={userInfo.avatar} icon="user" />
                <span style={{ margin: 'auto 5px' }}>{userInfo.fullname}</span>
                <Icon type="down" />
              </div>
            </Dropdown>
          ) : (
            <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
          )}
        </HeaderRight>
      </HeaderWrapper>
    </Wrapper>
  );
}

export default withRouter(Header);
