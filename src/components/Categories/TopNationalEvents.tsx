import { useState, useEffect } from "react";
import DefaultImage from "@/assets/images/default.jpg";
import { convertTitleToPath } from "../../utils/title-to-pathname";
import Link from "next/link";
import Image from "next/image";
import { useDataContext } from "@/context/data.context";

const TopNationalEvents: React.FC<{
  name: string;
}> = ({ name }) => {
  const { images } = useDataContext();
  const [performerImage, setPerformerImage] = useState<string | null>(null);
  useEffect(() => {
    let isThereImage = false;
    images.forEach((el) => {
      if (name.toLowerCase().includes(el[1].toLowerCase())) {
        setPerformerImage(el[2]);
        isThereImage = true;
      }
    });
    if (!isThereImage) setPerformerImage(null);
  }, [name, images]);

  return (
    <div className="col-6 col-md-4 col-lg-3 p-1">
      <div className="position-relative overlay up">
        <Image
          src={performerImage || DefaultImage}
          alt={`${name} image`}
          height={200}
          width={1200}
          className="w-100 object-cover object-img"
        />
        <h5 className="position-absolute start-0 bottom-0 text-white text-uppercase fw-bold m-3">
          {name}
        </h5>
        <Link
          href={`/performers/${convertTitleToPath(name)}`}
          className="stretched-link"></Link>
      </div>
    </div>
  );
};

export default TopNationalEvents;
