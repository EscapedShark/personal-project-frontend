// src/pages/Dashboard.tsx
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ProjectOutlined, ClockCircleOutlined, CheckCircleOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './Dashboard.module.css';

interface StatisticData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  teamMembers: number;
}

const Dashboard: React.FC = () => {

  const statistics: StatisticData = {
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 7,
    teamMembers: 8,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Project Overview </h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="Total Projects"
              value={statistics.totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="Projects In Progress" 
              value={statistics.activeProjects}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="Projects Completed"
              value={statistics.completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="Team Members"
              value={statistics.teamMembers}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <div className={styles.recentActivity}>
        <h3>Recent activities</h3>
        {/* Adding Tables or Forms */}
      </div>
    </div>
  );
};

export default Dashboard;