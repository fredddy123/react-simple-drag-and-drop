import React, {PropTypes} from 'react';

export default class SimpleDragAndDrop extends React.Component {
    static propTypes = {
        children          : PropTypes.object,
        parentNode        : PropTypes.object,
        styles            : PropTypes.object,
        className         : PropTypes.string,
        frozen            : PropTypes.bool,
        onGrab            : PropTypes.func,
        onDrag            : PropTypes.func,
        onDrop            : PropTypes.func,
        onDraggableFrozen : PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            styles: {
                left: props.styles ? props.styles.left : 0,
                top: props.styles ? props.styles.top : 0,
                zIndex: props.styles.zIndex,
                cursor: props.styles.cursor
            }
        };
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.frozen) {
            if (nextProps.styles && nextProps.styles.left !== this.state.styles.left || nextProps.styles.top !== this.state.styles.top) {
                this.setState({
                    isDragging: false,
                    styles: {
                        left: nextProps.styles.left,
                        top: nextProps.styles.top
                    }
                }, nextProps.onDraggableFrozen);

                return;
            }

            this.setState({
                isDragging: false
            }, nextProps.onDraggableFrozen);
        }

        if (nextProps.styles && nextProps.styles.cursor !== this.state.styles.cursor) {
            this.setState({
                styles: {
                    ...this.state.styles,
                    cursor: nextProps.styles.cursor
                }
            });
        }

        if (nextProps.styles && nextProps.styles.zIndex !== this.state.styles.zIndex) {
            this.setState({
                styles: {
                    ...this.state.styles,
                    zIndex: nextProps.styles.zIndex
                }
            });
        }
    }

    handleMouseDown = (event) => {
        if (this.props.frozen) {
            return;
        }

        const parentNodeRect = this.props.parentNode && this.props.parentNode.getBoundingClientRect
            ? this.props.parentNode.getBoundingClientRect()
            : {
                left: 0,
                top: 0
            };

        const captureX = event.clientX - parentNodeRect.left - this.state.styles.left;
        const captureY = event.clientY - parentNodeRect.top - this.state.styles.top;

        this.setState({
            captureX,
            captureY,
            parentNodeX: parentNodeRect.left,
            parentNodeY: parentNodeRect.top,
            isDragging: true
        });

        if (this.props.onGrab) {
            this.props.onGrab({
                left : this.state.styles.left,
                top  : this.state.styles.top
            });
        }
    }

    handleMouseUp = event => {
        if (!this.state.isDragging) {
            return;
        }

        this.setState({
            isDragging: false
        });

        if (this.props.onDrop) {
            this.props.onDrop({
                left : this.state.styles.left,
                top  : this.state.styles.top,
                mouseLeft: event.clientX - this.state.parentNodeX,
                mouseTop: event.clientY - this.state.parentNodeY
            });
        }
    }

    handleMouseMove = event => {
        if (!this.state.isDragging) {
            return;
        }

        const newLeft = event.clientX - this.state.parentNodeX - this.state.captureX;
        const newTop  = event.clientY - this.state.parentNodeY - this.state.captureY;

        this.setState({
            styles: {
                ...this.state.styles,
                left: newLeft,
                top: newTop
            }
        });

        this.props.onDrag({
            left : newLeft,
            top  : newTop,
            mouseLeft: event.clientX - this.state.parentNodeX,
            mouseTop: event.clientY - this.state.parentNodeY
        });
    }

    render() {
        const {
            className
        } = this.props;

        const {
            styles
        } = this.state;

        return (
            <div
                style={{
                    ...styles,
                    position: 'absolute'
                }}
                className={className}
                onMouseDown={this.handleMouseDown}
            >
                {this.props.children}
            </div>
        );
    }
}
