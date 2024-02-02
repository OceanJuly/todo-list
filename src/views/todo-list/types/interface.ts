export interface TodoItemData {
    id: string;
    text: string;
    done: boolean;
}

export interface TodoInputProps {
    addTodoList: (newData: TodoItemData) => void
}

export interface TodoItemProps extends TodoItemData {
    updateData: (updatedData: Partial<TodoItemData>) => void
    deleteData: (id: string) => void
}

export interface doneTextStyle {
    textDecoration: string,
    color: string,
}

export interface TodoItemContainerProps {
    todoList: TodoItemData[],
    updateData: (updatedData: Partial<TodoItemData>) => void
    deleteData: (id: string) => void,
    updateTodoList: (newData: TodoItemData[]) => void
}