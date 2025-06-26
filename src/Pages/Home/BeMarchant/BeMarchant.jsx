import React from 'react';
import location from '../../../assets/location-merchant.png'

const BeMarchant = () => {
    return (
        <div className='px-[10%]'>
             <div className="hero bg-[#03373D] rounded-4xl">
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
                    <button className="btn btn-outline btn-accent text-white rounded-xl">Earnh With Profast</button>
                </div>
            </div>
        </div> 
        </div>
      
    );
};

export default BeMarchant;