const canvas = document.querySelector('#terrain');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
let seed = 224;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
function rectangle(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
for (let y = 0; y < height; y++) {
  rectangle(0, y, width, 1, 'rgb(' + [20+y*.12,31+y*.21,24+y*.11].map(Math.floor).join(',') + ')');
}
for (let i = 0; i < 132; i++) {
  rectangle(Math.floor(random()*width), Math.floor(random()*145), 1, 1, random() > .88 ? '#bdcf91' : '#5c7654');
}
for (let y = -30; y <= 30; y++) {
  const half = Math.floor(Math.sqrt(900 - y*y));
  rectangle(169-half, 73+y, half*2+1, 1, y > 15 ? '#bfd775' : '#def59a');
}
for (let i = 0; i < 22; i++) {
  const y = 78 + Math.floor(random()*55);
  rectangle(Math.floor(random()*236), y, 14+Math.floor(random()*32), 1, '#a6c17a24');
}
function ridge(points, color, texture) {
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i-1];
    const [x1, y1] = points[i];
    for (let x = x0; x < x1; x += 2) {
      const y = Math.floor((y0 + (y1-y0)*(x-x0)/(x1-x0))/2)*2 + Math.floor(random()*3)*2;
      rectangle(x,y,2,height-y,color);
      for (let j = 0; j < 5; j++) {
        rectangle(x,y+Math.floor(random()*41),2,2,texture);
      }
    }
  }
}
ridge([[0,124],[23,113],[43,85],[52,83],[68,105],[80,111],[94,96],[121,130],[140,140],[158,117],[169,119],[187,96],[207,121],[232,88],[251,101],[272,125]],'#485f38','#526943');
ridge([[0,125],[20,131],[39,111],[56,133],[76,138],[96,161],[117,156],[140,170],[169,160],[185,143],[207,151],[235,121],[250,113],[272,124]],'#34492c','#3d5332');
ridge([[0,148],[25,156],[54,179],[81,180],[115,202],[143,201],[165,194],[183,197],[207,173],[243,155],[272,147]],'#253923','#2c4128');
for (let y = 175; y < 240; y++) {
  const center = 151 + Math.sin(y*.092)*Math.max(4,(y-173)*.55);
  const span = Math.max(1,(y-174)*.24);
  rectangle(Math.floor(center-span),y,Math.ceil(span*2),1,y%5===0?'#708959':'#4d693e');
}
for (let i = 0; i < 66; i++) {
  const x = Math.floor(random()*272);
  const y = 168 + Math.floor(random()*75);
  if (x > 107 && x < 187) continue;
  const size = 3 + Math.floor(random()*9);
  for (let step = 0; step < size; step++) {
    const half = Math.floor(step*.46);
    rectangle(x-half,y-size+step,half*2+1,1,y>205?'#111e15':'#1a2c1b');
  }
  rectangle(x,y,1,2,'#192619');
}
