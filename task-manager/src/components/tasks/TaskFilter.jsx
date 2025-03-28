import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    useTheme,
    useMediaQuery,
} from '@mui/material';

const TaskFilter = ({ filter, setFilter }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: 2,
            }}
        >
            <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                    value={filter.status}
                    label="Status"
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                    value={filter.priority}
                    label="Priority"
                    onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                >
                    <MenuItem value="all">All Priorities</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
            </FormControl>

            <TextField
                type="date"
                label="Due Date"
                value={filter.dueDate}
                onChange={(e) => setFilter({ ...filter, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />
        </Box>
    );
};

export default TaskFilter;