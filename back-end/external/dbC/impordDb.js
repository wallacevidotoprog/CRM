import fs from "fs";
import clientModel from "../../src/models/client.entity.js";

async function importData() {
  try {
    const data = fs.readFileSync("./data.json", "utf8");
    const clients = JSON.parse(data);

    const clientsToImport = clients.map((client) => ({
      name: client.nome,
      email: client.email,
      phone: client.celular,
      address: `${client.endereco}, ${client.numero}, ${client.bairro}, ${client.cidade} - ${client.estado}, CEP: ${client.cep}`,
    }));

    await clientModel.bulkCreate(clientsToImport, { validate: true });

    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}
importData();