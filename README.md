# react-simple-drag-and-drop
It is a draggable div component. Works only with es6/es7.

### Motivation
Create simple and clear react component for drag and drop.

### Some explanations:
**parentNode** property is the element, on which is positioned a draggable element

**frozen** is a boolean property which allows to disable grabbing

**styles** property receives only 4 style properties - "left", "top", "zIndex", "cursor". It applies specified styles only during first render. To apply styles after first render component must be frozen.

**onDraggableFrozen** is called after every receive the frozen property which was set to true

### Usage examle:
this piece of code is taken from my chess game

```javascript
...
import Draggable from 'react_simple_drag_and_drop';
...
<div
    className={styles.Chessboard}
    style={{
        position: 'relative'
    }}
    ref = {node => this.parentNode = node}
>
    <Draggable
        parentNode = {this.parentNode}
        frozen = {isFrozen}
        className={styles.queen}
        styles={{
            left: cellIndex * inlineStyles.cellSize,
            top: rowIndex * inlineStyles.cellSize,
            zIndex: isGrabbed ? 2 : 1,
            cursor: isGrabbed ? 'move' : 'pointer'
        }}
        onGrab = {onFigureGrab.bind(null, {
            color,
            row  : rowIndex,
            cell : cellIndex
        })}
        onDrag = {onFigureDrag.bind(null, {
            row  : rowIndex,
            cell : cellIndex
        })}
        onDrop = {onFigureDrop.bind(null, {
            color,
            row   : rowIndex,
            cell  : cellIndex
        })}
        onDraggableFrozen = {() => {
            if (!this.state.isFrozen) {
                return;
            }

            this.setState({
                isFrozen: false
            });
        }}
    />
</div>
...
```
queen draggs
![alt text](http://i.piccy.info/i9/7b1a5ff9f2a68bcbe2e0dd7b2235959c/1479258256/27002/1090198/qweqweqwe.png)
