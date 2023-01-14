---
title: 나를 위한 면접 (ALL)
authors: me
tags: [interview]
date: 2018-01-09 22:13:40
---

실무에 치이느라 기본적인 걸 까먹을까봐 정리해보자
[정보처리](/tags/정보처리/) 에서 컴퓨터 기초를 보면 되고.
지극히 주관적이라 정답이 아닐 수 있습니다

# 수학

## 미적분

편미분까진 안물어보더라

## 베이지안 확률

> 사후확률 = 가능도 \* 사전확률 / 증거

```dart
// 붉은 점이 얼굴에 보일 때 수두 환자일 확률은 어떻게 구할까?
P(수두 | 붉은점) = P(붉은 점 | 수두) * P(수두) / P(붉은점)
```

# 자료구조

## B Tree

> m-원 트리의 단점임 한쪽으로 편중된 트리를 생성되는 경우를 보완하고자 루트노드로부터 리프노드의 레벨을 같도록 유지한 트리

| BASIS FOR COMPARISON | B-TREE                                                                            | BINARY TREE                                         |
| -------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------- |
| Essential constraint | A node can have at max M number of child nodes(where M is the order of the tree). | A node can have at max 2 number of subtrees.        |
| Used                 | It is used when data is stored on disk.                                           | It is used when records and data are stored in RAM. |
| Height of the tree   | logM N (where m is the order of the M-way tree)                                   | log2 N                                              |
| Application          | Code indexing data structure in many DBMS.                                        | Code optimization, Huffman coding, etc.             |

space complexity B-tree is O(n).
Insertion and deletion time complexity is O(logn).

[출처](https://techdifferences.com/difference-between-b-tree-and-binary-tree.html)

### B+ Tree

> B+은 index node와 data node로 구성

[출처](http://potatoggg.tistory.com/174)

### B\* Tree

> B-tree의 경우에 *각 노드가 최소한 반 이상 차 있어야 하는 조건*을 *각 노드가 최소한 2/3이상 차있어야 한다*로 변경하면 이것이 B\*tree이다

공간 활용도를 높일 수 있다.
[출처](http://egloos.zum.com/LaClefaVerite/v/5639321)

## Binary Tree

> 모든 노드의 차수가 2 이상을 넘지 않는 트리를 말한다, 왼쪽자식노드는 부모노드의 값보다 작이야하며 오른쪽 자식노드는 부모노드의 값보다 커야한다.

## Binary Search Tree

> 이진탐색(binary search)과 연결리스트(linked list)를 결합한 자료구조의 일종입니다. 이진탐색의 효율적인 탐색 능력을 유지하면서도, 빈번한 자료 입력과 삭제를 가능하게끔 고안됐습니다.

- 모든 원소는 서로 다른 유일한 키를 가짐
- 왼쪽 서브트리에 있는 원소들의 값은 그 루트의 값보다 작음
- 오른쪽 서브트리에 있는 원소의 값들은 그 루트의 값보다 큼
- 왼쪽 서브트리와 오른쪽 서브트리도 이진 탐색 트리임

O(n), 완전 이진 트리에 가까울 수록 O(log2(n))

[출처](https://ratsgo.github.io/data%20structure&algorithm/2017/10/22/bst/)

## Insertion Sort

> 앞에서부터 하나씩 비교하여 위치를 삽입

O(n^2)

```js
function insertionSort(unsortedList) {
  var len = unsortedList.length;
  for (var i = 1; i < len; i++) {
    // Copy of the current element.
    var tmp = unsortedList[i];
    // Check through the sorted part and compare with the number in tmp. If large, shift the number
    for (var j = i - 1; j >= 0 && unsortedList[j] > tmp; j--) {
      // Shift the number
      unsortedList[j + 1] = unsortedList[j];
    }
    // Insert the copied number at the correct position
    // in sorted part.
    unsortedList[j + 1] = tmp;
  }
}
```

[출처](http://codingmiles.com/sorting-algorithms-insertion-sort-using-javascript/)

## Selection Sort

> 하나씩 뒤로 비교하여 최소값을 맨 앞으로 삽입

O(n^2)

```js
function selectionSort(items) {
  var length = items.length;
  for (var i = 0; i < length - 1; i++) {
    // Number of passes
    // min holds the current minimum number position for each pass; i holds the Initial min number
    var min = i;
    // Note that j = i + 1 as we only need to go through unsorted array
    for (var j = i + 1; j < length; j++) {
      // Compare the numbers
      if (items[j] < items[min]) {
        // Change the current min number position if a smaller num is found
        min = j;
      }
    }
    if (min != i) {
      // After each pass, if the current min num != initial min num, exchange the position.
      // Swap the numbers
      var tmp = items[i];
      items[i] = items[min];
      items[min] = tmp;
    }
  }
}
```

[출처](http://codingmiles.com/sorting-algorithms-selection-sort-using-javascript/)

## Quick Sort

> pivot을 하나 뽑는다 보통 list.length / 2 -1 을 선택한다.
> pivot 앞에는 pivot보다 작게, pivot 뒤에는 pivot보다 크게 값을 바꿔치고 재귀를 돌린다

최악 O(n^2), 평균 O(nlogn)

```js
const quickSort = (list) => {
  if (list.length < 2) {
    return list;
  }

  const pivot = list[0];
  // const pivot = list[Math.floor(list.length / 2)];
  const smaller = list.filter((item) => item < pivot);
  const bigger = list.filter((item) => item > pivot);

  return [...quickSort(smaller), pivot, ...quickSort(bigger)];
};
```

### 참고

- [퀵 정렬](https://ko.wikipedia.org/wiki/%ED%80%B5_%EC%A0%95%EB%A0%AC)

## List

## Linked List

## List vs Linked List

> 리스트가 대부분 좋다
> 연결 리스트는 중간에 삽입 삭제시 좋다
> 리스트는 끝에 넣을 떄 좋다
>
> 연결 리스트는 검색시 링크를 따라가므로 비효율적이다.
> 리스트가 순차라 검색시에 좋다.
> 공간의 효율성은 연결 리스트

[효율성 비교](https://stackoverflow.com/questions/169973/when-should-i-use-a-list-vs-a-linkedlist)

```js
function LinkedList() {
  this.head = null;
}

LinkedList.prototype.push = function (val) {
  var node = {
    value: val,
    next: null,
  };

  if (!this.head) {
    this.head = node;
  } else {
    current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
};

var sll = new LinkedList();
sll.push(2);
sll.push(3);
sll.push(4);

// check values by traversing LinkedList
sll.head; // Object {data: 2, next: Object}
sll.head.next; // Object {data: 3, next: Object}
sll.head.next.next; // Object {data: 4, next: null}
```

[출처](http://khan4019.github.io/front-end-Interview-Questions/linkedList.html)

## Graph

- 그래프(Graph)는 연결되어 있는 원소간의 관계를 표현하는 자료구조이다. 나와 연관된 인간 관계를 나타내는 인맥 지도, 수도 배관에 대한 배수 시스템, 물질의 분자 구조 등은 연결 구조가 다양하기 때문에 선형 자료 구조나 트리로는 표현 할 수가 없다.
- 그래프는 연결할 객체를 나타내는 정점(vertex)와 객체를 연결하는 간선(edge)의 집합으로 구성된다. 그래프 G를 *G=(V,E)*로 정의하는데, V는 그래프에 있는 정점들의 집합을 의미하고, E는 정점을 연결하는 간선들의 집합을 의미한다.

[출처](https://gist.github.com/singun/1d628d0e3d66c60f9856)

```js
// Implement a Graph
// basic operations:
//  - add vertex (node)
//  - add edge (node -> node)

function GraphNode(val) {
  this.val = val;
  this.edges = {};
}

function Graph() {
  this.vertices = {};
}

// O(1) operation
Graph.prototype.addVertex = function (val) {
  // add vertex only if it does not exist.
  if (!this.vertices[val]) {
    this.vertices[val] = new GraphNode(val);
  }
};

// O(E) operation - edges
Graph.prototype.removeVertex = function (val) {
  if (this.vertices[val]) {
    // once you remove a vertex, you need to remove all edges pointing
    // to the vertex.
    delete this.vertices[val];

    Object.keys(this.vertices).forEach(
      function (key, index) {
        if (this.vertices[key].edges[val]) {
          delete this.vertices[key].edges[val];
        }
      }.bind(this)
    );
  }
};

// O(1) operation
Graph.prototype.getVertex = function (val) {
  return this.vertices[val];
};

// O(1) operation
Graph.prototype.addEdge = function (start, end) {
  // check to see if vertices exists.
  // if it exists, set the edges and be done.
  if (this.vertices[start] && this.vertices[end]) {
    // check to see if edge exists, if it does, increment it's weight
    if (this.vertices[start].edges[end]) {
      this.vertices[start].edges[end].weight += 1;
    } else {
      // edge does not exist, set weight to 1.
      this.vertices[start].edges[end] = { weight: 1 };
    }
  }
};

// O(1) operation
Graph.prototype.removeEdge = function (start, end) {
  if (this.vertices[start] && this.vertices[end]) {
    if (this.vertices[start].edges[end]) {
      delete this.vertices[start].edges[end];
    }
  }
};

// O(1) operation
Graph.prototype.getEdge = function (start, end) {
  return this.vertices[start].edges[end] || null;
};

Graph.prototype.neighbors = function (val) {
  return this.vertices[val] ? this.vertices[val].edges : null;
};

var graph = new Graph();

graph.addVertex(5);
graph.addVertex(2);
graph.addVertex(6);
graph.addVertex(7);
graph.addEdge(2, 5);
graph.addEdge(6, 7);
graph.addEdge(7, 5);
console.log(graph.getEdge(2, 5));
console.log(graph.getEdge(6, 7));
graph.removeVertex(5);
console.log(graph.getEdge(2, 5));
console.log(graph.neighbors(6));
console.log(graph.neighbors(5));
```

[출처](https://gist.github.com/tpae/a6d320f1b5c7e7a8c0c7a3ed752f6de3)

# 알고리즘

## 시간복잡도

- 알고리즘이 문제를 해결하는 데에 얼마나 걸리는 지를 분석하는 것
- 프로그램을 실행시켜 완료하는데 걸리는 시간을 의미

### 빅오표기법

- 실행 시간은 최대한 이만큼 커지지만 더 천천히 커질 수도 있다는 의미인 점근적 표기법 형태를 사용하는 것 (점근 표기법)
- 최악의 경우를 표기하는 방법

### 빅오에서 n이 의미하는것

- 입력 데이터 개수

## 최단거리 알고리즘

- 다익스트라 알고리즘
- A\* 알고리즘

## 슬라이딩 윈도우

[이 문제](http://codingdojang.com/scode/439)가 도움 될 듯

# 데이터베이스

## 정규화

- 관계형 데이터베이스의 설계에서 중복을 최소화하게 데이터를 구조화하는 프로세스

### 목적

- 이상이 있는 관계를 재구성하여 작고 잘 조직된 관계를 생성하는 것에 있다.
- 일반적으로 정규화란 크고, 제대로 조직되지 않은 테이블들과 관계들을 작고 잘 조직된 테이블과 관계들로 나누는 것을 포함한다.

## 비정규화

- 과도한 정규화로 인해서 테이블의 수가 증가하게 되면, 다수의 JOIN이 발생함에 따라서 성능 저하가 발생할 수 있다. 보통의 경우 정규화 과정을 모두 거친 다음 마지막 단계에서 비정규화를 실시한다.
- 단, 테이블을 합치는 것만이 비정규화는 아니다.

## 인덱싱 자료구조

```
B-Tree 알고리즘은 가장 일반적으로 사용되는 인덱스 알고리즘으로서, 상당히 오래전에 도입된 알고리즘이며 그만큼 성숙해진 상태입니다. B-Tree 인덱스는 칼럼의 값을 변형하지 않고, 원래의 값을 이용해 인덱싱하는 알고리즘 입니다.

R-Tree 다차원 공간

Hash 인덱스 알고리즘은 컬럼의 값으로 해시 값을 계산해서 인덱싱하는 알고리즘으로, 매우 빠른 검색을 지원합니다. 하지만 값을 변형해서 인덱싱하므로, 전방(Prefix) 일치와 같이 값의 일부만 검색하고자 할 때는 해시 인덱스를 사용할 수 없습니다. Hash 인덱스는 주로 메모리 기반의 데이터베이스에서 많이 사용합니다.

Fractal-Tree 알고리즘은 B-Tree의 단점을 보완하기 위해 고안된 알고리즘입니다. 값을 변형하지 않고 인덱싱하며 범용적인 목적으로 사용할 수 있다는 측면에서 B-Tree와 거의 비슷하지만 데이터가 저장되거나 삭제될 때 처리 비용을 상당히 줄일 수 있게 설계된 것이 특징입니다. 아직 B-Tree 알고리즘만큼 안정적이고 성숙되진 않았지만 아마도 조만간 B-Tree 인덱스의 상당 부분을 대체할 수 있지 않을까 생각합니다.
```

[출처](http://12bme.tistory.com/138)

## 캐싱시 자료구조

- Hash Table and a Linked List

## 디비 클러스터링

[개념 참조](http://bcho.tistory.com/1062)
[운영 참조](https://okky.kr/article/261535)

## Isolation level

- Read Uncommitted
- Read Committed
- Repeatable Read
- Serializable

[개념 참조](http://egloos.zum.com/ljlave/v/1530887)
[이하 참조](https://docs.microsoft.com/en-us/sql/connect/jdbc/understanding-isolation-levels?view=sql-server-ver15)

### Read Uncommitted Isolation Level

SELECT 문장을 수행하는 경우 해당 데이터에 Shared Lock이 걸리지 않는 Level입니다. 따라서, 어떤 사용자가 A라는 데이터를 B라는 데이터로 변경하는 동안 다른 사용자는 B라는 아직 완료되지 않은(Uncommitted 혹은 Dirty) 데이터 B를 읽을 수 있습니다.

### Read Committed Isolation Level

SQL Server가 Default로 사용하는 Isolation Level입니다. 이 Level에선 SELECT 문장이 수행되는 동안 해당 데이터에 Shared Lock이 걸립니다. 그러므로, 어떠한 사용자가 A라는 데이터를 B라는 데이터로 변경하는 동안 다른 사용자는 해당 데이터에 접근할 수 없습니다.

### Repeatable Read Isolation Level

트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 Shared Lock이 걸리므로 다른 사용자는 그 영역에 해당되는 데이터에 대한 수정이 불가능합니다. 가령, `Select col1 from A where col1 between 1 and 10`을 수행하였고 이 범위에 해당하는 데이터가 2건이 있는 경우(col1=1과 5) 다른 사용자가 col1이 1이나 5인 Row에 대한 UPDATE이 불가능합니다. 하지만, col1이 1과 5를 제외한 나머지 이 범위에 해당하는 Row를 INSERT하는 것이 가능합니다.

### Serializable Isolation Level

트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 Shared Lock이 걸리므로 다른 사용자는 그 영역에 해당되는 데이터에 대한 수정 및 입력이 불가능합니다. 예를 들어, Repeatable Read의 경우 1에서 10 사이에 해당되는 데이터에 대한 UPADTE이 가능하였습니다. 하지만 이 Level에서는 UPDATE 작업도 허용하지 않습니다.

## ACID

원자성, 일관성, 독립성, 영속성

### Atomicity

트랜잭션 내의 명령은 반드시 완벽히 수행
모두가 수행되거나 오류시 전부가 취소되어야함

### Consistency

DB의 전체 요소는 트랜잭션 수행 전과 트랜잭션 수행 완료 후의 상태가 같아야함 (질량 보존 법칙처럼)

### Isolation

둘 이상의 트랜잭션이 병행 실행되는 경우 다른 트랜잭션 연산이 끼어들 수 없음
수행 중인 트랜잭션은 완료될 때 까지 다른 트랜잭션에서 참조 불가.

### Durability

시스템이 고장나도 영구적으로 반영

## CRUD

> Create(생성), Read(읽기), Update(갱신), Delete(삭제)

## InnoDB와 MyISAM의 차이

![image from hexo](http://idchowto.com/wp-content/uploads/2015/12/db-storage-engine1.png)

- [MyISAM vs InnoDB Storage Engine](http://idchowto.com/?p=20166)
- [MySQL Storage Engine의 양대산맥! MyISAM vs InnoDB](http://ojava.tistory.com/25)

## MariaDB가 MySQL보다 나은점

- 많은 스토리지 엔진
- 속도 개선
- 확장성과 새로운 기능들 (`regexp_replace` 등)
- 오픈 소스 및 활발한 contribute

- [공식 홈페이지](https://mariadb.com/kb/ko/mariadb-vs-mysql-features/)
- [mysql-에서-mariadb-로-마이그레이션-해야할-10가지-이유](https://xdhyix.wordpress.com/2016/03/24/mysql-%EC%97%90%EC%84%9C-mariadb-%EB%A1%9C-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%95%B4%EC%95%BC%ED%95%A0-10%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0/)

## 증분 백업

> 정해진 시간을 기준으로 그 이후에 변경된 파일만을 백업하는 방식

# 서버

## 서버 로드밸런싱

설명할 수 있음

## 이미지 클러스터링

[k-means](https://ko.wikipedia.org/wiki/K-%ED%8F%89%EA%B7%A0_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
(피벗 추출 후 2진수 비교인데 아직 이해하기가 힘들다, 18년 말에는 딥러닝을 파보자!)

## Build Process 설명

## Deploy Server

## Git Flow

> 브랜치 관리 전략

- feature: develop에서 분기 후 기능 개발 후 develop으로
- develop: 개발 브랜치
- release: master로의 merge를 위한 준비
- hotfix: master의 버그 픽스 후 develop과 master로 빠른 수정
- master: 프로덕션 브랜치

![image from hexo](https://camo.githubusercontent.com/e1dae4f1f5868a9d043d39824761cff9dabe764f/687474703a2f2f646f67666565742e6769746875622e696f2f61727469636c65732f323031312f612d7375636365737366756c2d6769742d6272616e6368696e672d6d6f64656c2f6769742d6272616e6368696e672d6d6f64656c2e706e67)

### 참고

- [Git flow, GitHub flow, GitLab flow](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)

## WAS 세팅 및 튜닝

# 프론트앤드

## Virtual DOM

```
DOM 조작의 실제 문제는 각 조작이 레이아웃 변화, 트리 변화와 렌더링을 일으킨다는겁니다.

Virtual DOM 은 변화가 일어나면 그걸 오프라인 DOM 트리에 적용시키죠. 이 DOM 트리는 렌더링도 되지 않기때문에 연산 비용이 적어요. 연산이 끝나고나면 그 최종적인 변화를 실제 DOM 에 던져주는거에요. 딱 한번만 한는거에요.

사실, 이 과정은 Virtual DOM 이 없이도 이뤄질수 있어요. 그냥, 변화가 있을 때, 그 변화를 묶어서 DOM fragment 에 적용한 다음에 기존 DOM 에 던져주면 돼요.

그러면, Virtual DOM 이 해결 하려고 하는건 무엇이냐? 그 DOM fragment를 관리하는 과정을 수동으로 하나하나 작업 할 필요 없이, 자동화하고 추상화하는거에요. 그 뿐만 아니라, 만약에 이 작업을 여러분들이 직접 한다면, 기존 값 중 어떤게 바뀌었고 어떤게 바뀌지 않았는지 계속 파악하고 있어야하는데 (그렇지 않으면 수정 할 필요가 없는 DOM 트리도 업데이트를 하게 될 수도 있으니까요), 이것도 Virtual DOM 이 이걸 자동으로 해주는거에요. 어떤게 바뀌었는지 , 어떤게 바뀌지 않았는지 알아내주죠.

마지막으로, DOM 관리를 Virtual DOM 이 하도록 함으로써, 컴포넌트가 DOM 조작 요청을 할 때 다른 컴포넌트들과 상호작용을 하지 않아도 되고, 특정 DOM 을 조작할 것 이라던지, 이미 조작했다던지에 대한 정보를 공유 할 필요가 없습니다. 즉, 각 변화들의 동기화 작업을 거치지 않으면서도 모든 작업을 하나로 묶어줄 수 있다는거죠.
```

[출처](https://velopert.com/3236)

## ES6

## SEO

## Angular

## React

## Vue
