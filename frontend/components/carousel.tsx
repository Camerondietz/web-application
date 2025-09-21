// components/Carousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = () => {
  return (
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    autoplay={{
      delay: 4500, // Time between slides (1000 =  seconds)
      disableOnInteraction: false, // Keep autoplay even when the user interacts with the carousel
    }}
    className="my-12 w-full max-w-6xl h-[400px] sm:h-[400px] md:h-[500px]" // Adjust height on different screen sizes
    >
      <SwiperSlide>
      <div className="relative">
      <img
            src="/carousel/chip-zoomed.avif"
            alt="Product 1"
            className="rounded-lg w-full object-cover h-[400px] md:h-[500px] shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded text-white z-10">
            <h3 className="text-xl font-bold">Semiconductor</h3>
            <p>Meeting the highest quality specifications.</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative">
          <img
            src="/carousel/2.avif"
            alt="Product 2"
            className="rounded-lg w-full object-cover h-[400px] md:h-[500px] shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded text-white">
            <h3 className="text-xl font-bold">Global Supply</h3>
            <p>Products wherever you need them.</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative">
          <img
            src="/carousel/jet.jpg"
            alt="Product 2"
            className="rounded-lg w-full object-cover h-[400px] md:h-[500px] shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded text-white">
            <h3 className="text-xl font-bold">Military and Aerospace</h3>
            <p>Going above and beyond.</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative">
          <img
            src="/carousel/automation.jpg"
            alt="Product 2"
            className="rounded-lg w-full object-cover h-[400px] md:h-[500px] shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded text-white">
            <h3 className="text-xl font-bold">Smart Factory</h3>
            <p>Optimize your network with smart diagnostics.</p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative">
          <img
            src="/carousel/robot.jpg"
            alt="Product 2"
            className="rounded-lg w-full object-cover h-[400px] md:h-[500px] shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded text-white">
            <h3 className="text-xl font-bold">Industrial Robotics</h3>
            <p>Keep your production moving.</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Add more SwiperSlide items as needed */}
    </Swiper>
  );
};

export default Carousel;
