import axios from 'axios';

import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  try {
    // Spring 서버에 요청
    const http = createHttpInstance(req);

    const response = await http.get('/member');

    // Spring 서버에서 받은 데이터를 클라이언트에 전달
    res.status(200).json(response.data);
  } catch (error) {
    // 에러 처리
    // console.log(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
