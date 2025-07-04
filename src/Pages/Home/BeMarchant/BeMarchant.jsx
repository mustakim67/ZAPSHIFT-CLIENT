import React from 'react';
import location from '../../../assets/location-merchant.png'
import background from '../../../assets/be-a-merchant-bg.png'

const BeMarchant = () => {
    return (
        <div data-aos="flip-up" className='px-[10%]' >
             <div  className="rounded-4xl bg-[#03373D] bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-content flex-col lg:flex-row-reverse p-20">
                <img
                    src={location}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div className='text-white'>
                    <h1 className="text-4xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn btn-outline btn-accent mr-5 text-white rounded-xl">Become a Marchant</button>
                    <button className="btn btn-outline btn-accent text-white rounded-xl">Earn With Profast</button>
                </div>
            </div>
        </div> 
        </div>
      
    );
};

export default BeMarchant;