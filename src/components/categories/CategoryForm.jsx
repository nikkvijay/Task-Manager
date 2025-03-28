import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
} from '@mui/material';
import { addCategory, updateCategory, deleteCategory } from '../../store/features/categorySlice';

const CategoryForm = ({ existingCategory, onCancelEdit }) => {
    const dispatch = useDispatch();
    const existingCategories = useSelector((state) => state.categories.categories);

    const [category, setCategory] = useState({
        id: '',
        name: '',
        color: '#1976d2', // Default blue color
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (existingCategory) {
            setCategory({
                id: existingCategory.id,
                name: existingCategory.name,
                color: existingCategory.color,
            });
        }
    }, [existingCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category.name.trim()) {
            setError('Category name is required');
            return;
        }

        const isDuplicate = existingCategories.some(
            (cat) =>
                cat.name.toLowerCase() === category.name.toLowerCase() &&
                cat.id !== category.id
        );

        if (isDuplicate) {
            setError('Category name already exists');
            return;
        }

        if (existingCategory) {
            dispatch(updateCategory({
                id: category.id,
                name: category.name.trim(),
                color: category.color,
            }));
            if (onCancelEdit) onCancelEdit();
        } else {
            dispatch(addCategory({
                name: category.name.trim(),
                color: category.color,
            }));
            setCategory({ id: '', name: '', color: '#1976d2' });
        }

        setError('');
    };

    const handleDelete = () => {
        if (existingCategory) {
            dispatch(deleteCategory(existingCategory.id));
            if (onCancelEdit) onCancelEdit();
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {existingCategory ? 'Edit Category' : 'Add New Category'}
            </Typography>

            <TextField
                fullWidth
                label="Category Name"
                name="name"
                value={category.name}
                onChange={handleChange}
                error={!!error}
                helperText={error}
                inputProps={{ maxLength: 50 }}
            />

            <TextField
                fullWidth
                type="color"
                label="Category Color"
                name="color"
                value={category.color}
                onChange={handleChange}
                sx={{
                    '& input[type="color"]': {
                        width: '100%',
                        height: '56px',
                        padding: '8px 14px',
                    },
                }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    {existingCategory ? 'Update Category' : 'Add Category'}
                </Button>

                {existingCategory && (
                    <>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                            fullWidth
                        >
                            Delete Category
                        </Button>
                        {onCancelEdit && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onCancelEdit}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        )}
                    </>
                )}
            </Box>

            {error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default CategoryForm;