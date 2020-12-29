import { useEffect } from 'react';
import { isEmpty } from 'project-libs';

/**
 * 1. 监听图片是否进入可视区域
 * 2. 进入可视区域时，将src属性替换为真实的图片地址（用自定义属性data-src存放真实的图片地址）
 * 3. 停止监听当前的节点
 * @param {*} ele 
 * @param {*} callback 
 * @param {*} watch 
 */
let observer;
export default function useImgHook(ele, callback, watch = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll(ele);
    if(!isEmpty(nodes)) {
      observer = new IntersectionObserver((entries) => {
        // 所有监听的元素都会放到entries这个数组里
        callback && callback(entries);
        entries.forEach(item => {
          // 如果监听的元素在可视区域，将它的src设置成真实的路径，并取消监听
          if(item.isIntersecting) {
            const dataSrc = item.target.getAttribute('data-src');
            item.target.setAttribute('src', dataSrc);
            observer.unobserve(item.target)
          }
        })
      });
      nodes.forEach(item => {
        observer.observe(item);
      })
    }
    return () => {
      if(!isEmpty(nodes) && observer) {
        observer.disconnect();
      }
    }
  }, watch)
}