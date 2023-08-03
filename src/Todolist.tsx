import React, {KeyboardEventHandler, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [inpValue, setInpValue] = useState("")

    function addBtnOnClickHandler() {
        props.addTask(inpValue)
        setInpValue("")
    }

    function inpOnKeyDownHandler(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key === "Enter") {
            addBtnOnClickHandler()
        }
    }

    function inpOnChangeHandler(ev: React.ChangeEvent<HTMLInputElement>) {
        setInpValue(ev.currentTarget.value)
    }

    function allBtnOnClickHandler() {
        props.changeFilter("all")
    }

    function activeBtnOnClickHandler() {
        props.changeFilter("active")
    }

    function completedBtnOnClickHandler() {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={inpValue}
                onChange={inpOnChangeHandler}
                onKeyDown={inpOnKeyDownHandler}/>
            <button onClick={addBtnOnClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    function removeBtnOnClickHandler() {
                        props.removeTask(t.id)
                    }

                    return (<li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeBtnOnClickHandler}>x</button>
                    </li>)
                })
            }
        </ul>
        <div>
            <button onClick={allBtnOnClickHandler}>All</button>
            <button onClick={activeBtnOnClickHandler}>Active</button>
            <button onClick={completedBtnOnClickHandler}> Completed</button>
        </div>
    </div>
}
