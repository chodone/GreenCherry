import { StatusCodes } from 'http-status-codes';

import createHttpInstance from '@/utils/csr/backendhttp';

const handler = async (req, res) => {
  const { id } = req.query;
  const http = createHttpInstance(req);

  await http.get(`store/${id}/subscribe`).then(response => {
    res.status(StatusCodes.OK).json(response.data);
  });
};

export default handler;
