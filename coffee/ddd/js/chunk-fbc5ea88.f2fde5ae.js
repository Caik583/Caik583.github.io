(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fbc5ea88"],{a821:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-address"},[s("van-nav-bar",{attrs:{title:"地址管理","left-text":"返回","left-arrow":"",fixed:!0},on:{"click-left":t.back}}),s("div",{staticClass:"address-bg"}),s("div",{staticClass:"address-box"},[t.list.length>0?s("div",{staticClass:"site"},[s("van-address-list",{attrs:{list:t.list,"default-tag-text":"默认"},on:{add:t.newAddress,edit:t.editAddress},model:{value:t.chosenAddressId,callback:function(e){t.chosenAddressId=e},expression:"chosenAddressId"}})],1):s("div",[s("van-empty",{attrs:{description:"地址空空如也，去新增地址"}},[s("van-button",{staticClass:"bottom-button",attrs:{round:"",color:"#0C34BA"},on:{click:t.newAddress}},[t._v("去新增地址")])],1)],1)])],1)},n=[],d=(s("d81d"),s("b0c0"),s("ce26"),{data:function(){return{chosenAddressId:"",list:[]}},created:function(){this.getReceiveAddress()},methods:{back:function(){this.$router.go(-1)},getReceiveAddress:function(){var t=this,e=localStorage.getItem("CSTK");e&&(this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"/findAddress",params:{appkey:this.appkey,tokenString:e}}).then((function(e){t.$toast.clear(),2e4==e.data.code&&e.data.result.map((function(e){var s=e.province+e.city+e.county+e.addressDetail;t.list.push({id:e.aid,name:e.name,tel:e.tel,address:s,isDefault:Boolean(e.isDefault)})}))})).catch((function(e){t.$toast.clear()})))},newAddress:function(){this.$router.push({name:"NewAddress"})},editAddress:function(t){this.$router.push({name:"NewAddress",query:{aid:t.id}})}}}),i=d,r=s("2877"),o=Object(r["a"])(i,a,n,!1,null,null,null);e["default"]=o.exports},b0c0:function(t,e,s){var a=s("83ab"),n=s("9bf2").f,d=Function.prototype,i=d.toString,r=/^\s*function ([^ (]*)/,o="name";a&&!(o in d)&&n(d,o,{configurable:!0,get:function(){try{return i.call(this).match(r)[1]}catch(t){return""}}})},ce26:function(t,e,s){},d81d:function(t,e,s){"use strict";var a=s("23e7"),n=s("b727").map,d=s("1dde"),i=s("ae40"),r=d("map"),o=i("map");a({target:"Array",proto:!0,forced:!r||!o},{map:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-fbc5ea88.f2fde5ae.js.map