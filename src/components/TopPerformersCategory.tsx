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
import { sortArray } from "@/utils/sort-array";
import Loading from "./Loading";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";

interface props {
  title: string;
  link: string;
  id: number;
}

const Events: React.FC<props> = ({ title, link, id }) => {
  const { images } = useDataContext();
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
  const [performerImages, setPerformerImages] = useState<Array<string | null>>(
    []
  );
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

  useEffect(() => {
    setLoading(true);
    if (images.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const Description = data[i].Description;
        let itHasImage: string | null = null;
        for (let j = 0; j < images.length; j++) {
          const el = images[j];
          if (i === data.length - 1 && j === images.length - 1)
            setLoading(false);
          if (Description.toLowerCase().includes(el[1].toLowerCase())) {
            itHasImage = el[2];
            break;
          }
        }
        setPerformerImages((state) => [...state, itHasImage]);
      }
    }
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
            {sortArray(
              removeDuplicatedElements(data, "Description"),
              "Percent"
            ).map(({ Description, ID }, i) => (
              <SwiperSlide key={ID}>
                <div className="position-relative overlay up">
                  <Image
                    src={performerImages[i] || DefaultImage}
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
        )}
      </div>
    </section>
  );
};

export default Events;
