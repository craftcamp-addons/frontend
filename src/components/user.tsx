// @flow
import * as React from 'react';
import {UserModel} from "../data/user";
import "./user.css"
import {useState} from "react";
import {set} from "react-hook-form";

type Props = {
    user: UserModel,
    deleteUser: (id: number) => void
}

export function User({user, deleteUser}: Props) {
    const [shown, setShown] = useState<boolean>(false);
    const [showCollapse, setShowCollapse] = useState<boolean>(false);
    function setShow(value: boolean) {
        if (!showCollapse) {
            setShown(value);
        }
    }
    function buttonClick(event) {
        setShowCollapse(!showCollapse);
        setShown(!shown);
    }
    return (
        <>
            <a className={"list-group-item list-group-item-action " + (user.online ? "list-group-item-success" : "list-group-item-danger")}
               style={{textDecoration: "none"}}
               role="button"
               onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
               onClick={buttonClick}>
                <div className={"d-flex justify-content-between align-items-center"}>
                <button className={"btn " + (user.online ? "btn-success" : "btn-danger")}>
                    {user.id} - {user.name}
                </button>

                <div className={`collapse ` + (shown ? "show" : "")} id={`user_collapsed${user.id}`}>
                    <ul className="list-group list-group-horizontal d-flex flex-row">
                        <li className="list-group-item list-group-item-primary">
                            Всего: {user.total}
                        </li>
                        <li className="list-group-item list-group-item-success">
                            В работе: {user.in_work}
                        </li>
                        <li className="list-group-item list-group-item-warning">
                            Обработано: {user.completed}
                        </li>
                    </ul>
                </div>

                <button className={"btn btn-warning ms-auto"} type="button" onClick={() => {
                    deleteUser(user.id)
                }}>Удолить
                </button>
                </div>
                <div>
                    <div className={"collapse mt-2"} id={`descriptionCollapse${user.id}`}>
                        <div className={"list-group"}>
                            <div className={"list-group-item"}>

                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
}