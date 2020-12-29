import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import Lists from './components/Lists';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { Http } from '@/utils';
import { isEmpty } from 'project-libs';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders, setOrders] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(0);

  const handleChange = (e) => {
    setType(e.sub);
    setPage(CommonEnum.PAGE);
    setOrders([]);
    setShowLoading(true);
  };
  const tabs = [
    { title: '未支付', sub: 0 },
    { title: '已支付', sub: 1 },
  ];

  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/orders/lists',
      body: {
        ...page,
        pageNum,
        type
      }
    });
    return result;
  }

  // 初始化时请求接口
  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum);
    if (!isEmpty(result) && result.length <= page.pageSize) {
      setOrders(result);
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }

  /**
   * 1. 页面初始化的时候请求接口
   * 2. 监听#loading元素是否展示出来
   * 3. 修改page，pageNum+1，再次请求接口
   * 4. 拼装数据, 然后修改page
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries) => {
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1);
      // 当orders已经初始化请求过数据、上拉刷新请求的数据不为空、
      if (!isEmpty(orders) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        })
        setShowLoading(true);
      } else {
        setOrders([...orders, ...result]);
        setShowLoading(false);
      }
    }
  }, null)

  useEffect(() => {
    fetchOrder(1);
  }, [type])
  return (
    <ErrorBoundary>
      <div className='order-page'>
        <Tabs
          onChange={handleChange}
          tabs={tabs}
        >
          <div className='tab'>
            <Lists orders={orders} type={0} showLoading={showLoading} />
          </div>
          <div className='tab'>
            <Lists orders={orders} type={1} showLoading={showLoading} />
          </div>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}