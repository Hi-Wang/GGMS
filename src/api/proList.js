import request from 'assets/js/request';


export function getProList(token) {
  return request({
    url: '/prolist/getlist',
    method: 'get',
    params: { token }
  });
}