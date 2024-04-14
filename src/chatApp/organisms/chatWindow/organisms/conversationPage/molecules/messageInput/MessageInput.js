import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

// Lodash
import _noop from 'lodash/noop';

const MessageInput = (props) => {
  const [inputValue, setInputValue] = useState('');

  const { onSubmit, chatMessageInputClassName,  sendButtonClassName, inputFieldClassName } = props;

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  }, [inputValue, setInputValue, onSubmit]);

  return (
    <form className={chatMessageInputClassName} onSubmit={handleSubmit}>
      <input
        type='text'
        className={inputFieldClassName}
        value={inputValue}
        onChange={handleChange}
        placeholder='Type a message...'
      />
      <button type='submit' className={sendButtonClassName}>
        Send
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  onSubmit: PropTypes.func,
  chatMessageInputClassName: PropTypes.string,  
  sendButtonClassName: PropTypes.string, 
  inputFieldClassName: PropTypes.string,
};

MessageInput.defaultProps = {
  onSubmit: _noop,
  chatMessageInputClassName: '',  
  sendButtonClassName: '', 
  inputFieldClassName: '',
};

export default memo(MessageInput);
