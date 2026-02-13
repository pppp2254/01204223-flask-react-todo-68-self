import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import TodoItem from '../TodoItem.jsx'

const baseTodo = {             // ** TodoItem พื้นฐานสำหรับทดสอบ
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};

describe('TodoItem', () => {
  it('renders with no comments correctly', () => {    
    // *** โค้ดสำหรับเทสที่เพิ่มเข้ามา
    render(
      <TodoItem todo={baseTodo} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
  });
});

describe('TodoItem', () => {
  it('renders with no comments correctly', () => {
    // เดี๋ยวจะเพิ่มโค้ดตรงนี้
  });
});

