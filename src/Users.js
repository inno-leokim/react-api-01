import React, { useEffect, useState } from "react";
import axios from "axios";


function Users(){

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try{
            setError(null);
            setUsers(null);
            setLoading(true); // loading 상태를 true로 바꾼다.

            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => { 
        fetchUsers();
    }, []);

    if(loading) return <div>로딩중..</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!users) return null;

    return(
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    ) 
}

export default Users;