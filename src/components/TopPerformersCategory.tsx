import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDataContext } from "@/context/data.context";
import DefaultImage from "@/assets/images/default.jpg";
import { sortArray } from "@/utils/sort-array";
import Loading from "./Loading";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";
import useSWR from "swr";
import axios from "axios";

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

  const { data, error } = useSWR(
    `high_inventory-${id}`,
    async () => {
      try {
        const response = await axios.post(
          "/api/GetHighInventoryPerformers",
          { parentCategoryID: id },
          {
            onDownloadProgress: (progressEvent) => {
              let percentCompleted = progressEvent.total
                ? Math.floor((progressEvent.loaded / progressEvent.total) * 100)
                : null;
              console.log(percentCompleted);
            },
          }
        );
        const data =
          response.data.GetHighInventoryPerformersResult.PerformerPercent;
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000 * 24, // Refresh every 24 hour
    }
  );
  const [performerImages, setPerformerImages] = useState<Array<string | null>>(
    []
  );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchHighInventoryPerformers({
  //         // numReturned: 12,
  //         parentCategoryID: id,
  //       });
  //       setLoading(false);
  //       setData(response || []);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  console.log("error", error);

  useEffect(() => {
    if (images && images.length > 0 && data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const Description = data[i].Description;
        let itHasImage: string | null = null;
        for (let j = 0; j < images.length; j++) {
          const el = images[j];
          if (Description.toLowerCase().includes(el[1].toLowerCase())) {
            itHasImage = el[2];
            break;
          }
        }
        setPerformerImages((state) => [...state, itHasImage]);
      }
    }
    console.log(data);
  }, [data, images]);

  console.log("performerImages:", performerImages);
  return (
    <section className="pt-5">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fw-bold">{title}</h3>
        <Link href={link} className="text-decoration-none link-primary">
          VIEW ALL
        </Link>
      </div>
      <div className="mt-3 position-relative">
        {!data && !error ? (
          <Loading />
        ) : (
          <Swiper
            spaceBetween={25}
            breakpoints={breakpoints}
            // modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}>
            {Array.isArray(data) &&
              sortArray(
                removeDuplicatedElements(data, "Description"),
                "Percent"
              ).map(({ Description, ID }, i) => (
                <SwiperSlide key={ID}>
                  <div className="position-relative overlay up">
                    <Image
                      loading="lazy"
                      src={performerImages[i] || DefaultImage}
                      alt={`${Description} image`}
                      className="w-100 object-cover"
                      width={1200}
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
