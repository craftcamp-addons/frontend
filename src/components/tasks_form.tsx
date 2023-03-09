import * as React from 'react';

import {send_entities} from "../data/loaders";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";


export const TasksForm = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("task_name", data.name);
        formData.append("file", data.file[0], data.file[0].name);
        send_entities('/tasks', formData).then(r => {
            toast('🗿 Полетела задача', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(
            (error) => {
                toast.error(`Ошибка: ${error}`, {
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
        );
    }
    return (
        <>
            <div className={"modal fade"} id="staticBackdrop"
                 aria-labelledby="staticBackdropLabel">
                <div className="modal-dialog">
                    <form
                        className={"modal-content"}
                        onSubmit={handleSubmit(onSubmit)}
                        method="POST"
                    >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Создание
                                задачи</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <label htmlFor="name-input">Название задачи</label>
                                    <input type="text" id="name-input" name="task_name"
                                           placeholder="Типа задача" required {...register("name")}/>
                                </li>
                                <li className="list-group-item">
                                    <label htmlFor="file-input">Файл сюда</label>
                                    <input type="file" id="file-input" name="file" required {...register("file")}/>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Не,
                                нинада
                            </button>
                            <input type="submit" className="btn btn-primary"
                                   value="Полетела задача"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};