import './todo-list.scss'
import TodoInput from "./components/todo-input";
import {useCallback, useEffect, useMemo, useState} from 'react'
import { Button } from 'antd'
import {TodoItemData} from "./types/interface";
import TodoItemContainer from "./components/todo-item-container";
import {generateUniqueId} from "../../utils";

function TodoList() {
    const [todoList, setTodoList] = useState<TodoItemData[]>([])
    const total: number = useMemo(
        () => todoList.filter((todo: TodoItemData) => !todo.done).length,
        [todoList]
    )

    function saveTodoList(todoList: TodoItemData[]) {
        localStorage.setItem('todoLists', JSON.stringify(todoList))
    }

    // 新增 todo
    const addTodoList = useCallback((newData: TodoItemData) => {
        setTodoList((prevTodoList: TodoItemData[]) => {
            const newList: TodoItemData[] = [...prevTodoList, newData]
            saveTodoList(newList)
            return newList
        })
    }, [setTodoList])

    // 删除 todo
    const deleteData = useCallback((id: string) => {
        setTodoList((prevTodoList: TodoItemData[]) => {
            const res: TodoItemData[] = prevTodoList.filter((item: TodoItemData) => item.id !== id)
            saveTodoList(res)
            return res
        })
    }, [setTodoList])

    // 更新 todo
    const updateData = useCallback((updatedData: Partial<TodoItemData>) => {
        setTodoList((prevTodoList: TodoItemData[]) => {
            const res: TodoItemData[] = prevTodoList.map(
                (item: TodoItemData) => (item.id === updatedData.id ? { ...item, ...updatedData } : item)
            )
            saveTodoList(res)
            return res
        })
    }, [setTodoList])

    // 完成所有 todo
    const completeAllTodo = useCallback(() => {
        setTodoList((prevTodoList: TodoItemData[]) => {
            const res: TodoItemData[] = prevTodoList.map(
                (item: TodoItemData) => {
                    return {
                        ...item,
                        id: generateUniqueId(),
                        done: true,
                    }
                }
            )
            saveTodoList(res)
            // 触发重新渲染
            return res
        })
    }, [])

    // 清楚已完成的 todo
    const clearCompletedTodo = useCallback(() => {
        setTodoList((prevTodoList: TodoItemData[]) => {
            const res: TodoItemData[] = prevTodoList.filter((item: TodoItemData) => !item.done)
            saveTodoList(res)
            return res
        })
    }, [])

    // 更新数组
    const updateTodoList = useCallback((newTodoList: TodoItemData[]) => {
        setTodoList(newTodoList)
        saveTodoList(newTodoList)
    }, [])

    // 初始化检查是否有 todo 缓存数据
    useEffect(() => {
        try {
            let todoList: string | null = localStorage.getItem('todoLists')
            if (!todoList) return
            todoList = JSON.parse(todoList)
            if (!Array.isArray(todoList)) return
            setTodoList(todoList)
        } catch (e) {
        }
    }, []);

    return (
        <div className="todo-list-wrap">
            <div className="image"></div>
            <div className="bottom-gray"></div>
            <div className="tip">可拖住式的todolist<br/> 回车即可添加todo</div>
            <div className="todo-list-wrap">
                <div className="content">
                    <div className="logo">Todo</div>
                    <TodoInput addTodoList={addTodoList}></TodoInput>
                    <div className="todo-list-container">
                        <TodoItemContainer
                            todoList={todoList}
                            deleteData={deleteData}
                            updateData={updateData}
                            updateTodoList={updateTodoList}
                        ></TodoItemContainer>
                        <div className="info-wrap">
                            <div className="total">
                                {total} items left
                            </div>
                            <div className="complete-btn">
                                <Button
                                    type="text"
                                    onClick={completeAllTodo}
                                >All Active Completed</Button>
                            </div>
                            <div className="clear-btn">
                                <Button
                                    type="text"
                                    onClick={clearCompletedTodo}
                                >Clear Completed</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList