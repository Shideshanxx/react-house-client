import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { isEmpty } from 'project-libs';
import OrderItem from '../Item';
import { ShowLoading } from '@/components';
import { OrderSkeletons } from '@/skeletons';

export default function (props) {
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if(isEmpty(props?.orders)) {
        setNoData(true)
      }
    }, 1500);
  }, [])

  return (
    <div>
      {isEmpty(props?.orders) ? 
        <>{noData ? <ShowLoading style={{marginTop: '200px'}} showLoading={false}/> : <OrderSkeletons />}</> :
        <div className='tab-lists'>
          {props.orders.map(item => (
            <OrderItem type={props.type} key={item.id} {...item}/>
          ))}
          <ShowLoading showLoading={props.showLoading}/>
        </div>
      }
    </div>
  )
}