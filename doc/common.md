# Common

## 설명
- 개발의 생산성 향상을 위하여 jQuery 이용을 지향하며, 컴포넌트 또한 jQuery 의 종속되어 개발
- Namespace는 ```mui.common``` 사용


## 목록
1. 브라우저 넓이 값 리턴 (IE, FF, Chrome, Safari)
```javascript
mui.common.getWindowWidth();
```

2. 브라우저 높이 값 리턴 (IE, FF, Chrome, Safari)
```javascript
mui.common.getWindowHeight();
```

3. 도메인 검증
```javascript
mui.common.isDomain(url)
```
### 예제
```javascript
var 
_hostname = '',
_root_path = '';
if(mui.common.isDomain('abc.co.kr')){
	_hostname = "";
}else{  // is Dev Server
	_hostname = "http://dev.abc.co.kr";
	_root_path = "/";
}
```

4. 마우스 기본 이벤트 제한 (드래그 / 오른쪽 버튼)
```javascript
window.attachEvent( "onload" , mui.common.disabledDefaultMouseEvents );
```

5. requestAnimationFrame

- 각 벤더별 requestAnimationFrame 가 다르기 때문에 이를 통일하여 사용할 수 있게 다시 작성
- 사용상의 편의를 위하여 별도의 Namespace 는 존재하지 않음
```javascript
window.requestAnimationFrame(...)
```