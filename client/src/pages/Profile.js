import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Form, Modal, Button, Input, message, Row, Col, Avatar, Icon } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Wrapper from '../components/Wrapper';
import UploadPicker from '../components/UploadPicker';
import { useUser } from '../hooks';

const Container = styled(Layout)`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgb(222, 224, 226);
  width: 100%;
  margin: 20px 0px;
`;

const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  font-weight: 600;
`;

const ChangePasswordModal = Form.create({
  name: 'change-password',
})(({
  visible,
  onCancel,
  onSubmit,
  form: { getFieldDecorator, setFieldsValue, validateFields, setFields },
  ...props,
}) => {
  const handleSubmit = e => {
    e && e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (values.password.toString() === values.confirmPassword.toString()) {
          onSubmit(values.password);
        } else {
          setFields({
            confirmPassword: {
              value: values.password,
              errors: [new Error('Mật khẩu không trùng khớp!')],
            },
          })
        }
      }
    });
  }

  return (
    <Modal
      title="Đổi mật khẩu"
      visible={visible}
      onCancel={onCancel}
      centered
      footer={[
        <Button key="back" onClick={onCancel}>Huỷ</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>Đồng ý</Button>,
      ]}
      {...props}
    >
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item label="Mật khẩu mới">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }],
          })(
            <Input type="password" />,
          )}
        </Form.Item>
        <Form.Item label="Nhập lại mật khẩu mới">
          {getFieldDecorator('confirmPassword', {
            rules: [{ required: true, message: 'Vui lòng nhập lại mật khẩu mới!' }],
          })(
            <Input type="password" />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
});

const Profile = ({ history, location, form: { getFieldDecorator, setFieldsValue, validateFields } }) => {
  const userInfo = useUser(state => state.userInfo);
  const { updateInfo } = useUser(state => state.actions);
  const [userAvatar, setUserAvatar] = useState(userInfo.avatar || {});
  const [showUploadPicker, setShowUploadPicker] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        updateInfo(userInfo._id, values, {
          success: () => {
            message.success('Cập nhật thông tin thành công!');
          },
          failure: msg => message.error(msg || 'Cập nhật thông tin thất bại!'),
        });
      }
    });
  }

  return (
    <Wrapper innerStyle={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Title>Thông tin tài khoản</Title>
        <Form onSubmit={handleSubmit} className="login-form">
          <Row>
            <Col lg={10}>
              <Form.Item label="Họ và tên">
                {getFieldDecorator('fullname', {
                  rules: [{ required: true, message: 'Vui lòng nhập họ và tên!' }],
                  initialValue: userInfo.fullname,
                })(
                  <Input placeholder="Họ và tên" />,
                )}
              </Form.Item>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Vui lòng nhập địa chỉ email!' }],
                  initialValue: userInfo.email,
                })(
                  <Input placeholder="Địa chỉ email" />,
                )}
              </Form.Item>
              <Form.Item label="Token">
                <Input
                  disabled
                  addonAfter={
                    <CopyToClipboard
                      text={userInfo.token}
                      onCopy={() => message.success('Đã copy token vào clipboard!')}
                    >
                        <Icon type="copy" />
                    </CopyToClipboard>
                  }
                  value={userInfo.token}
                />
              </Form.Item>
            </Col>
            <Col lg={11} offset={3} style={{ marginTop: 10 }}>
              Hình đại diện
              <Avatar src={userAvatar} style={{ display: 'block', marginTop: 10, objectFit: 'contain' }} size={128} icon="user" />
              <Button onClick={() => setShowUploadPicker(true)} style={{ marginRight: 10, marginTop: 20 }}>
                <Icon type="upload" /> Tải lên
              </Button>
              {userAvatar && <Button
                type="danger"
                onClick={() => {
                  setUserAvatar(null);
                  updateInfo(userInfo._id, { avatar: null }, {
                    success: () => {
                      message.success('Gỡ ảnh đại diện thành công!');
                    },
                    failure: msg => message.error(msg || 'Gỡ ảnh đại diện thất bại!'),
                  });
                }}
                style={{ marginTop: 10 }}
              >
                <Icon type="delete" /> Gỡ hình
              </Button>}
            </Col>
          </Row>
          <div>
            <Button type="primary" htmlType="submit">Cập nhật</Button>
            <Button onClick={() => setShowPasswordModal(true)} style={{ marginLeft: 10 }}>Đổi mật khẩu</Button>
          </div>
        </Form>
        <UploadPicker
          visible={showUploadPicker}
          onCancel={() => setShowUploadPicker(false)}
          onSubmit={file => {
            setUserAvatar(file.thumbnailUrl);
            updateInfo(userInfo._id, { avatar: file.thumbnailUrl }, {
              success: () => {
                message.success('Đổi ảnh đại diện thành công!');
              },
              failure: msg => message.error(msg || 'Đổi ảnh đại diện thất bại!'),
            });
            setShowUploadPicker(false);
          }}
        />
        <ChangePasswordModal
          visible={showPasswordModal}
          onCancel={() => setShowPasswordModal(false)}
          onSubmit={password => {
            updateInfo(userInfo._id, { password }, {
              success: () => {
                message.success('Đổi mật khẩu thành công!');
              },
              failure: msg => message.error(msg || 'Đổi mật khẩu thất bại!'),
            });
            setShowPasswordModal(false);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default Form.create({ name: 'profile-info' })(Profile);
