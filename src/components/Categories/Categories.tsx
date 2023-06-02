import Link from "next/link";
import { GetCategoriesProps } from "../../types/data-types";
import { convertTitleToPath } from "@/utils/title-to-pathname";

const Categories: React.FC<{ categories: GetCategoriesProps[] }> = ({
  categories,
}) => {
  return (
    <section className="d-none d-lg-block">
      <ul className="nav nav-pills justify-content-between">
        {categories.map(({ ChildCategoryDescription, ChildCategoryID }) => (
          <li key={ChildCategoryID} className="nav-item">
            <Link
              className="nav-link link-info fw-semibold text-capitalize"
              href={`/category/${convertTitleToPath(
                ChildCategoryDescription
              )}`}>
              {ChildCategoryDescription.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
