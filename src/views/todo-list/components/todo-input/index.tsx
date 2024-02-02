import './todo-input.scss'
import { Checkbox } from 'antd'
import {KeyboardEvent, useRef, useState} from 'react'
import {generateUniqueId} from "../../../../utils";
import {TodoInputProps} from "../../types/interface";
import { message } from 'antd';

function TodoInput({addTodoList}: TodoInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [checked, setChecked] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return
        if (!inputRef?.current) return
        if (!inputRef.current.value) {
            return messageApi.open({
                type: 'warning',
                content: '不可添加空文本',
            })
        }
        const text: string = inputRef.current.value || ''
        addTodoList({
            text,
            id: generateUniqueId(),
            done: checked
        })
        // 初始化
        inputRef.current.value = ''
        setChecked(false)
    }

    return (
        <div className="todo-input-wrap">
            <div className="left">
                <Checkbox
                    checked={checked}
                    className="circle-checkbox"
                    onChange={() => setChecked(!checked)}
                ></Checkbox>
            </div>
            <div className="right">
                <input
                    ref={inputRef}
                    className="custom-input"
                    type="text"
                    placeholder="Create a new todo..."
                    onKeyDown={handleKeyDown}
                />
            </div>
            {contextHolder}
        </div>
    )
}

export default TodoInput