import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DefaultImage from "@/assets/images/default.jpg";
import { SwiperSlide } from "swiper/react";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDataContext } from "@/context/data.context";
import "swiper/css";
import "swiper/css/navigation";

const SlideImage: React.FC<{
  ID: number;
  Description: string;
}> = ({ ID, Description }) => {
  const [performerImage, setPerformerImage] = useState<string | null>(null);
  const { images } = useDataContext();

  useEffect(() => {
    let isThereImage = false;
    images.forEach((el) => {
      console.log(Description, el[1]);
      if (Description.toLowerCase().includes(el[1].toLowerCase())) {
        setPerformerImage(el[2]);
        isThereImage = true;
      }
    });
    if (!isThereImage) setPerformerImage(null);
  }, [images, Description]);
  return (
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
  );
};

export default SlideImage;
