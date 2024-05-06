import { DriversAreas, sellProduct } from '@prisma/client';

export type SellOrders = {
  id: string;
  buyerCity: string;
  buyerPhone: string;
  buyerName: string;
  buyerStreet: string;
  buyerZipCode: string;
  sellerName: string;
  sellerCity: string;
  sellerStreet: string;
  sellerZipCode: string;
  sellerPhone: string;
  clientNip: number;
  sellerNip: number;
  area: DriversAreas;
  products: sellProduct[];
};
