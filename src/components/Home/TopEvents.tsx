import React from "react";
import EventImage from "../../assets/images/event.webp";
import EventImage2 from "../../assets/images/event2.png";
import EventImage3 from "../../assets/images/event3.png";
import Link from "next/link";
import Image from "next/image";
interface props {
  title: string;
  count: number;
}

const TopEvents: React.FC<props> = ({ title, count }) => {
  const images = [EventImage, EventImage2, EventImage3];
  return (
    <section className="pt-5">
      <h3 className="text-danger">{title}</h3>
      <div className="row mt-3 g-0">
        {Array(count)
          .fill("")
          .map((_, i) => (
            <div
              key={`element: ${i}`}
              className="col-12 col-md-6 col-lg-4 position-relative overlay">
              <Image
                src={images[i]}
                alt="image"
                width={840}
                height={540}
                className="w-100 h-100 object-cover"
              />
              <div
                className="position-absolute top-0  py-2 px-3 rounded-bottom ms-3 text-white fs-2 fw-bold"
                style={{ backgroundColor: "#000000B4" }}>
                0{i + 1}
              </div>
              <div className="w-100 position-absolute bottom-0 d-flex justify-content-between align-items-end p-3 text-white">
                <div>
                  <h6 className="fw-bold">
                    Duke Blue Devils at North Carolina Tar Heels Basketball
                  </h6>
                  <p className="small m-0">Dean Smith Center</p>
                  <p className="small m-0">Chapel Hill, NC</p>
                </div>
                <div className="flex-shrink-0 text-end">
                  <Link
                    href="/event"
                    className="btn btn-sm btn-primary text-white rounded-pill">
                    GET TICKET
                  </Link>
                  <p className="small text-primary mb-0 mt-1 fw-semibold">
                    Sat, Mar 04 • 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TopEvents;
