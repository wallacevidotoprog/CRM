import { faker } from "@faker-js/faker/locale/pt_BR";
import clientModel from "../../src/models/client.entity.js";

faker.locale = "pt_BR";

function generateFakeClient() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("+55 ## #####-####"),
    address: `${faker.location.street()}, ${faker.location.buildingNumber()} - ${faker.location.city()}/${faker.location.state(
      { abbreviated: true }
    )}`,
  };
}

async function seedClients() {
  try {
    console.log("🔵 Iniciando geração de dados falsos...");

    const fakeClients = Array.from({ length: 500 }, generateFakeClient);

    console.log("🟡 Inserindo clientes no banco de dados...");

    const createdClients = await clientModel.bulkCreate(fakeClients, {
      validate: true,
    });

    console.log(`🟢 Sucesso! ${createdClients.length} clientes inseridos.`);
  } catch (error) {
    console.error("🔴 Erro ao popular o banco de dados:", error);
  } finally {
    //await clientModel.sequelize.close();
  }
}
seedClients();
