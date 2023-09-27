import { React, useEffect, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { listNotifications, deleteNotification, statusNotification } from '../actions/notificationActions';




export default function NotificationMenu({userInfo}) {
    // const history = useNavigate();
    const dispatch = useDispatch();

    // __________________User INformations_____________________//
    // const userLogin = useSelector(state => state.userLogin);
    // const { userInfo } = userLogin;


    // __________________Notificaton_____________________//

    const [totalNotifications, setTotalNotifications] = useState(0);
    const [notificationRedicrectUrl, setNotificationRedicrectUrl] = useState('');

    const notificationList = useSelector(state => state.notificationList);
    const {  notifications} = notificationList;

    const notificationDelete = useSelector(state => state.notificationDelete);
    const {  success: notificationDeleteSuccess} = notificationDelete;

    
    const notificationStatus = useSelector(state => state.notificationStatus);
    const {  success: notificationStatusSuccess} = notificationStatus;


    useEffect(() => {
        if(userInfo){
            dispatch(listNotifications())
        }
        
    }, [dispatch, notificationDeleteSuccess, notificationStatusSuccess, userInfo])

    useEffect(() => {
        if(notifications){
            var notification_count = 0;
            notifications.map((notification) => {
                if(notification.status === false){
                    notification_count += 1;
                }
            })
            setTotalNotifications(notification_count)
        }
        if(notificationStatusSuccess){
            window.location.href = notificationRedicrectUrl;
        }
    }, [notifications, notificationStatusSuccess])

    const deleteHandler = (id) => {
        dispatch(deleteNotification(id))
    }

    const linkClickHandler = (notification) => {

        if(notification.type === 'disease'){
            setNotificationRedicrectUrl(`/disease/${notification.crop}/${notification.disease}`);
        }
        else if(notification.type === 'payment'){
            setNotificationRedicrectUrl(`/profile/`);
        }

        if(notification.status === false){
            dispatch(statusNotification(notification.id))
        }
        else if(notificationRedicrectUrl !== '' && notificationRedicrectUrl !== undefined && notificationRedicrectUrl !== null){
            window.location.href = notificationRedicrectUrl;
        }

    }

    // ________________Notificaton end___________________//


    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <Fragment>

                        <label className="btn btn-ghost btn-circle" variant="contained" {...bindTrigger(popupState)}>
                            <div className="indicator">
                                <i class="fa-solid fa-bell fa-xl"></i>
                                <span className="badge badge-sm indicator-item">{totalNotifications}</span>
                            </div>
                        </label>
                    <Menu {...bindMenu(popupState)} 
                    className=" mt-3 p-2 shadow  rounded-box"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        {notifications && notifications.map((notification) => (
                            <MenuItem 
                            onClick={popupState.close} 
                            style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                            className="mt-3 shadow bg-base-100 rounded-box"
                            
                        >
                            
                            <div className="text-sm" 
                            style= {{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '300px'}}
                            onClick={() => linkClickHandler(notification)}
                            >
                                {notification.status === false ? 
                            <strong >{notification.title}</strong> : <>{notification.title} </>
                            }
                            </div>
                            
                            <div 
                            // button aline
                            class="justify-content-end"
                            >
                            <button onClick={() => deleteHandler(notification.id)} className='btn'> <i className='fas fa-trash'></i> </button>
                            </div>
                            
                            
                        </MenuItem>
                            
                            ))}
                    </Menu>

                </Fragment>
            )}
        </PopupState>


    );
}
