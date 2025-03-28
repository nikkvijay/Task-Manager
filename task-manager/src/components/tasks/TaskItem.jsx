
import React from 'react';
import { useSelector } from 'react-redux';
import CategoryBadge from '../categories/CategoryBadge';

const TaskItem = ({ task }) => {
    const categories = useSelector(state => state.categories.categories);
    const category = categories.find(cat => cat.id === task.categoryId);

    return (
        <div className="task-item">
            <span>{task.title}</span>
            {category && <CategoryBadge category={category} />}
        </div>
    );
};

export default TaskItem;