import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Select from 'react-select';

// Actions
import { logout } from '../actions/userActions';
import { listCrops } from '../actions/cropActions';

// Components
import SearchBox from './SearchBox';
import { listDiseases } from '../actions/diseaseActions';
import { listNotifications, deleteNotification } from '../actions/notificationActions';


function Header() {
    const history = useNavigate();
    const dispatch = useDispatch();


    // __________________User INformations_____________________//
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    
    // __________________Log out handler_____________________//
    const logOutHandler = () => {
        dispatch(logout())
        history('/')
    }


    // __________________Crop list for option slector_____________________//
    const cropList = useSelector(state => state.cropList);
    const { crops } = cropList;

    useEffect(() => {
        dispatch(listCrops())
    }, [dispatch])

    const options = [
        {
            value: null,
            label: 'select'
        }
    ]
    if(crops){
        crops.map((crop) => options.push(
            {
                value: crop.title,
                label: crop.title
            }
        ))
    }

    const [selectedOption, setSelectedOption] = useState(null);
    
    const selectedCrop = (selected) => {
        setSelectedOption(selected);
    }

    // __________________Notificaton_____________________//

    const [totalNotifications, setTotalNotifications] = useState(0);

    const notificationList = useSelector(state => state.notificationList);
    const { loading:notificationListLoading, error: notificationListError,  notifications} = notificationList;

    const notificationDelete = useSelector(state => state.notificationDelete);
    const { loading:notificationDeleteLoading, error: notificationDeleteError, success: notificationDeleteSuccess} = notificationDelete;

    useEffect(() => {
        dispatch(listNotifications())
    }, [dispatch, notificationDeleteSuccess])

    useEffect(() => {
        if(notifications){
            setTotalNotifications(notifications.length)
        }
    }, [notifications])

    const deleteHandler = (id) => {
        dispatch(deleteNotification(id))
    }

    // ________________Notificaton end___________________//





    //___________________________Header_______________________//


    const reloadAndNavigate = () => {
        dispatch(listDiseases()); // Dispatch the action
        history('/'); // Navigate to the specified route
    };

    return (
        <nav className='navbar bg-base-100 top-0 shadow-xl'>
            <div className=" container  top-0 mx-auto flex">
                <div className="flex-auto ">
                    {/* <Link to='/' className="btn btn-outline normal-case text-xl">AI-Farming</Link> */}
                    <button onClick={reloadAndNavigate} className="btn btn-outline normal-case text-xl">AI-Farming</button>
                </div>
                <div className='searchBox_id1'>
                    <Select className='shadow-lg p-0 bg-dark rounded-lg '
                    options={options}
                    onChange={selectedCrop}
                    />
                </div>
                <div className='searchBox_id1'>
                    <SearchBox crop={selectedOption}/>
                </div>
                <div className="flex-none">
                    {/* ai search */}
                    <div className="dropdown dropdown-end pl-3">
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

                    {/* ai search end */}
                    {/* notification */}

                    <div className="dropdown dropdown-end">
                        <Link to={'/cart'}>
                            <div className=''>
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                    <i class="fa-solid fa-bell fa-xl"></i>
                                        <span className="badge badge-sm indicator-item">{totalNotifications}</span>
                                    </div>
                                </label>
                            </div>
                        </Link>
                    </div>

                    {/* notification end */}


                    {
                        userInfo ?

                            <div className="dropdown dropdown-end header_dropdown">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                                    <h3>{userInfo.username}</h3>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    
                                    <li className='searchBox_id2'>
                                        <Select className='p-0 bg-dark rounded-lg ml-5'
                                        options={options}
                                        onChange={selectedCrop}
                                        />
                                    </li>
                                    <li className='searchBox_id2'><SearchBox  crop={selectedOption} /></li>
                                    
                                    <li>
                                        <Link to={'/profile'} className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/review'} className="justify-between">
                                            Review
                                            {/* <span className="badge">New</span> */}
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
                                    {userInfo && userInfo.isAdmin === true && <li>
                                        <Link to={'/admin/subscriptions'}>Subscriptions</Link>
                                    </li>}

                                    <li onClick={logOutHandler}><a>Logout</a></li>
                                </ul>
                            </div> :
                            <div className="dropdown dropdown-end header_dropdown">
                                <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
                                    <i class="fa-solid fa-bars"></i>
                                </label>
                                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    

                                    <li className='searchBox_id2'>
                                        <Select className='p-0 bg-dark rounded-lg ml-5'
                                        options={options}
                                        onChange={selectedCrop}
                                        />
                                    </li>
                                    <li className='searchBox_id2'><SearchBox  crop={selectedOption}/></li>
                                    
                                    
                                    <li>
                                        <Link to={'/review'} className="justify-between">
                                            Review
                                            {/* <span className="badge">New</span> */}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to={'/login'} className="font-bold justify-between">
                                            Log in
                                        </Link>
                                    </li>
                                    

                                </ul>
                            </div>
                            
                            }

                </div>
            </div>
        </nav>
    )
}

export default Header;