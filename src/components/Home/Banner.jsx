import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="h-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              Report Issues Easily
            </h1>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="h-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              Track Progress in Real-Time
            </h1>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="h-full flex items-center justify-center bg-gradient-to-r from-yellow-400 to-red-500 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              Boost Priority with Subscription
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
