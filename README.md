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
<div
    className={styles.Chessboard}
    style={{
        position: 'relative'
    }}
    ref = {node => node = this.parentNode}
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
