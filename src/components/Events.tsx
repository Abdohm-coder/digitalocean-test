import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchHighInventoryPerformers } from "@/settings/site.settings";
import { GetHighInventoryPerformersProps } from "@/types/data-types";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDataContext } from "@/context/data.context";
import DefaultImage from "@/assets/images/default.jpg";

interface props {
  title: string;
  link: string;
  id: number;
}

const Events: React.FC<props> = ({ title, link, id }) => {
  const { images } = useDataContext();

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
  const [performerImage, setPerformerImage] = useState<string | null>(null);
  const [data, setData] = useState<GetHighInventoryPerformersProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHighInventoryPerformers({
          // numReturned: 12,
          parentCategoryID: id,
        });
        setData(response || []);
        console.log(response || []);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    images.forEach((el) => {
      data.forEach(({ Description }) => {
        if (Description.toLowerCase().includes(el[1].toLowerCase()))
          setPerformerImage(el[2]);
      });
    });
  }, [data, images]);
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
          {data.map(({ Description, ID }) => (
            <SwiperSlide key={ID}>
              <div className="position-relative overlay up">
                <Image
                  src={performerImage || DefaultImage}
                  alt={`${Description} image`}
                  className="w-100 object-cover"
                  width={300}
                  height={300}
                />
                <h5 className="position-absolute start-0 bottom-0 text-white text-uppercase fw-bold m-3">
                  {Description}
                </h5>
                <Link
                  href={`/performers/${convertTitleToPath(Description)}`}
                  className="stretched-link"></Link>
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
