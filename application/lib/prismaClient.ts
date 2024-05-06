import { faker } from '@faker-js/faker';
import { DriversAreas, Occupation, PrismaClient, Unit } from '@prisma/client';

export const prisma = new PrismaClient();

const main = async () => {
  try {
    const count = await prisma.sellOrders.count();
    if (count === 0) {
      const sellOrders = [];
      for (let i = 0; i < 60; i++) {
        const order = {
          buyerCity: faker.location.city(),
          buyerPhone: faker.phone.number(),
          buyerName: faker.company.name(),
          buyerStreet: faker.location.streetAddress(),
          buyerZipCode: faker.location.zipCode(),
          sellerName: 'Global Sales',
          sellerCity: 'Warszawa',
          sellerStreet: 'Kowalskiego 69',
          sellerZipCode: '01-456',
          sellerPhone: '516245356',
          clientNip: faker.number.int({ min: 10000, max: 999999 }),
          sellerNip: 5342512125,
          area: faker.helpers.enumValue(DriversAreas),
        };
        sellOrders.push(order);
      }

      await prisma.sellOrders.createMany({
        data: sellOrders,
      });

      const allOrders = await prisma.sellOrders.findMany();

      for (const order of allOrders) {
        const products = [];
        for (let i = 0; i < Math.floor(Math.random() * (21 - 5)) + 5; i++) {
          const product = {
            orderId: order.id,
            productName: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
            unit: faker.helpers.enumValue(Unit),
            priceNetto: faker.number.int({ min: 10, max: 100 }),
            priceBrutto: faker.number.int({ min: 10, max: 100 }),
          };
          products.push(product);
        }
        await prisma.sellProduct.createMany({
          data: products,
        });
      }

      console.log('Mock data created successfully!');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((err) => console.error(err));
