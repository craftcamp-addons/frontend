import {TasksForm} from "../components/tasks_form";
import {Users} from "./Users";
import * as React from "react";
import {Tasks} from "./Tasks";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";


export default function Root() {
    return (
        <>
            <nav>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Панель
                                    управления
                                    парсингом</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <div className="container text-center">
                                    <button type="button" className="btn btn-primary center" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop">
                                        Создать задачу
                                    </button>
                                    <TasksForm/>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <ToastContainer/>
            <main className={"container mt-4"}>
                <Users/>
                <Tasks/>
            </main>
        </>
    )
};