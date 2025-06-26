import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Features from '../Features/Features';
import BeMarchant from '../BeMarchant/BeMarchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Features></Features>
            <BeMarchant></BeMarchant>
        </div>
    );
};

export default Home;