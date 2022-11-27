handle-area v1.0.0
===========================

## Installation

Using npm:

```javascript
$ npm i --save handle-area
```



## Examples

```react
import HandleArea from 'handle-area';

<HandleArea
    style={{ width: 800, height: 400, background: 'pink' }}
    onAreaFinish={(cooradinate) => {
        console.log(cooradinate);
    }}
    >
    <div>12423423423</div>
</HandleArea>
```



