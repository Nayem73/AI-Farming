import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route,useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

function Header() {
    const history = useNavigate();

    const userLogin = useSelector(state => state.userLogin);

    const { userInfo } = userLogin;


    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(logout())
        history('/')
    }

   
    return (
        <nav className='navbar bg-base-100 top-0 shadow-xl'>
            <div className=" container  top-0 mx-auto flex">
                <div className="flex-auto ">
                    <Link to='/' className="btn btn-outline normal-case text-xl">AI-Farming</Link>
                </div>
                <div className='searchBox_id1'>
                <SearchBox /></div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end px-3">
                        <Link to={'/aisearch/'}>
                            <div className=''>
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <i class="fa-solid fa-camera-retro fa-xl"></i>
                                    </div>
                                </label>
                            </div>
                        </Link>
                    </div>
                    {
                        userInfo ?

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                                    <h3>{userInfo.username}</h3>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className='searchBox_id2'><SearchBox /></li>
                                    <li>
                                        <Link to={'/profile'} className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    {(userInfo && userInfo.isAdmin === true) && <li>
                                        <Link to={'/admin/userlist'}>Users</Link>
                                    </li>}
                                    {userInfo && userInfo.isAdmin === true && <li>
                                        <Link to={'/admin/disease/'}>Diseases</Link>
                                    </li>}
                                    {userInfo && userInfo.isAdmin === true && <li>
                                        <Link to={'/admin/crop/'}>Crops</Link>
                                    </li>}

                                    <li onClick={logOutHandler}><a>Logout</a></li>
                                </ul>
                            </div> :
                            <div className="dropdown dropdown-end">
                                <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                                    <i class="fa-solid fa-bars"></i>
                                </label>
                                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to={'/login'} className="font-bold justify-between">
                                            Log in
                                        </Link>
                                    </li>

                                    <li className='searchBox_id2'><SearchBox /></li>
                                </ul>



                                
                                
                            </div>
                            
                            }

                </div>
            </div>
        </nav>
    )
}

export default Header;