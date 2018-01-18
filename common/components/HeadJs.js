export default () => (
<script dangerouslySetInnerHTML={{ __html: `
    (function() {
      /*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
      !function(a){"use strict";var b=function(b,c,d){function j(a){if(e.body)return a();setTimeout(function(){j(a)})}function l(){f.addEventListener&&f.removeEventListener("load",l),f.media=d||"all"}var g,e=a.document,f=e.createElement("link");if(c)g=c;else{var h=(e.body||e.getElementsByTagName("head")[0]).childNodes;g=h[h.length-1]}var i=e.styleSheets;f.rel="stylesheet",f.href=b,f.media="only x",j(function(){g.parentNode.insertBefore(f,c?g:g.nextSibling)});var k=function(a){for(var b=f.href,c=i.length;c--;)if(i[c].href===b)return a();setTimeout(function(){k(a)})};return f.addEventListener&&f.addEventListener("load",l),f.onloadcssdefined=k,k(l),f};"undefined"!=typeof exports?exports.loadCSS=b:a.loadCSS=b}("undefined"!=typeof global?global:this);
      /*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
      !function(a){if(a.loadCSS){var b=loadCSS.relpreload={};if(b.support=function(){try{return a.document.createElement("link").relList.supports("preload")}catch(a){return!1}},b.poly=function(){for(var b=a.document.getElementsByTagName("link"),c=0;c<b.length;c++){var d=b[c];"preload"===d.rel&&"style"===d.getAttribute("as")&&(a.loadCSS(d.href,d,d.getAttribute("media")),d.rel=null)}},!b.support()){b.poly();var c=a.setInterval(b.poly,300);a.addEventListener&&a.addEventListener("load",function(){b.poly(),a.clearInterval(c)}),a.attachEvent&&a.attachEvent("onload",function(){a.clearInterval(c)})}}}(this);

      if ('visibilityState' in document) { // Cutting the Mustard
        var rootElement = document.documentElement;
        var enhancedClass = 'enhanced';
        var enhancedScriptPath = '{{file}}';

        function addEnhancedClass() {
          rootElement.classList.add(enhancedClass);
        }

        function removeEnhancedClass() {
          rootElement.classList.remove(enhancedClass);
        }

        function loadJS(src) {
          var ref = window.document.getElementsByTagName('script')[ 0 ];
          var script = window.document.createElement('script');
          script.src = src;
          ref.parentNode.insertBefore(script, ref);
          return script;
        }

        addEnhancedClass(); //gets the enhanced styles, as we don't want them to go from basic to enhanced in front of the user

        var script = loadJS(enhancedScriptPath);
        var fallback = setTimeout(removeEnhancedClass, 8000); // BUT if JS doesn't load, we don't want the enhanced styles anymore

        script.onload = function() {
          clearTimeout(fallback);
          addEnhancedClass(); // Can't cancel the request, so we need to add this here in case we removed it with the setTimeout and the javascript ends up loaded.
        };
      }
    })();
  `}}
/>
);
