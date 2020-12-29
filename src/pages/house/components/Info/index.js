import React from 'react';
import { Button } from 'antd-mobile';
import { Timer } from '@/utils';

export default function(props){
  const handleOrder = () => {
    props?.btnClick(props.order?.id)
  }

  const renderBtn = () => {
    // order里面没有id，说明订单不存在
    if(!props.order?.id) {
      return <Button className='info-btn' type='warning' onClick={handleOrder}>预定</Button>
    }
    // 已经有订单了，处于未支付状态
    if(props.order?.isPayed === 0) {
      return <Button className='info-btn' type='ghost' onClick={handleOrder}>取消预定</Button>
    }
    // 已经有订单了，处于已支付状态
    if(props.order?.isPayed === 1) {
      return <Button className='info-btn' type='ghost'>居住中</Button>
    }
  }

  return (
    <div className='info'>
      <div className='info-title'>{props?.detail?.name}</div>
      <div className='info-msg'>简介：{props?.detail?.info}</div>
      <div className='info-price'>价格：￥{props?.detail?.price}</div>
      <div className='info-time'>发布时间：{Timer(props?.detail?.publishTime, '')}</div>
      <div className='info-time'>开始出租：{Timer(props?.detail?.startTime, '')}</div>
      <div className='info-time'>结束出租：{Timer(props?.detail?.endTime, '')}</div>
      {renderBtn()}
    </div>
  )
}