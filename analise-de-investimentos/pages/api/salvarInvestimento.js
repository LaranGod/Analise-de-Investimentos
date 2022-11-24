import dbConnect from "../../database/dbConnection";
import Investimento from "../../database/models/investimento";

export default async function handler(req, res) {
  try {
    const { method } = req;
    await dbConnect();

    if (method === 'POST') {
      await Investimento.create(req.body);
      res.status(200).json('Saved');
    }
    else {
      res.status(400);
    }
  } catch(error) {
    console.log('erro salvarInvestimento', error);
  }
}