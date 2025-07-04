import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Features from '../Features/Features';
import BeMarchant from '../BeMarchant/BeMarchant';
import CustomerReview from '../CustomerReview/CustomerReview';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurServices></OurServices>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Features></Features>
            <BeMarchant></BeMarchant>
            <CustomerReview></CustomerReview>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;