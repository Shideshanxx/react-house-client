import React, { useState, memo } from 'react';
import { Link } from 'umi';

function Header(props){
  const [username, setUsername] = useState(localStorage.getItem('username'));

  return (
    <div className='header'>
      <div className='header_title'>民宿</div>
      <div className='header_login'>
        {username ? username : <><Link to='/login?from=/'>登录</Link> | <Link to='/register'>注册</Link></>}
      </div>
    </div>
  )
}

export default memo(Header);