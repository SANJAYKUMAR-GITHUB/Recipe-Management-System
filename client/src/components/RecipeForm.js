// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { addRecipe, editRecipe } from '../services/RecipeService';
// import { useNavigate } from 'react-router-dom';

// const RecipeForm = ({ isEdit = false, initialData = {} }) => {
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             title: initialData.title || '',
//             description: initialData.description || '',
//             category: initialData.category || '',
//             ingredients: initialData.ingredients || '',
//             instructions: initialData.instructions || '',
//             image: null
//         },
//         validationSchema: Yup.object({
//             title: Yup.string().required('Title is required'),
//             category: Yup.string().required('Category is required'),
//             ingredients: Yup.string().required('Ingredients are required'),
//             instructions: Yup.string().required('Instructions are required'),
//         }),
//         onSubmit: async (values) => {
//             const formData = new FormData();

//             formData.append('Title', values.title);
//             formData.append('Description', values.description || '');
//             formData.append('Category', values.category);
//             formData.append('Ingredients', values.ingredients);
//             formData.append('Instructions', values.instructions);
//             formData.append('UserId', parseInt(localStorage.getItem('userId'))); // ✅ Ensure integer format

//             if (values.image) {
//                 formData.append('Image', values.image);
//             }

//             try {
//                 if (isEdit) {
//                     await editRecipe(initialData.id, formData);
//                     alert('Recipe updated successfully!');
//                 } else {
//                     await addRecipe(formData);
//                     alert('Recipe added successfully!');
//                 }

//                 navigate('/your-recipes');
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert(`An error occurred: ${error.response?.data || 'Please try again.'}`);
//             }
//         }
//     });

//     return (
//         <div className="container mt-4">
//             <h2>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h2>
//             <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//                 <div className="mb-3">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         {...formik.getFieldProps('title')}
//                     />
//                     {formik.touched.title && formik.errors.title && (
//                         <div className="text-danger">{formik.errors.title}</div>
//                     )}
//                 </div>

//                 <div className="mb-3">
//                     <label>Description (Optional)</label>
//                     <textarea
//                         className="form-control"
//                         {...formik.getFieldProps('description')}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label>Category</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         {...formik.getFieldProps('category')}
//                     />
//                     {formik.touched.category && formik.errors.category && (
//                         <div className="text-danger">{formik.errors.category}</div>
//                     )}
//                 </div>

//                 <div className="mb-3">
//                     <label>Ingredients</label>
//                     <textarea
//                         className="form-control"
//                         {...formik.getFieldProps('ingredients')}
//                     />
//                     {formik.touched.ingredients && formik.errors.ingredients && (
//                         <div className="text-danger">{formik.errors.ingredients}</div>
//                     )}
//                 </div>

//                 <div className="mb-3">
//                     <label>Instructions</label>
//                     <textarea
//                         className="form-control"
//                         {...formik.getFieldProps('instructions')}
//                     />
//                     {formik.touched.instructions && formik.errors.instructions && (
//                         <div className="text-danger">{formik.errors.instructions}</div>
//                     )}
//                 </div>

//                 <div className="mb-3">
//                     <label>Image</label>
//                     <input
//                         type="file"
//                         className="form-control"
//                         onChange={(event) => {
//                             formik.setFieldValue('image', event.currentTarget.files[0]);
//                         }}
//                     />
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                     {isEdit ? 'Update Recipe' : 'Add Recipe'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default RecipeForm;



import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {  useLocation,useNavigate } from 'react-router-dom';

const RecipeForm = ({ userEmail }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        ingredients: '',
        instructions: '',
        image: null
    });

    const location = useLocation();
    const navigate = useNavigate();
    const existingRecipe = location.state?.recipe;
    const isEditing = !!existingRecipe;
    useEffect(() => {
        if (isEditing && existingRecipe) {
            setFormData({
                title: existingRecipe.title || '',
                description: existingRecipe.description || '',
                category: existingRecipe.category || '',
                ingredients: existingRecipe.ingredients || '',
                instructions: existingRecipe.instructions || '',
                image: null  // Image won't auto-fill, will require re-upload
            });
        }
    }, [isEditing, existingRecipe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('Title', formData.title);
        data.append('Description', formData.description);
        data.append('Category', formData.category);
        data.append('Ingredients', formData.ingredients);
        data.append('Instructions', formData.instructions);
        data.append('UserEmail', userEmail);  // Pass userEmail for UserId assignment
        if (formData.image) {
            data.append('Image', formData.image);
        }

        try {
            if(isEditing){
                await axios.put(`http://localhost:5116/api/recipes/${existingRecipe.id}`,data);
                alert('Recipe updated successfully!');
            }
            else{
            const response = await axios.post('http://localhost:5116/api/recipes/add', data);
            alert(response.data.message);
            }
            navigate('/your-recipes');
        } catch (error) {
            alert('Error adding recipe: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="container mt-4">
            <h2>{isEditing ? 'Edit Recipe' : 'Add Recipe'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} className="form-control" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description"   value={formData.description} className="form-control" onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Category:</label>
                    <input type="text" name="category"   value={formData.category} className="form-control" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Ingredients:</label>
                    <textarea name="ingredients" value={formData.ingredients} className="form-control" onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Instructions:</label>
                    <textarea name="instructions" value={formData.instructions} className="form-control" onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Image (optional):</label>
                    <input type="file" name="image" className="form-control-file" onChange={handleImageChange} />
                </div>

                <button type="submit" className="btn btn-primary mt-3">{isEditing ? 'Edit Recipe' : 'Add Recipe'}</button>
            </form>
        </div>
    );
};

export default RecipeForm;
