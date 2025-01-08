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
    name: 'John',
    email: 'john@example.com',
    phone: '+61 123456',
    position: 'Senior Frontend Engineer',
    department: 'Technical Department',
    avatar: '/default-avatar.png',
    skills: ['React', 'TypeScript', 'Node.js']
  });

  const activities: Activity[] = [
    {
      id: 1,
      type: 'task',
      project: 'Project Management System',
      content: 'Completed task "User Authentication Module Development"',
      date: '2024-01-20'
    },
    {
      id: 2,
      type: 'project',
      project: 'Data Analysis Platform',
      content: 'Joined new project',
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
        message.success('Profile updated successfully');
        setEditMode(false);
      } else {
        throw new Error(result.error || 'Update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      message.error(error instanceof Error ? error.message : 'Update failed, please try again');
    }
  };

  const handleAvatarUpload = async (file: File): Promise<boolean> => {
    try {
      const isValidFileType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
  
      if (!isValidFileType) {
        message.error('Only JPG/PNG/GIF images are allowed!');
        return false;
      }
      if (!isLt2M) {
        message.error('Image must be less than 2MB!！');
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
        message.success('Avatar uploaded successfully');
        return true;
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      message.error(error instanceof Error ? error.message : 'Avatar upload failed, please try again');
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
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' }
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
            label="Phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: '请输入Please enter your position' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="department"
        label="Department"
        rules={[{ required: true, message: 'Please enter your department' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
          Save
        </Button>
        <Button 
          onClick={() => setEditMode(false)} 
          icon={<CloseOutlined />}
          style={{ marginLeft: 8 }}
        >
          Cancel
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
                  <span>Change Avatar</span>
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
            <MailOutlined /> Email
            <div>{userInfo.email}</div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoItem}>
            <PhoneOutlined /> Phone
            <div>{userInfo.phone}</div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.infoItem}>
            <UserOutlined /> Department
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
        Edit Profile
      </Button>
    </div>
  );

  const items = [
    {
      key: '1',
      label: 'Profile',
      children: editMode ? <ProfileForm /> : <ProfileInfo />
    },
    {
      key: '2',
      label: 'Recent Activities',
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