"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash.isequal"));
var _clsx = _interopRequireDefault(require("clsx"));
var _utils = require("./utils");
var _calculateUtils = require("./calculateUtils");
var _GridItem = _interopRequireDefault(require("./GridItem"));
var _ReactGridLayoutPropTypes = _interopRequireDefault(require("./ReactGridLayoutPropTypes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// End Types

var layoutClassName = "react-grid-layout";
var isFirefox = false;
// Try...catch will protect from navigator not existing (e.g. node) or a bad implementation of navigator
try {
  isFirefox = /firefox/i.test(navigator.userAgent);
} catch (e) {
  /* Ignore */
}

/**
 * A reactive, fluid grid layout with draggable, resizable components.
 */
var ReactGridLayout = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactGridLayout, _React$Component);
  var _super = _createSuper(ReactGridLayout);
  function ReactGridLayout() {
    var _this;
    _classCallCheck(this, ReactGridLayout);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      activeDrag: null,
      layout: (0, _utils.synchronizeLayoutWithChildren)(_this.props.layout, _this.props.children, _this.props.cols,
      // Legacy support for verticalCompact: false
      (0, _utils.compactType)(_this.props), _this.props.allowOverlap),
      mounted: false,
      oldDragItem: null,
      oldLayout: null,
      oldResizeItem: null,
      droppingDOMNode: null,
      children: [],
      indices: [],
      vLines: [],
      hLines: []
    });
    _defineProperty(_assertThisInitialized(_this), "dragEnterCounter", 0);
    _defineProperty(_assertThisInitialized(_this), "$children", []);
    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (i /*: string*/, x /*: number*/, y /*: number*/, _ref /*:: */) {
      var e = _ref /*:: */.e,
        node = _ref /*:: */.node;
      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      _this.setState({
        oldDragItem: (0, _utils.cloneLayoutItem)(l),
        oldLayout: layout
      });
      _this.$children = _this.props.children.map(function (child, i) {
        var $ = _this.props.innerRef.current.childNodes[i];
        var x = Number($ === null || $ === void 0 ? void 0 : $.getAttribute("data-x"));
        var y = Number($ === null || $ === void 0 ? void 0 : $.getAttribute("data-y"));
        var w = Number($ === null || $ === void 0 ? void 0 : $.getAttribute("data-w")); //$.clientWidth;
        var h = Number($ === null || $ === void 0 ? void 0 : $.getAttribute("data-h")); //$.clientHeight;

        return {
          $: $,
          i: i,
          x: x,
          y: y,
          w: w,
          h: h,
          l: x,
          r: x + w,
          t: y,
          b: y + h,
          lr: x + w / 2,
          tb: y + h / 2
        };
      });
      return _this.props.onDragStart(layout, l, l, null, e, node);
    });
    _defineProperty(_assertThisInitialized(_this), "onDrag", function (i, x, y, _ref2, index) {
      var e = _ref2.e,
        node = _ref2.node;
      var oldDragItem = _this.state.oldDragItem;
      var layout = _this.state.layout;
      var _this$props = _this.props,
        cols = _this$props.cols,
        allowOverlap = _this$props.allowOverlap,
        preventCollision = _this$props.preventCollision;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;

      // Create placeholder (display only)
      var placeholder = {
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        placeholder: true,
        i: i
      };

      // Move the element to the dragged location.
      var isUserAction = true;
      layout = (0, _utils.moveElement)(layout, l, x, y, isUserAction, preventCollision, (0, _utils.compactType)(_this.props), cols, allowOverlap);
      _this.props.onDrag(layout, oldDragItem, l, placeholder, e, node);
      _this.setState({
        layout: allowOverlap ? layout : (0, _utils.compact)(layout, (0, _utils.compactType)(_this.props), cols),
        activeDrag: placeholder
      });
      var element = _this.props.innerRef.current.querySelectorAll(".react-grid-placeholder")[0];
      var target = _this.$children[index];
      var eleX = Number(element === null || element === void 0 ? void 0 : element.getAttribute("data-x"));
      var eleY = Number(element === null || element === void 0 ? void 0 : element.getAttribute("data-y"));
      if (!eleX || !eleY) return;
      target.x = eleX, target.y = eleY, target.l = eleX;
      target.t = eleY;
      target.r = target.l + target.w, target.b = target.t + target.h, target.lr = target.x + target.w / 2, target.tb = target.y + target.h / 2;
      var compares = _this.$children.filter(function (_, i) {
        return i !== index;
      });
      _this.calcAndDrawLines({
        target: target,
        compares: compares
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onDragStop", function (i, x, y, _ref3) {
      var e = _ref3.e,
        node = _ref3.node;
      if (!_this.state.activeDrag) return;
      var oldDragItem = _this.state.oldDragItem;
      var layout = _this.state.layout;
      var _this$props2 = _this.props,
        cols = _this$props2.cols,
        preventCollision = _this$props2.preventCollision,
        allowOverlap = _this$props2.allowOverlap;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;

      // Move the element here
      var isUserAction = true;
      layout = (0, _utils.moveElement)(layout, l, x, y, isUserAction, preventCollision, (0, _utils.compactType)(_this.props), cols, allowOverlap);
      _this.props.onDragStop(layout, oldDragItem, l, null, e, node);

      // Set state
      var newLayout = allowOverlap ? layout : (0, _utils.compact)(layout, (0, _utils.compactType)(_this.props), cols);
      var oldLayout = _this.state.oldLayout;
      _this.setState({
        activeDrag: null,
        layout: newLayout,
        oldDragItem: null,
        oldLayout: null,
        indices: [],
        vLines: [],
        hLines: []
      });
      _this.onLayoutMaybeChanged(newLayout, oldLayout);
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeStart", function (i, w, h, _ref4) {
      var e = _ref4.e,
        node = _ref4.node;
      var layout = _this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      _this.setState({
        oldResizeItem: (0, _utils.cloneLayoutItem)(l),
        oldLayout: _this.state.layout
      });
      _this.props.onResizeStart(layout, l, l, null, e, node);
    });
    _defineProperty(_assertThisInitialized(_this), "onResize", function (i, w, h, _ref5) {
      var e = _ref5.e,
        node = _ref5.node;
      var _this$state = _this.state,
        layout = _this$state.layout,
        oldResizeItem = _this$state.oldResizeItem;
      var _this$props3 = _this.props,
        cols = _this$props3.cols,
        preventCollision = _this$props3.preventCollision,
        allowOverlap = _this$props3.allowOverlap;
      var _withLayoutItem = (0, _utils.withLayoutItem)(layout, i, function (l) {
          // Something like quad tree should be used
          // to find collisions faster
          var hasCollisions;
          if (preventCollision && !allowOverlap) {
            var collisions = (0, _utils.getAllCollisions)(layout, _objectSpread(_objectSpread({}, l), {}, {
              w: w,
              h: h
            })).filter(function (layoutItem) {
              return layoutItem.i !== l.i;
            });
            hasCollisions = collisions.length > 0;

            // If we're colliding, we need adjust the placeholder.
            if (hasCollisions) {
              // adjust w && h to maximum allowed space
              var leastX = Infinity,
                leastY = Infinity;
              collisions.forEach(function (layoutItem) {
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
        }),
        _withLayoutItem2 = _slicedToArray(_withLayoutItem, 2),
        newLayout = _withLayoutItem2[0],
        l = _withLayoutItem2[1];

      // Shouldn't ever happen, but typechecking makes it necessary
      if (!l) return;

      // Create placeholder element (display only)
      var placeholder = {
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        static: true,
        i: i
      };
      _this.props.onResize(newLayout, oldResizeItem, l, placeholder, e, node);

      // Re-compact the newLayout and set the drag placeholder.
      _this.setState({
        layout: allowOverlap ? newLayout : (0, _utils.compact)(newLayout, (0, _utils.compactType)(_this.props), cols),
        activeDrag: placeholder
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onResizeStop", function (i, w, h, _ref6) {
      var e = _ref6.e,
        node = _ref6.node;
      var _this$state2 = _this.state,
        layout = _this$state2.layout,
        oldResizeItem = _this$state2.oldResizeItem;
      var _this$props4 = _this.props,
        cols = _this$props4.cols,
        allowOverlap = _this$props4.allowOverlap;
      var l = (0, _utils.getLayoutItem)(layout, i);
      _this.props.onResizeStop(layout, oldResizeItem, l, null, e, node);

      // Set state
      var newLayout = allowOverlap ? layout : (0, _utils.compact)(layout, (0, _utils.compactType)(_this.props), cols);
      var oldLayout = _this.state.oldLayout;
      _this.setState({
        activeDrag: null,
        layout: newLayout,
        oldResizeItem: null,
        oldLayout: null
      });
      _this.onLayoutMaybeChanged(newLayout, oldLayout);
    });
    _defineProperty(_assertThisInitialized(_this), "onDragOver", function (e) {
      var _e$nativeEvent$target;
      e.preventDefault(); // Prevent any browser native action
      e.stopPropagation();

      // we should ignore events from layout's children in Firefox
      // to avoid unpredictable jumping of a dropping placeholder
      // FIXME remove this hack
      if (isFirefox &&
      // $FlowIgnore can't figure this out
      !((_e$nativeEvent$target = e.nativeEvent.target) !== null && _e$nativeEvent$target !== void 0 && _e$nativeEvent$target.classList.contains(layoutClassName))) {
        return false;
      }
      var _this$props5 = _this.props,
        droppingItem = _this$props5.droppingItem,
        onDropDragOver = _this$props5.onDropDragOver,
        margin = _this$props5.margin,
        cols = _this$props5.cols,
        rowHeight = _this$props5.rowHeight,
        maxRows = _this$props5.maxRows,
        width = _this$props5.width,
        containerPadding = _this$props5.containerPadding,
        transformScale = _this$props5.transformScale;
      // Allow user to customize the dropping item or short-circuit the drop based on the results
      // of the `onDragOver(e: Event)` callback.
      var onDragOverResult = onDropDragOver === null || onDropDragOver === void 0 ? void 0 : onDropDragOver(e);
      if (onDragOverResult === false) {
        if (_this.state.droppingDOMNode) {
          _this.removeDroppingPlaceholder();
        }
        return false;
      }
      var finalDroppingItem = _objectSpread(_objectSpread({}, droppingItem), onDragOverResult);
      var layout = _this.state.layout;
      // This is relative to the DOM element that this event fired for.
      var _e$nativeEvent = e.nativeEvent,
        layerX = _e$nativeEvent.layerX,
        layerY = _e$nativeEvent.layerY;
      var droppingPosition = {
        left: layerX / transformScale,
        top: layerY / transformScale,
        e: e
      };
      if (!_this.state.droppingDOMNode) {
        var positionParams /*: PositionParams*/ = {
          cols: cols,
          margin: margin,
          maxRows: maxRows,
          rowHeight: rowHeight,
          containerWidth: width,
          containerPadding: containerPadding || margin
        };
        var calculatedPosition = (0, _calculateUtils.calcXY)(positionParams, layerY, layerX, finalDroppingItem.w, finalDroppingItem.h);
        _this.setState({
          droppingDOMNode: /*#__PURE__*/React.createElement("div", {
            key: finalDroppingItem.i
          }),
          droppingPosition: droppingPosition,
          layout: [].concat(_toConsumableArray(layout), [_objectSpread(_objectSpread({}, finalDroppingItem), {}, {
            x: calculatedPosition.x,
            y: calculatedPosition.y,
            static: false,
            isDraggable: true
          })])
        });
      } else if (_this.state.droppingPosition) {
        var _this$state$droppingP = _this.state.droppingPosition,
          left = _this$state$droppingP.left,
          top = _this$state$droppingP.top;
        var shouldUpdatePosition = left != layerX || top != layerY;
        if (shouldUpdatePosition) {
          _this.setState({
            droppingPosition: droppingPosition
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "removeDroppingPlaceholder", function () {
      var _this$props6 = _this.props,
        droppingItem = _this$props6.droppingItem,
        cols = _this$props6.cols;
      var layout = _this.state.layout;
      var newLayout = (0, _utils.compact)(layout.filter(function (l) {
        return l.i !== droppingItem.i;
      }), (0, _utils.compactType)(_this.props), cols);
      _this.setState({
        layout: newLayout,
        droppingDOMNode: null,
        activeDrag: null,
        droppingPosition: undefined
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onDragLeave", function (e) {
      e.preventDefault(); // Prevent any browser native action
      e.stopPropagation();
      _this.dragEnterCounter--;

      // onDragLeave can be triggered on each layout's child.
      // But we know that count of dragEnter and dragLeave events
      // will be balanced after leaving the layout's container
      // so we can increase and decrease count of dragEnter and
      // when it'll be equal to 0 we'll remove the placeholder
      if (_this.dragEnterCounter === 0) {
        _this.removeDroppingPlaceholder();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onDragEnter", function (e) {
      e.preventDefault(); // Prevent any browser native action
      e.stopPropagation();
      _this.dragEnterCounter++;
    });
    _defineProperty(_assertThisInitialized(_this), "onDrop", function (e /*: Event*/) {
      e.preventDefault(); // Prevent any browser native action
      e.stopPropagation();
      var droppingItem = _this.props.droppingItem;
      var layout = _this.state.layout;
      var item = layout.find(function (l) {
        return l.i === droppingItem.i;
      });

      // reset dragEnter counter on drop
      _this.dragEnterCounter = 0;
      _this.removeDroppingPlaceholder();
      _this.props.onDrop(layout, item, e);
    });
    _defineProperty(_assertThisInitialized(_this), "calculateMinmum", function (_ref7) {
      var target = _ref7.target,
        array = _ref7.array,
        key = _ref7.key;
      var result = "";
      if (!array.length) return result;
      array.forEach(function (item) {
        if (!result) return result = item[key];
        return result = result <= item[key] ? result : item[key];
      });
      result = target[key] <= result ? target[key] : result;
      return result;
    });
    _defineProperty(_assertThisInitialized(_this), "calculateMaximum", function (_ref8) {
      var target = _ref8.target,
        array = _ref8.array,
        key = _ref8.key;
      var result = "";
      if (!array.length) return result;
      array.forEach(function (item) {
        if (!result) return result = item[key];
        return result = result > item[key] ? result : item[key];
      });
      result = target[key] > result ? target[key] : result;
      return result;
    });
    _defineProperty(_assertThisInitialized(_this), "calculateLine", function (_ref9) {
      var target = _ref9.target,
        array = _ref9.array,
        posMin = _ref9.posMin,
        posMax = _ref9.posMax,
        offSet = _ref9.offSet;
      var origin = _this.calculateMinmum({
        target: target,
        array: array,
        key: posMin
      });
      var length = _this.calculateMaximum({
        target: target,
        array: array,
        key: posMax
      }) - origin;
      var value = target[offSet];
      return {
        value: value,
        length: length,
        origin: origin
      };
    });
    return _this;
  }
  _createClass(ReactGridLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
      // Possibly call back with layout on mount. This should be done after correcting the layout width
      // to ensure we don't rerender with the wrong width.
      this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps /*: Props*/, nextState /*: State*/) /*: boolean*/{
      return (
        // NOTE: this is almost always unequal. Therefore the only way to get better performance
        // from SCU is if the user intentionally memoizes children. If they do, and they can
        // handle changes properly, performance will increase.
        this.props.children !== nextProps.children || !(0, _utils.fastRGLPropsEqual)(this.props, nextProps, _lodash.default) || this.state.activeDrag !== nextState.activeDrag || this.state.mounted !== nextState.mounted || this.state.droppingPosition !== nextState.droppingPosition
      );
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps /*: Props*/, prevState /*: State*/) {
      if (!this.state.activeDrag) {
        var newLayout = this.state.layout;
        var oldLayout = prevState.layout;
        this.onLayoutMaybeChanged(newLayout, oldLayout);
      }
    }

    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */
  }, {
    key: "containerHeight",
    value: function containerHeight() /*: ?string*/{
      if (!this.props.autoSize) return;
      var nbRow = (0, _utils.bottom)(this.state.layout);
      var containerPaddingY = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
      return nbRow * this.props.rowHeight + (nbRow - 1) * this.props.margin[1] + containerPaddingY * 2 + "px";
    }

    /**
     * When dragging starts
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */
  }, {
    key: "onLayoutMaybeChanged",
    value: function onLayoutMaybeChanged(newLayout /*: Layout*/, oldLayout /*: ?Layout*/) {
      if (!oldLayout) oldLayout = this.state.layout;
      if (!(0, _lodash.default)(oldLayout, newLayout)) {
        this.props.onLayoutChange(newLayout);
      }
    }
  }, {
    key: "placeholder",
    value:
    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */
    function placeholder() /*: ?ReactElement<any>*/{
      var activeDrag = this.state.activeDrag;
      if (!activeDrag) return null;
      var _this$props7 = this.props,
        width = _this$props7.width,
        cols = _this$props7.cols,
        margin = _this$props7.margin,
        containerPadding = _this$props7.containerPadding,
        rowHeight = _this$props7.rowHeight,
        maxRows = _this$props7.maxRows,
        useCSSTransforms = _this$props7.useCSSTransforms,
        transformScale = _this$props7.transformScale;

      // {...this.state.activeDrag} is pretty slow, actually
      return /*#__PURE__*/React.createElement(_GridItem.default, {
        w: activeDrag.w,
        h: activeDrag.h,
        x: activeDrag.x,
        y: activeDrag.y,
        i: activeDrag.i,
        className: "react-grid-placeholder",
        containerWidth: width,
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        maxRows: maxRows,
        rowHeight: rowHeight,
        isDraggable: false,
        isResizable: false,
        isBounded: false,
        useCSSTransforms: useCSSTransforms,
        transformScale: transformScale
      }, /*#__PURE__*/React.createElement("div", null));
    }

    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */
  }, {
    key: "processGridItem",
    value: function processGridItem(child /*: ReactElement<any>*/, isDroppingItem /*: boolean*/, index /*: number*/) /*: ?ReactElement<any>*/{
      var _this2 = this;
      if (!child || !child.key) return;
      var l = (0, _utils.getLayoutItem)(this.state.layout, String(child.key));
      if (!l) return null;
      var _this$props8 = this.props,
        width = _this$props8.width,
        cols = _this$props8.cols,
        margin = _this$props8.margin,
        containerPadding = _this$props8.containerPadding,
        rowHeight = _this$props8.rowHeight,
        maxRows = _this$props8.maxRows,
        isDraggable = _this$props8.isDraggable,
        isResizable = _this$props8.isResizable,
        isBounded = _this$props8.isBounded,
        useCSSTransforms = _this$props8.useCSSTransforms,
        transformScale = _this$props8.transformScale,
        draggableCancel = _this$props8.draggableCancel,
        draggableHandle = _this$props8.draggableHandle,
        resizeHandles = _this$props8.resizeHandles,
        resizeHandle = _this$props8.resizeHandle;
      var _this$state3 = this.state,
        mounted = _this$state3.mounted,
        droppingPosition = _this$state3.droppingPosition;

      // Determine user manipulations possible.
      // If an item is static, it can't be manipulated by default.
      // Any properties defined directly on the grid item will take precedence.
      var draggable = typeof l.isDraggable === "boolean" ? l.isDraggable : !l.static && isDraggable;
      this.onDrag;
      var resizable = typeof l.isResizable === "boolean" ? l.isResizable : !l.static && isResizable;
      var resizeHandlesOptions = l.resizeHandles || resizeHandles;

      // isBounded set on child if set on parent, and child is not explicitly false
      var bounded = draggable && isBounded && l.isBounded !== false;
      return /*#__PURE__*/React.createElement(_GridItem.default, {
        containerWidth: width,
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        maxRows: maxRows,
        rowHeight: rowHeight,
        cancel: draggableCancel,
        handle: draggableHandle,
        onDragStop: this.onDragStop,
        onDragStart: this.onDragStart,
        onDrag: function onDrag(i, x, y, e) {
          return _this2.onDrag(i, x, y, e, index);
        },
        onResizeStart: this.onResizeStart,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop,
        isDraggable: draggable,
        isResizable: resizable,
        isBounded: bounded,
        useCSSTransforms: useCSSTransforms && mounted,
        usePercentages: !mounted,
        transformScale: transformScale,
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        i: l.i,
        minH: l.minH,
        minW: l.minW,
        maxH: l.maxH,
        maxW: l.maxW,
        static: l.static,
        droppingPosition: isDroppingItem ? droppingPosition : undefined,
        resizeHandles: resizeHandlesOptions,
        resizeHandle: resizeHandle
      }, child);
    }

    // Called while dragging an element. Part of browser native drag/drop API.
    // Native event target might be the layout itself, or an element within the layout.
  }, {
    key: "render",
    value: function render() /*: React.Element<"div">*/{
      var _this3 = this;
      var _this$props9 = this.props,
        className = _this$props9.className,
        style = _this$props9.style,
        isDroppable = _this$props9.isDroppable,
        innerRef = _this$props9.innerRef;
      var mergedClassName = (0, _clsx.default)(layoutClassName, className);
      var mergedStyle = _objectSpread({
        height: this.containerHeight()
      }, style);
      return /*#__PURE__*/React.createElement("div", {
        ref: innerRef,
        className: mergedClassName,
        style: mergedStyle,
        onDrop: isDroppable ? this.onDrop : _utils.noop,
        onDragLeave: isDroppable ? this.onDragLeave : _utils.noop,
        onDragEnter: isDroppable ? this.onDragEnter : _utils.noop,
        onDragOver: isDroppable ? this.onDragOver : _utils.noop
      }, React.Children.map(this.props.children, function (child, index) {
        return _this3.processGridItem(child, null, index);
      }), isDroppable && this.state.droppingDOMNode && this.processGridItem(this.state.droppingDOMNode, true), this.placeholder(), this._renderGuideLine());
    }
  }, {
    key: "_renderGuideLine",
    value: function _renderGuideLine() {
      var _this$state4 = this.state,
        vLines = _this$state4.vLines,
        hLines = _this$state4.hLines;
      var lineStyle = this.props.lineStyle;
      var commonStyle = _objectSpread({
        position: "absolute",
        backgroundColor: "#1F1830"
      }, lineStyle);

      // support react 15
      var Container = React.Fragment || "div";
      return /*#__PURE__*/React.createElement(Container, null, vLines.map(function (_ref10, i) {
        var length = _ref10.length,
          value = _ref10.value,
          origin = _ref10.origin;
        return /*#__PURE__*/React.createElement("span", {
          className: "v-line",
          key: "v-".concat(i),
          style: _objectSpread({
            left: value,
            top: origin,
            height: length,
            width: 2
          }, commonStyle)
        });
      }), hLines.map(function (_ref11, i) {
        var length = _ref11.length,
          value = _ref11.value,
          origin = _ref11.origin;
        return /*#__PURE__*/React.createElement("span", {
          className: "h-line",
          key: "h-".concat(i),
          style: _objectSpread({
            top: value,
            left: origin,
            width: length,
            height: 2
          }, commonStyle)
        });
      }));
    }

    /**
     *
     */
  }, {
    key: "calcAndDrawLines",
    value: function calcAndDrawLines(_ref12) {
      var target = _ref12.target,
        compares = _ref12.compares;
      var filterVL = compares.filter(function (_ref13) {
        var l = _ref13.l;
        return l === target.l;
      });
      var filterVM = compares.filter(function (_ref14) {
        var lr = _ref14.lr;
        return lr === target.lr;
      });
      var filterVR = compares.filter(function (_ref15) {
        var r = _ref15.r;
        return r === target.r || r === target.r + 1;
      }); // work-arround for right side verticle line

      var filterHT = compares.filter(function (_ref16) {
        var t = _ref16.t;
        return t === target.t;
      });
      var filterHM = compares.filter(function (_ref17) {
        var tb = _ref17.tb;
        return tb === target.tb;
      });
      var filterHB = compares.filter(function (_ref18) {
        var b = _ref18.b;
        return b === target.b;
      });
      this.setState({
        vLines: [_objectSpread({}, this.calculateLine({
          target: target,
          array: filterVL,
          posMin: "t",
          posMax: "b",
          offSet: "l"
        })), _objectSpread({}, this.calculateLine({
          target: target,
          array: filterVM,
          posMin: "t",
          posMax: "b",
          offSet: "lr"
        })), _objectSpread({}, this.calculateLine({
          target: target,
          array: filterVR,
          posMin: "t",
          posMax: "b",
          offSet: "r"
        }))],
        hLines: [_objectSpread({}, this.calculateLine({
          target: target,
          array: filterHT,
          posMin: "l",
          posMax: "r",
          offSet: "t"
        })), _objectSpread({}, this.calculateLine({
          target: target,
          array: filterHM,
          posMin: "l",
          posMax: "r",
          offSet: "tb"
        })), _objectSpread({}, this.calculateLine({
          target: target,
          array: filterHB,
          posMin: "l",
          posMax: "r",
          offSet: "b"
        }))]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps /*: Props*/, prevState /*: State*/) /*: $Shape<State> | null*/{
      var newLayoutBase;
      if (prevState.activeDrag) {
        return null;
      }

      // Legacy support for compactType
      // Allow parent to set layout directly.
      if (!(0, _lodash.default)(nextProps.layout, prevState.propsLayout) || nextProps.compactType !== prevState.compactType) {
        newLayoutBase = nextProps.layout;
      } else if (!(0, _utils.childrenEqual)(nextProps.children, prevState.children)) {
        // If children change, also regenerate the layout. Use our state
        // as the base in case because it may be more up to date than
        // what is in props.
        newLayoutBase = prevState.layout;
      }

      // We need to regenerate the layout.
      if (newLayoutBase) {
        var newLayout = (0, _utils.synchronizeLayoutWithChildren)(newLayoutBase, nextProps.children, nextProps.cols, (0, _utils.compactType)(nextProps), nextProps.allowOverlap);
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
  }]);
  return ReactGridLayout;
}(React.Component);
exports.default = ReactGridLayout;
_defineProperty(ReactGridLayout, "displayName", "ReactGridLayout");
_defineProperty(ReactGridLayout, "propTypes", _ReactGridLayoutPropTypes.default);
_defineProperty(ReactGridLayout, "defaultProps", {
  autoSize: true,
  cols: 12,
  className: "",
  style: {},
  draggableHandle: "",
  draggableCancel: "",
  containerPadding: null,
  rowHeight: 150,
  maxRows: Infinity,
  // infinite vertical growth
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
  onLayoutChange: _utils.noop,
  onDragStart: _utils.noop,
  onDrag: _utils.noop,
  onDragStop: _utils.noop,
  onResizeStart: _utils.noop,
  onResize: _utils.noop,
  onResizeStop: _utils.noop,
  onDrop: _utils.noop,
  onDropDragOver: _utils.noop
});