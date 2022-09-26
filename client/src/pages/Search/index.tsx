import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Loading } from "../../components";
import { Breadcrumb } from "../../components/Breadcrumb";
import { ICardData } from "../../components/Card/card.props";
import { useGetList } from "./search.hooks";

export const Search = () => {
  const location = useLocation();
  const pathname = location.search;
  const [category, setCategory] = useState<any>({});

  const {
    data,
    isLoading,
    isFetched,
    refetch: refetchGetList,
  } = useGetList(pathname);

  useEffect(() => {
    refetchGetList();
  }, [isFetched, refetchGetList, pathname]);

  useEffect(() => {
    if (!isLoading) {
      const categoryWithMostResolutes = data.categories.map(
        (results: any) => results.results
      );

      const maxResultsCategory = Math.max(...categoryWithMostResolutes);

      const searchCategory = data.categories.find(
        (category: any) => category.results === maxResultsCategory
      );

      setCategory(searchCategory);
    }
  }, [data, isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Breadcrumb
            links={{
              label: category?.name,
              to: `/categories/${category?.id}`,
            }}
          />
          <div className="items_container_pages">
            {data.items.map((cardData: ICardData) => (
              <Card key={cardData.id} data={cardData} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
