import {DragDropContext, Droppable, Draggable, DroppableProvided} from "react-beautiful-dnd";
import TodoItem from "../../components/todo-item";
import {TodoItemContainerProps, TodoItemData} from "../../types/interface";

function TodoItemContainer({todoList, deleteData, updateData, updateTodoList}: TodoItemContainerProps) {

    function onDragEnd(result: any) {
        if (!result.destination) return
        const newTodoList: TodoItemData[] = reorder(
            todoList,
            result.source.index,
            result.destination.index
        )
        updateTodoList(newTodoList)
    }

    function reorder(todoList: any, startIndex: any, endIndex: any): TodoItemData[] {
        const result: TodoItemData[] = Array.from(todoList);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    return (
        <div className="todo-item-container">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided: DroppableProvided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todoList.map((todo: any, index: any) => (
                                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                    {(provided: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <TodoItem
                                                {...todo}
                                                key={todo.id}
                                                deleteData={deleteData}
                                                updateData={updateData}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default TodoItemContainer