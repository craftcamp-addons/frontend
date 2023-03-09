import * as React from 'react';

import {send_entities} from "../data/loaders";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {TaskModel} from "../data/tasks";

type Props = {
    task: TaskModel
}

export const TaskForm = ({task}: Props) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
        } catch (err) {
            toast.error(`Ошибка загрузки: ${err}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    }
    return (
        <>
            <form
                className={"dropdown-menu p-4"}
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
            >
                <div className="mb-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <label htmlFor={`task_name_${task.id}`}>Название файла</label>
                            <input type="text" id={`task_name_${task.id}`}
                                   placeholder="Дмитриев" required {...register("name")}/>
                        </li>
                        <li className="list-group-item">
                            <label htmlFor={`password_${task.id}`}>Пароль</label>
                            <input type="password" id={`password_${task.id}`}
                                   placeholder="********" required {...register("password")}/>
                        </li>
                    </ul>
                </div>
                <input type="submit" className="btn btn-primary" data-bs-dismiss="modal"
                       value="Скачать"/>
            </form>
        </>
    );
};