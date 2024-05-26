import React from 'react';
import animation from '../assets/animations/aboutUsAnimation.gif'

const About = () => {
   
  return (
    <>
    
    <div className=" bg-[#E9ECE6] min-h-screen pt-0 px-2 flex items-center sm:px-6 lg:px-8 mt-[65px] ">
            <div className="max-w-5xl pb-5 container mx-auto ">
                <div className="lg:grid md:grid-cols-2">
                    {/* Animation */}
                    <div  className=' col flex order-last justify-center'>
                        <img
                            className='xl:h-[30rem] lg:h-[28rem] md:h-[22rem] h-[17.5rem]'
                            src={animation}
                            alt="about_us" />
                    </div>
                    <div className="xl:space-y-7 lg:space-y-5 md:space-y-7 space-y-5 sm:mt-0 sm:px-0">
                        {/* Title */}
                        <h2 className=" text-2xl font-semibold text-gray-800">
                            Welcome to Our Grocery App
                        </h2>
                        {/* Article */}
                        <p className="font-times text-[15px] text-justify   text-gray-600">
                            At <strong>Grocery</strong>, we are committed to providing you with the freshest
                            and highest quality products for your everyday needs.
                            Our extensive range includes fresh
                            vegetables, succulent meats, dairy products, pantry essentials, and much more. We carefully
                            select our suppliers to ensure that you receive only the best.<br /><br />

                            With our user-friendly interface and reliable delivery service, grocery shopping has never been
                            easier. Simply browse our wide selection, add items to your cart, and enjoy the convenience of
                            doorstep delivery. Say goodbye to long supermarket queues and heavy bags.<br /><br />

                            We take pride in our commitment to exceptional customer service. Our dedicated support team is
                            always ready to assist you with any questions or concerns you may have. Your satisfaction is our
                            top priority.<br /><br />

                            Experience the convenience and joy of shopping from the comfort of your home. Join us at <strong>Grocery</strong> and discover a new way to grocery shop.<br /><br />

                            Start shopping now and make your everyday life healthier and more convenient.
                        </p>
                        <div className="mt-6">
                        </div>
                    </div>
                </div>
            </div>
    </div >
    </>
    
    
  )
}

export default About;