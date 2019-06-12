import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import { useUser } from '../hooks';

import Wrapper from '../components/Wrapper';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
`;

const Inner = styled.div`
  width: 350px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgb(222, 224, 226);
  padding: 20px 20px 0px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  color: #557DE8;
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Login = ({ form: { getFieldDecorator, validateFields }, history }) => {
  const beingLogin = useUser(state => state.beingLogin);
  const { login } = useUser(state => state.actions);

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        login(values, {
          success: () => {
            message.success('Đăng nhập thành công!');
            history.push('/');
          },
          failure: msg => message.error(msg || 'Đăng nhập thất bại!'),
        });
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <Inner>
          <Title>Đăng nhập</Title>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Vui lòng nhập địa chỉ email!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Địa chỉ email"
                  autoFocus
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Mật khẩu"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Ghi nhớ</Checkbox>)}
              <a style={{ float: 'right' }} href="/">
                Quên mật khẩu
              </a>
              <Button
                loading={beingLogin}
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
              Hoặc <Link to='/register'>đăng ký ngay!</Link>
            </Form.Item>
          </Form>
        </Inner>
      </Container>
    </Wrapper>
  );
}

export default withRouter(Form.create({ name: 'login' })(Login));
