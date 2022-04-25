// 实现指定深度的数字扁平化
let arr = JSON.parse('[1,[2,[3,[4,[7]]],5]]');
let deep = parseInt('2');
function flatten(arr, deep) {
  if (deep == 0) return arr;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i], --deep));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(JSON.stringify(flatten(arr, deep)));
console.log(JSON.stringify(arr.flat(deep)));
