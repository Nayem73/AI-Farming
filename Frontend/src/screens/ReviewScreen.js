// import '../ReviewBox.css'; // Import your CSS file for styling
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Paginate from '../components/Paginate'
import SuccessMessage from '../components/SuccessMessage'
import Loader from '../components/Loader';


import {
    listReviews,
    deleteReview,
    createReview,
    updateReview
} from '../actions/reviewActions';

function ReviewScreen() {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // useEffect(() => {
    //     if (!userInfo) {
    //         history('/login')
    //     }
    // }, [dispatch])



    const reviewCreate = useSelector(state => state.reviewCreate);
    const {  error: errorReviewCreate, success: successReviewCreate } = reviewCreate;

    const reviewUpdate = useSelector(state => state.reviewUpdate);
    const {  error: errorReviewUpdate, success: successReviewUpdate} = reviewUpdate;

    const reviewList = useSelector(state => state.reviewList);
    const { loading: loadingReviewList, error: errorReviewList, reviews, cur_page, total_page } = reviewList;

    const reviewDelete = useSelector(state => state.reviewDelete);
    const {  success: successReviewDelete } = reviewDelete;
    
    
    const [editingReview, setEditingReview] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [usingCamera, setUsingCamera] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const formRef = useRef(null);

    // create review object
    const [formData, setFormData] = useState({
        img: null,
        comment: ''
    });



    useEffect(() => {
        dispatch(listReviews())
        if (successReviewCreate || successReviewUpdate) {
            setFormData({
                img: null,
                comment: ''
            })
            setImageFile(null);
            setUsingCamera(false);
            handleReset();
            setReviewId(null);
            setEditingReview(false);
        }
    }, [dispatch, successReviewDelete, successReviewCreate, successReviewUpdate])


    //  delete handles
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteReview(id))
        }}

    // update handles
    const updateHandler = (id) => {
        setReviewId(id);
        const review = reviews.find((review) => review.reviewId === id);
        setFormData({
            img: null,
            comment: review.comment
        });
        formRef.current.scrollIntoView({
            behavior: 'smooth', // You can adjust the scrolling behavior
            block: 'start' // You can adjust the scroll position within the form
        });
        setEditingReview(true);
    
    }

    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
        ...prevFormData,
        img: file,
        }));
        setImageFile(file);
        setUsingCamera(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('img', formData.img);
        formDataToSend.append('comment', formData.comment);
        if (reviewId) {
            dispatch(updateReview(reviewId, formDataToSend));
        } else {
            dispatch(createReview(formDataToSend))
        }
        // if createReview succeeds, reset the form
        
        
    };

    const handleReset = () => {
        document.getElementById("myForm").reset(); // Replace "myForm" with your actual form ID
    };

    const editCancelHandler = () => {
        setFormData({
            img: null,
            comment: ''
        })
        setImageFile(null);
        setUsingCamera(false);
        handleReset();
        setReviewId(null);
        setEditingReview(false);
    }





    return <div>
        <div className="mt-5 flex flex-col w-full text-center">
            <h1 className="mb-6 text-2xl font-semibold tracking-widest text-black uppercase title-font">Reviews</h1>
        </div>
        <div className="container px-5 py-4 mx-auto">
        {loadingReviewList ? <Loader /> : errorReviewList ?<div className="flex justify-center"><Message  message={errorReviewList} /> </div> :
            <div className="-m-4">
                {reviews.map((review) => (
                    <div className="p-4 review my-4 lg:mx-10 md:mx-2 sm:mx-2">
                        <div className="h-full lg:px-8 md:px-4 sm:px-4 py-10 lg:border-2 md:border-2 border-gray-200 rounded-lg dark:border-gray-800">
                            <div className="flex flex-col  mb-3">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-15 h-10 mb-5 py-2 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                
                                    <i class="fa-regular fa-user fa-2xl lg:px-8 md:px-4 sm:px-2"></i>
                                    <h2 className='lg:px-8 md:px-4  sm:px-2 font-bold text-xl title-font'>{review.userName}</h2>
                                </div>



                                {(review.img !== undefined && review.img !== null && review.img !== "" && review.img !== "null")
                                ?<>
                                <div className="flex-grow p-4 lg:w-1/3 md:w-1/2 card">
                                    <img src={review.img} alt={review.userName} fluid rounded />
                                </div>
                                <hr className="mb-5 mt-5" style={{color: '#000000'}}/>
                                
                                </>: <></>}
    

                                <div className="flex-grow  rounded-lg dark:border-gray-800 
                                dark:bg-gray-100 p-8
                                dark:hover:bg-gray-200 transition duration-500 ease-in-out
                                
                                ">
                                    
                                    <p className="text-base leading-relaxed">{review.comment}</p>
                                    
                                </div>
                            </div>
                            
                            <div className="flex justify-center">
                            {(userInfo && userInfo.username === review.userName) && <button className="inline-flex px-4 py-2 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 border-blue-500 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => updateHandler(review.reviewId)}>Edit</button>}
                            {(userInfo && (userInfo.username === review.userName || userInfo.isSuperAdmin)) &&  <button className="inline-flex px-4 py-2 ml-4 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 border-red-500 rounded-lg hover:bg-red-700 hover:border-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => deleteHandler(review.reviewId)}>Delete</button>}
                            </div>
                            <p className="pt-2 text-sm text-gray-500">Created: {review.created}</p>
                        </div>
                    </div>
                ))}
            </div>}
        </div>

        <div className="flex justify-center m-10">
            <Paginate pages={total_page} page={cur_page} dispatcher_action={listReviews}/>
        </div>
        {/* hr tag with box shadow */}
        <hr className="mb-5 mt-5" style={{color: '#000000'}}/>
        {/* create review form */}
        
        

        <div className="container px-5 py-10 mx-auto ">
                <div className="flex flex-wrap -m-4">
                    
                    <div className="p-4 w-full">
                        <div className="h-full px-8 py-10 review">
                            <div className="flex flex-col items-center mb-3">
                            {/* <div className=" my-5 w-full inline-flex items-center justify-center flex-shrink-0 h-10 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                <h2 className="px-8 font-bold text-xl title-font">Create or Update Reviews</h2>
                            </div> */}



        <div className="flex justify-center mb-5 mt-5">
            <h1 className="mb-6 text-2xl font-semibold tracking-widest text-black uppercase title-font">Create or Update Reviews</h1>
        </div>
        


        <div className="flex justify-center mb-5 mt-5">
                {errorReviewCreate && <Message message={errorReviewCreate} />}
                {successReviewCreate && <SuccessMessage message={"Review is added successfully"} />}
                
                {errorReviewUpdate && <Message message={errorReviewUpdate} />}
                {successReviewUpdate && <SuccessMessage message={"Review is updated"} />}

        </div>


        {userInfo ?
        <div className='lg:px-20 mt-10 mr-5 ml-5 mb-10 w-3/4'>
            <form ref={formRef}  id="myForm" onSubmit={handleSubmit}>
            {imageFile && !usingCamera && (
            <div className="container-aisearch">
                <div className="ai_img">
                <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded"
                    className="uploaded-image"
                />
                </div>
            </div>
            )}
            <div>
                <label htmlFor="img">Image:</label>
                <input
                type="file"
                id="img"
                name="img"
                accept=".png, .jpg, .jpeg" // Specify accepted file formats
                onChange={handleImageChange}
                />
            </div>


            <div data-color-mode="light">
                <label htmlFor="comment">Comment:</label>
                <textarea
                required
                type="text"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                />
            </div>
            <div className='py-4 flex justify-left'>
                {editingReview?<>
                    <button type='submit' className=' btn btn-primary w-24'>Update</button>
                    <div onClick={()=>editCancelHandler()} className=' btn btn-primary w-24 mx-5'>Cancle</div>
                </>:
                <>
                <button type='submit' className=' btn btn-primary w-24'>Submit</button>
                </>
                
                }
                
            </div>
            </form>

        </div>
        
        
        : <>
        
        <div className="flex justify-center m-10">
            <div className="flex-grow  rounded-lg dark:border-red-800 
            dark:bg-red-100 p-8
            dark:hover:bg-red-200 transition duration-500 ease-in-out
            justify-center 
            ">
                
                <p className="text-base leading-relaxed ">Please <Link to={'/login'} className="font-bold
                text-blue-500
                ">Login</Link> to create or update reviews</p>
            </div>

        </div>

        
        
        </>}

        </div>
        </div>
        </div>
        </div>
        </div>


        
    </div>


}

export default ReviewScreen;
