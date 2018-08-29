// import { param2Obj } from 'assets/js/common';

const userMap = {
  data: [{
    name: '商品1',
    img: 'http://img.hb.aicdn.com/54110fb34fdc57196f5dfae7006de8a0eafd79112deba-D67uas_sq320',
    price: '100',
    oldPrice: '999',
    stock: '1000',
    time: '2018.5.20',
    state: '1'
  }, {
    name: '商品2',
    img: 'http://img.hb.aicdn.com/0fe783beaa153da439f17167783eef4b808cac421000c-6WABED_sq320',
    price: '1000',
    oldPrice: '2999',
    stock: '100',
    time: '2018.4.20',
    state: '0'
  }, {
    name: '商品3',
    img: 'http://img.hb.aicdn.com/c99456da93adf6e26659dbc9c22167b358ffc7df28b01-cjd9Yd_sq320',
    price: '190',
    oldPrice: '5699',
    stock: '4548',
    time: '2018.4.23',
    state: '0'
  }, {
    name: '多肉多肉',
    img: 'http://img.hb.aicdn.com/4a06d7bb20f5712aec670cd3846d435424e37f4a39f5-7nxvPf_sq320',
    price: '100',
    oldPrice: '999',
    stock: '1000',
    time: '2018.5.20',
    state: '1'
  }, {
    name: '烟花短暂',
    img: 'http://img.hb.aicdn.com/cdec14c0922125c4dfbd0d3b3a8b107cd4c8e684db82-5JjNgs_sq320',
    price: '1000',
    oldPrice: '2999',
    stock: '100',
    time: '2018.4.20',
    state: '1'
  }]
};
export default {
  getProList: () => {
    return userMap;
  }
};