import React from 'react'
import { Link } from 'react-router-dom';
import FormDisease from '../components/FormDisease.js';




const DiseaseCreateScreen = () => {

    
    

    return (
        <div className='lg:px-20 mt-10 mr-5 ml-5'>
        
        <div className='py-4 flex justify-left'>
            <Link to={'/admin/disease/'}>
                <button className=' btn btn-primary w-24'>Back</button>
            </Link>
        </div>
        <h1 className='text-3xl font-bold justify-center items-center'>ADD Disease</h1>
        <FormDisease/>

    </div>
    );
    
}


export default DiseaseCreateScreen




















// const DiseaseCreateScreen = ({ existingData }) => {

//     const dispatch = useDispatch();
//     const params = useParams();
//     const [formData, setFormData] = useState({
//         title: '',
//         img: null,
//         description: '',
//         crop: {
//             id: '',
//         },
//     });
//     if (existingData) {
//         console.log('create page edit',existingData)
//         // If existingData is present, it means it's an update operation
//         // So, set the form data to the existing data
//         formData.title = existingData.title;
//         // formData.img = existingData.img;
//         formData.img = null;
//         formData.description = existingData.description;
//         formData.crop.id = existingData.crop.id;
//     }

//     const cropList = useSelector(state => state.cropList);

//     const { loading, error, crops } = cropList;

//     useEffect(() => {
//         dispatch(listCrops())
//     }, [dispatch])
//     const cropOptions = []
//     crops.map((crop) => cropOptions.push(
//         {
//             value: crop.id,
//             label: crop.title
//         }
//     ));

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleCropChange = (selectedOption) => {
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             crop: {
//             id: selectedOption.value,
//             },
//         }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setFormData((prevFormData) => ({
//         ...prevFormData,
//         img: file,
//         }));
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();

//     // };

//     const handleMarkdownChange = (value) => {
//         // The Markdown editor's value is passed as an argument.
//         // Here, you can set it to the 'description' field in the form data.
//         setFormData((prevFormData) => ({
//         ...prevFormData,
//         description: value,
//         }));
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     const formDataToSend = new FormData();
//     //     formDataToSend.append('title', formData.title);
//     //     formDataToSend.append('img', formData.img);
//     //     formDataToSend.append('description', formData.description);
//     //     formDataToSend.append('cropId', formData.crop.id);

//     //     // print out the fromdata values
//     //     // for (const pair of formDataToSend.entries()) {
//     //     // console.log(`${pair[0]}: ${pair[1]}`);
//     //     // }
    
//     //     // Perform the POST request to your backend API
//     //     axios
//     //       .post('http://192.168.77.4:8080/api/disease/', formDataToSend)
//     //       .then((response) => {
//     //         console.log('Data successfully submitted!', response.data);
//     //         // Reset the form after successful submission if needed
//     //         setFormData({
//     //           title: '',
//     //           img: null,
//     //           description: '',
//     //           crop: {
//     //             id: '',
//     //           },
//     //         });
//     //       })
//     //       .catch((error) => {
//     //         console.error('Error submitting data:', error);
//     //       });
//     //   };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formDataToSend = new FormData();
//         formDataToSend.append('title', formData.title);
//         formDataToSend.append('img', formData.img);
//         formDataToSend.append('description', formData.description);
//         formDataToSend.append('cropId', formData.crop.id);
    
//         // Perform the POST or PUT request based on whether it's an update or create operation
//         if (existingData.id) {
//           // If existingData.id exists, it means it's an update operation
//             axios
//                 .put(`your_backend_api_url/${existingData.id}`, formDataToSend)
//                 .then((response) => {
//                 console.log('Data successfully updated!', response.data);
//                 })
//                 .catch((error) => {
//                 console.error('Error updating data:', error);
//                 });
//             } else {
//             // If existingData.id is not present, it means it's a create operation
//             axios
//                 .post('your_backend_api_url', formDataToSend)
//                 .then((response) => {
//                 console.log('Data successfully submitted!', response.data);
//                 })
//                 .catch((error) => {
//                 console.error('Error submitting data:', error);
//                 });
//         }
//     };



    

//     return (
//         <div className='lg:px-20 mt-10 mr-5 ml-5'>
        
//         <div className='py-4 flex justify-left'>
//             <Link to={'/admin/productlist'}>
//                 <button className=' btn btn-primary w-24'>Back</button>
//             </Link>
//         </div>
//         <h1 className='text-3xl font-bold justify-center items-center'>ADD Disease</h1>
//         <form onSubmit={handleSubmit}>
//         <div>
//             <label htmlFor="title">Title:</label>
//             <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             />
//         </div>
//         <div>
//             <label htmlFor="img">Image:</label>
//             <input
//             type="file"
//             id="img"
//             name="img"
//             accept=".png, .jpg, .jpeg" // Specify accepted file formats
//             onChange={handleImageChange}
//             />
//         </div>

//         <div>
//             <label htmlFor="cropId">Crop ID:</label>
//             <Select
//             options={cropOptions}
//             onChange={handleCropChange}
//             value={cropOptions.find((option) => option.value === formData.crop.id)}
//             />
//         </div>

//         <div data-color-mode="light">
//             <label htmlFor="description">Description (Markdown):</label>
//             <MDEditor
//             value={formData.description} // Set the value from the form data
//             onChange={handleMarkdownChange} // Handle changes and update form data
//             />
//         </div>
//         <div className='py-4 flex justify-left'>
//             <button type='submit' className=' btn btn-primary w-24'>Submit</button>
//         </div>
//         </form>

//     </div>
//     );
    
// }


// export default DiseaseCreateScreen


