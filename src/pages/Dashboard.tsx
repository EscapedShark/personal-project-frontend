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
  // 这里可以使用实际的API调用来获取数据
  const statistics: StatisticData = {
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 7,
    teamMembers: 8,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>项目概览</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="总项目数"
              value={statistics.totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="进行中项目"
              value={statistics.activeProjects}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="已完成项目"
              value={statistics.completedProjects}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className={styles.card}>
            <Statistic
              title="团队成员"
              value={statistics.teamMembers}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <div className={styles.recentActivity}>
        <h3>最近活动</h3>
        {/* 这里可以添加最近活动列表或其他统计图表 */}
      </div>
    </div>
  );
};

export default Dashboard;