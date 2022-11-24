import dbConnect from "../../../database/dbConnection";
import Investimento from "../../../database/models/investimento";

export default async function handler(req, res) {
  try {
    const { method } = req;
    await dbConnect();

    if (method === 'GET') {
        const analises = await Investimento.find({});
        const mappedAnalises = analises.map((a) => ({ id: a._id, nome: a.nome }));
        res.status(200).json(mappedAnalises);
      }
  }
  catch(error) {
    console.log('erro listarInvestimentos', error);
  }
};