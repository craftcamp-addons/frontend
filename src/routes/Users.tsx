import * as React from 'react';
import {useEffect, useState} from 'react';
import {UserModel} from "../data/user";
import {delete_entities, load_entities} from "../data/loaders";
import {Loader} from "../components/loader";
import {User} from "../components/user";
import {toast} from "react-toastify";
import {UserForm} from "../components/user_form";
import {connect, NatsConnection, StringCodec} from "nats.ws";
import {server_ws} from "../data/urls";
import Select from "react-select";
import {Simulate} from "react-dom/test-utils";


export function Users() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [nc, setConnection] = useState<NatsConnection>(undefined);
    const [options, setOptions] = useState<{ label: string; value: string }[]>([
        {label: "По состоянию подключения", value: "online"},
        {label: "По общему количеству задач", value: "total"},
        {label: "По количеству задач в работе", value: "in_work"},
        {label: "По количеству выполненных задач", value: "completed"},
    ]);
    const [option, setChosenOption] = useState<{ label: string; value: string }>(options[0]);

    const setUser = (user: UserModel) => {
        setUsers(users.map((u) => user.id === u.id ? user : u));
    }
    const deleteUser = (id: number) => {
        setLoading(true);
        const user = users.filter(user => user.id === id)[0]
        return delete_entities('/users', user.id).then(console.log).then(
            () => {
                setUsers(users.filter(user => user.id !== id))
                setLoading(false);
            }
        );
    }
    useEffect(() => {
            (async () => {
                setLoading(true);
                const entities = await load_entities('/users')
                setUsers(entities);
                // if (nc === undefined) {
                //     try {
                //         const nats = await connect({servers: server_ws})
                //         setConnection(nats);
                //     } catch (err) {
                //         toast.error(`Ошибка подключения к: NATS`, {
                //             position: "bottom-left",
                //             autoClose: 5000,
                //             hideProgressBar: false,
                //             closeOnClick: true,
                //             pauseOnHover: false,
                //             draggable: false,
                //             progress: undefined,
                //             theme: "light",
                //         });
                //     }
                // }
                setLoading(false);
            })().then()
        },
        []);

    // setInterval(() => {
    //     (async () => {
    //             if (nc === undefined) return;
    //                 const kv = await nc.jetstream().views.kv('connected_users');
    //                 const sc = StringCodec();
    //                 for (const user of users) {
    //                     if (!loading) {
    //                         try {
    //                             setUser({
    //                                 ...user,
    //                                 online: sc.decode((await kv.get(user.id.toString())).value) === "connected"
    //                             });
    //                             setTimeout(() => {}, 15);
    //                         } catch (e) {
    //                             toast.error(`Ошибка NATS: ${e}`, {
    //                                 position: "bottom-left",
    //                                 autoClose: 5000,
    //                                 hideProgressBar: false,
    //                                 closeOnClick: true,
    //                                 pauseOnHover: false,
    //                                 draggable: false,
    //                                 progress: undefined,
    //                                 theme: "light",
    //                             });
    //                         }
    //                     }
    //                 }
    //                 setUsers(users);
    //             }
    //     )()
    // }, 1500);

    const onOrderChange = (newValue) => {
        setChosenOption(newValue);
        setUsers([...users].sort(
            (a, b) => a[newValue] - b[newValue]
        ));
    }
    return (
        <>
            <div className="list-group container">
                {(loading ? <Loader/> :
                        <>
                            <div className={"list-group-item d-flex flex-row justify-content-between"}>
                                <button type='button' className="btn btn-primary dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false" data-bs-auto-close="outside">Добавить пользователя
                                </button>
                                <Select className="ms-auto"
                                        closeMenuOnSelect={true}
                                        defaultValue={option}
                                        onChange={e => onOrderChange(e.value)}
                                        options={options}
                                />
                                <UserForm setUsers={(user: UserModel) => {
                                    setUsers([...users, user])
                                }}/>
                            </div>
                            {users.length === 0 ?
                                <div className="list-group-item list-group-item-warning">
                                    Не найдено пользователей
                                </div>
                                : users.map(user => <User key={user.id} user={user} deleteUser={deleteUser}/>)}
                        </>
                )}
            </div>
        </>
    )
}