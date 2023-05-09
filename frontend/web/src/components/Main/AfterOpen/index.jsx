import React, { useState } from 'react';

import LongBoxContainer from '@/components/LongBoxContainer';

const AfterOpen = () => {
  const [quantity, setQuantity] = useState(6); // TODO: 재고 관리
  return (
    <div className="w-full">
      <LongBoxContainer>
        <p>{quantity}개 남았습니다</p>
      </LongBoxContainer>
    </div>
  );
};

export default AfterOpen;