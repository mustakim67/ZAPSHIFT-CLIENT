import {
  FaTruckMoving,
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaClock,
  FaHeadset,
} from 'react-icons/fa';

const services = [
  {
    title: 'Fast Delivery',
    description: 'Delivering packages quickly and reliably across the city.',
    icon: <FaShippingFast className="text-4xl text-primary" />,
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your delivery status live with real-time updates.',
    icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
  },
  {
    title: 'Secure Packaging',
    description: 'Your items are packed with care and handled professionally.',
    icon: <FaWarehouse className="text-4xl text-primary" />,
  },
  {
    title: 'Same-Day Delivery',
    description: 'Guaranteed delivery within the same day for select areas.',
    icon: <FaClock className="text-4xl text-primary" />,
  },
  {
    title: '24/7 Support',
    description: 'Our customer support team is always ready to assist you.',
    icon: <FaHeadset className="text-4xl text-primary" />,
  },
  {
    title: 'Fleet Management',
    description: 'Well-organized delivery system with trained drivers.',
    icon: <FaTruckMoving className="text-4xl text-primary" />,
  },
];

const OurServices = () => {
  return (
    <section className="py-16 px-[10%]">
      <div className="text-center bg-[#03373D] rounded-2xl p-10">
        <h2 className="text-4xl font-bold mb-4 text-white">Our Services</h2>
        <p className=" text-white mb-12  text-lg max-w-2xl mx-auto">
          At Profast, we provide reliable and efficient delivery solutions tailored to your needs.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="card shadow-xl  hover:bg-[#DAF7A6] transition-all bg-white"
            >
              <div className="card-body items-center text-center">
                {service.icon}
                <h3 className="card-title text-xl mt-4">{service.title}</h3>
                <p className="text-base-content">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
