import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import { addTask, updateTask } from '../../store/features/taskSlice';

const TaskForm = ({ existingTask, onCancelEdit }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    const [task, setTask] = useState({
        id: '',
        title: '',
        categoryId: '',
        status: 'pending',
        priority: 'medium',
    });

    useEffect(() => {
        if (existingTask) {
            setTask(existingTask);
        }
    }, [existingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title.trim()) return;

        if (existingTask) {
            dispatch(updateTask({
                ...task,
                updatedAt: new Date().toISOString(),
            }));
            if (onCancelEdit) onCancelEdit();
        } else {
            dispatch(addTask(task));
            setTask({
                id: '',
                title: '',
                categoryId: '',
                status: 'pending',
                priority: 'medium',
            });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {existingTask ? 'Edit Task' : 'Add New Task'}
            </Typography>
            <TextField
                fullWidth
                label="Task Title"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
            />
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name="categoryId"
                    value={task.categoryId}
                    onChange={handleChange}
                    label="Category"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    label="Status"
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    label="Priority"
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {existingTask ? 'Update Task' : 'Add Task'}
                </Button>
                {existingTask && onCancelEdit && (
                    <Button variant="outlined" color="secondary" onClick={onCancelEdit} fullWidth>
                        Cancel
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default TaskForm;