import { GetCategoriesProps } from "@/types/data-types";

export const getSubCategory = (
  categories: GetCategoriesProps[],
  parentCategory: string
) =>
  categories.filter(({ ParentCategoryDescription }) =>
    ParentCategoryDescription.toLowerCase().includes(
      parentCategory.toLowerCase()
    )
  );
