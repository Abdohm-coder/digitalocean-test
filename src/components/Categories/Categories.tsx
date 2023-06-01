import Link from "next/link";
import { GetCategoriesProps } from "../../types/data-types";

const Categories: React.FC<{ categories: GetCategoriesProps[] }> = ({
  categories,
}) => {
  // const [sub_categories] = useState<string[]>([
  //   "Pop",
  //   "Rock",
  //   "Country",
  //   "Hip-Hop",
  //   "Festivals",
  //   "Latin",
  //   "Las Vegas",
  //   "EDM",
  //   "Religious",
  //   "R&B",
  // ]);
  return (
    <section className="d-none d-lg-block">
      <ul className="nav nav-pills justify-content-between">
        {categories.map(({ ChildCategoryDescription, ChildCategoryID }) => (
          <li key={ChildCategoryID} className="nav-item">
            <Link
              className="nav-link link-info fw-semibold text-capitalize"
              href={`/category/${ChildCategoryDescription}-tickets`}>
              {ChildCategoryDescription}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
