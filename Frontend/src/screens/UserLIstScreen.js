import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const userDelete = useSelector(state => state.userDelete);
    const { loading, error, users } = userList;
    const { success: successDelete } = userDelete;

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch, successDelete])

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
    }

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
                                <tr key={user._id}>
                                    <td>{  user._id }</td>
                                    <td>{  user.name }</td>
                                    <td>{  user.email }</td>
                                    <td>{user.isAdmin === "true" ? (<i className='fas fa-check' style={{ color: 'green' }}> </i>) : (<i className='fas fa-items' style={{ color: 'red' }}></i>)}</td>

                                    <td>
                                        <Link to={`/admin/user/${user._id}/edit`}>
                                            <button className='btn mx-2'> <i className='fas fa-edit'></i> </button>
                                        </Link>
                                            <button  onClick={()=>deleteHandler(user._id)} className='btn'> <i className='fas fa-trash'></i> </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>}
        </>
    )
}

export default UserListScreen