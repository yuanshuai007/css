// b: block 组件; 
// e: element 元素; 
// m: modify 修辞;

// const bem=ct_bem('button')

// console.log(bem('item')) //button__item
// console.log(bem({a:true})) //button--a 根元素的修辞
// console.log(bem({a:true,b:true})) //[button--a, button--b] 根元素的修辞

// console.log(bem('item',{a:true}))//["button__item", "button__item--a"]
// console.log(bem('item',{a:true,b:true}))// ["button__item", "button__item--a", "button__item--b"]
// console.log(bem('item!',{a:true}))//["button__item--a"]
// console.log(bem('item!',{a:true,b:true}))// ["button__item--a", "button__item--b"]

const e_sign= '__', //e的连接符
      m_sign= '--'; //m的连接符
//只有一个参数
function handle_arg(component, arg){

  //是字符串--名词
	if(typeof arg=== 'string'){
	  return component+e_sign+arg

	//对象--形容词
	}else if(typeof arg=== 'object'){
	  let ret=[];
	  for(let key in arg){
		  if(arg[key]) ret.push(component+m_sign+key)
		}
		return ret
	}else{
	  throw new Error('第一个参数既不是字符串也不是对象')
	}
}

//两个参数
function handle_args(component,args){
  let ret=[],
	    reg=/\!$/;
  //没有 ！添加名词
  if(! reg.test(args[0])){
	  ret.push(component+e_sign+args[0])
	}else{
	//有! 要移除!
	  args[0]=args[0].slice(0,-1)
	}
  
	//把形容词添加进出
	for(let key in args[1]){
	  if(args[1][key]) ret.push(component+e_sign+args[0]+m_sign+key)
	}
	return ret;
}

function ct_bem(component){
  return function bem(...args){
	  //只有一个参数
	  if(args.length=== 1){
		  return handle_arg(component, args[0])
		//两个参数
		}else if(args.length=== 2){
		  return handle_args(component, args)
		}else{
		  throw new Error('参数个数不对')
		}
	}
}

 const bem=ct_bem('button')

 console.log(bem('item')) //button__item
 console.log(bem({a:true})) //button--a 根元素的修辞
 console.log(bem({a:true,b:false})) //[button--a, button--b] 根元素的修辞

 console.log(bem('item',{a:true}))//["button__item", "button__item--a"]
 console.log(bem('item',{a:true,b:false}))// ["button__item", "button__item--a" ]
 console.log(bem('item!',{a:true}))//["button__item--a"]
 console.log(bem('item!',{a:true,b:false}))// ["button__item--a"]
 
//export default ct_bem