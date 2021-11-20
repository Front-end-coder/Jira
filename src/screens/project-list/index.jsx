import {SearchPannel} from './search-pannel';
import {List} from './list';
import {useState, useEffect} from 'react';
import qs from 'qs';
import { cleanObject, useMount, useDebounce } from 'utils/index';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        password: ''
    });
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    const debouncedParams = useDebounce(param, 500);

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async response => {
            if (response.ok) {
                setList(await response.json());
            }
        })
    }, [debouncedParams])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        })
    })

    return (
        <div>
            <SearchPannel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    )
}