import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUerProfile, listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate'

const UserListScreen = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userList = useSelector(state => state.userList);
    const userUpdate = useSelector(state => state.userUpdateProfile);


    const [edit_user_bool, setEdit_user_bool] = useState(false);
    const [edit_user_id, setEdit_user_id] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const { loading, error, users, cur_page, total_page } = userList;
    const { success: successUpdate } = userUpdate;

    useEffect(() => {
        if (!userInfo.isAdmin) {
            history('/login')
        }
        dispatch(listUsers())
        if (successUpdate) {
            setEdit_user_bool(false)
        }
    }, [dispatch, successUpdate])





    const editButtonHandler = (id) => {
        if (edit_user_bool){
            setEdit_user_bool(false)
        }else{
            setEdit_user_bool(true)
        }
        setEdit_user_id(id)
        setIsAdmin(users.find(user => user.id === id).isAdmin)
    }

    const editHandler = (id) => {
        const formDataToSend = new FormData();
        formDataToSend.append('isAdmin', isAdmin);
        dispatch(updateUerProfile(id, formDataToSend));
    }

    const handleToggle = () => {
        setIsAdmin(!isAdmin);
    };


    return (
        <>
            <h1 className='text-2xl font-bold mx-5 py-5'>Users</h1>

            {loading ? <Loader /> : error ? <Message message={error} /> : <div className="overflow-x-auto mx-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{  user.id }</td>
                                    <td>{  user.userName }</td>
                                    <td>{  user.email }</td>
                                    <td>{(user.isAdmin === true && !edit_user_bool) ? (<i className='fa-regular fa-circle-check' style={{ color: 'green' }}> </i>) 
                                    : (edit_user_bool && edit_user_id===user.id)?<>

                                    <label>
                                            <input
                                            type="checkbox"
                                            checked={isAdmin}
                                            onChange={handleToggle}
                                            />
                                        </label>
                                    </>:<></>}</td>

                                    <td>
                                    {userInfo.isSuperAdmin && !edit_user_bool?<button onClick={()=>editButtonHandler(user.id)} className='btn mx-2'> <i className='fas fa-edit'></i> </button>
                                    :<>
                                    {(edit_user_bool && (edit_user_id === user.id )) ?
                                    <><button onClick={() => editHandler(user.id)} className='btn ml-3'> <i class="fa-solid fa-check"></i> </button>
                                    <button onClick={() => editButtonHandler(user.id)} className='btn ml-3'> <i class="fa-solid fa-xmark"></i></button></>
                                    :<></>
                                    }
                                    </>}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Paginate pages={total_page} page={cur_page} dispatcher_action={listUsers}/>
            </div>}
        </>
    )
}

export default UserListScreen