import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    amountSubscription,
    updateAmountSubscription,
    listSubscriptions } from '../actions/subscriptionActions';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import FormContainer from '../components/FormContainer'
import SuccessMessage from '../components/SuccessMessage';

const SubcriptionsScreen = () => {
    const dispatch = useDispatch();

    const subscriptionList = useSelector(state => state.subscriptionList);
    const { loading: subscriptionsLoading, error:subscriptionsError, subscriptions, cur_page, total_page } = subscriptionList;

    const subscriptionAmount = useSelector(state => state.subscriptionAmount);
    const { loading: subscriptionAmountLoading, error:subscriptionAmountError, subscription} = subscriptionAmount;
    
    const subscriptionAmountUpdate = useSelector(state => state.subscriptionAmountUpdate);
    const {  error:subscriptionAmountUpdateError, success:subscriptionAmountUpdateSuccess} = subscriptionAmountUpdate;

    const [amount, setAmount] = useState(0);



    useEffect(() => {
        dispatch(listSubscriptions())
    }, [dispatch])

    // if (subscription !== undefined) {
    //     setAmount(subscription.amount)
    // }

    useEffect(() => {
        dispatch(amountSubscription())
        if(subscriptionAmountUpdateSuccess){
            // reset amoutUpdateForm
            document.getElementById('amoutUpdateForm').reset();
        }
    },[dispatch,subscriptionAmountUpdateSuccess])

    const updateAmountHandler = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('amount', amount);
        dispatch(updateAmountSubscription(formDataToSend));
    }


    return (
        <>
            
            

            <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">
                    
                    {/* Reset password */}
                    <div className="p-4 w-full">
                        <div className="h-full px-8 py-10 review">
                            <div className="flex flex-col items-center mb-3">
                            <div className=" my-5 w-full inline-flex items-center justify-center flex-shrink-0 h-10 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                <h2 className="px-8 font-bold text-xl title-font">Subscriptions Info</h2>
                            </div>
                            {subscriptionAmountLoading ? <Loader /> : subscriptionAmountError ? <Message message={subscriptionAmountError} /> :<>
                            {subscriptionAmountUpdateError && <Message message={subscriptionAmountUpdateError} />}
                            {subscriptionAmountUpdateSuccess && <SuccessMessage message='Amount is updated' />}
                            <p className="text-sm text-gray-500"><strong>Current Subscription Amount : </strong>{subscription.amount} Taka</p>
                            <br/>
                            <h1 className='text-3xl'>Update Amount</h1>
                                <div className="flex-grow my-5">
                                <FormContainer>

                                    <div>
                                        
                                        <form id='amoutUpdateForm' onSubmit={updateAmountHandler}>
                                        <div className="form-control w-full  ">
                                            <input  placeholder="Enter amount" className="input input-bordered w-full max-w-xs" onChange={(e) => setAmount(e.target.value)} />
                                        </div>
                                            <div className='py-4 flex justify-center items-center'>
                                                <button type='submit' className=' btn btn-primary w-24'>Update</button>
                                            </div>
                                        </form>
                                    </div>
                                    </FormContainer>
                                    
                                </div>
                                </>}
                            </div>
                        </div>
                    </div>



                </div>
            </div>



            <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">
                    
                    
                    <div className="p-4 w-full">
                        <div className="h-full px-8 py-10 review">
                            <div className="flex flex-col items-center mb-3">
            <div className=" my-5 w-full inline-flex items-center justify-center flex-shrink-0 h-10 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                <h2 className="px-8 font-bold text-xl title-font">Payments</h2>
            </div>

            {subscriptionsLoading ? <Loader /> : subscriptionsError ? <Message message={subscriptionsError} /> : <div className="overflow-x-auto mx-5 w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>TransactionId</th>
                            <th>PaymentDate</th>
                            <th>Method</th>
                            <th>Amount</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody>

                        
                            {subscriptions.map(subscribed => (
                                <tr key={subscribed.id}>
                                    <td>{  subscribed.userName }</td>
                                    <td>{  subscribed.transactionId }</td>
                                    <td>{  subscribed.paymentDate}</td>
                                    <td>{  subscribed.method }</td>
                                    <td>{  subscribed.amount }</td>
                                    <td>{  subscribed.currency }</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                
                <div className="flex justify-center m-10 w-full">
                    <Paginate pages={total_page} page={cur_page} dispatcher_action={listSubscriptions}/>
                </div>
            </div>}
            
            
            </div>
            </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default SubcriptionsScreen