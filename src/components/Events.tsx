import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";

interface props {
  title: string;
  count: number;
  link: string;
  top_events: {
    event_title: string;
    event_link: string;
    event_image_src: string;
  }[];
}

const Events: React.FC<props> = ({ title, count, link, top_events }) => {
  const swiperRef = useRef<SwiperType>();
  const breakpoints = {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
  };
  const [isStart, setIsStart] = useState(true);
  const [isLast, setIsLast] = useState(false);
  function sliderChange(swiper: SwiperType) {
    setIsStart(swiper.isBeginning);
    setIsLast(swiper.isEnd);
  }
  return (
    <section className="pt-5">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fw-bold">{title}</h3>
        <a href={link} className="text-decoration-none link-primary">
          VIEW ALL
        </a>
      </div>
      <div className="mt-3 position-relative">
        <Swiper
          spaceBetween={25}
          breakpoints={breakpoints}
          // modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={sliderChange}>
          {top_events.map(({ event_title, event_image_src, event_link }, i) => (
            <SwiperSlide key={i}>
              <div className="position-relative overlay up">
                <Image
                  src={event_image_src}
                  alt={event_title}
                  className="w-100 object-cover"
                  width={300}
                  height={300}
                />
                <h5 className="position-absolute start-0 bottom-0 text-white text-uppercase fw-bold m-3">
                  {event_title}
                </h5>
                <Link href={event_link} className="stretched-link"></Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <button
          className="btn btn-sm btn-light shadow-sm rounded-circle p-2 position-absolute top-50 start-0 translate-middle"
          style={{ zIndex: 1 }}
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isStart}
        >
          <BsChevronLeft className="fs-4" />
        </button>
        <button
          className="btn btn-sm btn-light shadow-sm rounded-circle p-2 position-absolute top-50 start-100 translate-middle"
          style={{ zIndex: 1 }}
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isLast}
        >
          <BsChevronRight className="fs-4" />
        </button> */}
      </div>
    </section>
  );
};

export default Events;
