import Link from "next/link";
import React from "react";

interface props {
  title: string;
}

const Hero: React.FC<props> = ({ title }) => {
  return (
    <section className="bg-info">
      <div className="container-lg pt-5 pb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-2">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li
              className="breadcrumb-item active text-gray text-capitalize"
              aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <h2 className="text-white text-capitalize">{title} Tickets</h2>
      </div>
    </section>
  );
};

export default Hero;
