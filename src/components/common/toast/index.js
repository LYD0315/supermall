import Toast from "./Toast";

const obj ={}

obj.install  = function (Vue) {
  // console.log('执行obj install',Vue)
  //第一种方法。这里的Toast.$el在install时undifined，还未挂载，所以不能进行创建 appendChild
  // document.body.appendChild(Toast.$el)
  // Vue.prototype.$toast = Toast;

//  第二种方法，1.组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.用new的方式，根据组件构造器，创建出来一个组件对象
  const toast = new toastConstructor()
//  3.将组件对象手动的挂载到某一个元素上面
  toast.$mount(document.createElement('div'))
//  4. toast.$el 对应的就是上面创建的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj
