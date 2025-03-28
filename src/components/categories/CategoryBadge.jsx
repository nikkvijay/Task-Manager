
import React from 'react';
import '../../styles/categories.css';

const CategoryBadge = ({ category }) => {
    // Fallback for invalid category
    if (!category || !category.name || !category.color) {
        return (
            <span className="category-badge uncategorized">
                Uncategorized
            </span>
        );
    }

    return (
        <span
            className="category-badge"
            style={{
                backgroundColor: category.color,
                color: getContrastColor(category.color), // Dynamic text color for readability
            }}
        >
            {category.name}
        </span>
    );
};

// Helper function to determine readable text color based on background
const getContrastColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate luminance (simplified YIQ formula)
    const luminance = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white based on luminance
    return luminance > 128 ? '#000000' : '#ffffff';
};

export default CategoryBadge;