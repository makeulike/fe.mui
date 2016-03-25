# Modal

## 설명
- Modal Layer popup
- 개발의 생산성 향상을 위하여 jQuery 이용을 지향하며, 컴포넌트 또한 jQuery 의 종속되어 개발
- ```mui.modal``` 의 Namespace 를 가짐


## 프로토타입
### Public Methods
```javascript
mui.modal.open('DOM ID');
mui.modal.close('DOM ID');
```

### Event Handler
- [data-role="modal"]
> Modal 을 감싸는 가장 상위 영역을 지정하는 Data Attribute
- [data-toggle="modal"]
> HTML 코드에서 A, Button 태그 등 Modal 호출 지정하는 Data Attribute (href 값을 참조)
- [data-rel="back"]
> 열려있는 현재의 모달 레이어를 닫게하는 Data Attritube

## 예제
### Type 1 : HTML 코드 이용

#### 필요 조건
1. mui/js/modal.js
2. mui/scss/modules/modal.scss

#### HTML
```html
<!DOCTYPE HTML>
<html>
...

<a href="#modal" data-toggle="modal">
	모달 창 띄우기
</a>

<div id="modal" class="modal" data-role="modal">
	<div class="modal-content">
    	// 내용
    </div>
</div>

...
</html>
```

#### CSS
```css
.modal-content{
	max-width:800px;
    background-color:white;
}
```
- css 는 자율성을 위하여 최소한의 위치값을 지정하는 것만 사용
- 배경색상, 넓이 등등 커스터마이징 할 수 있음

### Type 2 : JavaScript에서 API 형태로 코드 작성

#### 필요 조건
1. mui/js/modal.js
2. mui/scss/modules/modal.scss

#### HTML
```html
<!DOCTYPE HTML>
<html>
...

<a id="call-modal">
	모달 창 띄우기
</a>

<div id="modal" class="modal" data-role="modal">
	<div class="modal-content">
    	// 내용
    </div>
</div>

...
</html>
```

#### JavaScript
```javascript
$('#call-modal').on('click', function(){
    mui.modal.open('modal');
});
```

#### CSS
```css
.modal-content{
	max-width:800px;
    background-color:white;
}
```
- css 는 자율성을 위하여 최소한의 위치값을 지정하는 것만 사용
- 배경색상, 넓이 등등 커스터마이징 할 수 있음