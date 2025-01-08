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
      title: 'To Do',
      key: 'todo',
      tasks: [
        { id: 1, title: 'Requirement Analysis', description: 'Complete requirement documentation', assignee: 'John', priority: 'high' },
        { id: 2, title: 'System Design', description: 'Complete system architecture design', assignee: 'Mike', priority: 'medium' },
      ],
    },
    {
      title: 'In Progress',
      key: 'inProgress',
      tasks: [
        { id: 3, title: 'Frontend Development', description: 'Implement user interface', assignee: 'Tom', priority: 'high' },
      ],
    },
    {
      title: 'Done',
      key: 'done',
      tasks: [
        { id: 4, title: 'Project Kickoff', description: 'Project kickoff meeting', assignee: 'John', priority: 'medium' },
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

  const handleCreateTask = async (values: { title: string; description: string; assignee: string; priority: 'high' | 'medium' | 'low' }) => {
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
        <h2>Task Board</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Create Task
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
        title="Create Task"
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
            label="Task Title"
            rules={[{ required: true, message: 'Please enter task title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Task Description"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: 'Please select assignee' }]}
          >
            <Select>
              <Option value="John">John</Option>
              <Option value="Mike">Mike</Option>
              <Option value="Tom">Tom</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskBoard;