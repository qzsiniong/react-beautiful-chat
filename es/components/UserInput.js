function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { render } from 'react-dom';
import SendIcon from './icons/SendIcon';
import EmojiIcon from './icons/EmojiIcon';
import EmojiPicker from './emoji-picker/EmojiPicker';
import FileIcons from './icons/FileIcon';
import closeIcon from '../assets/close.svg';
import genericFileIcon from '../assets/file.svg';
import _ from 'lodash';

var UserInput = function (_Component) {
  _inherits(UserInput, _Component);

  function UserInput() {
    _classCallCheck(this, UserInput);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.handleKey = function (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        _this._submitText(event);
      }
    };

    _this.handleKeyPress = _.debounce(function () {
      _this.props.onKeyPress(_this.userInput.textContent);
    }, 300, { trailing: true });

    _this.state = {
      inputActive: false,
      file: null
    };
    return _this;
  }

  UserInput.prototype._submitText = function _submitText(event) {
    event.preventDefault();
    var text = this.userInput.textContent;
    var file = this.state.file;
    if (file) {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: 'me',
          type: 'file',
          data: { text: text, file: file }
        });
        this.setState({ file: null });
        this.userInput.innerHTML = '';
      } else {
        this.props.onSubmit({
          author: 'me',
          type: 'file',
          data: { file: file }
        });
        this.setState({ file: null });
      }
    } else {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: 'me',
          type: 'text',
          data: { text: text }
        });
        this.userInput.innerHTML = '';
      }
    }
    this.userInput.blur();
  };

  UserInput.prototype._handleEmojiPicked = function _handleEmojiPicked(emoji) {
    this.props.onSubmit({
      author: 'me',
      type: 'emoji',
      data: { emoji: emoji }
    });
  };

  UserInput.prototype._handleFileSubmit = function _handleFileSubmit(file) {
    this.setState({ file: file });
  };

  UserInput.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: this.props.className },
      this.state.file && React.createElement(
        'div',
        { className: 'file-container' },
        React.createElement(
          'span',
          { className: 'icon-file-message' },
          React.createElement('img', { src: genericFileIcon, alt: 'genericFileIcon', height: 15 })
        ),
        this.state.file && this.state.file.name,
        React.createElement(
          'span',
          { className: 'delete-file-message', onClick: function onClick() {
              return _this2.setState({ file: null });
            } },
          React.createElement('img', { src: closeIcon, alt: 'close icon', height: 10, title: 'Remove the file' })
        )
      ),
      React.createElement(
        'div',
        { className: 'sc-user-input ' + (this.state.inputActive ? 'active' : '') },
        React.createElement('div', {
          role: 'button',
          tabIndex: '0',
          onFocus: function onFocus() {
            _this2.setState({ inputActive: true });
          },
          onBlur: function onBlur() {
            _this2.setState({ inputActive: false });
          },
          ref: function ref(e) {
            _this2.userInput = e;
          },
          onKeyDown: this.handleKey,
          onKeyPress: this.handleKeyPress,
          contentEditable: 'true',
          placeholder: this.props.placeholder,
          className: 'sc-user-input--text'
        }),
        React.createElement(
          'div',
          { className: 'sc-user-input--buttons' },
          React.createElement('div', { className: 'sc-user-input--button' }),
          React.createElement(
            'div',
            { className: 'sc-user-input--button' },
            this.props.showEmoji && React.createElement(EmojiIcon, { onEmojiPicked: this._handleEmojiPicked.bind(this) })
          ),
          this.props.showFile && React.createElement(
            'div',
            { className: 'sc-user-input--button' },
            React.createElement(FileIcons, { onChange: function onChange(file) {
                return _this2._handleFileSubmit(file);
              } })
          ),
          React.createElement(
            'div',
            { className: 'sc-user-input--button' },
            React.createElement(SendIcon, { onClick: this._submitText.bind(this) })
          )
        )
      )
    );
  };

  return UserInput;
}(Component);

UserInput.propTypes = process.env.NODE_ENV !== "production" ? {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func
} : {};

UserInput.defaultProps = {
  showEmoji: false,
  showFile: false
};

export default UserInput;