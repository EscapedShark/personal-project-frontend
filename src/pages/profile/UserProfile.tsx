import React, { useState } from 'react';
import { 
  Card, 
  Avatar, 
  Button, 
  Tabs, 
  List, 
  Form, 
  Input, 
  Upload,
  message,
  Divider,
  Row,
  Col,
  UploadProps
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined,
  UploadOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import styles from './UserProfile.module.css';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  avatar: string;
  skills: string[];
}

interface Activity {
  id: number;
  type: string;
  project: string;
  content: string;
  date: string;
}

interface UpdateProfileResponse {
  success: boolean;
  data?: UserInfo;
  error?: string;
}

interface UploadAvatarResponse {
  success: boolean;
  url?: string;
  error?: string;
}

const UserProfile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    position: '高级前端工程师',
    department: '技术部',
    avatar: '/default-avatar.png',
    skills: ['React', 'TypeScript', 'Node.js']
  });

  const activities: Activity[] = [
    {
      id: 1,
      type: 'task',
      project: '项目管理系统',
      content: '完成了任务 "用户认证模块开发"',
      date: '2024-01-20'
    },
    {
      id: 2,
      type: 'project',
      project: '数据分析平台',
      content: '加入了新项目',
      date: '2024-01-18'
    }
  ];

  const handleUpdateProfile = async (values: Partial<UserInfo>) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: UpdateProfileResponse = await response.json();

      if (result.success && result.data) {
        setUserInfo(prev => ({ ...prev, ...result.data }));
        message.success('个人信息更新成功');
        setEditMode(false);
      } else {
        throw new Error(result.error || '更新失败');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      message.error(error instanceof Error ? error.message : '更新失败，请重试');
    }
  };

  const handleAvatarUpload = async (file: File): Promise<boolean> => {
    try {
      const isValidFileType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
  
      if (!isValidFileType) {
        message.error('只能上传 JPG/PNG/GIF 格式的图片！');
        return false;
      }
      if (!isLt2M) {
        message.error('图片必须小于 2MB！');
        return false;
      }
  
      const formData = new FormData();
      formData.append('avatar', file);
  
      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result: UploadAvatarResponse = await response.json();
  
      if (result.success && result.url) {
        setUserInfo(prev => ({
          ...prev,
          avatar: result.url as string
        }));
        message.success('头像上传成功');
        return true;
      } else {
        throw new Error(result.error || '上传失败');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      message.error(error instanceof Error ? error.message : '头像上传失败，请重试');
      return false;
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    multiple: false,
    showUploadList: false,
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      try {
        const success = await handleAvatarUpload(file as File);
        if (success) {
          onSuccess?.(file);
        } else {
          onError?.({ name: 'UploadError', message: 'Upload failed' });
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Upload failed');
        onError?.({ name: 'UploadError', message: error.message });
      }
    },
  };

  const ProfileForm = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={userInfo}
      onFinish={handleUpdateProfile}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话号码' }]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true, message: '请输入职位' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="department"
        label="部门"
        rules={[{ required: true, message: '请输入部门' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
          保存
        </Button>
        <Button 
          onClick={() => setEditMode(false)} 
          icon={<CloseOutlined />}
          style={{ marginLeft: 8 }}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  );

  const ProfileInfo = () => (
    <div className={styles.profileInfo}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className={styles.avatarSection}>
            <Upload {...uploadProps}>
              <div className={styles.avatarWrapper}>
                <Avatar size={100} src={userInfo.avatar} />
                <div className={styles.uploadOverlay}>
                  <UploadOutlined />
                  <span>更换头像</span>
                </div>
              </div>
            </Upload>
            <div className={styles.userTitle}>
              <h2>{userInfo.name}</h2>
              <p>{userInfo.position}</p>
            </div>
          </div>
        </Col>
      </Row>
      
      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div className={styles.infoItem}>
            <MailOutlined /> 邮箱
            <div>{userInfo.email}</div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoItem}>
            <PhoneOutlined /> 电话
            <div>{userInfo.phone}</div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoItem}>
            <UserOutlined /> 部门
            <div>{userInfo.department}</div>
          </div>
        </Col>
      </Row>

      <Button 
        type="primary" 
        icon={<EditOutlined />} 
        onClick={() => setEditMode(true)}
        style={{ marginTop: 16 }}
      >
        编辑信息
      </Button>
    </div>
  );

  const items = [
    {
      key: '1',
      label: '个人信息',
      children: editMode ? <ProfileForm /> : <ProfileInfo />
    },
    {
      key: '2',
      label: '最近动态',
      children: (
        <List
          className={styles.activityList}
          dataSource={activities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.project}
                description={
                  <div>
                    <div>{item.content}</div>
                    <div className={styles.activityDate}>{item.date}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )
    }
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.profileCard}>
        <Tabs items={items} />
      </Card>
    </div>
  );
};

export default UserProfile;