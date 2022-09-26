import { FC } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { formatNumbers } from "../../utils/formatNumber";
import { ICard } from "./card.props";

export const Card: FC<ICard> = ({ data }) => (
  <Link
    className="card_container"
    to={`/${routes.ITEMS}/${data.id}`}
    state={data.id}
  >
    <img src={data.picture} alt="product" />
    <div className="card_containerText">
      <div className="card_container_price_place">
        <div className="card_container_price">
          <h2>{formatNumbers(data.price.amount)}</h2>
          {data.free_shipping && <div className="card_free_shipping" />}
        </div>
        <span>{data.address}</span>
      </div>
      <h3 className="card_title_product">{data.title}</h3>
    </div>
  </Link>
);
