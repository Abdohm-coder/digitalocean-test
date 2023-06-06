import React, { useRef, useState, useEffect } from "react";
import { Swiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { fetchHighInventoryPerformers } from "@/settings/site.settings";
import { GetHighInventoryPerformersProps } from "@/types/data-types";
import { sortArray } from "@/utils/sort-array";
import Loading from "./Loading";
import SlideImage from "./SlideImage";

interface props {
  title: string;
  link: string;
  id: number;
}

const Events: React.FC<props> = ({ title, link, id }) => {
  const [loading, setLoading] = useState(true);

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

  const [data, setData] = useState<GetHighInventoryPerformersProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHighInventoryPerformers({
          // numReturned: 12,
          parentCategoryID: id,
        });
        setLoading(false);
        setData(response || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <section className="pt-5">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fw-bold">{title}</h3>
        <a href={link} className="text-decoration-none link-primary">
          VIEW ALL
        </a>
      </div>
      <div className="mt-3 position-relative">
        {loading ? (
          <Loading />
        ) : (
          <Swiper
            spaceBetween={25}
            breakpoints={breakpoints}
            // modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}>
            {sortArray(data, "Percent").map(({ Description, ID }) => (
              <SlideImage key={ID} Description={Description} ID={ID} />
            ))}
          </Swiper>
        )}
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
