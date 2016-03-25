# Request

## 설명
- QueryString 을 Parsing 하기 위한 Component
- jQuery 의존성이 전혀 없음


## 사용법
```http://localhost/?page=test``` 에서 page 값 추출
- Type 1
```javascript
var queryString = new Request();
var value = queryString.getParamater('page');
```

- Type 2 **(Recommand)**
```javascript
var queryString = new Request.getParamater('page');
```