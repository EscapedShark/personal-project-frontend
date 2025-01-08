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

  // Mock data
  const projects: Project[] = [
    {
      id: 1,
      name: 'Project Management System Development',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      progress: 45,
    },
    {
      id: 2,
      name: 'Customer Management System Upgrade',
      status: 'pending',
      startDate: '2024-02-01',
      endDate: '2024-05-30',
      progress: 0,
    },
    {
      id: 3,
      name: 'Data Analysis Platform',
      status: 'completed',
      startDate: '2023-10-01',
      endDate: '2024-01-30',
      progress: 100,
    },
  ];

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <a onClick={() => navigate(`/projects/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          active: 'green',
          pending: 'orange',
          completed: 'blue',
        };
        const texts = {
          active: 'In Progress',
          pending: 'Pending',
          completed: 'Completed',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {texts[status as keyof typeof texts]}
          </Tag>
        );
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: undefined, record: Project) => (
        <Space size="middle">
          <a onClick={() => navigate(`/projects/${record.id}`)}>Details</a>
          <a onClick={() => console.log('Edit', record.id)}>Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          placeholder="Search projects"
          prefix={<SearchOutlined />}
          onChange={e => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
        <Button
          type="primary"
          style={{
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center', 
          lineHeight: '1', 
          padding: '7.5px 12px', 
          }}
          icon={<PlusOutlined />}
        >
          New Project
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