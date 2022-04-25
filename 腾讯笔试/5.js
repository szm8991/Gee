// 输入一个递增序列——key,val
// 输入一个操作序列——target,anchor1,anchor2
// 输出操作后的序列
function solve(mapStr, operateStr) {
  let map = new Map();
  mapStr.split('\n').map(item => {
    let arr = item.split(',');
    map.set(arr[0], parseInt(arr[1]));
  });
  //特殊处理操作符0
  map.set('0', Infinity);
  let operate = operateStr.split(',');
  let targetVal = map.get(operate[0]);
  let endVal = map.get(operate[1]);
  let res = new Map();
  for (const [key, val] of map.entries()) {
    // 1.找到了要移动的字符，不记录跳过，最后再记录
    if (key == operate[0]) continue;
    // 3.在开始锚点和终止锚点之间，记录当前节点的val=前一个节点的val
    if (val >= targetVal && endVal >= val) {
      res.set(key, targetVal);
      targetVal = val;
    }
    // 2.在开始锚点和终止锚点之外，直接记录
    else {
      res.set(key, val);
    }
    // 4.在终止锚点之前，记录当前节点的val=终止锚点的val
    if (key == operate[1]) {
      res.set(operate[0], targetVal);
    }
  }
  // 别忘了把0删掉
  res.delete('0');
  console.log(res);
  return res;
}
let mapStr = 'a,1\nb,3\nc,6\nd,8\ne,9\nf,19';
let operateStr1 = 'b,f,0';
let operateStr2 = 'a,d,e';
solve(mapStr, operateStr1);
solve(mapStr, operateStr2);
