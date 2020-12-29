import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';

function Edit(props) {
  const { getFieldProps, validateFields } = props.form;
  const { user: { editUserAsync, getUserAsync, avatar, phone, sign } } = useStoreHook();
  const [files, setFiles] = useState([{url: avatar}]);

  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 10) {
      Toast.fail('图片大小不能大于10M');
      return;
    }
    setFiles(files);
  };

  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        // value即填写的表单数据
        editUserAsync({
          ...value,
          avatar: files[0].url
        })
      }
    })
  };

  useEffect(() => {
    getUserAsync({});
  }, []);

  return (
    <div className='user-edit'>
      <List>
        {/* 当图片小于一张时，显示添加按钮 */}
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('phone', {
            rules: [{ required: true }],
            initialValue: phone
          })}
          placeholder='电话'
        >
          电话：
        </InputItem>
        <InputItem
          {...getFieldProps('sign', {
            rules: [{ required: true }],
            initialValue: sign
          })}
          placeholder='签名'
        >
          签名：
          </InputItem>
      </List>
      <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>修改</Button>
    </div>
  )
}

export default createForm()(Edit);