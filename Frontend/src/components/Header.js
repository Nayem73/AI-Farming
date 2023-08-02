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

    // return (
    //     <nav className='navbar bg-base-100 top-0 shadow-xl'>
    //         <div className=" container  top-0 mx-auto flex">
    //             <div className="flex-auto ">
    //                 <Link to='/' className="btn btn-outline normal-case text-xl">AI-Farming</Link>
    //             </div>
    //             <div className='searchBox_id1'>
    //             <SearchBox />
    //             </div>
    //             <div className="flex-none">
    //                 <div className="dropdown dropdown-end px-3">
    //                     <Link to={'/aisearch'}>
    //                         <div className=''>
    //                             <label tabIndex={0} className="btn btn-ghost btn-circle">
    //                                 <div className="indicator">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    //                                     <span className="badge badge-sm indicator-item">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
    //                                 </div>
    //                             </label>
    //                         </div>
    //                     </Link>
    //                 </div>
                   

    //                         <div className="dropdown dropdown-end">
    //                             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

    //                                 <h3>admin</h3>
    //                             </label>
    //                             <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    
    //                                 <li className='searchBox_id2'><SearchBox/></li>
                                    
    //                                 <li>
    //                                     <Link to={'/profile'} className="justify-between">
    //                                         Profile
    //                                         <span className="badge">New</span>
    //                                     </Link>
    //                                 </li>
    //                                 <li>
    //                                     <Link to={'/admin/userlist'}>Users</Link>
    //                                 </li>
    //                                 <li>
    //                                     <Link to={'/admin/productlist'}>Products</Link>
    //                                 </li>
    //                                  <li>
    //                                     <Link to={'/admin/orderlist'}>Orders</Link>
    //                                 </li>
    //                                  <li>
    //                                     <Link to={'/admin/token'}>Generate Token</Link>
    //                                 </li>

    //                                 <li onClick={logOutHandler}><a>Logout</a></li>
    //                             </ul>
    //                         </div> 

    //             </div>
    //         </div>
    //     </nav>
    // )
    return (
        <nav className='navbar bg-base-100 top-0 shadow-xl'>
            <div className=" container  top-0 mx-auto flex">
                <div className="flex-auto ">
                    <Link to='/' className="btn btn-outline normal-case text-xl">AI-Farming</Link>
                </div>
                <SearchBox />
                <div className="flex-none">
                    <div className="dropdown dropdown-end px-3">
                        <Link to={'/cart'}>
                            <div className=''>
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        {/* <span className="badge badge-sm indicator-item">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span> */}
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
                            </div> : <Link to={'/login'} className="font-bold justify-between">
                                Log in
                            </Link>}

                </div>
            </div>
        </nav>
    )
}

export default Header;