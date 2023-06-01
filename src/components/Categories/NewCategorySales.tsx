import React from "react";
import EventImage from "../../assets/images/event.webp";
import { GetPerfomerByCategoryProps } from "../../types/data-types";
import { convertTitleToPath } from "../../utils/title-to-pathname";
import Link from "next/link";
import Image from "next/image";

const NewCategorySales: React.FC<{
  performers: GetPerfomerByCategoryProps[];
  title: string;
}> = ({ performers, title }) => {
  return (
    <section className="mt-3">
      <h3 className="fw-bold text-capitalize">{title}</h3>
      <div className="d-flex overflow-auto flex-lg-wrap">
        {performers.map(({ ID, Description }) => (
          <div key={ID} className="col-6 col-md-4 col-lg-3 p-1">
            <div className="position-relative overlay up">
              <Image src={EventImage} alt={`Image ${ID}`} height={200} className="w-100 object-cover" />
              <h5 className="position-absolute start-0 bottom-0 text-white text-uppercase fw-bold m-3">
                {Description}
              </h5>
              <Link
                href={`/performers/${convertTitleToPath(Description)}`}
                className="stretched-link"></Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewCategorySales;
