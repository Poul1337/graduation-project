import { faker } from '@faker-js/faker';

const generateProducts = () => {
  const productsCount = faker.number.int({ min: 1, max: 5 });
  const products = [];
  for (let i = 0; i < productsCount; i++) {
    const product = {
      productName: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      unit: faker.helpers.arrayElement([
        'SZTUKI',
        'KARTONY',
        'BINDY',
        'BUTELKI',
        'OPACKOWANIA',
        'RYZY',
      ]),
      priceNetto: faker.number.int({ min: 10, max: 1000 }),
      priceBrutto: faker.number.int({ min: 10, max: 1000 }),
    };
    products.push(product);
  }
  return products;
};

export const orders = {
  buyerCity: faker.address.city(),
  buyerPhone: parseInt(faker.phone.number()),
  buyerName: faker.name.firstName(),
  buyerStreet: faker.address.streetAddress(),
  buyerZipCode: faker.address.zipCode(),
  sellerName: faker.company.name(),
  sellerCity: faker.address.city(),
  sellerStreet: faker.address.streetAddress(),
  sellerZipCode: faker.address.zipCode(),
  sellerPhone: parseInt(faker.phone.number()),
  clientNip: faker.number.int({ min: 1000000000, max: 9999999999 }),
  sellerNip: faker.number.int({ min: 1000000000, max: 9999999999 }),
  area: faker.helpers.arrayElement([
    'N',
    'S',
    'W',
    'E',
    'NE',
    'NW',
    'SW',
    'SE',
  ]),
  products: generateProducts(),
};
