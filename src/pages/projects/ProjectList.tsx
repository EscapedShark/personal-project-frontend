// src/pages/projects/ProjectList.tsx
import React, { useState } from 'react';
import { Table, Button, Tag, Space, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './ProjectList.module.css';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  progress: number;
}

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // 模拟数据
  const projects: Project[] = [
    {
      id: 1,
      name: '项目管理系统开发',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      progress: 45,
    },
    {
      id: 2,
      name: '客户管理系统升级',
      status: 'pending',
      startDate: '2024-02-01',
      endDate: '2024-05-30',
      progress: 0,
    },
    {
      id: 3,
      name: '数据分析平台',
      status: 'completed',
      startDate: '2023-10-01',
      endDate: '2024-01-30',
      progress: 100,
    },
  ];

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <a onClick={() => navigate(`/projects/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          active: 'green',
          pending: 'orange',
          completed: 'blue',
        };
        const texts = {
          active: '进行中',
          pending: '待开始',
          completed: '已完成',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {texts[status as keyof typeof texts]}
          </Tag>
        );
      },
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: undefined, record: Project) => (
        <Space size="middle">
          <a onClick={() => navigate(`/projects/${record.id}`)}>详情</a>
          <a onClick={() => console.log('编辑', record.id)}>编辑</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          placeholder="搜索项目"
          prefix={<SearchOutlined />}
          onChange={e => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          新建项目
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={projects.filter(project => 
          project.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        rowKey="id"
      />
    </div>
  );
};

export default ProjectList;