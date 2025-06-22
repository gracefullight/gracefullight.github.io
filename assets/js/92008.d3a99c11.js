"use strict";(self.webpackChunkgracefullight_github_io=self.webpackChunkgracefullight_github_io||[]).push([["92008"],{12820:function(e,t,a){function r(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}a.d(t,{A:()=>r}),(0,a(79486).eW)(r,"populateCommonDb")},41843:function(e,t,a){a.d(t,{diagram:()=>D});var r=a(12820),i=a(27066),l=a(43726),n=a(79486),s=a(85653),o={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},c={axes:[],curves:[],options:o},d=structuredClone(c),g=n.vZ.radar,u=(0,n.eW)(()=>(0,i.Rb)({...g,...(0,n.iE)().radar}),"getConfig"),h=(0,n.eW)(()=>d.axes,"getAxes"),p=(0,n.eW)(()=>d.curves,"getCurves"),x=(0,n.eW)(()=>d.options,"getOptions"),m=(0,n.eW)(e=>{d.axes=e.map(e=>({name:e.name,label:e.label??e.name}))},"setAxes"),f=(0,n.eW)(e=>{d.curves=e.map(e=>({name:e.name,label:e.label??e.name,entries:$(e.entries)}))},"setCurves"),$=(0,n.eW)(e=>{if(void 0==e[0].axis)return e.map(e=>e.value);let t=h();if(0===t.length)throw Error("Axes must be populated before curves for reference entries");return t.map(t=>{let a=e.find(e=>e.axis?.$refText===t.name);if(void 0===a)throw Error("Missing entry for axis "+t.label);return a.value})},"computeCurveEntries"),y={getAxes:h,getCurves:p,getOptions:x,setAxes:m,setCurves:f,setOptions:(0,n.eW)(e=>{let t=e.reduce((e,t)=>(e[t.name]=t,e),{});d.options={showLegend:t.showLegend?.value??o.showLegend,ticks:t.ticks?.value??o.ticks,max:t.max?.value??o.max,min:t.min?.value??o.min,graticule:t.graticule?.value??o.graticule}},"setOptions"),getConfig:u,clear:(0,n.eW)(()=>{(0,n.ZH)(),d=structuredClone(c)},"clear"),setAccTitle:n.GN,getAccTitle:n.eu,setDiagramTitle:n.g2,getDiagramTitle:n.Kr,getAccDescription:n.Mx,setAccDescription:n.U$},v=(0,n.eW)(e=>{(0,r.A)(e,y);let{axes:t,curves:a,options:i}=e;y.setAxes(t),y.setCurves(a),y.setOptions(i)},"populate"),b={parse:(0,n.eW)(async e=>{let t=await (0,s.Qc)("radar",e);n.cM.debug(t),v(t)},"parse")},w=(0,n.eW)((e,t,a,r)=>{let i=r.db,n=i.getAxes(),s=i.getCurves(),o=i.getOptions(),c=i.getConfig(),d=i.getDiagramTitle(),g=M((0,l.P)(t),c),u=o.max??Math.max(...s.map(e=>Math.max(...e.entries))),h=o.min,p=Math.min(c.width,c.height)/2;W(g,n,p,o.ticks,o.graticule),C(g,n,p,c),L(g,n,s,h,u,o.graticule,c),A(g,s,o.showLegend,c),g.append("text").attr("class","radarTitle").text(d).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),M=(0,n.eW)((e,t)=>{let a=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return e.attr("viewbox",`0 0 ${a} ${r}`).attr("width",a).attr("height",r),e.append("g").attr("transform",`translate(${i.x}, ${i.y})`)},"drawFrame"),W=(0,n.eW)((e,t,a,r,i)=>{if("circle"===i)for(let t=0;t<r;t++){let i=a*(t+1)/r;e.append("circle").attr("r",i).attr("class","radarGraticule")}else if("polygon"===i){let i=t.length;for(let l=0;l<r;l++){let n=a*(l+1)/r,s=t.map((e,t)=>{let a=2*t*Math.PI/i-Math.PI/2,r=n*Math.cos(a),l=n*Math.sin(a);return`${r},${l}`}).join(" ");e.append("polygon").attr("points",s).attr("class","radarGraticule")}}},"drawGraticule"),C=(0,n.eW)((e,t,a,r)=>{let i=t.length;for(let l=0;l<i;l++){let n=t[l].label,s=2*l*Math.PI/i-Math.PI/2;e.append("line").attr("x1",0).attr("y1",0).attr("x2",a*r.axisScaleFactor*Math.cos(s)).attr("y2",a*r.axisScaleFactor*Math.sin(s)).attr("class","radarAxisLine"),e.append("text").text(n).attr("x",a*r.axisLabelFactor*Math.cos(s)).attr("y",a*r.axisLabelFactor*Math.sin(s)).attr("class","radarAxisLabel")}},"drawAxes");function L(e,t,a,r,i,l,n){let s=t.length,o=Math.min(n.width,n.height)/2;a.forEach((t,a)=>{if(t.entries.length!==s)return;let c=t.entries.map((e,t)=>{let a=2*Math.PI*t/s-Math.PI/2,l=T(e,r,i,o);return{x:l*Math.cos(a),y:l*Math.sin(a)}});"circle"===l?e.append("path").attr("d",k(c,n.curveTension)).attr("class",`radarCurve-${a}`):"polygon"===l&&e.append("polygon").attr("points",c.map(e=>`${e.x},${e.y}`).join(" ")).attr("class",`radarCurve-${a}`)})}function T(e,t,a,r){return r*(Math.min(Math.max(e,t),a)-t)/(a-t)}function k(e,t){let a=e.length,r=`M${e[0].x},${e[0].y}`;for(let i=0;i<a;i++){let l=e[(i-1+a)%a],n=e[i],s=e[(i+1)%a],o=e[(i+2)%a],c={x:n.x+(s.x-l.x)*t,y:n.y+(s.y-l.y)*t},d={x:s.x-(o.x-n.x)*t,y:s.y-(o.y-n.y)*t};r+=` C${c.x},${c.y} ${d.x},${d.y} ${s.x},${s.y}`}return`${r} Z`}function A(e,t,a,r){if(!a)return;let i=(r.width/2+r.marginRight)*3/4,l=-(3*(r.height/2+r.marginTop))/4;t.forEach((t,a)=>{let r=e.append("g").attr("transform",`translate(${i}, ${l+20*a})`);r.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${a}`),r.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(t.label)})}(0,n.eW)(L,"drawCurves"),(0,n.eW)(T,"relativeRadius"),(0,n.eW)(k,"closedRoundCurve"),(0,n.eW)(A,"drawLegend");var O=(0,n.eW)((e,t)=>{let a="";for(let r=0;r<e.THEME_COLOR_LIMIT;r++){let i=e[`cScale${r}`];a+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return a},"genIndexStyles"),S=(0,n.eW)(e=>{let t=(0,n.xN)(),a=(0,n.iE)(),r=(0,i.Rb)(t,a.themeVariables),l=(0,i.Rb)(r.radar,e);return{themeVariables:r,radarOptions:l}},"buildRadarStyleOptions"),D={parser:b,db:y,renderer:{draw:w},styles:(0,n.eW)(({radar:e}={})=>{let{themeVariables:t,radarOptions:a}=S(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${a.axisColor};
		stroke-width: ${a.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${a.axisLabelFontSize}px;
		color: ${a.axisColor};
	}
	.radarGraticule {
		fill: ${a.graticuleColor};
		fill-opacity: ${a.graticuleOpacity};
		stroke: ${a.graticuleColor};
		stroke-width: ${a.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${a.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${O(t,a)}
	`},"styles")}}}]);