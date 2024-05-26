import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, shadow }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/categories/${category.name.toLowerCase()}`)}
            style={{ 
                width: '18rem', 
                margin: 'auto', 
                boxShadow: shadow ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s', // Add hover effect
            }}
            className="category-card"
        >
            <div 
                className='rounded-lg w-full xl:h-[12rem] h-[11rem] flex items-center shadow-sm justify-center' 
                style={{ backgroundColor: category.bgColor }}
            >
                <div className='sm:space-y-2 space-y-3.5'>
                    {/* Img */}
                    <img
                        className='xl:h-[6rem] h-[5.5rem] m-auto'
                        src={category.img}
                        loading='lazy'
                        alt={category.name}
                        style={{ transition: 'opacity 0.5s ease-in-out', opacity: 1 }}
                    />

                    <div className='space-y-1'>
                        {/* Name */}
                        <h3 className='text-center text-xl capitalize font-semibold text-gray-700'>
                            {category.name}
                        </h3>

                       
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;
