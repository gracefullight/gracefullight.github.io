"use strict";(self.webpackChunkgracefullight_github_io=self.webpackChunkgracefullight_github_io||[]).push([["51412"],{72996:function(t,e,i){i.d(e,{CP:()=>c,HT:()=>u,PB:()=>h,aC:()=>o,lC:()=>s,m:()=>l,tk:()=>a});var r=i(20962),n=i(41407),a=(0,r.K2)((t,e)=>{let i=t.append("rect");if(i.attr("x",e.x),i.attr("y",e.y),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("width",e.width),i.attr("height",e.height),e.name&&i.attr("name",e.name),e.rx&&i.attr("rx",e.rx),e.ry&&i.attr("ry",e.ry),void 0!==e.attrs)for(let t in e.attrs)i.attr(t,e.attrs[t]);return e.class&&i.attr("class",e.class),i},"drawRect"),s=(0,r.K2)((t,e)=>{a(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,stroke:e.stroke,class:"rect"}).lower()},"drawBackgroundRect"),l=(0,r.K2)((t,e)=>{let i=e.text.replace(r.H1," "),n=t.append("text");n.attr("x",e.x),n.attr("y",e.y),n.attr("class","legend"),n.style("text-anchor",e.anchor),e.class&&n.attr("class",e.class);let a=n.append("tspan");return a.attr("x",e.x+2*e.textMargin),a.text(i),n},"drawText"),o=(0,r.K2)((t,e,i,r)=>{let a=t.append("image");a.attr("x",e),a.attr("y",i);let s=(0,n.sanitizeUrl)(r);a.attr("xlink:href",s)},"drawImage"),c=(0,r.K2)((t,e,i,r)=>{let a=t.append("use");a.attr("x",e),a.attr("y",i);let s=(0,n.sanitizeUrl)(r);a.attr("xlink:href",`#${s}`)},"drawEmbeddedImage"),h=(0,r.K2)(()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),"getNoteRect"),u=(0,r.K2)(()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0}),"getTextObj")},25535:function(t,e,i){i.d(e,{diagram:()=>R});var r=i(72996),n=i(20962),a=i(44424),s=function(){var t=(0,n.K2)(function(t,e,i,r){for(i=i||{},r=t.length;r--;i[t[r]]=e);return i},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],r=[1,10],a=[1,11],s=[1,12],l=[1,13],o=[1,14],c={trace:(0,n.K2)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:(0,n.K2)(function(t,e,i,r,n,a,s){var l=a.length-1;switch(n){case 1:return a[l-1];case 2:case 6:case 7:this.$=[];break;case 3:a[l-1].push(a[l]),this.$=a[l-1];break;case 4:case 5:this.$=a[l];break;case 8:r.setDiagramTitle(a[l].substr(6)),this.$=a[l].substr(6);break;case 9:this.$=a[l].trim(),r.setAccTitle(this.$);break;case 10:case 11:this.$=a[l].trim(),r.setAccDescription(this.$);break;case 12:r.addSection(a[l].substr(8)),this.$=a[l].substr(8);break;case 13:r.addTask(a[l-1],a[l]),this.$="task"}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:r,14:a,16:s,17:l,18:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:r,14:a,16:s,17:l,18:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:(0,n.K2)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,n.K2)(function(t){var e=this,i=[0],r=[],a=[null],s=[],l=this.table,o="",c=0,h=0,u=0,p=s.slice.call(arguments,1),y=Object.create(this.lexer),d={};for(var f in this.yy)Object.prototype.hasOwnProperty.call(this.yy,f)&&(d[f]=this.yy[f]);y.setInput(t,d),d.lexer=y,d.parser=this,void 0===y.yylloc&&(y.yylloc={});var g=y.yylloc;s.push(g);var x=y.options&&y.options.ranges;function m(){var t;return"number"!=typeof(t=r.pop()||y.lex()||1)&&(t instanceof Array&&(t=(r=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof d.parseError?this.parseError=d.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,n.K2)(function(t){i.length=i.length-2*t,a.length=a.length-t,s.length=s.length-t},"popStack"),(0,n.K2)(m,"lex");for(var k,_,b,v,K,w,$,M,T,S={};;){if(b=i[i.length-1],this.defaultActions[b]?v=this.defaultActions[b]:(null==k&&(k=m()),v=l[b]&&l[b][k]),void 0===v||!v.length||!v[0]){var E="";for(w in T=[],l[b])this.terminals_[w]&&w>2&&T.push("'"+this.terminals_[w]+"'");E=y.showPosition?"Parse error on line "+(c+1)+":\n"+y.showPosition()+"\nExpecting "+T.join(", ")+", got '"+(this.terminals_[k]||k)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==k?"end of input":"'"+(this.terminals_[k]||k)+"'"),this.parseError(E,{text:y.match,token:this.terminals_[k]||k,line:y.yylineno,loc:g,expected:T})}if(v[0]instanceof Array&&v.length>1)throw Error("Parse Error: multiple actions possible at state: "+b+", token: "+k);switch(v[0]){case 1:i.push(k),a.push(y.yytext),s.push(y.yylloc),i.push(v[1]),k=null,_?(k=_,_=null):(h=y.yyleng,o=y.yytext,c=y.yylineno,g=y.yylloc,u>0&&u--);break;case 2:if($=this.productions_[v[1]][1],S.$=a[a.length-$],S._$={first_line:s[s.length-($||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-($||1)].first_column,last_column:s[s.length-1].last_column},x&&(S._$.range=[s[s.length-($||1)].range[0],s[s.length-1].range[1]]),void 0!==(K=this.performAction.apply(S,[o,h,c,d,v[1],a,s].concat(p))))return K;$&&(i=i.slice(0,-1*$*2),a=a.slice(0,-1*$),s=s.slice(0,-1*$)),i.push(this.productions_[v[1]][0]),a.push(S.$),s.push(S._$),M=l[i[i.length-2]][i[i.length-1]],i.push(M);break;case 3:return!0}}return!0},"parse")};function h(){this.yy={}}return c.lexer={EOF:1,parseError:(0,n.K2)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,n.K2)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,n.K2)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,n.K2)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var r=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var n=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===r.length?this.yylloc.first_column:0)+r[r.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[n[0],n[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,n.K2)(function(){return this._more=!0,this},"more"),reject:(0,n.K2)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,n.K2)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,n.K2)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,n.K2)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,n.K2)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,n.K2)(function(t,e){var i,r,n;if(this.options.backtrack_lexer&&(n={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(n.yylloc.range=this.yylloc.range.slice(0))),(r=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var a in n)this[a]=n[a];return!1},"test_match"),next:(0,n.K2)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,r,n=this._currentRules(),a=0;a<n.length;a++)if((i=this._input.match(this.rules[n[a]]))&&(!e||i[0].length>e[0].length)){if(e=i,r=a,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,n[a])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,n[r]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,n.K2)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,n.K2)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,n.K2)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,n.K2)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,n.K2)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,n.K2)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,n.K2)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,n.K2)(function(t,e,i,r){switch(i){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}},(0,n.K2)(h,"Parser"),h.prototype=c,c.Parser=h,new h}();s.parser=s;var l="",o=[],c=[],h=[],u=(0,n.K2)(function(){o.length=0,c.length=0,l="",h.length=0,(0,n.IU)()},"clear"),p=(0,n.K2)(function(t){l=t,o.push(t)},"addSection"),y=(0,n.K2)(function(){return o},"getSections"),d=(0,n.K2)(function(){let t=m(),e=0;for(;!t&&e<100;)t=m(),e++;return c.push(...h),c},"getTasks"),f=(0,n.K2)(function(){let t=[];return c.forEach(e=>{e.people&&t.push(...e.people)}),[...new Set(t)].sort()},"updateActors"),g=(0,n.K2)(function(t,e){let i=e.substr(1).split(":"),r=0,n=[];1===i.length?(r=Number(i[0]),n=[]):(r=Number(i[0]),n=i[1].split(","));let a=n.map(t=>t.trim()),s={section:l,type:l,people:a,task:t,score:r};h.push(s)},"addTask"),x=(0,n.K2)(function(t){let e={section:l,type:l,description:t,task:t,classes:[]};c.push(e)},"addTaskOrg"),m=(0,n.K2)(function(){let t=(0,n.K2)(function(t){return h[t].processed},"compileTask"),e=!0;for(let[i,r]of h.entries())t(i),e=e&&r.processed;return e},"compileTasks"),k=(0,n.K2)(function(){return f()},"getActors"),_={getConfig:(0,n.K2)(()=>(0,n.D7)().journey,"getConfig"),clear:u,setDiagramTitle:n.ke,getDiagramTitle:n.ab,setAccTitle:n.SV,getAccTitle:n.iN,setAccDescription:n.EI,getAccDescription:n.m7,addSection:p,getSections:y,getTasks:d,addTask:g,addTaskOrg:x,getActors:k},b=(0,n.K2)(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),v=(0,n.K2)(function(t,e){return(0,r.tk)(t,e)},"drawRect"),K=(0,n.K2)(function(t,e){let i=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),r=t.append("g");function s(t){let i=(0,a.JLW)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function l(t){let i=(0,a.JLW)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(15/2.2);t.append("path").attr("class","mouth").attr("d",i).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function o(t){t.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return r.append("circle").attr("cx",e.cx-5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),r.append("circle").attr("cx",e.cx+5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),(0,n.K2)(s,"smile"),(0,n.K2)(l,"sad"),(0,n.K2)(o,"ambivalent"),e.score>3?s(r):e.score<3?l(r):o(r),i},"drawFace"),w=(0,n.K2)(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),void 0!==i.class&&i.attr("class",i.class),void 0!==e.title&&i.append("title").text(e.title),i},"drawCircle"),$=(0,n.K2)(function(t,e){return(0,r.m)(t,e)},"drawText"),M=(0,n.K2)(function(t,e,i){let n=t.append("g"),a=(0,r.PB)();a.x=e.x,a.y=e.y,a.fill=e.fill,a.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),a.height=i.height,a.class="journey-section section-type-"+e.num,a.rx=3,a.ry=3,v(n,a),E(i)(e.text,n,a.x,a.y,a.width,a.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),T=-1,S=(0,n.K2)(function(t,e,i){let n=e.x+i.width/2,a=t.append("g");T++,a.append("line").attr("id","task"+T).attr("x1",n).attr("y1",e.y).attr("x2",n).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),K(a,{cx:n,cy:300+(5-e.score)*30,score:e.score});let s=(0,r.PB)();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=i.width,s.height=i.height,s.class="task task-type-"+e.num,s.rx=3,s.ry=3,v(a,s);let l=e.x+14;e.people.forEach(t=>{let i=e.actors[t].color;w(a,{cx:l,cy:e.y,r:7,fill:i,stroke:"#000",title:t,pos:e.actors[t].position}),l+=10}),E(i)(e.task,a,s.x,s.y,s.width,s.height,{class:"task"},i,e.colour)},"drawTask"),E=function(){function t(t,e,i,n,a,s,l,o){r(e.append("text").attr("x",i+a/2).attr("y",n+s/2+5).style("font-color",o).style("text-anchor","middle").text(t),l)}function e(t,e,i,n,a,s,l,o,c){let{taskFontSize:h,taskFontFamily:u}=o,p=t.split(/<br\s*\/?>/gi);for(let t=0;t<p.length;t++){let o=t*h-h*(p.length-1)/2,y=e.append("text").attr("x",i+a/2).attr("y",n).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",u);y.append("tspan").attr("x",i+a/2).attr("dy",o).text(p[t]),y.attr("y",n+s/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),r(y,l)}}function i(t,i,n,a,s,l,o,c){let h=i.append("switch"),u=h.append("foreignObject").attr("x",n).attr("y",a).attr("width",s).attr("height",l).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");u.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,n,a,s,l,o,c),r(u,o)}function r(t,e){for(let i in e)i in e&&t.attr(i,e[i])}return(0,n.K2)(t,"byText"),(0,n.K2)(e,"byTspan"),(0,n.K2)(i,"byFo"),(0,n.K2)(r,"_setTextAttrs"),function(r){return"fo"===r.textPlacement?i:"old"===r.textPlacement?t:e}}(),I=(0,n.K2)(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),P=(0,n.K2)(function(t){Object.keys(t).forEach(function(e){j[e]=t[e]})},"setConf"),A={};function C(t){let e=(0,n.D7)().journey,i=60;Object.keys(A).forEach(r=>{let n=A[r].color;w(t,{cx:20,cy:i,r:7,fill:n,stroke:"#000",pos:A[r].position}),$(t,{x:40,y:i+7,fill:"#666",text:r,textMargin:5|e.boxTextMargin}),i+=20})}(0,n.K2)(C,"drawActorLegend");var j=(0,n.D7)().journey,D=j.leftMargin,V=(0,n.K2)(function(t,e,i,r){let s,l=(0,n.D7)().journey,o=(0,n.D7)().securityLevel;"sandbox"===o&&(s=(0,a.Ltv)("#i"+e));let c="sandbox"===o?(0,a.Ltv)(s.nodes()[0].contentDocument.body):(0,a.Ltv)("body");L.init();let h=c.select("#"+e);I(h);let u=r.db.getTasks(),p=r.db.getDiagramTitle(),y=r.db.getActors();for(let t in A)delete A[t];let d=0;y.forEach(t=>{A[t]={color:l.actorColours[d%l.actorColours.length],position:d},d++}),C(h),L.insert(0,0,D,50*Object.keys(A).length),B(h,u,0);let f=L.getBounds();p&&h.append("text").text(p).attr("x",D).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);let g=f.stopy-f.starty+2*l.diagramMarginY,x=D+f.stopx+2*l.diagramMarginX;(0,n.a$)(h,g,x,l.useMaxWidth),h.append("line").attr("x1",D).attr("y1",4*l.height).attr("x2",x-D-4).attr("y2",4*l.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let m=70*!!p;h.attr("viewBox",`${f.startx} -25 ${x} ${g+m}`),h.attr("preserveAspectRatio","xMinYMin meet"),h.attr("height",g+m+25)},"draw"),L={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:(0,n.K2)(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:(0,n.K2)(function(t,e,i,r){void 0===t[e]?t[e]=i:t[e]=r(i,t[e])},"updateVal"),updateBounds:(0,n.K2)(function(t,e,i,r){let a=(0,n.D7)().journey,s=this,l=0;function o(o){return(0,n.K2)(function(n){l++;let c=s.sequenceItems.length-l+1;s.updateVal(n,"starty",e-c*a.boxMargin,Math.min),s.updateVal(n,"stopy",r+c*a.boxMargin,Math.max),s.updateVal(L.data,"startx",t-c*a.boxMargin,Math.min),s.updateVal(L.data,"stopx",i+c*a.boxMargin,Math.max),"activation"!==o&&(s.updateVal(n,"startx",t-c*a.boxMargin,Math.min),s.updateVal(n,"stopx",i+c*a.boxMargin,Math.max),s.updateVal(L.data,"starty",e-c*a.boxMargin,Math.min),s.updateVal(L.data,"stopy",r+c*a.boxMargin,Math.max))},"updateItemBounds")}(0,n.K2)(o,"updateFn"),this.sequenceItems.forEach(o())},"updateBounds"),insert:(0,n.K2)(function(t,e,i,r){let n=Math.min(t,i),a=Math.max(t,i),s=Math.min(e,r),l=Math.max(e,r);this.updateVal(L.data,"startx",n,Math.min),this.updateVal(L.data,"starty",s,Math.min),this.updateVal(L.data,"stopx",a,Math.max),this.updateVal(L.data,"stopy",l,Math.max),this.updateBounds(n,s,a,l)},"insert"),bumpVerticalPos:(0,n.K2)(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:(0,n.K2)(function(){return this.verticalPos},"getVerticalPos"),getBounds:(0,n.K2)(function(){return this.data},"getBounds")},F=j.sectionFills,O=j.sectionColours,B=(0,n.K2)(function(t,e,i){let r=(0,n.D7)().journey,a="",s=i+(2*r.height+r.diagramMarginY),l=0,o="#CCC",c="black",h=0;for(let[i,n]of e.entries()){if(a!==n.section){o=F[l%F.length],h=l%F.length,c=O[l%O.length];let s=0,u=n.section;for(let t=i;t<e.length;t++)if(e[t].section==u)s+=1;else break;M(t,{x:i*r.taskMargin+i*r.width+D,y:50,text:n.section,fill:o,num:h,colour:c,taskCount:s},r),a=n.section,l++}let u=n.people.reduce((t,e)=>(A[e]&&(t[e]=A[e]),t),{});n.x=i*r.taskMargin+i*r.width+D,n.y=s,n.width=r.diagramMarginX,n.height=r.diagramMarginY,n.colour=c,n.fill=o,n.num=h,n.actors=u,S(t,n,r),L.insert(n.x,n.y,n.x+n.width+r.taskMargin,450)}},"drawTasks"),N={setConf:P,draw:V},R={parser:s,db:_,renderer:N,styles:b,init:(0,n.K2)(t=>{N.setConf(t.journey),_.clear()},"init")}}}]);