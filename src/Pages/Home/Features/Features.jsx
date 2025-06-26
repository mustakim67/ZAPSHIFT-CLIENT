import tracking from "../../../assets/live-tracking.png";
import delivery from "../../../assets/delivery-van.png";
import support from "../../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: delivery,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const Features = () => {
  return (
    <section className="py-16 ">
      <div className=" mx-auto px-[10%] space-y-6">
        <h1 className="text-xl md:text-3xl text-center font-bold mb-10 mt-5">Why Choose Us ?</h1>
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center p-6 rounded-xl shadow-sm gap-6 bg-white py-15"
          >
            {/* Left Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img src={item.image} alt={item.title} className="h-32 w-auto object-contain" />
            </div>

            {/* Vertical Divider for medium+ screens */}
            <div className="hidden md:block h-24 w-px bg-base-content/20 border-dashed border-l" />

            {/* Right Content */}
            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
              <p className="text-base-content">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
