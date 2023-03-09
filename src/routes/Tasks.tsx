import * as React from 'react';
import {useEffect, useState} from "react";
import {load_entities} from "../data/loaders";
import {TaskModel} from "../data/tasks";
import {Loader} from "../components/loader";
import {Task} from "../components/task";
import {toast} from "react-toastify";


export function Tasks() {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        load_entities('/tasks').then(setTasks).then(() => setLoading(false)).catch((err) => {
            toast.error(`Ошибка: ${err}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })}, []);

    return (
        <ul className="list-group mt-5">
            {(loading ? <Loader/> :
                tasks.length === 0 ?
                    <li className="list-group-item list-group-item-warning">
                        Не найдено задач
                    </li>
                    : tasks.map(task => <Task key={task.id} task={task}/>))}
        </ul>
    );
}