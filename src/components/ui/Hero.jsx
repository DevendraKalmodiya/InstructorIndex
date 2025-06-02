import React from 'react'
import { Search, User, SquareUser, Award } from 'lucide-react';
import HeroImg from '../../assets/HeroImg.png';
import CountUp from 'react-countup';
import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <div className='bg-slate-800 pt-14' >

            <div className='lg:h-[700px] max-w-7x1 max-auto flex md:flex-row flex-col gap-10 item-centre'>
                {/* text-section */}
                <div className='space-y-7 px-4 md:px-0'>
                  
                    <h1 className="text-4xl mt-10 md:mt md:text-6x1 font-extrabold text-gray-200">Explore our <span className='text-blue-500'>14000+</span><br />
                        Online courses for all</h1>

                    <p className='text-gray-300 text-lg'> 🎓 Empowering Learners, Shaping Futures.
                        💡 Learn anytime, anywhere – with content that counts.</p>
                    <div className='inline-flex relative'>
                        <input type="text" placeholder='Seach Your Course Here...' className=' bg-gray-200 w-[350px] md:w-[450px] text-gray-800 p-4 pr-40 rounded-lg rounded-r-xl placeholder:text-gray-500' />
                        <button className='px-4 py-[14px] flex gap-1 items-centre bg-blue-500 font-semibold absolute right-0 text-white rounded-r-lg text-xl'>Search <Search width={20} height={20}></Search></button>
                    </div>
                </div>
                {/* image-section */}
                <div className='flex md:h-[700px] items-end relative px-4 md:px-0'>
                     <img src={HeroImg} alt="" className='w-[690px]  shadow-blue-500 drop-shadow-lg ' />
                
                    <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[35%] right-0 px-4 py-2'>
                        <div className='rounded-full bg-blue-400 p-2 text-white'>
                        <User /> 
                        </div>
                        <div> 
                            <h2 className='font-bold text-2xl'><CountUp end={4500} />+</h2>
                            <p className='italic text-sm text-gray-600 leading-none'>Active Students</p>
                        </div>
                    </div>
                    <div className='bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[15%] left-8 px-4 py-2'>
                        <div className='rounded-full bg-blue-400 p-2 text-white'>
                            <Award />
                        </div>
                        <div>
                            <h2 className='font-bold text-2xl'><CountUp end={684} />+</h2>
                            <p className='italic text-sm text-gray-600 leading-none'>Certified Students</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Hero 