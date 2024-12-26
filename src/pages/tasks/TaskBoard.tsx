// src/pages/tasks/TaskBoard.tsx
import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Avatar, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './TaskBoard.module.css';

const { Option } = Select;

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
}

interface Column {
  title: string;
  key: string;
  tasks: Task[];
}

const TaskBoard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const [columns, setColumns] = useState<Column[]>([
    {
      title: '待处理',
      key: 'todo',
      tasks: [
        { id: 1, title: '需求分析', description: '完成需求文档', assignee: '张三', priority: 'high' },
        { id: 2, title: '系统设计', description: '完成系统架构设计', assignee: '李四', priority: 'medium' },
      ],
    },
    {
      title: '进行中',
      key: 'inProgress',
      tasks: [
        { id: 3, title: '前端开发', description: '实现用户界面', assignee: '王五', priority: 'high' },
      ],
    },
    {
      title: '已完成',
      key: 'done',
      tasks: [
        { id: 4, title: '项目启动', description: '项目启动会议', assignee: '张三', priority: 'medium' },
      ],
    },
  ]);

  const handleDragStart = (e: React.DragEvent, taskId: number, sourceColumn: string) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn !== targetColumn) {
      const newColumns = columns.map(col => {
        if (col.key === sourceColumn) {
          return {
            ...col,
            tasks: col.tasks.filter(task => task.id !== taskId),
          };
        }
        if (col.key === targetColumn) {
          const task = columns
            .find(c => c.key === sourceColumn)
            ?.tasks.find(t => t.id === taskId);
          if (task) {
            return {
              ...col,
              tasks: [...col.tasks, task],
            };
          }
        }
        return col;
      });
      setColumns(newColumns);
    }
  };

  const handleCreateTask = async (values: any) => {
    const newTask: Task = {
      id: Math.max(...columns.flatMap(col => col.tasks.map(t => t.id))) + 1,
      title: values.title,
      description: values.description,
      assignee: values.assignee,
      priority: values.priority,
    };

    setColumns(columns.map(col => 
      col.key === 'todo' 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));

    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>任务看板</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          新建任务
        </Button>
      </div>

      <div className={styles.board}>
        {columns.map(column => (
          <div
            key={column.key}
            className={styles.column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.key)}
          >
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <div className={styles.taskList}>
              {column.tasks.map(task => (
                <Card
                  key={task.id}
                  className={styles.taskCard}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.key)}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className={styles.taskFooter}>
                    <Avatar>{task.assignee[0]}</Avatar>
                    <Tag color={
                      task.priority === 'high' ? 'red' : 
                      task.priority === 'medium' ? 'orange' : 
                      'green'
                    }>
                      {task.priority}
                    </Tag>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="新建任务"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleCreateTask}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="任务标题"
            rules={[{ required: true, message: '请输入任务标题' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="任务描述"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="assignee"
            label="负责人"
            rules={[{ required: true, message: '请选择负责人' }]}
          >
            <Select>
              <Option value="张三">张三</Option>
              <Option value="李四">李四</Option>
              <Option value="王五">王五</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select>
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskBoard;