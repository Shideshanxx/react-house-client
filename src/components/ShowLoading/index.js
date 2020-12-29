import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommonEnum } from '@/enums';

import './index.less';

export default function ShowLoading(props){
  return (
    <div>
      {props.showLoading ? <div id={CommonEnum.LOADING_ID} className='loading-info'>loading...</div> : <div style={props?.style} className='loading-info'>-没数据啦-</div>}
    </div>
  )
}

ShowLoading.defaultProps = {
  showLoading: true
}

ShowLoading.propTypes = {
  showLoading: PropTypes.bool
}