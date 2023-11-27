(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/CustomNavbar/index"],{"25a6":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{statusBarHeight:0,navBarHeight:44}},props:{title:{type:String,default:""},showBack:{type:Boolean,default:!0}},created:function(){var n=t.getSystemInfoSync();this.statusBarHeight=n.statusBarHeight;var e=t.getMenuButtonBoundingClientRect();this.navBarHeight=e.bottom-n.statusBarHeight+(e.top-n.statusBarHeight)},methods:{navigateBack:function(){t.navigateBack({fail:function(n){t.switchTab({url:"/pages/index/index"})}})}}};n.default=e}).call(this,e("543d")["default"])},"590e":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},i=[]},5978:function(t,n,e){"use strict";e.r(n);var a=e("590e"),i=e("c62b");for(var u in i)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("e8b9");var r=e("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"ac994f52",null,!1,a["a"],void 0);n["default"]=c.exports},"6b04":function(t,n,e){},c62b:function(t,n,e){"use strict";e.r(n);var a=e("25a6"),i=e.n(a);for(var u in a)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=i.a},e8b9:function(t,n,e){"use strict";var a=e("6b04"),i=e.n(a);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/CustomNavbar/index-create-component',
    {
        'components/CustomNavbar/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5978"))
        })
    },
    [['components/CustomNavbar/index-create-component']]
]);
