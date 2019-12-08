# 웹 서비스 관리

Realgraph 에 올라가있는 웹 서비스들은 pm2로 동작합니다. pm2 명령어를 이용하여 서비스를 재시작/중단 할 수 있습니다.

## 서비스 리스트 보기
```bash
sudo pm2 list
```
## 서비스 재시작
```bash
sudo pm2 restart 서비스이름
```

## 서비스 중단
```bash
sudo pm2 stop 서비스이름
```

# 주요 파일 위치 정리

## 서버
| 파일/폴더 | 설명 |
| --- | ---- |
| front/app.js | 20080 서버 |
| front/app2.js | 20081 서버 |
| front/exported/ |20080 서버 전용 그래프 전처리 데이터 |
| front/exported2/ | 20081 서버 전용 그래프 전처리 데이터 |
| front/spa/ | 화면(프론트앤드) 빌드 결과물이 올라가는 곳. |
| front/result/ | 결과 파일들이 올라가는 곳. result.csv, result.arff, result.dat 파일이 있음. |
| platform/ | 알고리즘 소스코드, 실행결과 등등이 들어 있는 폴더 |
| platform/alg/ | 알고리즘 소스코드 |
| platform/run2.sh | 알고리즘이 수행되는 쉘 코드 |
| platform/update_val.py | 알고리즘이 모두 수행된 후, 그래프 노드 사이즈를 값에 따라 normalize 하여 json으로 변환하는 스크립트. |
| platform/update_attr.py | update_val.py 와 같은 기능을 하나 20081 서버 전용 |
| platform2/ | 20081서버 전용 소스코드 및 공통 엔진, 데이터 셋이 있는 폴더 |

## 화면 ( 프론트 )
| 파일/폴더 | 설명 |
| --- | ---- |
| deploy.json | 배포 환경설정 ( ssh 주소, 아이디/비밀번호 ) |
| src/ | 소스코드 |
| src/setting.json | 알고리즘 목록, 그래프 설정, URL 설정 등 |
| src/pages/ | 페이지 파일들 (Tutorial, Execute, Upload 페이지들) 이 있는 곳 |
| src/layouts/MyLayout.vue | 모든 페이지들의 레이아웃 |
| src/statics/shingle~~.js | shinglejs 소스코드 |
| src/statics/visualize.js | shinglejs 에서 몇몇 기능을 추가한 코드 |
| src/statics/tutorial.md | 튜토리얼 마크다운 파일 (튜토리얼 수정하고 싶으면 이 파일을 수정하시면 됩니다. ) |


# Real Graph Web (real-graph-web)

A real graph web page

## 시작하기 전에
RealGraph Web은 Vue.js 와 Quasar를 기반으로 해서 제작되었습니다.

Javascript의 새로운 버전인 ES6를 사용하였으므로 기존에 jQuery를 이용한 개발 소스코드와는 다소 차이점이 있을 것입니다.

큰 차이점으로는 변수를 선언하기 위한 **var** 키워드를 **let**과 **const**를 사용하고, **function**으로 선언하는 함수선언 방식을 **(args...)=>{}** 형식으로 선언한다는 차이점이 있습니다.

자세한 사항은 [여기](https://ui.toast.com/fe-guide/ko_ES5-TO-ES6/)를 참조해주세요.



## Vue.js 간략 가이드

**Vue**파일은 다음과 같은 형태를 띄고 있습니다.

```javascript
<template>
  <!-- HTML 내용 -->
  <div>
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <span>{{fullName}}</span>
    <label-dropdown></label-dropdown> 
    <!-- 버튼 클릭시 methods 안에 있는 clickEvent가 실행됩니다. -->
    <!-- @로 시작하면 이벤트 바인딩, :로 시작하면 attribute 바인딩, 즉 클래스에는 className 값이 들어가서 class="test"가 된다. -->
    <button type="button" @click="clickEvent" :class="className">버튼</button>
  </div>
</template>
<script>
 import LabelDropdown from '../components/LabelDropdown'
 export default {
   name : '컴포넌트 이름',
   components: {
     // 사용할 컴포넌트들을 여기에 추가해주셔야 합니다.
     LabelDropdown // LabelDropdown: LabelDropdown 과 같음.
   },
   data () {
     return {
       // 컴포넌트가 가진 데이터의 초기값
       // 모든 data, computed, method 요소들은 this를 통하여 접근 가능하다
       // 예) this.firstName, this.lastName, this.className 으로 사용함.
       firstName: 'SeungHyeon',
       lastName: 'Kim',
       className: 'test'
     }
   },
   method () {
     // 컴포넌트의 함수들
   },
   mounted () {
     // 컴포넌트가 만들어졌을 때 수행되는 함수
     clickEvent () {
       
     }
   },
   computed () {
     // 저절로 연산되는 데이터 값들. 함수로 선언하고, 변수형태로 사용할 수 있다.
     fullName () { // this.fullName 처럼 변수형태로 사용가능 하다.
       return this.firstName + ' ' + this.lastName
     }
   }
 }
</script>
<style>
// css 적용
</style>
```

좀 더 자세한 사항은 [여기](https://kr.vuejs.org/v2/guide/index.html) 를 참조 해주세요.

## 설치

npm 의존성 설치를 위하여 다음과 같이 실행시켜주세요.
node(npm)이 설치되어 있어야 합니다.

```bash
npm install
```

그 후에는, 가지고 있는 setting.json을 src/ 폴더에, deploy.json을 현재 폴더에 넣어주세요.
 
deploy.json 은 ssh를 통하여 배포하기 위한 설정이고, setting.json은 사용 알고리즘, 시각화 설정을 위한 파일입니다.

## 개발모드

real graph web은 로컬에서 개발 후 production 모드로 빌드 한 뒤 ssh를 이용하여 배포하는 형식을 띄고 있습니다.

개발모드는 다음과 같은 명령어를 이용하여 할 수 있습니다.

```bash
npm run dev
```
개발모드를 실행시키면 소스코드를 수정시 자동으로 변경이 됩니다.

## 빌드 및 배포

개발모드로 개발을 완료한 후, 빌드를 해주신 후 배포를 해주시면 적용할 수 있습니다.

```bash
npm run build && npm run deploy
```

배포를 위한 설정은 **deploy.json**을 통하여 설정할 수 있습니다.

```json
{
  "host": "ssh 호스트이름",
  "username": "ssh id",
  "password": "ssh pw",
  "port": 22,
  "destination": "ssh destination folder",
  "source": "빌드된 폴더 (dist/spa)"
}
```

## setting.json 명세
```json
{
  "http": {
    "dev": { // 개발 모드 설정
      "baseURL": "/" // 개발 모드시에 접속할 서버 
    },
    "production": {
      "baseURL": "/" // 빌드 배포 모드시에 접속할 서버 
    }
  },
  "graph": {
    // shinglejs 그래프 기본 설정
    // 커뮤니티별 색, RGB 형태로 되어 있음.
    "nodeColors": [
      [255, 0, 0],
      ...
    ],
    // 노드 클릭시 오른쪽에 뜨는 attributes
    "filter": { 
      // false -> 뜨지 않게 설정
      // "number" -> 소수점이 있는 형태
      // "int" -> 정수 형태
      "edge_chunk": false
    }
  },
  "algorithms": [
    // 알고리즘 대분류
    {
      "label": "Rank",
      "icon": "score",
      "options": [
        // 알고리즘 소분류
        {
          "value": "pr", // 서버에 전달되는 값. 쉘 파일에 전달된다.
          "label": "PageRank", // 표시되는 텍스트
          "tableColumns": [ // 테이블 탭에서 컬럼 설명 (첫 줄)
            "Rank",
            "Node ID",
            "PageRank Score"
          ],
          "maxiter": true, // max iteration 파라미터 사용 여부
          "root": false, // root (start node) 파라미터 사용 여부
          "table": true, // 테이블 탭 사용 여부
          "chart": { // 차트 탭 설정, 그냥 "chart": "hist" 해도 됨.
            "type": "hist" // hist: histogram
          },
          "graph": { // 알고리즘 별 shinglejs 모듈 설정
            "name": ["pagerank"], // 오른쪽에 뜨는 attribute 목록, 꼭 배열 형태로 넘겨주세요.
            "ignoreSize": true, // 전처리된 데이터의 size를 사용하지 않고 결과로 오는 size를 사용함. 넘어오지 않는 경우 1로 설정됨.
            "filter": { // attribute 필터 설정
              "pagerank": "number" 
            }
          },
          "tooltip": [
            // 차트에서 마우스를 위에 둘 때 생기는 tooltip. 
            "# of pagerank"
          ],
          "legend": [
            // 차트에서 맨 오른쪽 상단에 뜨는 On/Off 할 수 있는 버튼들. HITS 처럼 여러개의 attribute가 있는 경우에 사용.
          ]
        },
        ...
      ]
    },
    ...
  ]
}
```

## Reference
- [Vue.js 가이드](https://kr.vuejs.org/v2/guide/index.html)
- [Quasar 가이드](https://quasar.dev/)
- [ES5 to ES6](https://ui.toast.com/fe-guide/ko_ES5-TO-ES6/)
