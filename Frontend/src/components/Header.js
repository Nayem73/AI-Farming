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


import NotificationMenu from '../components/NotificationMenu';


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



    //  _______________________________dropdown__________________________//
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    //___________________________Header_______________________//


    const reloadAndNavigate = () => {
        dispatch(listDiseases()); // Dispatch the action
        history('/'); // Navigate to the specified route
    };

    return (
        <nav className='navbar bg-base-100 top-0 shadow-xl'>
            <div className=" container  top-0 mx-auto flex">
                <Link to={'/'}><img src="/logo.svg" alt="logo" className="w-10 h-10 mr-2" /></Link>
                <div className="flex-auto ">
                    <button onClick={reloadAndNavigate} className="normal-case text-xl text-[#009100] font-semibold font-serif" >AI-Farming</button>
                </div>
                {/* <div className="flex-auto ">
                    <button onClick={reloadAndNavigate} className="btn btn-outline normal-case text-xl">AI-Farming</button>
                </div> */}
                <div className='searchBox_id1'>
                    <Select className='shadow-lg mr-1 bg-dark rounded-lg '
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
                                <label className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <i class="fa-solid fa-camera-retro fa-xl"></i>
                                    </div>
                                </label>
                            </div>
                        </Link>
                    </div>

                    {/* ai search end */}
                    {/* notification */}

                    <NotificationMenu userInfo={userInfo}/>

                    {/* notification end */}


                    {
                        userInfo ?

                            // <div className="dropdown dropdown-end header_dropdown">
                            //     <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className={`dropdown dropdown-end ${isDropdownOpen ? 'open' : ''} header_dropdown`}>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={handleDropdownToggle}>

                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm7 12h-2v-1c0-1.657-1.343-3-3-3H10c-1.657 0-3 1.343-3 3v1H5c-1.104 0-2 .896-2 2v2c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-2c0-1.104-.896-2-2-2zm-7 3a3 3 0 0 0 0-6 3 3 0 0 0 0 6z"></path>
                                </svg>
                                </label>
                                {isDropdownOpen && (
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
                                            {userInfo.username}
                                            {userInfo.isSuperAdmin ? <span className="badge">S</span>
                                            : userInfo.isAdmin ? <span className="badge">A</span>:
                                            <></>}
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
                                )}
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