import React, { Component } from 'react';

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  // 此生命周期会在后代组件抛出错误后被调用。它将抛出的错误作为参数，并返回一个值以更新 state
  static getDerivedStateFromError(error) {
    return {
      flag: true
    }
  }

  /* componentDidCatch生命周期在后代组件抛出错误后被调用, 通常用于记录错误之类的情况
   * error: 抛出的错误
   * info: 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息
  */
  componentDidCatch(error, info) {
    // logComponentStackToMyService(info.componentStack)
  }

  render() {
    return (
      <div>
        {this.state.flag ? <h1>发生错误，请稍后再试！</h1> : this.props.children}
      </div>
    )
  }
}