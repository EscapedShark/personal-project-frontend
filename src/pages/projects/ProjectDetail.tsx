// src/pages/projects/ProjectDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Progress, Descriptions, Timeline, List, Avatar, Tag } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from './ProjectDetail.module.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  assignee: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock project data
  const project = {
    id: Number(id),
    name: 'Project Management System Development',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45,
    description: 'Develop a modern project management system with features including project tracking, task management, and team collaboration.',
    team: [
      { id: 1, name: 'John', role: 'Project Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
      { id: 2, name: 'Mike', role: 'Frontend Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
      { id: 3, name: 'Tom', role: 'Backend Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
    ],
    tasks: [
      { id: 1, title: 'Requirements Analysis', status: 'completed', assignee: 'John' },
      { id: 2, title: 'System Design', status: 'completed', assignee: 'John' },
      { id: 3, title: 'Frontend Development', status: 'in-progress', assignee: 'Mike' },
      { id: 4, title: 'Backend Development', status: 'in-progress', assignee: 'Tom' },
    ],
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="Project Overview" className={styles.card}>
            <Descriptions>
              <Descriptions.Item label="Project Name">{project.name}</Descriptions.Item>
              <Descriptions.Item label="Start Date">{project.startDate}</Descriptions.Item>
              <Descriptions.Item label="End Date">{project.endDate}</Descriptions.Item>
              <Descriptions.Item label="Project Progress" span={3}>
                <Progress percent={project.progress} />
              </Descriptions.Item>
              <Descriptions.Item label="Project Description" span={3}>
                {project.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Task Timeline" className={styles.card}>
            <Timeline
              items={[
                {
                  dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                  children: 'Requirements Analysis Completed',
                },
                {
                  dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                  children: 'System Design Completed',
                },
                {
                  dot: <ClockCircleOutlined style={{ color: '#1890ff' }} />,
                  children: 'Frontend Development in Progress',
                },
                {
                  dot: <ClockCircleOutlined style={{ color: '#1890ff' }} />,
                  children: 'Backend Development in Progress',
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Project Team" className={styles.card}>
            <List
              itemLayout="horizontal"
              dataSource={project.team}
              renderItem={(member: TeamMember) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={member.avatar} />}
                    title={member.name}
                    description={member.role}
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="Task List" className={styles.card}>
            <List
              itemLayout="horizontal"
              dataSource={project.tasks}
              renderItem={(task: Task) => (
                <List.Item>
                  <List.Item.Meta
                    title={task.title}
                    description={`Assignee: ${task.assignee}`}
                  />
                  <Tag color={task.status === 'completed' ? 'green' : 'blue'}>
                    {task.status === 'completed' ? 'In Progress' : 'Completed'}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail;