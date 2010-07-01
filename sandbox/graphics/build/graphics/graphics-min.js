YUI.add("graphics",function(D){var C=function(E){this.initializer.apply(this,arguments);};C.prototype={initializer:function(E){this._dummy=this._createDummy();this._canvas=this._createGraphic();this._context=this._canvas.getContext("2d");this._initProps();},_reHex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,_2RGBA:function(F,E){E=(E!==undefined)?E:1;if(this._reHex.exec(F)){F="rgba("+[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)].join(",")+","+E+")";}return F;},_createDummy:function(){var E=D.config.doc.createElement("div");E.style.height=0;E.style.width=0;E.style.overflow="hidden";D.config.doc.documentElement.appendChild(E);return E;},_createGraphic:function(E){var F=D.config.doc.createElement("canvas");F.width=600;F.height=600;return F;},_2RGB:function(E){this._dummy.style.background=E;return this._dummy.style.backgroundColor;},beginBitmapFill:function(G,E,F){return this;},beginFill:function(E,G){var F=this._context;F.beginPath();if(E){if(G){E=this._2RGBA(E,G);}else{E=this._2RGB(E);}this._fillColor=E;this._fillType="solid";}return this;},beginGradientFill:function(H,F,E,I,G){this._fillType=H;this._fillColors=F;this._fillRatios=I;if(G){this._fillRotation=G.rotation||0;this._fillWidth=G.width||null;this._fillHeight=G.height||null;this._fillX=G.x||null;this._fillY=G.y||null;}this._context.beginPath();return this;},_initProps:function(){var E=this._context;E.fillStyle="rgba(0, 0, 0, 1)";E.lineWidth=1;E.lineJoin="miter";E.miterLimit=3;E.strokeStyle="rgba(0, 0, 0, 1)";this._width=0;this._height=0;this._x=0;this._y=0;this._fillType=null;this._stroke=null;},clear:function(){this._initProps();this._canvas.width=this._canvas.width;return this;},curveTo:function(G,F,E,H){this._context.quadraticCurveTo(G,F,E,H);return this;},drawCircle:function(F,J,E){var I=this._context,H=0*Math.PI/180,G=360*Math.PI/180;this._trackPos(F,J);this._trackSize(E*2,E*2);I.arc(F,J,E,H,G,false);return this;},drawEllipse:function(E,K,F,J){var I=this._context,H=0*Math.PI/180,G=360*Math.PI/180;this._trackPos(E,K);this._trackSize(F,J);I.arc(E+F/2,K+J/2,F/2,H,G,false);return this;},drawRect:function(E,H,F,G){this.moveTo(E,H).lineTo(E+F,H).lineTo(E+F,H+G).lineTo(E,H+G).lineTo(E,H);this._trackPos(E,H);this._trackSize(F,G);return this;},drawRoundRect:function(E,K,G,I,H,J){var F=this._context;F.moveTo(E,K+J);F.lineTo(E,K+I-J);F.quadraticCurveTo(E,K+I,E+H,K+I);F.lineTo(E+G-H,K+I);F.quadraticCurveTo(E+G,K+I,E+G,K+I-J);F.lineTo(E+G,K+J);F.quadraticCurveTo(E+G,K,E+G-H,K);F.lineTo(E+H,K);F.quadraticCurveTo(E,K,E,K+J);this._trackPos(E,K);this._trackSize(G,I);return this;},_getFill:function(){var E=this._fillType,F;switch(E){case"linear":F=this._getLinearGradient("fill");break;case"radial":F=this._getRadialGradient("fill");break;case"solid":F=this._fillColor;break;}return F;},_getLinearGradient:function(J){var I="_"+J,O=this[I+"Colors"],S=this[I+"Ratios"],Q=this._fillWidth||this._width,a=this._fillHeight||this._height,P=this._fillX||this._x,N=this._fillY||this._y,V=this._context,U=this[I+"Rotation"],Y,W,X,M,R,L,b,Z,H,F,G=P+Q/2,E=N+a/2,K=Math.PI/180,T=parseFloat(parseFloat(Math.tan(U*K)).toFixed(8));if(Math.abs(T)*Q/2>=a/2){if(U<180){H=N;F=N+a;}else{H=N+a;F=N;}b=G-((E-H)/T);Z=G-((E-F)/T);}else{if(U>90&&U<270){b=P+Q;Z=P;}else{b=P;Z=P+Q;}H=((T*(G-b))-E)*-1;F=((T*(G-Z))-E)*-1;}L=V.createLinearGradient(b,H,Z,F);W=O.length;R=0;for(Y=0;Y<W;++Y){X=O[Y];M=S[Y]||R;L.addColorStop(M,X);R=(Y+1)/W;}return L;},_getRadialGradient:function(N){var F="_"+N,E=this[F+"Colors"],K=this[F+"Ratios"],J,H,R=this._fillWidth||this._width,L=this._fillHeight||this._height,P=this._fillX||this._x,O=this._fillY||this._y,I,M,G,Q,S=this._context;Q=S.createRadialGradient(P,O,1,P,O,R);H=E.length;G=0;for(J=0;J<H;++J){I=E[J];M=K[J]||G;Q.addColorStop(M,I);G=(J+1)/H;}return Q;},end:function(){var E=this._context,F;if(this._fillType){F=this._getFill();if(F){E.fillStyle=F;}E.closePath();}if(this._fillType){E.fill();}if(this._stroke){E.stroke();}this._initProps();return this;},lineGradientStyle:function(){return this;},lineStyle:function(L,I,H,K,M,G,E,J){I=I||"#000000";var F=this._context;if(this._stroke){F.stroke();}F.lineWidth=L;if(L){this._stroke=1;}else{this._stroke=0;}if(I){F.strokeStyle=I;if(H){F.strokeStyle=this._2RGBA(F.strokeStyle,H);}}if(!this._fill){F.beginPath();}if(G==="butt"){G="none";}if(F.lineCap){}return this;},lineTo:function(K,J,G){var F=arguments,I=this._context,H,E;if(typeof K==="string"||typeof K==="number"){F=[[K,J]];}for(H=0,E=F.length;H<E;++H){I.lineTo(F[H][0],F[H][1]);this._trackSize.apply(this,F[H]);}return this;},moveTo:function(E,F){this._context.moveTo(E,F);this._trackPos(E,F);return this;},setSize:function(E,F){this._node.style.width=E+"px";this._node.style.height=F+"px";this._canvas.width=E;this._canvas.height=F;},_node:null,render:function(E){E=E||D.config.doc.body;this._node=document.createElement("div");this._node.style.width=E.offsetWidth+"px";this._node.style.height=E.offsetHeight+"px";this._node.style.display="block";this._node.style.position="absolute";this._node.style.left=E.style.left;this._node.style.top=E.style.top;E.appendChild(this._node);this._node.appendChild(this._canvas);this._canvas.width=E.offsetWidth>0?E.offsetWidth:100;this._canvas.height=E.offsetHeight>0?E.offsetHeight:100;return this;},_trackSize:function(E,F){if(E>this._width){this._width=E;}if(F>this._height){this._height=F;}},_trackPos:function(E,F){if(E>this._x){this._x=E;}if(F>this._y){this._y=F;}}};D.Graphic=C;var A=function(E){this.initializer.apply(this,arguments);};A.prototype={initializer:function(F){F=F||{};var E=F.width||0,G=F.height||0;this._vml=this._createGraphics();this.setSize(E,G);this._initProps();},_initProps:function(){this._fillColor=null;this._strokeColor=null;this._strokeWeight=0;this._fillProps=null;this._path="";this._width=0;this._height=0;this._x=0;this._y=0;this._fill=null;this._stroke=0;this._stroked=false;},_createGraphics:function(){var E=this._createGraphicNode("group");E.style.display="inline-block";E.style.position="absolute";
return E;},beginBitmapFill:function(){return this;},beginFill:function(E,F){if(E){if(F){this._fillProps={type:"solid",opacity:F};}this._fillColor=E;this._fill=1;}return this;},beginGradientFill:function(K,E,F,H,I){var G=0,J,L,N={colors:""},M=0;if(K==="linear"){if(I){M=I.rotation||0;}if(M>0&&M<=90){M=450-M;}else{if(M<=270){M=270-M;}else{if(M<=360){M=630-M;}else{M=270;}}}N.type="gradientunscaled";N.angle=M;}else{if(K==="radial"){N.type="gradientradial";N.focus="100%";N.focusposition="50%,50%";}}J=E.length;for(;G<J;++G){L=H[G]||G/(J-1);L=Math.round(100*L)+"%";N.colors+=", "+L+" "+E[G];}N.colors=N.colors.substr(2);this._fillProps=N;return this;},clear:function(){this._path="";return this;},curveTo:function(G,F,E,H){return this;},drawCircle:function(E,J,G,I,F,H){this._width=this._height=G*2;this._x=E-G;this._y=J-G;this._shape="oval";return this;},drawEllipse:function(E,H,F,G){this._width=F;this._height=G;this._x=E;this._y=H;this._shape="oval";return this;},drawRect:function(E,H,F,G){this.moveTo(E,H);this.lineTo(E+F,H);this.lineTo(E+F,H+G);this.lineTo(E,H+G);this.lineTo(E,H);},getShape:function(E){},_trackSize:function(E,F){if(E>this._width){this._width=E;}if(F>this._height){this._height=F;}},_shape:"shape",drawRoundRect:function(E,J,G,I,F,H){return this;},end:function(){var G=this._createGraphicNode(this._shape),E=this._width,H=this._height,F=this._fillProps,J,I;if(this._path){if(this._fill){this._path+=" x";}this._path+=" e";G.path=this._path;G.coordSize=E+", "+H;}else{G.style.display="block";G.style.position="absolute";G.style.left=this._x+"px";G.style.top=this._y+"px";}if(this._fill){G.fillColor=this._fillColor;}else{G.filled=false;}if(this._stroke){G.strokeColor=this._strokeColor;G.strokeWeight=this._strokeWeight;}else{G.stroked=false;}G.style.width=E+"px";G.style.height=H+"px";if(F){I=this._createGraphicNode("fill");for(J in F){if(F.hasOwnProperty(J)){I.setAttribute(J,F[J]);}}G.filled=true;G.appendChild(I);}this._vml.appendChild(G);this._initProps();return this;},lineGradientStyle:function(){return this;},lineStyle:function(H,G,L,J,I,K,E,F){this._stroke=1;this._strokeWeight=H*0.7;this._strokeColor=G;return this;},lineTo:function(J,I,G){var F=arguments,H,E;if(typeof J==="string"||typeof J==="number"){F=[[J,I]];}E=F.length;this._shape="shape";this._path+=" l ";for(H=0;H<E;++H){this._path+=" "+F[H][0]+", "+F[H][1];this._trackSize.apply(this,F[H]);}return this;},moveTo:function(E,F){this._path+=" m "+E+", "+F;return this;},setSize:function(E,F){this._vml.style.width=E+"px";this._vml.style.height=F+"px";this._vml.coordSize=E+" "+F;},_createGraphicNode:function(E){return document.createElement("<"+E+' xmlns="urn:schemas-microsft.com:vml" class="vml'+E+'"/>');},render:function(G){var E=G.offsetWidth,F=G.offsetHeight;G=G||D.config.doc.body;G.appendChild(this._vml);this.setSize(E,F);this._initProps();return this;}};if(D.UA.ie){var B=document.createStyleSheet();B.addRule(".vmlgroup","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmlgroup","display:inline-block",B.rules.length);B.addRule(".vmlgroup","zoom:1",B.rules.length);B.addRule(".vmlshape","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmlshape","display:inline-block",B.rules.length);B.addRule(".vmloval","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmloval","display:inline-block",B.rules.length);B.addRule(".vmlrect","behavior:url(#default#VML)",B.rules.length);B.addRule(".vmlrect","display:block",B.rules.length);B.addRule(".vmlfill","behavior:url(#default#VML)",B.rules.length);D.Graphic=A;}},"@VERSION@");