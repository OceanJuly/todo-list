import {Checkbox} from "antd";
import './todo-item.scss'
import {useEffect, useState} from "react";
import {CloseCircleOutlined} from '@ant-design/icons';
import {doneTextStyle, TodoItemProps} from "../../types/interface";

function TodoItem({text, done, id, updateData, deleteData}: TodoItemProps) {
    const [showCloseBtn, setShowCloseBtn] = useState<boolean>(false)
    const [checked, setChecked] = useState(done)

    function checkedChange() {
        setChecked((preChecked: boolean) => {
            const flag: boolean = !checked
            updateData({
                text,
                id,
                done: flag
            })
            return flag
        })
    }

    const doneTextStyle: doneTextStyle = {
        textDecoration: checked ? 'line-through' : '',
        color: checked ? '#ccc' : '$TextFontColor',
    }

    return (
        <div
            className="todo-item-wrap"
            onMouseOver={() => setShowCloseBtn(true)}
            onMouseLeave={() => setShowCloseBtn(false)}
        >
            <div className="left">
                <Checkbox checked={checked} onChange={checkedChange}></Checkbox>
            </div>
            <div className="right" style={doneTextStyle} title={text}>
                {text}
            </div>
            {
                showCloseBtn ?
                    <div
                        className="close-btn"
                        onMouseDown={() => deleteData(id)}
                        style={{opacity: showCloseBtn ? 1 : 0}}
                    >
                        <CloseCircleOutlined style={{color: '#F5222D'}} />
                    </div>
                    : ''
            }
        </div>
    )
}

export default TodoItem