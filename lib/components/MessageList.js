'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chatTimespan = require('chat-timespan');

var _chatTimespan2 = _interopRequireDefault(_chatTimespan);

var _Messages = require('./Messages');

var _Messages2 = _interopRequireDefault(_Messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageList = function (_Component) {
  _inherits(MessageList, _Component);

  function MessageList() {
    _classCallCheck(this, MessageList);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  MessageList.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (this.currentFirstRef) {
      this.a1 = this.currentFirstRef.offsetTop;
      this.b1 = this.scrollList.scrollTop;
    }
  };

  MessageList.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var prevMessages = prevProps.messages;
    var messages = this.props.messages;
    var prevFirstId = prevMessages[0] && prevMessages[0].id;
    var prevLastId = prevMessages[prevMessages.length - 1] && prevMessages[prevMessages.length - 1].id;
    var firstId = messages[0] && messages[0].id;
    var lastId = messages[messages.length - 1] && messages[messages.length - 1].id;

    if (messages.length !== prevMessages.length) {
      if (prevFirstId !== firstId && prevLastId === lastId) {
        console.log("#####");
        if (this.prevFirstRef) {
          var a2 = this.prevFirstRef.offsetTop;
          this.scrollList.scrollTop = a2 - this.a1 + this.b1;
          // debugger;
        } else {
          this.scrollList.scrollTop = 0;
        }
      } else {
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
      }
    }
  };

  MessageList.prototype.render = function render() {
    var _this2 = this;

    var timeSpan = new _chatTimespan2.default();
    return _react2.default.createElement(
      'div',
      { className: 'sc-message-list', ref: function ref(el) {
          return _this2.scrollList = el;
        } },
      this.props.more && this.props.moreEl,
      this.props.messages.map(function (message, i) {
        if (i === 0) {
          _this2.prevMessageId = _this2.currentMessageId;
          _this2.currentMessageId = message.id;
        }
        var timeInfo = timeSpan.format(message.timestamp);
        return _react2.default.createElement(
          'div',
          { key: i },
          timeInfo && _react2.default.createElement(
            'div',
            { className: 'sc-message-time-info' },
            _react2.default.createElement(
              'span',
              null,
              timeInfo
            )
          ),
          _react2.default.createElement(
            'div',
            { ref: function ref(e) {
                if (e) {
                  _this2.prevMessageId === message.id && (_this2.prevFirstRef = e);
                  i === 0 && (_this2.currentFirstRef = e);
                }
              } },
            _react2.default.createElement(_Messages2.default, { message: message, key: i, onDelete: _this2.props.onDelete })
          )
        );
      })
    );
  };

  return MessageList;
}(_react.Component);

exports.default = MessageList;
module.exports = exports['default'];