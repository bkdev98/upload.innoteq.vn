import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Tooltip, Table, Icon, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactJson from 'react-json-view';

import Wrapper from '../components/Wrapper';

const { Sider, Content } = Layout;

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

const SubTitle = styled.h5`
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
`;

const Method = styled.p`
  padding: 5px 10px;
  background-color: #557DE8;
  color: #ffffff;
  text-transform: uppercase;
  display: inline-block;
  border-radius: 4px;
`;

const Endpoint = styled.p`
  cursor: pointer;
  display: inline-block;
  margin-left: 10px;
`;

const SubSubTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const renderContent = key => {
  switch (key) {
    case 'upload-anh':
      return (
        <div>
          <SubTitle>Tải ảnh lên</SubTitle>
          <SubSubTitle>Endpoint</SubSubTitle>
          <Method>post</Method>
          <Tooltip title='Copy'>
            <CopyToClipboard onCopy={() => message.success('Đã copy vào clipboard!')} text='https://upload.innoteq.vn/api/v1/upload'>
              <Endpoint>https://upload.innoteq.vn/api/v1/upload</Endpoint>
            </CopyToClipboard>
          </Tooltip>
          <SubSubTitle>Request header</SubSubTitle>
          <Table
            pagination={false}
            style={{ marginBottom: 15 }}
            size='middle'
            columns={[
              { title: 'Key', dataIndex: 'key', key: 'key' },
              { title: 'Value', dataIndex: 'value', key: 'value' },
              { title: 'Description', dataIndex: 'description', key: 'description' },
            ]}
            dataSource={[
              { key: 'token', value: 'eyJhbGciOiJIUzI1NiIsInR5cC...', description: 'Token của bạn, copy trong trang Tài khoản.' },
              { key: 'Content-Type', value: 'multipart/form-data', description: 'Kiểu dữ liệu multipart/form-data.' },
            ]}
          />
          <SubSubTitle>Request body</SubSubTitle>
          <Table
            pagination={false}
            style={{ marginBottom: 15 }}
            size='middle'
            columns={[
              { title: 'Key', dataIndex: 'key', key: 'key' },
              { title: 'Value', dataIndex: 'value', key: 'value' },
              { title: 'Description', dataIndex: 'description', key: 'description' },
            ]}
            dataSource={[
              { key: 'file', value: 'File ảnh', description: 'Upload theo định dạng form-data.' },
            ]}
          />
          <SubSubTitle>Response example</SubSubTitle>
          <ReactJson
            theme='flat'
            name='data'
            src={{
              "isRemoved": false,
              "_id": "5d006f1ff3683806fe687883",
              "originalName": "006NeKWily1g2enscbnuhj30g00sgwho.jpg",
              "encoding": "7bit",
              "mimetype": "image/jpeg",
              "originalUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511919-006NeKWily1g2enscbnuhj30g00sgwho-original.png",
              "originalSize": 943879,
              "averageUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511921-006NeKWily1g2enscbnuhj30g00sgwho-average.png",
              "averageSize": 2665935,
              "thumbnailUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511921-006NeKWily1g2enscbnuhj30g00sgwho-thumbnail.png",
              "thumbnailSize": 811844,
              "user": "5cfb6aacb4f3dbc38abf1ca2",
              "createdAt": "2019-06-12T03:18:55.739Z",
              "updatedAt": "2019-06-12T03:18:55.739Z",
              "__v": 0
            }}
          />
        </div>
      );
    case 'lay-danh-sach-anh':
      return (
        <div>
          <SubTitle>Lấy danh sách ảnh</SubTitle>
          <SubSubTitle>Endpoint</SubSubTitle>
          <Method>get</Method>
          <Tooltip title='Copy'>
            <CopyToClipboard onCopy={() => message.success('Đã copy vào clipboard!')} text='https://upload.innoteq.vn/api/v1/upload'>
              <Endpoint>https://upload.innoteq.vn/api/v1/upload</Endpoint>
            </CopyToClipboard>
          </Tooltip>
          <SubSubTitle>Request header</SubSubTitle>
          <Table
            pagination={false}
            style={{ marginBottom: 15 }}
            size='middle'
            columns={[
              { title: 'Key', dataIndex: 'key', key: 'key' },
              { title: 'Value', dataIndex: 'value', key: 'value' },
              { title: 'Description', dataIndex: 'description', key: 'description' },
            ]}
            dataSource={[
              { key: 'token', value: 'eyJhbGciOiJIUzI1NiIsInR5cC...', description: 'Token của bạn, copy trong trang Tài khoản.' },
            ]}
          />
          <SubSubTitle>Request query parameter</SubSubTitle>
          <Table
            pagination={false}
            style={{ marginBottom: 15 }}
            size='middle'
            columns={[
              { title: 'Key', dataIndex: 'key', key: 'key' },
              { title: 'Value', dataIndex: 'value', key: 'value' },
              { title: 'Description', dataIndex: 'description', key: 'description' },
            ]}
            dataSource={[
              { key: 'limit', value: 50, description: 'Phân trang: giới hạn số lượng record.' },
              { key: 'skip', value: 0, description: 'Phân trang: bỏ qua số record.' },
              { key: 'search', value: 'File name', description: 'Tìm file theo tên.' },
            ]}
          />
          <SubSubTitle>Response example</SubSubTitle>
          <ReactJson
            theme='flat'
            name='data'
            src={{
              "uploads": [
                  {
                      "isRemoved": false,
                      "_id": "5d006f1ff3683806fe687883",
                      "originalName": "006NeKWily1g2enscbnuhj30g00sgwho.jpg",
                      "encoding": "7bit",
                      "mimetype": "image/jpeg",
                      "originalUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511919-006NeKWily1g2enscbnuhj30g00sgwho-original.png",
                      "originalSize": 943879,
                      "averageUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511921-006NeKWily1g2enscbnuhj30g00sgwho-average.png",
                      "averageSize": 2665935,
                      "thumbnailUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511921-006NeKWily1g2enscbnuhj30g00sgwho-thumbnail.png",
                      "thumbnailSize": 811844,
                      "user": "5cfb6aacb4f3dbc38abf1ca2",
                      "createdAt": "2019-06-12T03:18:55.739Z",
                      "updatedAt": "2019-06-12T03:18:55.739Z",
                      "__v": 0,
                      "score": 0
                  },
                  {
                      "isRemoved": false,
                      "_id": "5cfcd822caaac1afa78f72cc",
                      "originalName": "Screen Shot 2019-06-05 at 1.35.47 PM.png",
                      "encoding": "7bit",
                      "mimetype": "image/png",
                      "originalUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560074255935-Screen-Shot-2019-06-05-at-13547-PM-original.png",
                      "originalSize": 4256261,
                      "averageUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560074255936-Screen-Shot-2019-06-05-at-13547-PM-average.png",
                      "averageSize": 850394,
                      "thumbnailUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560074255937-Screen-Shot-2019-06-05-at-13547-PM-thumbnail.png",
                      "thumbnailSize": 263579,
                      "user": "5cfb6aacb4f3dbc38abf1ca2",
                      "createdAt": "2019-06-09T09:57:54.539Z",
                      "updatedAt": "2019-06-09T09:57:54.539Z",
                      "__v": 0,
                      "score": 0
                  },
                  {
                      "isRemoved": false,
                      "_id": "5cfccb6374d2e98fb2e555d9",
                      "originalName": "IMG_1813.JPG",
                      "encoding": "7bit",
                      "mimetype": "image/jpeg",
                      "originalUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560070983404-IMG_1813-original.png",
                      "originalSize": 10102450,
                      "averageUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560070983406-IMG_1813-average.png",
                      "averageSize": 2849023,
                      "thumbnailUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560070983406-IMG_1813-thumbnail.png",
                      "thumbnailSize": 702754,
                      "user": "5cfb6aacb4f3dbc38abf1ca2",
                      "createdAt": "2019-06-09T09:03:31.246Z",
                      "updatedAt": "2019-06-09T09:03:31.246Z",
                      "__v": 0,
                      "score": 0
                  },
                  {
                      "isRemoved": false,
                      "_id": "5cfbf1d089863f18bd4fb329",
                      "originalName": "web-design.png",
                      "encoding": "7bit",
                      "mimetype": "image/png",
                      "originalUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560015306703-web-design-original.png",
                      "originalSize": 169200,
                      "averageUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560015306703-web-design-average.png",
                      "averageSize": 270837,
                      "thumbnailUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560015306703-web-design-thumbnail.png",
                      "thumbnailSize": 119104,
                      "user": "5cfb6aacb4f3dbc38abf1ca2",
                      "createdAt": "2019-06-08T17:35:12.314Z",
                      "updatedAt": "2019-06-08T17:35:12.314Z",
                      "__v": 0,
                      "score": 0
                  }
              ],
              "total": 4
            }}
          />
        </div>
      );
    case 'xoa-anh':
      return (
        <div>
          <SubTitle>Xoá ảnh</SubTitle>
          <SubSubTitle>Endpoint</SubSubTitle>
          <Method>delete</Method>
          <Tooltip title='Copy'>
            <CopyToClipboard onCopy={() => message.success('Đã copy vào clipboard!')} text='https://upload.innoteq.vn/api/v1/upload/:id'>
              <Endpoint>https://upload.innoteq.vn/api/v1/upload/:id</Endpoint>
            </CopyToClipboard>
          </Tooltip>
          <SubSubTitle>Request header</SubSubTitle>
          <Table
            pagination={false}
            style={{ marginBottom: 15 }}
            size='middle'
            columns={[
              { title: 'Key', dataIndex: 'key', key: 'key' },
              { title: 'Value', dataIndex: 'value', key: 'value' },
              { title: 'Description', dataIndex: 'description', key: 'description' },
            ]}
            dataSource={[
              { key: 'token', value: 'eyJhbGciOiJIUzI1NiIsInR5cC...', description: 'Token của bạn, copy trong trang Tài khoản.' },
            ]}
          />
          <SubSubTitle>Response example</SubSubTitle>
          <ReactJson
            theme='flat'
            name='data'
            src={{
              "isRemoved": true,
              "_id": "5d006f1ff3683806fe687883",
              "originalName": "006NeKWily1g2enscbnuhj30g00sgwho.jpg",
              "encoding": "7bit",
              "mimetype": "image/jpeg",
              "originalUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511919-006NeKWily1g2enscbnuhj30g00sgwho-original.png",
              "originalSize": 943879,
              "averageUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511921-006NeKWily1g2enscbnuhj30g00sgwho-average.png",
              "averageSize": 2665935,
              "thumbnailUrl": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560309511921-006NeKWily1g2enscbnuhj30g00sgwho-thumbnail.png",
              "thumbnailSize": 811844,
              "user": {
                  "_id": "5cfb6aacb4f3dbc38abf1ca2",
                  "email": "khanhbq@innoteq.vn",
                  "fullname": "Quoc Khanh",
                  "role": "user",
                  "avatar": "https://s3.ap-southeast-1.amazonaws.com/upload.innoteq.vn/1560070983406-IMG_1813-thumbnail.png"
              },
              "createdAt": "2019-06-12T03:18:55.739Z",
              "updatedAt": "2019-06-12T04:05:31.059Z",
              "__v": 0
            }}
          />
        </div>
      );
    default:
      return null;
  }
}

const Docs = () => {
  const [selected, setSelected] = useState('upload-anh');

  return (
    <Wrapper innerStyle={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Title>Sử dụng Restful API</Title>
        <Layout>
          <Sider>
            <Menu style={{ height: '100%' }} onClick={e => setSelected(e.key)} defaultSelectedKeys={['upload-anh']}>
              <Menu.Item key='upload-anh'><Icon type='upload' /> Tải ảnh lên</Menu.Item>
              <Menu.Item key='lay-danh-sach-anh'><Icon type='appstore' /> Lấy danh sách ảnh</Menu.Item>
              <Menu.Item key='xoa-anh'><Icon type='delete' /> Xoá ảnh</Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ background: '#fff', padding: '0 20px' }}>
            {renderContent(selected)}
          </Content>
        </Layout>
      </Container>
    </Wrapper>
  );
}

export default Docs;
