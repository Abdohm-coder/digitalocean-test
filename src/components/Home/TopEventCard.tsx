import { GetEventsProps } from "@/types/data-types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useDataContext } from "@/context/data.context";
import DefaultImage from "@/assets/images/default.jpg";
dayjs.extend(LocalizedFormat);

const TopEventCard = ({ ID, Name, Venue, City, Date }: GetEventsProps) => {
  const [eventImage, setEventImage] = useState<string | null>(null);
  const { images } = useDataContext();
  useEffect(() => {
    let isThereImage = false;
    images.forEach((el) => {
      console.log(el);
      if (el[1].toLowerCase().includes(Name.toLowerCase()))
        {setEventImage(el[2]); isThereImage = true}
    });
    if(!isThereImage) setEventImage(null)
  }, [Name, images]);

  return (
    <div
      key={`top event: ${ID}`}
      className="col-12 col-md-6 col-lg-4 position-relative overlay">
      <Image
        src={eventImage ?? DefaultImage}
        alt="image"
        width={840}
        height={540}
        className="w-100 h-100 object-cover rounded-img"
      />
      <div className="w-100 position-absolute bottom-0 d-flex justify-content-between align-items-end p-3 text-white">
        <div>
          <h6 className="fw-bold">{Name}</h6>
          <p className="small m-0">{Venue}</p>
          <p className="small m-0">{City}</p>
        </div>
        <div className="flex-shrink-0 text-end">
          <a
            href={`/tickets/${ID}`}
            className="btn btn-sm btn-primary text-white rounded-pill">
            GET TICKET
          </a>
          <p className="small text-primary mb-0 mt-1 fw-semibold">
            {dayjs(Date).format("llll")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopEventCard;
