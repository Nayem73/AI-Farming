import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';


import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    passwordChangeReducer
    } from './reducers/userReducers';



import {
    cropCreateReducer,
    cropDeleteReducer,
    cropListReducer,
    cropUpdateReducer } from './reducers/cropReducers';

import {
    pictureCreateReducer,
    pictureDeleteReducer,
    pictureListReducer,
    pictureUpdateReducer,
    pictureSliderReducer } from './reducers/pictureReducers';

import {
    diseaseCreateReducer,
    diseaseDeleteReducer,
    diseaseDetailReducer,
    diseaseListReducer,
    diseaseUpdateReducer,
    aiSearchReducer } from './reducers/diseaseReducers';

import {
    reviewCreateReducer,
    reviewDeleteReducer,
    reviewListReducer,
    reviewUpdateReducer } from './reducers/reviewReducers';


import {
    subscriptionReducer,
    subscriptionCheckdReducer,
    subscriptionAmountReducer,
    subscriptionAmountUpdateReducer,
    subscriptionListReducer,
    subscriptionsStatisticReducer,
    } from './reducers/subscriptionReducers';

import {
    notificationListReducer,
    notificationDeleteReducer,
    notificationStatusReducer
    } from './reducers/notificationReducers';



const reducer = combineReducers({
    cropList : cropListReducer,
    cropDelete: cropDeleteReducer,
    cropCreate: cropCreateReducer,
    cropUpdate: cropUpdateReducer,

    pictureList : pictureListReducer,
    pictureDelete: pictureDeleteReducer,
    pictureCreate: pictureCreateReducer,
    pictureUpdate: pictureUpdateReducer,
    pictureSlider: pictureSliderReducer,

    diseaseList : diseaseListReducer,
    diseaseDetails: diseaseDetailReducer,
    diseaseDelete: diseaseDeleteReducer,
    diseaseCreate: diseaseCreateReducer,
    diseaseUpdate: diseaseUpdateReducer,
    aiSearch: aiSearchReducer,


    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    passwordChange: passwordChangeReducer,

    reviewList: reviewListReducer,
    reviewDelete: reviewDeleteReducer,
    reviewCreate: reviewCreateReducer,
    reviewUpdate: reviewUpdateReducer,

    subscription: subscriptionReducer,
    subscriptionCheck: subscriptionCheckdReducer,
    subscriptionAmount: subscriptionAmountReducer,
    subscriptionAmountUpdate: subscriptionAmountUpdateReducer,
    subscriptionList: subscriptionListReducer,
    subscriptionsStatistic: subscriptionsStatisticReducer,

    notificationList: notificationListReducer,
    notificationDelete: notificationDeleteReducer,
    notificationStatus: notificationStatusReducer


})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;