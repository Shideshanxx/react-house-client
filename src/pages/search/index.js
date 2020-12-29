import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation } from 'umi';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';

import './index.less';

export default function(props) {
  const { query } = useLocation();
  const [houseName, setHouseName] = useState('');
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [houseLists, setHouseLists] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSubmitName, setHouseSubmitName] = useState('');

  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59'
    },
    watch: [page.pageNum, houseSubmitName]
  });

  /**
   * 1. 使用useObserverHook监听loading元素是否在可视区域；
   * 2. 当上一个请求完成，且#loading元素到达可视区域时，修改分页数据；
   * 3. 监听分页数据的修改，发送接口，请求下一页的数据；
   * 4. 监听useHttpHook返回的loading值的变化，在请求成功时，对数据进行拼装
   */
  // 注意第三个参数传null，这样在#loading元素位置变化时才会一直获取到entries
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    // 当上一个请求完成，且#loading元素到达可视区域，页码加1，useHttpHook监听到页码变化就会重新发送请求，获取数据；
    if(!loading && entries[0].isIntersecting) {
      setPage({
        ...page,
        pageNum: page.pageNum + 1
      });
    }
  }, null);

  useImgHook('.item-img', (entries) => {

  }, null)

  const handleChange = (value) => {
    setHouseName(value)
  }

  const handleCancle = () => {
    setHouseName('');
  }

  // 搜索
  const handleSubmit = (value) => {
    setHouseSubmitName(value);
    setHouseLists([]);
    setShowLoading(true);
    setPage(CommonEnum.PAGE);
  }

  useEffect(() => {
    // 如果请求成功
    if(!loading && houses) {
      // 如果请求到数据
      if(houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if(houses.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        // 当没有数据返回时，隐藏#loading元素，不在监听它的位置变化
        setShowLoading(false);
      }
    }
  }, [loading])

  return (
    <div className='search-page'>
      {/* 顶部搜索栏 */}
      <SearchBar
        placeholder='搜索民宿'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancle}
        onSubmit={handleSubmit}
      />
      {/* 搜索结果 */}
      <div className='result'>
        {!houseLists.length
          ? <ActivityIndicator toast />
          : houseLists.map(item => (
            <div className='item' key={item.id}>
              <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-src={item?.imgs[0]?.url} />
              <div className='item-right'>
                <div className='title'>{item.name}</div>
                <div className='price'>￥{item.price}</div>
              </div>
            </div>
          ))
        }
        <ShowLoading showLoading={showLoading} />
      </div>
    </div>
  )
}