import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    Collapse,
    Button,
    Divider,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { deleteTask } from '../../store/features/taskSlice';
import TaskFilter from './TaskFilter';
import TaskForm from './TaskForm';

const TaskList = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const categories = useSelector((state) => state.categories.categories);
    const [filter, setFilter] = useState({ status: 'all', priority: 'all', dueDate: '' });
    const [editingTask, setEditingTask] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);

    const filteredTasks = tasks.filter((task) => (
        (filter.status === 'all' || task.status === filter.status) &&
        (filter.priority === 'all' || task.priority === filter.priority) &&
        (!filter.dueDate || task.dueDate === filter.dueDate)
    ));

    const tasksByCategory = categories.reduce((acc, category) => {
        acc[category.id] = filteredTasks.filter((task) => task.categoryId === category.id);
        return acc;
    }, {});
    const uncategorizedTasks = filteredTasks.filter((task) => !task.categoryId);

    const handleDeleteTask = (taskId) => dispatch(deleteTask(taskId));

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return theme.palette.error.main;
            case 'medium': return theme.palette.warning.main;
            case 'low': return theme.palette.success.main;
            default: return theme.palette.text.secondary;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return theme.palette.success.main;
            case 'in-progress': return theme.palette.warning.main;
            case 'pending': return theme.palette.error.main;
            default: return theme.palette.text.secondary;
        }
    };

    return (
        <Box>
            <TaskFilter filter={filter} setFilter={setFilter} />
            <Box sx={{ mt: 4 }}>
                {categories.map((category) => {
                    const categoryTasks = tasksByCategory[category.id] || [];
                    if (!categoryTasks.length) return null;
                    const isExpanded = expandedCategory === category.id;

                    return (
                        <Card key={category.id} sx={{ mb: 3, overflow: 'visible' }}>
                            <CardContent sx={{ p: 0 }}>
                                <Button
                                    fullWidth
                                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                                    sx={{
                                        justifyContent: 'space-between',
                                        p: 2,
                                        color: 'text.primary',
                                        '&:hover': { bgcolor: 'background.default' },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Chip
                                            label={category.name}
                                            sx={{
                                                bgcolor: category.color,
                                                color: 'white',
                                                fontWeight: 500,
                                            }}
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                            ({categoryTasks.length})
                                        </Typography>
                                    </Box>
                                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </Button>
                                <Collapse in={isExpanded}>
                                    <Divider />
                                    <Box sx={{ p: 2 }}>
                                        {categoryTasks.map((task) => (
                                            <Box
                                                key={task.id}
                                                sx={{
                                                    p: 2,
                                                    mb: 2,
                                                    bgcolor: 'background.default',
                                                    borderRadius: 2,
                                                    '&:last-child': { mb: 0 },
                                                }}
                                            >
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: isMobile ? 'flex-start' : 'center',
                                                    flexDirection: isMobile ? 'column' : 'row',
                                                    gap: 2,
                                                }}>
                                                    <Box>
                                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                                            {task.title}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                            <Chip
                                                                size="small"
                                                                label={task.status}
                                                                sx={{ bgcolor: getStatusColor(task.status), color: 'white' }}
                                                            />
                                                            <Chip
                                                                size="small"
                                                                label={task.priority}
                                                                sx={{ bgcolor: getPriorityColor(task.priority), color: 'white' }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => setEditingTask(task)}
                                                            sx={{ color: theme.palette.primary.main }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDeleteTask(task.id)}
                                                            sx={{ color: theme.palette.error.main }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Collapse>
                            </CardContent>
                        </Card>
                    );
                })}

                {uncategorizedTasks.length > 0 && (
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Uncategorized ({uncategorizedTasks.length})
                            </Typography>
                            {uncategorizedTasks.map((task) => (
                                <Box
                                    key={task.id}
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        bgcolor: 'background.default',
                                        borderRadius: 2,
                                        '&:last-child': { mb: 0 },
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: isMobile ? 'flex-start' : 'center',
                                        flexDirection: isMobile ? 'column' : 'row',
                                        gap: 2,
                                    }}>
                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {task.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                <Chip
                                                    size="small"
                                                    label={task.status}
                                                    sx={{ bgcolor: getStatusColor(task.status), color: 'white' }}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={task.priority}
                                                    sx={{ bgcolor: getPriorityColor(task.priority), color: 'white' }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => setEditingTask(task)}
                                                sx={{ color: theme.palette.primary.main }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteTask(task.id)}
                                                sx={{ color: theme.palette.error.main }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {filteredTasks.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                            No tasks found.
                        </Typography>
                    </Box>
                )}
            </Box>

            {editingTask && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <TaskForm existingTask={editingTask} onCancelEdit={() => setEditingTask(null)} />
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default TaskList;