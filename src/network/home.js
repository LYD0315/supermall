import  {request} from "./request";

export function  getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export  function  getHomeGoods(type,page){
  return request({url:'/home/data',
  params:{
    type:type,
    page:page,
  }})

}
// let totalnum = []
// const nums = [1,2,3,4,5]
// const nums2 = [6,7,8]
// //第一种办法
// for(let n of nums){
//   totalnum.push(n)
// }
// //更好的办法
// totalnum.push(...nums)
