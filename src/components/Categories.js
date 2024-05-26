import React from 'react';
import CategoryCard from '../components/CategoryCard';
import vegetables from "../assets/categories/vagetable.png";
import fruits from "../assets/categories/fruits.png";
import grains from "../assets/categories/grains.png";
import fert from '../assets/categories/fertilizer.png'
const AllCategories = () => {
    // Scrolling Bug Fixed
    window.scrollTo({ top: 0 });

    return (
        <main className='min-h-screen space-y-5 pt-20 mb-9'>
            <div className='xl:space-y-10 sm:space-y-8 space-y-6'>
                {/* Title */}
                <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
                    All Categories
                </h1>
                {/* All Category Cards */}
                <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5'>
                    {[
                        
                        { id: 0, name: 'Vegetables', img: vegetables, bgColor: '#F5F5F5' },
                        { id: 1, name: 'Fruits', img: fruits, bgColor: '#EAF5E3' },
                        { id: 2, name: 'Grains', img: grains, bgColor: '#FAF9D7' },
                        {id: 3, name: 'Fertilizer', img: fert, bgColor: '#FAF9D7' }
                    ].map(category => (
                        <CategoryCard
                            key={category.id}
                            shadow={true}
                            category={category}
                        />
                    ))}
                </section>
            </div>
        </main>
    );
};

export default AllCategories;
