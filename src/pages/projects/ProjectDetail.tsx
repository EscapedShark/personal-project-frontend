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

  // 模拟项目数据
  const project = {
    id: Number(id),
    name: '项目管理系统开发',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45,
    description: '开发一个现代化的项目管理系统，包含项目跟踪、任务管理、团队协作等功能。',
    team: [
      { id: 1, name: '张三', role: '项目经理', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
      { id: 2, name: '李四', role: '前端开发', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
      { id: 3, name: '王五', role: '后端开发', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' },
    ],
    tasks: [
      { id: 1, title: '需求分析', status: 'completed', assignee: '张三' },
      { id: 2, title: '系统设计', status: 'completed', assignee: '张三' },
      { id: 3, title: '前端开发', status: 'in-progress', assignee: '李四' },
      { id: 4, title: '后端开发', status: 'in-progress', assignee: '王五' },
    ],
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="项目概览" className={styles.card}>
            <Descriptions>
              <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
              <Descriptions.Item label="开始日期">{project.startDate}</Descriptions.Item>
              <Descriptions.Item label="结束日期">{project.endDate}</Descriptions.Item>
              <Descriptions.Item label="项目进度" span={3}>
                <Progress percent={project.progress} />
              </Descriptions.Item>
              <Descriptions.Item label="项目描述" span={3}>
                {project.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="任务时间线" className={styles.card}>
            <Timeline
              items={[
                {
                  dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                  children: '需求分析完成',
                },
                {
                  dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                  children: '系统设计完成',
                },
                {
                  dot: <ClockCircleOutlined style={{ color: '#1890ff' }} />,
                  children: '前端开发进行中',
                },
                {
                  dot: <ClockCircleOutlined style={{ color: '#1890ff' }} />,
                  children: '后端开发进行中',
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="项目团队" className={styles.card}>
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

          <Card title="任务列表" className={styles.card}>
            <List
              itemLayout="horizontal"
              dataSource={project.tasks}
              renderItem={(task: Task) => (
                <List.Item>
                  <List.Item.Meta
                    title={task.title}
                    description={`负责人: ${task.assignee}`}
                  />
                  <Tag color={task.status === 'completed' ? 'green' : 'blue'}>
                    {task.status === 'completed' ? '已完成' : '进行中'}
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