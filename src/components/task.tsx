// @flow
import * as React from 'react';
import {TaskModel} from "../data/tasks";
import {TaskForm} from "./task_form";

type Props = {
    task: TaskModel
};
export const Task = ({task}: Props) => {
    function downloadTask() {

    }

    return (
        <li className="list-group-item d-flex flex-row justify-content-between align-content-center">
            <div>{task.id} - {task.name}</div>
            <button className={"me-auto dropdown-toggle"}
                data-bs-toggle="dropdown"
                aria-expanded="false" data-bs-auto-close="outside" style={{border: "none", background: "none"}}><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 20H6C4.89543 20 4 19.1046 4 18V8H20V18C20 19.1046 19.1046 20 18 20H17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 4H18L20 8H4L6 4Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14L12 20M12 20L14.5 17.5M12 20L9.5 17.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg></button>
            <TaskForm task={task}/>
            <div className="progress" role="progressbar" aria-label="Прогресс задачи"
                 aria-valuenow={`${task.completed}`} aria-valuemin="0"
                 aria-valuemax={`${task.total}`}>
                <div className="progress-bar"
                     style={{width: (task.completed / task.total) * 100 + "%"}}/>
                {task.completed} / {task.total}
            </div>
        </li>
    );
};