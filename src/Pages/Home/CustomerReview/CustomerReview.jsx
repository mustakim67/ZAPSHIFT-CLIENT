import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
    {
        name: 'Awlad Hossin',
        title: 'Senior Product Designer',
        text: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
    },
    {
        name: 'Rasel Ahamed',
        title: 'CTO',
        text: 'A posture corrector helps you sit straighter, aligning your spine and preventing slouching during work or daily activities.',
    },
    {
        name: 'Nasir Uddin',
        title: 'CEO',
        text: 'Daily use of a posture corrector ensures improved spinal health and reduces back pain caused by poor posture.',
    },
    {
        name: 'Jannatul Ferdous',
        title: 'Product Manager',
        text: 'Using a posture corrector has been a game-changer for my back pain and comfort during long meetings.',
    },
    {
        name: 'Tanvir Rahman',
        title: 'UX Researcher',
        text: 'Proper alignment of the back boosts confidence and productivity—this tool helps you achieve that.',
    },
    {
        name: 'Nusrat Jahan',
        title: 'Developer',
        text: 'Perfect for remote workers—encourages healthy habits while sitting all day.',
    },
    {
        name: 'Sakib Hossain',
        title: 'Marketing Lead',
        text: 'Posture Pro helped reduce my neck strain and improved my mood after long work hours.',
    },
];

const CustomerReview = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="bg-[#F3F8F6] py-14 px-[10%] text-center relative">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-4">
                What our customers are sayings
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-10">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment,
                reduce pain, and strengthen your body with ease!
            </p>

            {/* Swiper Carousel */}
            <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                loop
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                pagination={{
                    el: '.custom-pagination',
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.next-btn',
                    prevEl: '.prev-btn',
                }}
                onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="w-full max-w-6xl mx-auto"
            >
                {testimonials.map((t, idx) => (
                    <SwiperSlide
                        key={idx}
                        className={`transition-all duration-300 ease-in-out max-w-md mx-auto rounded-xl p-8 bg-white shadow-md
              ${idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}`}
                        style={{
                            width: '340px',
                            height: '420px',
                        }}
                    >
                        <p className="text-left text-gray-600 mb-6 text-base leading-relaxed">
                            <span className="text-3xl text-[#B6D63C]">“</span>
                            {t.text}
                        </p>
                        <div className="text-left border-t pt-4">
                            <h4 className="font-semibold text-[#03373D]">{t.name}</h4>
                            <p className="text-sm text-gray-500">{t.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Arrows + Dots (centered together) */}
            <div className="flex flex-col items-center gap-4 mt-10">
                <div className="flex items-center justify-center gap-4">
                    <button className="prev-btn bg-[#B6D63C] text-white border rounded-full p-2 shadow btn">
                        <ChevronLeft size={20} />
                    </button>

                    <div className="custom-pagination flex gap-2 border-gray-300 " />

                    <button className="next-btn bg-[#B6D63C] text-white border rounded-full p-2 shadow hover:opacity-90 btn">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CustomerReview;
