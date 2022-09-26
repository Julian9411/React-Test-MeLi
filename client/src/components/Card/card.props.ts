export interface ICardData {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  address: string;
}

export interface ICard {
  data: ICardData
}
