"use strict";(self.webpackChunkmy_gatsby_site=self.webpackChunkmy_gatsby_site||[]).push([[848],{3204:function(e){const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,i=/^[\p{Lu}](?![\p{Lu}])/gu,c=/([\p{Alpha}\p{N}_]|$)/u,r=/[_.\- ]+/,n=new RegExp("^"+r.source),s=new RegExp(r.source+c.source,"gu"),l=new RegExp("\\d+"+c.source,"gu"),o=(e,c)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(c={pascalCase:!1,preserveConsecutiveUppercase:!1,...c},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const r=!1===c.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(c.locale),o=!1===c.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(c.locale);if(1===e.length)return c.pascalCase?o(e):r(e);return e!==r(e)&&(e=((e,i,c)=>{let r=!1,n=!1,s=!1;for(let l=0;l<e.length;l++){const o=e[l];r&&t.test(o)?(e=e.slice(0,l)+"-"+e.slice(l),r=!1,s=n,n=!0,l++):n&&s&&a.test(o)?(e=e.slice(0,l-1)+"-"+e.slice(l-1),s=n,n=!1,r=!0):(r=i(o)===o&&c(o)!==o,s=n,n=c(o)===o&&i(o)!==o)}return e})(e,r,o)),e=e.replace(n,""),e=c.preserveConsecutiveUppercase?((e,t)=>(i.lastIndex=0,e.replace(i,(e=>t(e)))))(e,r):r(e),c.pascalCase&&(e=o(e.charAt(0))+e.slice(1)),((e,t)=>(s.lastIndex=0,l.lastIndex=0,e.replace(s,((e,a)=>t(a))).replace(l,(e=>t(e)))))(e,o)};e.exports=o,e.exports.default=o},8032:function(e,t,a){a.d(t,{L:function(){return f},M:function(){return E},P:function(){return x},S:function(){return U},_:function(){return s},a:function(){return n},b:function(){return d},g:function(){return m},h:function(){return l}});var i=a(7294),c=(a(3204),a(5697)),r=a.n(c);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},n.apply(this,arguments)}function s(e,t){if(null==e)return{};var a,i,c={},r=Object.keys(e);for(i=0;i<r.length;i++)t.indexOf(a=r[i])>=0||(c[a]=e[a]);return c}const l=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function o(e,t,a){const i={};let c="gatsby-image-wrapper";return"fixed"===a?(i.width=e,i.height=t):"constrained"===a&&(c="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:c,"data-gatsby-image-wrapper":"",style:i}}function d(e,t,a,i,c){return void 0===c&&(c={}),n({},a,{loading:i,shouldLoad:e,"data-main-image":"",style:n({},c,{opacity:t?1:0})})}function m(e,t,a,i,c,r,s,l){const o={};r&&(o.backgroundColor=r,"fixed"===a?(o.width=i,o.height=c,o.backgroundColor=r,o.position="relative"):("constrained"===a||"fullWidth"===a)&&(o.position="absolute",o.top=0,o.left=0,o.bottom=0,o.right=0)),s&&(o.objectFit=s),l&&(o.objectPosition=l);const d=n({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:n({opacity:t?0:1,transition:"opacity 500ms linear"},o)});return d}const g=["children"],u=function(e){let{layout:t,width:a,height:c}=e;return"fullWidth"===t?i.createElement("div",{"aria-hidden":!0,style:{paddingTop:c/a*100+"%"}}):"constrained"===t?i.createElement("div",{style:{maxWidth:a,display:"block"}},i.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:`data:image/svg+xml;charset=utf-8,%3Csvg%20height='${c}'%20width='${a}'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E`,style:{maxWidth:"100%",display:"block",position:"static"}})):null},f=function(e){let{children:t}=e,a=s(e,g);return i.createElement(i.Fragment,null,i.createElement(u,n({},a)),t,null)},p=["src","srcSet","loading","alt","shouldLoad"],b=["fallback","sources","shouldLoad"],h=function(e){let{src:t,srcSet:a,loading:c,alt:r="",shouldLoad:l}=e,o=s(e,p);return i.createElement("img",n({},o,{decoding:"async",loading:c,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?a:void 0,"data-srcset":l?void 0:a,alt:r}))},w=function(e){let{fallback:t,sources:a=[],shouldLoad:c=!0}=e,r=s(e,b);const l=r.sizes||(null==t?void 0:t.sizes),o=i.createElement(h,n({},r,t,{sizes:l,shouldLoad:c}));return a.length?i.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:r}=e;return i.createElement("source",{key:`${t}-${r}-${a}`,type:r,media:t,srcSet:c?a:void 0,"data-srcset":c?void 0:a,sizes:l})})),o):o};var y;h.propTypes={src:c.string.isRequired,alt:c.string.isRequired,sizes:c.string,srcSet:c.string,shouldLoad:c.bool},w.displayName="Picture",w.propTypes={alt:c.string.isRequired,shouldLoad:c.bool,fallback:c.exact({src:c.string.isRequired,srcSet:c.string,sizes:c.string}),sources:c.arrayOf(c.oneOfType([c.exact({media:c.string.isRequired,type:c.string,sizes:c.string,srcSet:c.string.isRequired}),c.exact({media:c.string,type:c.string.isRequired,sizes:c.string,srcSet:c.string.isRequired})]))};const v=["fallback"],x=function(e){let{fallback:t}=e,a=s(e,v);return t?i.createElement(w,n({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):i.createElement("div",n({},a))};x.displayName="Placeholder",x.propTypes={fallback:c.string,sources:null==(y=w.propTypes)?void 0:y.sources,alt:function(e,t,a){return e[t]?new Error(`Invalid prop \`${t}\` supplied to \`${a}\`. Validation failed.`):null}};const E=function(e){return i.createElement(i.Fragment,null,i.createElement(w,n({},e)),i.createElement("noscript",null,i.createElement(w,n({},e,{shouldLoad:!0}))))};E.displayName="MainImage",E.propTypes=w.propTypes;const _=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],k=["style","className"],N=e=>e.replace(/\n/g,""),S=function(e,t,a){for(var i=arguments.length,c=new Array(i>3?i-3:0),n=3;n<i;n++)c[n-3]=arguments[n];return e.alt||""===e.alt?r().string.apply(r(),[e,t,a].concat(c)):new Error(`The "alt" prop is required in ${a}. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html`)},C={image:r().object.isRequired,alt:S},L=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],I=["style","className"],$=new Set;let z,T;const O=function(e){let{as:t="div",image:c,style:r,backgroundColor:d,className:m,class:g,onStartLoad:u,onLoad:f,onError:p}=e,b=s(e,L);const{width:h,height:w,layout:y}=c,v=o(h,w,y),{style:x,className:E}=v,_=s(v,I),k=(0,i.useRef)(),N=(0,i.useMemo)((()=>JSON.stringify(c.images)),[c.images]);g&&(m=g);const S=function(e,t,a){let i="";return"fullWidth"===e&&(i=`<div aria-hidden="true" style="padding-top: ${a/t*100}%;"></div>`),"constrained"===e&&(i=`<div style="max-width: ${t}px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height='${a}'%20width='${t}'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E" style="max-width: 100%; display: block; position: static;"></div>`),i}(y,h,w);return(0,i.useEffect)((()=>{z||(z=a.e(731).then(a.bind(a,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return T=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=k.current.querySelector("[data-gatsby-image-ssr]");if(e&&l())return e.complete?(null==u||u({wasCached:!0}),null==f||f({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==u||u({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==f||f({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void $.add(N);if(T&&$.has(N))return;let t,i;return z.then((e=>{let{renderImageToString:a,swapPlaceholderImage:s}=e;k.current&&(k.current.innerHTML=a(n({isLoading:!0,isLoaded:$.has(N),image:c},b)),$.has(N)||(t=requestAnimationFrame((()=>{k.current&&(i=s(k.current,N,$,r,u,f,p))}))))})),()=>{t&&cancelAnimationFrame(t),i&&i()}}),[c]),(0,i.useLayoutEffect)((()=>{$.has(N)&&T&&(k.current.innerHTML=T(n({isLoading:$.has(N),isLoaded:$.has(N),image:c},b)),null==u||u({wasCached:!0}),null==f||f({wasCached:!0}))}),[c]),(0,i.createElement)(t,n({},_,{style:n({},x,r,{backgroundColor:d}),className:`${E}${m?` ${m}`:""}`,ref:k,dangerouslySetInnerHTML:{__html:S},suppressHydrationWarning:!0}))},j=(0,i.memo)((function(e){return e.image?(0,i.createElement)(O,e):null}));j.propTypes=C,j.displayName="GatsbyImage";const R=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function q(e){return function(t){let{src:a,__imageData:c,__error:r}=t,l=s(t,R);return r&&console.warn(r),c?i.createElement(e,n({image:c},l)):(console.warn("Image not loaded",a),null)}}const A=q((function(e){let{as:t="div",className:a,class:c,style:r,image:l,loading:g="lazy",imgClassName:u,imgStyle:p,backgroundColor:b,objectFit:h,objectPosition:w}=e,y=s(e,_);if(!l)return console.warn("[gatsby-plugin-image] Missing image prop"),null;c&&(a=c),p=n({objectFit:h,objectPosition:w,backgroundColor:b},p);const{width:v,height:S,layout:C,images:L,placeholder:I,backgroundColor:$}=l,z=o(v,S,C),{style:T,className:O}=z,j=s(z,k),R={fallback:void 0,sources:[]};return L.fallback&&(R.fallback=n({},L.fallback,{srcSet:L.fallback.srcSet?N(L.fallback.srcSet):void 0})),L.sources&&(R.sources=L.sources.map((e=>n({},e,{srcSet:N(e.srcSet)})))),i.createElement(t,n({},j,{style:n({},T,r,{backgroundColor:b}),className:`${O}${a?` ${a}`:""}`}),i.createElement(f,{layout:C,width:v,height:S},i.createElement(x,n({},m(I,!1,C,v,S,$,h,w))),i.createElement(E,n({"data-gatsby-image-ssr":"",className:u},y,d("eager"===g,!1,R,g,p)))))})),P=function(e,t){for(var a=arguments.length,i=new Array(a>2?a-2:0),c=2;c<a;c++)i[c-2]=arguments[c];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?r().number.apply(r(),[e,t].concat(i)):new Error(`"${t}" ${e[t]} may not be passed when layout is fullWidth.`)},M=new Set(["fixed","fullWidth","constrained"]),D={src:r().string.isRequired,alt:S,width:P,height:P,sizes:r().string,layout:e=>{if(void 0!==e.layout&&!M.has(e.layout))return new Error(`Invalid value ${e.layout}" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".`)}};A.displayName="StaticImage",A.propTypes=D;const U=q(j);U.displayName="StaticImage",U.propTypes=D},4e3:function(e,t,a){a.d(t,{Z:function(){return d}});var i=a(7294),c=a(5785),r=a(4160),n=a(8032);function s(e){let{sub:t}=e;const s=(0,r.K2)("2678393935");return i.createElement("div",{className:"sticky navigation left-0 top-0 h-screen w-72 p-4 box-border transition duration-1000 bg-gray-100 hidden md:block"},i.createElement("div",{className:"content flex flex-col items-center justify-center h-full"},i.createElement("h2",{className:"logo text-lg font-bold"},i.createElement(r.rU,{to:"/"},"Beming-dev")),i.createElement("div",{className:"profile flex flex-col items-center my-5"},i.createElement("div",{className:"profile-img-wrapper w-30 h-30 rounded-full overflow-hidden mb-2"}),i.createElement("div",{className:"contacts flex space-x-4"},i.createElement("div",{className:"img-wrapper cursor-pointer w-8 h-8",onClick:()=>{window.open("mailto:mingfordev@gmail.com")}},i.createElement(n.S,{alt:"altImg",src:"../images/navigation/ico_email.png",__imageData:a(356)})),i.createElement("div",{className:"img-wrapper w-8 h-8"},i.createElement("a",{href:"https://github.com/beming-dev"},i.createElement(n.S,{alt:"altImg",src:"../images/navigation/ico_github.png",__imageData:a(6368)}))),i.createElement("div",{className:"img-wrapper w-8 h-8"},i.createElement("a",{href:"https://github.com/beming-dev"},i.createElement(n.S,{alt:"altImg",src:"../images/navigation/ico_instagram.png",__imageData:a(610)}))))),i.createElement("div",{className:"category space-y-2"},t?(0,c.Z)(t).map(((e,t)=>i.createElement("li",{key:t},i.createElement(r.rU,{className:"hover:underline",to:`/subCategory/${e.toLowerCase()}`},e)))):s.allMarkdownRemark.group.map((e=>i.createElement("li",{key:e.fieldValue},i.createElement(r.rU,{className:"hover:underline",to:`/mainCategory/${e.fieldValue.toLowerCase()}`},e.fieldValue))))),i.createElement("span",{className:"copyright text-gray-500 mt-4"},"© copyright 2022")))}var l=a(5779);var o=()=>{(0,r.K2)("3398502926");return i.createElement("div",{className:"w-full h-30 flex md:hidden flex-col items-center justify-center transition duration-1000 bg-gray-100 p-10"},i.createElement("div",{className:"flex mb-2"},i.createElement("div",{className:"cursor-pointer w-10 h-10 mx-2",onClick:()=>{window.open("mailto:mingfordev@gmail.com")}},i.createElement(n.S,{alt:"altImg",src:"../images/navigation/ico_email.png",__imageData:a(4775)})),i.createElement("div",{className:"w-10 h-10 mx-2"},i.createElement("a",{href:"https://github.com/beming-dev"},i.createElement(n.S,{alt:"altImg",src:"../images/navigation/ico_github.png",__imageData:a(6734)}))),i.createElement("div",{className:"w-10 h-10 mx-2"},i.createElement("a",{href:"https://github.com/beming-dev"},i.createElement(n.S,{alt:"altImg",src:"../images/navigation/ico_instagram.png",__imageData:a(3425)})))),i.createElement("span",{className:"text-gray-600"},"© copyright 2022"))};var d=e=>{let{children:t,sub:a}=e;return i.createElement("div",{className:"flex flex-col min-h-screen"},i.createElement("div",{className:"flex flex-1 flex-col md:flex-row"},i.createElement(l.Z,{sub:a,always:!1}),i.createElement(s,{sub:a}),i.createElement("main",{className:"flex-1 flex items-center transition duration-1000 box-border"},t)),i.createElement(o,null))}},5779:function(e,t,a){a.d(t,{Z:function(){return n}});var i=a(5785),c=a(7294),r=a(4160);function n(e){let{sub:t,always:a}=e;const n=(0,r.K2)("2540505676");return c.createElement("div",{className:"flex w-full flex-col items-center z-10 transition duration-1000 flex "+(a?"":"md:hidden")},c.createElement("span",{className:"text-3xl font-bold my-9"},c.createElement(r.rU,{to:"/"},"Beming-dev")),c.createElement("div",{className:"w-full max-w-fit mx-auto mt-7 flex overflow-x-scroll scrollbar-hide"},t?(0,i.Z)(t).map(((e,t)=>c.createElement("li",{key:t,className:"mx-5"},c.createElement(r.rU,{to:`/subCategory/${e.toLowerCase()}`},e)))):n.allMarkdownRemark.group.map((e=>c.createElement("li",{key:e.fieldValue,className:"mx-5"},c.createElement(r.rU,{to:`/mainCategory/${e.fieldValue.toLowerCase()}`},e.fieldValue))))))}},3425:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/81e3d07effeb5fb39c108cb2fce3bfd4/90172/ico_instagram.png","srcSet":"/static/81e3d07effeb5fb39c108cb2fce3bfd4/88208/ico_instagram.png 25w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/41821/ico_instagram.png 51w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/90172/ico_instagram.png 101w","sizes":"(min-width: 101px) 101px, 100vw"},"sources":[{"srcSet":"/static/81e3d07effeb5fb39c108cb2fce3bfd4/2fa99/ico_instagram.webp 25w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/789ca/ico_instagram.webp 51w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/e6c54/ico_instagram.webp 101w","type":"image/webp","sizes":"(min-width: 101px) 101px, 100vw"}]},"width":101,"height":101}')},6368:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/1bb005af1945ab840f3fc0e0fdca082d/15e42/ico_github.png","srcSet":"/static/1bb005af1945ab840f3fc0e0fdca082d/88208/ico_github.png 25w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/e9fba/ico_github.png 50w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/15e42/ico_github.png 100w","sizes":"(min-width: 100px) 100px, 100vw"},"sources":[{"srcSet":"/static/1bb005af1945ab840f3fc0e0fdca082d/2fa99/ico_github.webp 25w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/dbc4a/ico_github.webp 50w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/d8057/ico_github.webp 100w","type":"image/webp","sizes":"(min-width: 100px) 100px, 100vw"}]},"width":100,"height":100}')},6734:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/1bb005af1945ab840f3fc0e0fdca082d/15e42/ico_github.png","srcSet":"/static/1bb005af1945ab840f3fc0e0fdca082d/88208/ico_github.png 25w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/e9fba/ico_github.png 50w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/15e42/ico_github.png 100w","sizes":"(min-width: 100px) 100px, 100vw"},"sources":[{"srcSet":"/static/1bb005af1945ab840f3fc0e0fdca082d/2fa99/ico_github.webp 25w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/dbc4a/ico_github.webp 50w,\\n/static/1bb005af1945ab840f3fc0e0fdca082d/d8057/ico_github.webp 100w","type":"image/webp","sizes":"(min-width: 100px) 100px, 100vw"}]},"width":100,"height":100}')},610:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/81e3d07effeb5fb39c108cb2fce3bfd4/90172/ico_instagram.png","srcSet":"/static/81e3d07effeb5fb39c108cb2fce3bfd4/88208/ico_instagram.png 25w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/41821/ico_instagram.png 51w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/90172/ico_instagram.png 101w","sizes":"(min-width: 101px) 101px, 100vw"},"sources":[{"srcSet":"/static/81e3d07effeb5fb39c108cb2fce3bfd4/2fa99/ico_instagram.webp 25w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/789ca/ico_instagram.webp 51w,\\n/static/81e3d07effeb5fb39c108cb2fce3bfd4/e6c54/ico_instagram.webp 101w","type":"image/webp","sizes":"(min-width: 101px) 101px, 100vw"}]},"width":101,"height":101}')},4775:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/429a78eaeb66cae85c3024c77ec426e0/15e42/ico_email.png","srcSet":"/static/429a78eaeb66cae85c3024c77ec426e0/88208/ico_email.png 25w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/e9fba/ico_email.png 50w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/15e42/ico_email.png 100w","sizes":"(min-width: 100px) 100px, 100vw"},"sources":[{"srcSet":"/static/429a78eaeb66cae85c3024c77ec426e0/2fa99/ico_email.webp 25w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/dbc4a/ico_email.webp 50w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/d8057/ico_email.webp 100w","type":"image/webp","sizes":"(min-width: 100px) 100px, 100vw"}]},"width":100,"height":100}')},356:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/429a78eaeb66cae85c3024c77ec426e0/15e42/ico_email.png","srcSet":"/static/429a78eaeb66cae85c3024c77ec426e0/88208/ico_email.png 25w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/e9fba/ico_email.png 50w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/15e42/ico_email.png 100w","sizes":"(min-width: 100px) 100px, 100vw"},"sources":[{"srcSet":"/static/429a78eaeb66cae85c3024c77ec426e0/2fa99/ico_email.webp 25w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/dbc4a/ico_email.webp 50w,\\n/static/429a78eaeb66cae85c3024c77ec426e0/d8057/ico_email.webp 100w","type":"image/webp","sizes":"(min-width: 100px) 100px, 100vw"}]},"width":100,"height":100}')}}]);
//# sourceMappingURL=ac6e772b7410ead517efaabe92c1eca16e00bd31-93d8b60909bf309a998b.js.map