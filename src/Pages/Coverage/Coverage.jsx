import { useState } from 'react';
import CoverageMap from './CoverageMap';

const Coverage = () => {
  const [search, setSearch] = useState('');

  return (
    <section className="bg-white rounded-xl px-[10%] py-20">
      <h2 className="text-3xl md:text-5xl font-bold my-3">
        We are available in all 64 districts
      </h2>

      <div className="my-10">
        <input
          type="text"
          className="input input-bordered w-full max-w-md rounded-2xl"
          placeholder="Search Service Center"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr className='text-gray-400 mb-10' />
       <h2 className="text-3xl font-semibold my-8">
      We deliver almost all over Bangladesh
      </h2>


      <CoverageMap searchQuery={search} />
    </section>
  );
};

export default Coverage;
