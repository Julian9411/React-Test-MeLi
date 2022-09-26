import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Loading } from "../../components";
import { Breadcrumb } from "../../components/Breadcrumb";
import { IBreadcrumbData } from "../../components/Breadcrumb/breadcrumb.props";
import { formatNumbers } from "../../utils/formatNumber";
import { useGetItemDescription } from "./itemDescription.hooks";

export const ItemDescription = () => {
  const [categories, setCategories] = useState<IBreadcrumbData[]>([]);
  const location = useLocation();
  const params = useParams();

  const query = location.pathname.replace("/items/", "");

  const { data, isLoading } = useGetItemDescription(params.id || query);

  useEffect(() => {
    if (!isLoading) {
      const dataCategories = data.categories.map((category: any) => {
        return {
          label: category.name,
          to: `/items?categories=${category.id}`,
        };
      });
      setCategories([...dataCategories, { label: data.item.title, to: "" }]);
    }
  }, [data, isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Breadcrumb links={categories} />
          <div className="item-description-container items_container_pages">
            <section className="item-description-container-product">
              <img src={data.item.picture} alt="product" />
              <div className="item-description-container-description">
                <h2>Descripción del producto</h2>
                <p>{data.item.description}</p>
              </div>
            </section>
            <section className="item-description-container-price">
              <h4 className="item-description-number-sells">
                {`${data.item.condition} - ${data.item.sold_quantity} vendidos`}
              </h4>
              <h2>{data.item.title}</h2>
              <h1>{formatNumbers(data.item.price.amount)}</h1>
              <Button fullWidth variant="contained">
                Comprar
              </Button>
            </section>
          </div>
        </>
      )}
    </>
  );
};
