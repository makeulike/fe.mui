# Ajax

## 설명
- jQuery에서 제공 해 주는 $.ajax 를 메큐라이크 사내 개발에 맞게 커스터마이징 한 컴포넌트
- 개발의 생산성 향상을 위하여 jQuery 이용을 지향하며, 컴포넌트 또한 jQuery 의 종속되어 개발
- Namespace는 ```mui.ajax``` 사용


## 프로토타입
```javascript
mui.ajax.call(method, url, param, successCallback, errorCallback)
```

## 예제 :: 서버에 데이터를 삽입하는 예제 (POST)
```javascript
var url = '/_interface/proc.php';
var param = {
    'market': mui.validate.radio('os'),
    'tel': target.val(),
    'mtype': thisAgent
};

mui.ajax.call('POST', url, param, function(rtn){
	// success case process
},function(e){
	// failed case process
});
```


- url, param 은 지역변수로 처리하여 메모리 할당량을 단축
- 경우에 따라 mui.ajax.call 을 별도의 변수로 지정하여 동일하게 사용 해도 무방
 ```javascript 
 var $mAjax = mui.ajax.call;
 
 $mAjax(...)
 ```
- 경우에 따라 errorCallback 는 생략 가능(지양)