export default {
  'post /api/user/detail': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 10,
        username: '测试用户',
        avatar: 'http://img2.mukewang.com/szimg/5ad05dc00001eae705400300-360-202.jpg',
        tel: 1094104801,
        sign: '嗜血丿龙帅'
      }
    })
  },
  'post /api/user/edit': (req, res) => {
    res.json({
      status: 200,
      data: 'ok'
    })
  },
  'post /api/user/login': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: 'admin'
      }
    })
  },
  'post /api/user/register': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: 'admin'
      }
    })
  },
}