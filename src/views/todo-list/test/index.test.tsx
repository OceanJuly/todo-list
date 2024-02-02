import React from 'react';
import {render, screen} from '@testing-library/react';
import TodoList from '../index';

test('检查是否功能缺失', () => {
    render(<TodoList />);

    const inputElement: HTMLElement = screen.getByPlaceholderText('Create a new todo...');
    const completeAllButton: HTMLElement = screen.getByRole('button', { name: 'All Active Completed' });
    const clearCompletedButton: HTMLElement = screen.getByRole('button', { name: 'Clear Completed' });

    expect(inputElement).toBeInTheDocument();
    expect(completeAllButton).toBeInTheDocument();
    expect(clearCompletedButton).toBeInTheDocument();
});