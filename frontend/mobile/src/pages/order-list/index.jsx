/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import Container from '@/components/Container';
import OrderInfo from '@/components/OrderInfo';
import PrivateRouter from '@/components/PrivateRouter/PrivateRouter';
import clientHttp from '@/utils/csr/clientHttp';

const orderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState();
  const member = useSelector(state => state.member.memberInfo);

  const getOrderList = async () => {
    // redux에서 memberId 꺼내서 호출하기
    try {
      const response = await clientHttp.get(`/order-list/${member.id}`);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <Container>
      <Container.SubPageHeader goHome title="주문내역" className="" />
      <Container.MainBody>
        {orders &&
          orders.content.map(orderInfo => {
            return <OrderInfo key={orderInfo.orderId} orderInfo={orderInfo} />;
          })}
      </Container.MainBody>
    </Container>
  );
};
export default PrivateRouter(orderList);
