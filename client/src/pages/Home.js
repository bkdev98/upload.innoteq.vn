import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Button, Input, Icon, Card, Pagination, Spin, Row, Col, Empty, Layout, message } from 'antd';
import moment from 'moment';

import Wrapper from '../components/Wrapper';
import { useUser, useUpload } from '../hooks';

const Container = styled(Layout)`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgb(222, 224, 226);
  width: 100%;
  margin: 20px 0px;
`;

const TopWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Home = ({ history }) => {
  const isAuth = useUser(state => state.isAuth);
  const {
    list,
    total,
    beingFetch,
    beingUpload,
    actions: { uploadFile, getUploadFile, deleteFile },
  } = useUpload(state => state);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [current, setCurrent] = useState(1);
  let fileInputRef;

  useEffect(() => {
    if (isAuth) {
      getUploadFile(
        { skip: 0, search },
        { success: () => {}, failure: () => {} },
      );
    }
  }, [getUploadFile, isAuth, search]);

  const handleSearch = () => {
    getUploadFile({ skip: 0, search }, { success: () => {}, failure: () => {} });
  }

  const handleUpload = (e) => {
    uploadFile(e.target.files[0], {
      success: () => message.success('Tải lên thành công!'),
      failure: () => message.error('Có lỗi xảy ra!'),
    });
  }

  const handleSelectPage = page => {
    setCurrent(page);
    getUploadFile({ skip: page - 1, search }, { success: () => {}, failure: () => {} });
  }

  if (!isAuth) {
    history.push('/login');
    return null;
  } else {
    return (
      <Wrapper innerStyle={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container>
          <TopWrapper>
            <Input.Search
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Tìm kiếm'
              style={{ maxWidth: 240 }}
              onSearch={handleSearch}
            />
            <span style={{ float: 'right' }}>
              <input
                type='file'
                ref={ref => fileInputRef = ref} // eslint-disable-line
                onChange={handleUpload}
                style={{ display: 'none' }}
                accept='.png,.jpg'
              />
              <Button
                loading={beingUpload}
                type='primary'
                onClick={() => fileInputRef.click()}
              >
                <Icon type="upload" /> Tải lên
              </Button>
            </span>
            {selected && (
              <Button
                style={{ float: 'right', marginRight: 10 }}
                onClick={() => deleteFile(selected._id, { success: () => {}, failure: () => {} })}
                type='danger'
                disabled={!selected}
              >
                Xoá
              </Button>
            )}
          </TopWrapper>
          {beingFetch
            ? <Spin tip='Loading...' />
            : (
              <Row style={{ position: 'relative' }} gutter={24}>
                <div
                  role='button'
                  style={{ position: 'absolute', width: '100%', height: '100%' }}
                  onClick={() => setSelected(null)}
                />
                {list.length > 0 ? list.map(item => (
                  <Col lg={6} key={item._id} style={{ marginBottom: 20 }}>
                    <Card
                      hoverable
                      bordered={false}
                      style={{ border: selected && selected._id === item._id ? '2px solid #557DE8' : '2px solid #e8e8e8' }}
                      onClick={() => setSelected(item)}
                      cover={<img style={{ height: 170, objectFit: 'cover' }} alt={item.originalName} src={item.thumbnailUrl} />}
                    >
                      <Card.Meta
                        title={item.originalName}
                        description={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{`${Math.round(item.originalSize / 1024)} KB`}</span>
                          <span>{`${moment(item.createdAt).fromNow()}`}</span>
                        </div>}
                      />
                    </Card>
                  </Col>
                )) : <Empty description="Chưa có ảnh nào" />}
              </Row>
            )
          }
          <Pagination
            total={total}
            defaultCurrent={1}
            current={current}
            pageSize={8}
            onChange={handleSelectPage}
            showTotal={sum => <span>Tổng số: {sum}</span>}
          />
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(Home);
