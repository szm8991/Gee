class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
// 输入环形链表片段的头节点数组
function solve(a) {
  let beforeVal = {}, //存储节点前驱节点val
    afterVal = {}, //存储节点后继节点val
    min = a[0].val; //记录环形链表的最小值
  let start;
  for (let i = 0; i < a.length; i++) {
    start = a[i];
    if (!start) return;
    min = Math.min(min, start.val);
    while (start.next) {
      afterVal[start.val] = start.next.val;
      beforeVal[start.next.val] = start.val;
      start = start.next;
      min = Math.min(min, start.val);
    }
  }
  let res = new ListNode(min);
  let tmp = res;
  // 前驱节点val更大，应该正向输出
  if (afterVal[min] < beforeVal[min]) {
    while (afterVal[tmp.val] != min) {
      tmp.next = new ListNode(afterVal[tmp.val]);
      tmp = tmp.next;
    }
  }
  // 后继节点val更大，应该反向输出
  else {
    while (beforeVal[tmp.val] != min) {
      tmp.next = new ListNode(beforeVal[tmp.val]);
      tmp = tmp.next;
    }
  }
  return res;
}
// [{1,2,3},{5,7,9},{2,3,5},{9,10,1,2}]
// {1，2，3, 5，7，9, 10}
function test1() {
  let list1 = new ListNode(1);
  list1.next = new ListNode(2);
  list1.next.next = new ListNode(3);
  let list2 = new ListNode(5);
  list2.next = new ListNode(7);
  list2.next.next = new ListNode(9);
  let list3 = new ListNode(2);
  list3.next = new ListNode(3);
  list3.next.next = new ListNode(5);
  let list4 = new ListNode(9);
  list4.next = new ListNode(10);
  list4.next.next = new ListNode(1);
  list4.next.next.next = new ListNode(2);
  console.log(solve([list1, list2, list3, list4]));
}
test1();
// [{10,2,3},{7,4,5,1,10},{3,7,4}]
// {1,5,4,7,3,2,10}
function test2() {
  let list1 = new ListNode(10);
  list1.next = new ListNode(2);
  list1.next.next = new ListNode(3);
  let list2 = new ListNode(7);
  list2.next = new ListNode(4);
  list2.next.next = new ListNode(5);
  list2.next.next.next = new ListNode(1);
  list2.next.next.next.next = new ListNode(10);
  let list3 = new ListNode(3);
  list3.next = new ListNode(7);
  list3.next.next = new ListNode(4);
  console.log(solve([list1, list2, list3]));
}
test2();
