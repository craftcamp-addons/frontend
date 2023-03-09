import * as React from 'react';

import {send_entities} from "../data/loaders";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

interface Props {
    setUsers: (UserModel) => void;
}

export const UserForm = ({setUsers}: Props) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        send_entities('/users', formData).then(setUsers).catch(
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
            <form
                className={"dropdown-menu p-4"}
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
            >
                <div className="mb-3">
                    <h1 className="modal-title fs-5" id="userFormLabel">Новый раб (очий)</h1>
                </div>
                <div className="mb-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <label htmlFor='username-input'>Название раба</label>
                            <input type="text" id="username-input"
                                   placeholder="Дмитриев" required {...register("name")}/>
                        </li>
                    </ul>
                </div>
                <input type="submit" className="btn btn-primary" data-bs-dismiss="modal"
                       value="Полетел раб"/>
            </form>
        </>
    );
};