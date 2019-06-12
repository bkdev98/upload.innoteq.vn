import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Icon, Card, Pagination, Spin, Row, Col, Empty } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { useUpload } from '../hooks';

const TopWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const UploadPicker = ({ title, visible, onCancel, onSubmit, ...props }) => {
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
    getUploadFile(
      { skip: 0, search },
      { success: () => {}, failure: () => {} },
    );
  }, [getUploadFile, search]);

  const handleSearch = () => {
    getUploadFile({ skip: 0, search }, { success: () => {}, failure: () => {} });
  }

  const handleUpload = (e) => {
    uploadFile(e.target.files[0], { success: () => {}, failure: () => {} });
  }

  const handleSelectPage = page => {
    setCurrent(page);
    getUploadFile({ skip: page - 1, search }, { success: () => {}, failure: () => {} });
  }

  return (
    <Modal
      title={title || 'Thư viện tải lên'}
      visible={visible}
      onCancel={onCancel}
      centered
      width='90%'
      footer={onSubmit ? [
        <Button key="back" onClick={onCancel}>Huỷ</Button>,
        <Button key="submit" disabled={selected === null} type="primary" onClick={() => onSubmit(selected)}>Chọn</Button>,
      ] : [<Button key="back" onClick={onCancel}>Đóng lại</Button>]}
      {...props}
    >
      <TopWrapper>
        <Input.Search
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Tìm kiếm'
          style={{ width: 240 }}
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
      {beingFetch && <Spin tip='Loading...' />}
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
      <Pagination
        total={total}
        defaultCurrent={1}
        current={current}
        pageSize={8}
        onChange={handleSelectPage}
        showTotal={sum => <span>Tổng số: {sum}</span>}
      />
    </Modal>
  );
}

export default UploadPicker;
