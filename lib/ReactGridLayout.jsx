// @flow
import * as React from "react";

import isEqual from "lodash.isequal";
import clsx from "clsx";
import {
  bottom,
  childrenEqual,
  cloneLayoutItem,
  compact,
  compactType,
  fastRGLPropsEqual,
  getAllCollisions,
  getLayoutItem,
  moveElement,
  noop,
  synchronizeLayoutWithChildren,
  withLayoutItem
} from "./utils";

import { calcXY } from "./calculateUtils";

import GridItem from "./GridItem";
import ReactGridLayoutPropTypes from "./ReactGridLayoutPropTypes";
import type {
  ChildrenArray as ReactChildrenArray,
  Element as ReactElement
} from "react";

// Types
import type {
  CompactType,
  GridResizeEvent,
  GridDragEvent,
  DragOverEvent,
  Layout,
  DroppingPosition,
  LayoutItem
} from "./utils";

import type { PositionParams } from "./calculateUtils";

type State = {
  activeDrag: ?LayoutItem,
  layout: Layout,
  mounted: boolean,
  oldDragItem: ?LayoutItem,
  oldLayout: ?Layout,
  oldResizeItem: ?LayoutItem,
  droppingDOMNode: ?ReactElement<any>,
  droppingPosition?: DroppingPosition,
  // Mirrored props
  children: ReactChildrenArray<ReactElement<any>>,
  compactType?: CompactType,
  propsLayout?: Layout,
  indices: array,
  vLines: array,
  hLines: array
};

import type { Props, DefaultProps } from "./ReactGridLayoutPropTypes";

// End Types

const layoutClassName = "react-grid-layout";
let isFirefox = false;
// Try...catch will protect from navigator not existing (e.g. node) or a bad implementation of navigator
try {
  isFirefox = /firefox/i.test(navigator.userAgent);
} catch (e) {
  /* Ignore */
}

/**
 * A reactive, fluid grid layout with draggable, resizable components.
 */

export default class ReactGridLayout extends React.Component<Props, State> {
  // TODO publish internal ReactClass displayName transform
  static displayName: ?string = "ReactGridLayout";

  // Refactored to another module to make way for preval
  static propTypes = ReactGridLayoutPropTypes;

  static defaultProps: DefaultProps = {
    autoSize: true,
    cols: 12,
    className: "",
    style: {},
    draggableHandle: "",
    draggableCancel: "",
    containerPadding: null,
    rowHeight: 150,
    maxRows: Infinity, // infinite vertical growth
    layout: [],
    margin: [10, 10],
    isBounded: false,
    isDraggable: true,
    isResizable: true,
    allowOverlap: false,
    isDroppable: false,
    useCSSTransforms: true,
    transformScale: 1,
    verticalCompact: true,
    compactType: "vertical",
    preventCollision: false,
    droppingItem: {
      i: "__dropping-elem__",
      h: 1,
      w: 1
    },
    resizeHandles: ["se"],
    onLayoutChange: noop,
    onDragStart: noop,
    onDrag: noop,
    onDragStop: noop,
    onResizeStart: noop,
    onResize: noop,
    onResizeStop: noop,
    onDrop: noop,
    onDropDragOver: noop
  };

  state: State = {
    activeDrag: null,
    layout: synchronizeLayoutWithChildren(
      this.props.layout,
      this.props.children,
      this.props.cols,
      // Legacy support for verticalCompact: false
      compactType(this.props),
      this.props.allowOverlap
    ),
    mounted: false,
    oldDragItem: null,
    oldLayout: null,
    oldResizeItem: null,
    droppingDOMNode: null,
    children: [],
    indices: [],
    vLines: [],
    hLines: []
  };

  dragEnterCounter: number = 0;

  $children = [];

  componentDidMount() {
    this.setState({ mounted: true });
    // Possibly call back with layout on mount. This should be done after correcting the layout width
    // to ensure we don't rerender with the wrong width.
    this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): $Shape<State> | null {
    let newLayoutBase;

    if (prevState.activeDrag) {
      return null;
    }

    // Legacy support for compactType
    // Allow parent to set layout directly.
    if (
      !isEqual(nextProps.layout, prevState.propsLayout) ||
      nextProps.compactType !== prevState.compactType
    ) {
      newLayoutBase = nextProps.layout;
    } else if (!childrenEqual(nextProps.children, prevState.children)) {
      // If children change, also regenerate the layout. Use our state
      // as the base in case because it may be more up to date than
      // what is in props.
      newLayoutBase = prevState.layout;
    }

    // We need to regenerate the layout.
    if (newLayoutBase) {
      const newLayout = synchronizeLayoutWithChildren(
        newLayoutBase,
        nextProps.children,
        nextProps.cols,
        compactType(nextProps),
        nextProps.allowOverlap
      );

      return {
        layout: newLayout,
        // We need to save these props to state for using
        // getDerivedStateFromProps instead of componentDidMount (in which we would get extra rerender)
        compactType: nextProps.compactType,
        children: nextProps.children,
        propsLayout: nextProps.layout
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return (
      // NOTE: this is almost always unequal. Therefore the only way to get better performance
      // from SCU is if the user intentionally memoizes children. If they do, and they can
      // handle changes properly, performance will increase.
      this.props.children !== nextProps.children ||
      !fastRGLPropsEqual(this.props, nextProps, isEqual) ||
      this.state.activeDrag !== nextState.activeDrag ||
      this.state.mounted !== nextState.mounted ||
      this.state.droppingPosition !== nextState.droppingPosition
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!this.state.activeDrag) {
      const newLayout = this.state.layout;
      const oldLayout = prevState.layout;

      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
  }

  /**
   * Calculates a pixel value for the container.
   * @return {String} Container height in pixels.
   */
  containerHeight(): ?string {
    if (!this.props.autoSize) return;
    const nbRow = bottom(this.state.layout);
    const containerPaddingY = this.props.containerPadding
      ? this.props.containerPadding[1]
      : this.props.margin[1];
    return (
      nbRow * this.props.rowHeight +
      (nbRow - 1) * this.props.margin[1] +
      containerPaddingY * 2 +
      "px"
    );
  }

  /**
   * When dragging starts
   * @param {String} i Id of the child
   * @param {Number} x X position of the move
   * @param {Number} y Y position of the move
   * @param {Event} e The mousedown event
   * @param {Element} node The current dragging DOM element
   */
  onDragStart: (i: string, x: number, y: number, GridDragEvent) => void = (
    i: string,
    x: number,
    y: number,
    { e, node }: GridDragEvent
  ) => {
    const { layout } = this.state;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    this.setState({
      oldDragItem: cloneLayoutItem(l),
      oldLayout: layout
    });

    this.$children = this.props.children.map((child, i) => {
      const $ = this.props.innerRef.current.childNodes[i];
      const x = Number($?.getAttribute("data-x"));
      const y = Number($?.getAttribute("data-y"));
      const w = Number($?.getAttribute("data-w"))//$.clientWidth;
      const h =  Number($?.getAttribute("data-h"))//$.clientHeight;

      return {
        $,
        i,
        x,
        y,
        w,
        h,
        l: x,
        r: x + w,
        t: y,
        b: y + h,
        lr: x + w / 2,
        tb: y + h / 2
      };
    });

    return this.props.onDragStart(layout, l, l, null, e, node);
  };

  /**
   * Each drag movement create a new dragelement and move the element to the dragged location
   * @param {String} i Id of the child
   * @param {Number} x X position of the move
   * @param {Number} y Y position of the move
   * @param {Event} e The mousedown event
   * @param {Element} node The current dragging DOM element
   */
  onDrag: (
    i: string,
    x: number,
    y: number,
    GridDragEvent,
    index: Number
  ) => void = (i, x, y, { e, node }, index) => {
    const { oldDragItem } = this.state;
    let { layout } = this.state;
    const { cols, allowOverlap, preventCollision } = this.props;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    // Create placeholder (display only)
    const placeholder = {
      w: l.w,
      h: l.h,
      x: l.x,
      y: l.y,
      placeholder: true,
      i: i
    };

    // Move the element to the dragged location.
    const isUserAction = true;
    layout = moveElement(
      layout,
      l,
      x,
      y,
      isUserAction,
      preventCollision,
      compactType(this.props),
      cols,
      allowOverlap
    );

    this.props.onDrag(layout, oldDragItem, l, placeholder, e, node);

    this.setState({
      layout: allowOverlap
        ? layout
        : compact(layout, compactType(this.props), cols),
      activeDrag: placeholder
    });
    
    const element = this.props.innerRef.current.querySelectorAll(".react-grid-placeholder")[0];

    const target = this.$children[index];

    const eleX = Number(element?.getAttribute("data-x"));
    const eleY = Number(element?.getAttribute("data-y"));
    target.x = eleX,
    target.y = eleY,
    target.l = eleX;
    target.t = eleY;
    target.r = target.l + target.w,
    target.b = target.t + target.h,
    target.lr =  target.x + target.w / 2,
    target.tb = target.y + target.h / 2
    const compares = this.$children.filter((_, i) => i !== index);

    this.calcAndDrawLines({ target, compares });
  };

  /**
   * When dragging stops, figure out which position the element is closest to and update its x and y.
   * @param  {String} i Index of the child.
   * @param {Number} x X position of the move
   * @param {Number} y Y position of the move
   * @param {Event} e The mousedown event
   * @param {Element} node The current dragging DOM element
   */
  onDragStop: (i: string, x: number, y: number, GridDragEvent) => void = (
    i,
    x,
    y,
    { e, node }
  ) => {
    if (!this.state.activeDrag) return;

    const { oldDragItem } = this.state;
    let { layout } = this.state;
    const { cols, preventCollision, allowOverlap } = this.props;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    // Move the element here
    const isUserAction = true;
    layout = moveElement(
      layout,
      l,
      x,
      y,
      isUserAction,
      preventCollision,
      compactType(this.props),
      cols,
      allowOverlap
    );

    this.props.onDragStop(layout, oldDragItem, l, null, e, node);

    // Set state
    const newLayout = allowOverlap
      ? layout
      : compact(layout, compactType(this.props), cols);
    const { oldLayout } = this.state;
    this.setState({
      activeDrag: null,
      layout: newLayout,
      oldDragItem: null,
      oldLayout: null,
      indices: [],
      vLines: [],
      hLines: []
    });

    this.onLayoutMaybeChanged(newLayout, oldLayout);
  };

  onLayoutMaybeChanged(newLayout: Layout, oldLayout: ?Layout) {
    if (!oldLayout) oldLayout = this.state.layout;

    if (!isEqual(oldLayout, newLayout)) {
      this.props.onLayoutChange(newLayout);
    }
  }

  onResizeStart: (i: string, w: number, h: number, GridResizeEvent) => void = (
    i,
    w,
    h,
    { e, node }
  ) => {
    const { layout } = this.state;
    const l = getLayoutItem(layout, i);
    if (!l) return;

    this.setState({
      oldResizeItem: cloneLayoutItem(l),
      oldLayout: this.state.layout
    });

    this.props.onResizeStart(layout, l, l, null, e, node);
  };

  onResize: (i: string, w: number, h: number, GridResizeEvent) => void = (
    i,
    w,
    h,
    { e, node }
  ) => {
    const { layout, oldResizeItem } = this.state;
    const { cols, preventCollision, allowOverlap } = this.props;

    const [newLayout, l] = withLayoutItem(layout, i, l => {
      // Something like quad tree should be used
      // to find collisions faster
      let hasCollisions;
      if (preventCollision && !allowOverlap) {
        const collisions = getAllCollisions(layout, { ...l, w, h }).filter(
          layoutItem => layoutItem.i !== l.i
        );
        hasCollisions = collisions.length > 0;

        // If we're colliding, we need adjust the placeholder.
        if (hasCollisions) {
          // adjust w && h to maximum allowed space
          let leastX = Infinity,
            leastY = Infinity;
          collisions.forEach(layoutItem => {
            if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
            if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
          });

          if (Number.isFinite(leastX)) l.w = leastX - l.x;
          if (Number.isFinite(leastY)) l.h = leastY - l.y;
        }
      }

      if (!hasCollisions) {
        // Set new width and height.
        l.w = w;
        l.h = h;
      }

      return l;
    });

    // Shouldn't ever happen, but typechecking makes it necessary
    if (!l) return;

    // Create placeholder element (display only)
    const placeholder = {
      w: l.w,
      h: l.h,
      x: l.x,
      y: l.y,
      static: true,
      i: i
    };

    this.props.onResize(newLayout, oldResizeItem, l, placeholder, e, node);

    // Re-compact the newLayout and set the drag placeholder.
    this.setState({
      layout: allowOverlap
        ? newLayout
        : compact(newLayout, compactType(this.props), cols),
      activeDrag: placeholder
    });
  };

  onResizeStop: (i: string, w: number, h: number, GridResizeEvent) => void = (
    i,
    w,
    h,
    { e, node }
  ) => {
    const { layout, oldResizeItem } = this.state;
    const { cols, allowOverlap } = this.props;
    const l = getLayoutItem(layout, i);

    this.props.onResizeStop(layout, oldResizeItem, l, null, e, node);

    // Set state
    const newLayout = allowOverlap
      ? layout
      : compact(layout, compactType(this.props), cols);
    const { oldLayout } = this.state;
    this.setState({
      activeDrag: null,
      layout: newLayout,
      oldResizeItem: null,
      oldLayout: null
    });

    this.onLayoutMaybeChanged(newLayout, oldLayout);
  };

  /**
   * Create a placeholder object.
   * @return {Element} Placeholder div.
   */
  placeholder(): ?ReactElement<any> {
    const { activeDrag } = this.state;
    if (!activeDrag) return null;
    const {
      width,
      cols,
      margin,
      containerPadding,
      rowHeight,
      maxRows,
      useCSSTransforms,
      transformScale
    } = this.props;

    // {...this.state.activeDrag} is pretty slow, actually
    return (
      <GridItem
        w={activeDrag.w}
        h={activeDrag.h}
        x={activeDrag.x}
        y={activeDrag.y}
        i={activeDrag.i}
        className="react-grid-placeholder"
        containerWidth={width}
        cols={cols}
        margin={margin}
        containerPadding={containerPadding || margin}
        maxRows={maxRows}
        rowHeight={rowHeight}
        isDraggable={false}
        isResizable={false}
        isBounded={false}
        useCSSTransforms={useCSSTransforms}
        transformScale={transformScale}
      >
        <div />
      </GridItem>
    );
  }

  /**
   * Given a grid item, set its style attributes & surround in a <Draggable>.
   * @param  {Element} child React element.
   * @return {Element}       Element wrapped in draggable and properly placed.
   */
  processGridItem(
    child: ReactElement<any>,
    isDroppingItem?: boolean,
    index?: number
  ): ?ReactElement<any> {
    if (!child || !child.key) return;
    const l = getLayoutItem(this.state.layout, String(child.key));
    if (!l) return null;
    const {
      width,
      cols,
      margin,
      containerPadding,
      rowHeight,
      maxRows,
      isDraggable,
      isResizable,
      isBounded,
      useCSSTransforms,
      transformScale,
      draggableCancel,
      draggableHandle,
      resizeHandles,
      resizeHandle
    } = this.props;
    const { mounted, droppingPosition } = this.state;

    // Determine user manipulations possible.
    // If an item is static, it can't be manipulated by default.
    // Any properties defined directly on the grid item will take precedence.
    const draggable =
      typeof l.isDraggable === "boolean"
        ? l.isDraggable
        : !l.static && isDraggable;
    this.onDrag;
    const resizable =
      typeof l.isResizable === "boolean"
        ? l.isResizable
        : !l.static && isResizable;
    const resizeHandlesOptions = l.resizeHandles || resizeHandles;

    // isBounded set on child if set on parent, and child is not explicitly false
    const bounded = draggable && isBounded && l.isBounded !== false;

    return (
      <GridItem
        containerWidth={width}
        cols={cols}
        margin={margin}
        containerPadding={containerPadding || margin}
        maxRows={maxRows}
        rowHeight={rowHeight}
        cancel={draggableCancel}
        handle={draggableHandle}
        onDragStop={this.onDragStop}
        onDragStart={this.onDragStart}
        onDrag={(i, x, y, e) => this.onDrag(i, x, y, e, index)}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        isDraggable={draggable}
        isResizable={resizable}
        isBounded={bounded}
        useCSSTransforms={useCSSTransforms && mounted}
        usePercentages={!mounted}
        transformScale={transformScale}
        w={l.w}
        h={l.h}
        x={l.x}
        y={l.y}
        i={l.i}
        minH={l.minH}
        minW={l.minW}
        maxH={l.maxH}
        maxW={l.maxW}
        static={l.static}
        droppingPosition={isDroppingItem ? droppingPosition : undefined}
        resizeHandles={resizeHandlesOptions}
        resizeHandle={resizeHandle}
      >
        {child}
      </GridItem>
    );
  }

  // Called while dragging an element. Part of browser native drag/drop API.
  // Native event target might be the layout itself, or an element within the layout.
  onDragOver: DragOverEvent => void | false = e => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();

    // we should ignore events from layout's children in Firefox
    // to avoid unpredictable jumping of a dropping placeholder
    // FIXME remove this hack
    if (
      isFirefox &&
      // $FlowIgnore can't figure this out
      !e.nativeEvent.target?.classList.contains(layoutClassName)
    ) {
      return false;
    }

    const {
      droppingItem,
      onDropDragOver,
      margin,
      cols,
      rowHeight,
      maxRows,
      width,
      containerPadding,
      transformScale
    } = this.props;
    // Allow user to customize the dropping item or short-circuit the drop based on the results
    // of the `onDragOver(e: Event)` callback.
    const onDragOverResult = onDropDragOver?.(e);
    if (onDragOverResult === false) {
      if (this.state.droppingDOMNode) {
        this.removeDroppingPlaceholder();
      }
      return false;
    }
    const finalDroppingItem = { ...droppingItem, ...onDragOverResult };

    const { layout } = this.state;
    // This is relative to the DOM element that this event fired for.
    const { layerX, layerY } = e.nativeEvent;
    const droppingPosition = {
      left: layerX / transformScale,
      top: layerY / transformScale,
      e
    };

    if (!this.state.droppingDOMNode) {
      const positionParams: PositionParams = {
        cols,
        margin,
        maxRows,
        rowHeight,
        containerWidth: width,
        containerPadding: containerPadding || margin
      };

      const calculatedPosition = calcXY(
        positionParams,
        layerY,
        layerX,
        finalDroppingItem.w,
        finalDroppingItem.h
      );

      this.setState({
        droppingDOMNode: <div key={finalDroppingItem.i} />,
        droppingPosition,
        layout: [
          ...layout,
          {
            ...finalDroppingItem,
            x: calculatedPosition.x,
            y: calculatedPosition.y,
            static: false,
            isDraggable: true
          }
        ]
      });
    } else if (this.state.droppingPosition) {
      const { left, top } = this.state.droppingPosition;
      const shouldUpdatePosition = left != layerX || top != layerY;
      if (shouldUpdatePosition) {
        this.setState({ droppingPosition });
      }
    }
  };

  removeDroppingPlaceholder: () => void = () => {
    const { droppingItem, cols } = this.props;
    const { layout } = this.state;

    const newLayout = compact(
      layout.filter(l => l.i !== droppingItem.i),
      compactType(this.props),
      cols
    );

    this.setState({
      layout: newLayout,
      droppingDOMNode: null,
      activeDrag: null,
      droppingPosition: undefined
    });
  };

  onDragLeave: EventHandler = e => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();
    this.dragEnterCounter--;

    // onDragLeave can be triggered on each layout's child.
    // But we know that count of dragEnter and dragLeave events
    // will be balanced after leaving the layout's container
    // so we can increase and decrease count of dragEnter and
    // when it'll be equal to 0 we'll remove the placeholder
    if (this.dragEnterCounter === 0) {
      this.removeDroppingPlaceholder();
    }
  };

  onDragEnter: EventHandler = e => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();
    this.dragEnterCounter++;
  };

  onDrop: EventHandler = (e: Event) => {
    e.preventDefault(); // Prevent any browser native action
    e.stopPropagation();
    const { droppingItem } = this.props;
    const { layout } = this.state;
    const item = layout.find(l => l.i === droppingItem.i);

    // reset dragEnter counter on drop
    this.dragEnterCounter = 0;

    this.removeDroppingPlaceholder();

    this.props.onDrop(layout, item, e);
  };

  render(): React.Element<"div"> {
    const { className, style, isDroppable, innerRef } = this.props;

    const mergedClassName = clsx(layoutClassName, className);
    const mergedStyle = {
      height: this.containerHeight(),
      ...style
    };

    return (
      <div
        ref={innerRef}
        className={mergedClassName}
        style={mergedStyle}
        onDrop={isDroppable ? this.onDrop : noop}
        onDragLeave={isDroppable ? this.onDragLeave : noop}
        onDragEnter={isDroppable ? this.onDragEnter : noop}
        onDragOver={isDroppable ? this.onDragOver : noop}
      >
        {React.Children.map(this.props.children, (child, index) =>
          this.processGridItem(child, null, index)
        )}
        {isDroppable &&
          this.state.droppingDOMNode &&
          this.processGridItem(this.state.droppingDOMNode, true)}
        {this.placeholder()}
        {this._renderGuideLine()}
      </div>
    );
  }

  _renderGuideLine() {
    const { vLines, hLines } = this.state;
    const { lineStyle } = this.props;
    const commonStyle = {
      position: "absolute",
      backgroundColor: "#1F1830",

      ...lineStyle
    };

    // support react 15
    const Container = React.Fragment || "div";

    return (
      <Container>
        {vLines.map(({ length, value, origin }, i) => (
          <span
            className="v-line"
            key={`v-${i}`}
            style={{
              left: value,
              top: origin,
              height: length,
              width: 2,
              ...commonStyle
            }}
          />
        ))}
        {hLines.map(({ length, value, origin }, i) => (
          <span
            className="h-line"
            key={`h-${i}`}
            style={{
              top: value,
              left: origin,
              width: length,
              height: 2,
              ...commonStyle
            }}
          />
        ))}
      </Container>
    );
  }

  /**
   *
   */
  calcAndDrawLines({ target, compares }) {
    const filterVL = compares.filter(({ l }) => l === target.l);

    const filterVM = compares.filter(({ lr }) => lr === target.lr);

    const filterVR = compares.filter(({ r }) => r === target.r || r === target.r +1); // work-arround for right side verticle line

    const filterHT = compares.filter(({ t }) => t === target.t);

    const filterHM = compares.filter(({ tb }) => tb === target.tb);

    const filterHB = compares.filter(({ b }) => b === target.b);


    this.setState({
      vLines: [
        {
          ...this.calculateLine({
            target,
            array: filterVL,
            posMin: "t",
            posMax: "b",
            offSet: "l"
          })
        },
        {
          ...this.calculateLine({
            target,
            array: filterVM,
            posMin: "t",
            posMax: "b",
            offSet: "lr"
          })
        },
        {
          ...this.calculateLine({
            target,
            array: filterVR,
            posMin: "t",
            posMax: "b",
            offSet: "r"
          })
        }
      ],
      hLines :[
        {
          ...this.calculateLine({
            target,
            array: filterHT,
            posMin: "l",
            posMax: "r",
            offSet: "t"
          })
        },
        {
          ...this.calculateLine({
            target,
            array: filterHM,
            posMin: "l",
            posMax: "r",
            offSet: "tb"
          })
        },
        {
          ...this.calculateLine({
            target,
            array: filterHB,
            posMin: "l",
            posMax: "r",
            offSet: "b"
          })
        },
      ]
    });
  }

  calculateMinmum = ({ target, array, key }) => {
    let result = "";

    if (!array.length) return result;

    array.forEach(item => {
      if (!result) return (result = item[key]);

      return (result = result <= item[key] ? result : item[key]);
    });

    result = target[key] <= result ? target[key] : result;

    return result;
  };

  calculateMaximum = ({ target, array, key }) => {
    let result = "";

    if (!array.length) return result;

    array.forEach(item => {
      if (!result) return (result = item[key]);

      return (result = result > item[key] ? result : item[key]);
    });

    result = target[key] > result ? target[key] : result;

    return result;
  };

  calculateLine = ({ target, array, posMin, posMax, offSet }) => {
    const origin = this.calculateMinmum({ target, array, key: posMin });
    const length =
      this.calculateMaximum({ target, array, key: posMax }) - origin;
    const value = target[offSet];

    return { value, length, origin };
  };
}
