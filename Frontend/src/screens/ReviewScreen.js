import '../ReviewBox.css'; // Import your CSS file for styling
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Message from '../components/Message';
import Paginate from '../components/Paginate'
import SuccessMessage from '../components/SuccessMessage'

import {
    listReviews,
    deleteReview,
    createReview,
    updateReview
} from '../actions/reviewActions';

function ReviewScreen() {
    const dispatch = useDispatch()

    const reviewCreate = useSelector(state => state.reviewCreate);
    const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate } = reviewCreate;

    const reviewUpdate = useSelector(state => state.reviewUpdate);
    const { loading: loadingReviewUpdate, error: errorReviewUpdate, success: successReviewUpdate, review: updatedReview } = reviewUpdate;

    const reviewList = useSelector(state => state.reviewList);
    const { loading: loadingReviewList, error: errorReviewList, reviews, cur_page, total_page } = reviewList;

    const reviewDelete = useSelector(state => state.reviewDelete);
    const { loading: loadingReviewDelete, error: errorReviewDelete, success: successReviewDelete } = reviewDelete;
    
    
    const [comment, setComment] = useState('')
    const [imageFile, setImageFile] = useState(null);
    const [usingCamera, setUsingCamera] = useState(false);
    const [reviewId, setReviewId] = useState(null);

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
        });}

    

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

    return <div>
        <div className="mt-5 flex flex-col w-full mb-12 text-center">
            <h1 className="mb-6 text-2xl font-semibold tracking-widest text-black uppercase title-font">Reviews</h1>
        </div>
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
                {reviews.map((review) => (
                    <div className="p-4 lg:w-1/3 md:w-1/2">
                        <div className="h-full px-8 py-10 border-2 border-gray-200 rounded-lg dark:border-gray-800">
                            <div className="flex flex-col items-center mb-3">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 text-blue-500 bg-blue-100 rounded-full dark:bg-blue-500 dark:text-blue-100">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514
                                            2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8
                                            8-8 8 3.589 8 8-3.589 8-8 8z">
                                        </path>
                                        <path
                                            d="M13 7h-2v5H8v2h3v5h2v-5h3v-2h-3z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">{review.userName}</h2>
                                    <p className="text-sm text-gray-500">Created: {review.created}</p>
                                    <img src={review.img} alt={review.userName} fluid rounded />
                                    <p className="text-base leading-relaxed">{review.comment.substring(0, 200)}</p>
                                    {/* <p className="text-sm text-gray-500">Rating: {review.rating}</p> */}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="inline-flex px-4 py-2 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 border-blue-500 rounded-lg hover:bg-blue-700 hover:border-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => updateHandler(review.reviewId)}>Edit</button>
                                <button className="inline-flex px-4 py-2 ml-4 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-red-500 border-red-500 rounded-lg hover:bg-red-700 hover:border-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" onClick={() => deleteHandler(review.reviewId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-center mb-5">
            <Paginate pages={total_page} page={cur_page} dispatcher_action={listReviews}/>
        </div>

        {/* create review form */}
        
        <div className="flex justify-center mb-5">
            {errorReviewCreate && <Message message={errorReviewCreate} />}
            {successReviewCreate && <SuccessMessage message={"Review is added successfully"} />}
            
            {errorReviewUpdate && <Message message={errorReviewUpdate} />}
            {successReviewUpdate && <SuccessMessage message={"Review is updated"} />}
        </div>
        
        <div className='lg:px-20 mt-10 mr-5 ml-5'>
            <form id="myForm" onSubmit={handleSubmit}>
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
                <button type='submit' className=' btn btn-primary w-24'>Submit</button>
            </div>
            </form>

        </div>

        
    </div>


}

export default ReviewScreen;
