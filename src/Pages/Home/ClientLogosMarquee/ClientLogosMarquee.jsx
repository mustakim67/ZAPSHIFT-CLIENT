import Marquee from "react-fast-marquee";

// Import logos
import company1 from "../../../assets/brands/amazon.png";
import company2 from "../../../assets/brands/casio.png";
import company3 from "../../../assets/brands/moonstar.png";
import company4 from "../../../assets/brands/randstad.png";
import company5 from "../../../assets/brands/start-people 1.png";
import company6 from "../../../assets/brands/start.png";
import company7 from "../../../assets/brands/amazon_vector.png";

const logos = [company1, company2, company3, company4, company5,company6,company7];

const ClientLogosMarquee = () => {
  return (
    <section className="py-10 px-[10%]">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-15 text-[#03373D]">We've helped thousands of sales teams</h2>

      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        direction="left"
        className="space-x-10"
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-6">
            <img
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-4 md:h-6 w-auto object-contain mr-18"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientLogosMarquee;
