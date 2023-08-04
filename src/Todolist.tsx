import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import S from "./Todolist.module.css"

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
    addTask: (title: string) => void
    changeTaskStatus: (id:string, isDone: boolean)=>void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const [error, setError] = useState<string|null>(null)

    const addTask = () => {
        if (title.trim()){
        props.addTask(title.trim());
        setTitle("");
        } else {
            setError("Title is Required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyDown={ onKeyPressHandler }
                   className={error?S.error:""}
            />
            <button onClick={addTask}>+</button>
            {error? <div className="errorMessage">The fild is required</div>:""}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const checkboxHandler = (ev:ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, ev.currentTarget.checked)

                    return <li key={t.id}
                               className={t.isDone?"is-done":""}
                    >
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={checkboxHandler}

                        />
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }
                    className={props.filter==="all"?"active-filter":""}
            >All</button>
            <button onClick={ onActiveClickHandler }
                    className={props.filter==="active"?"active-filter":""}
            >Active</button>
            <button onClick={ onCompletedClickHandler }
                    className={props.filter==="completed"?"active-filter":""}
            >Completed</button>
        </div>
    </div>
}
