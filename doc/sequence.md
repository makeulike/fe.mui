# Sequence

## 설명
- background-position 을 이용 한 Sequence Image Play Component
- 개발의 생산성 향상을 위하여 jQuery 이용을 지향하며, 컴포넌트 또한 jQuery 의 종속되어 개발
- Namespace 는 존재하지 않으며, prototype을 이용하여 객체 인스턴스 생성 후 인스턴스 별 관리 가능하게 개발


## 프로토타입
### Options
```javascript
{
	width: // 1개의 Scene 의 넓이
    height: // 1개의 Scene 의 높이
    scene: // X축으로 배치 된 Scene 의 갯수
    speed: // Scene 전환 속도 (ms)
    selector: // DOM Selector,
    isReplay // 다시 실행 여부 (boolean) >>> 개발 중
}
```
### Private Methods
```javascript
Sequence.prototype.produce();
```
### Public Methods (Like API)
```javascript
/**
 * @param: {String}
 * 		 once ( 한번만 재생 )
 */
Sequence.prototype.play(Option);

/**
 * @param: {String}
 * 		 pause( 일시정지 )
 */
Sequence.prototype.stop(Option);
```

## 예제
`https://cssanimation.rocks/images/posts/steps/twitter_fave.png` 이미지 기준
### HTML
```html
<i class="icon--star"></i>
```
### CSS
```css
.icon {
  display: block;
  position: relative;
  border-radius: 5px;
}
.icon--star {
  width: 65px;
  height: 48px;
  background-color: white;
  background-image: url("https://cssanimation.rocks/images/posts/steps/twitter_fave.png");
  background-repeat: no-repeat;
}

```
### JavaScript
```javascript
var imageSettings = {
    width: 64,
    height: 45,
    scene: 56,
    speed: 50,
    selector: document.getElementsByClassName('icon--star')[0]
}

var iconStar = new Sequence(imageSettings);

iconStar.play();
iconStar.stop();
```

###[Codepen Example](http://codepen.io/hagi4u/pen/WrLdjd)