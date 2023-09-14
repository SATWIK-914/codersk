import { useRef } from 'react';

import './TextArea.css';

export const TextArea = ({
  isReadyToGetAnswer,
  setIsReadyToGetAnswer,
  textValue,
  setTextValue,
  textRows,
  isRecordLoading,
}) => {
  const textareaRef = useRef(null);

  /**
   * @param {Event} event
   */
  const handleTextChange = (event) => {
    setTextValue(event.target.value.trimStart()); // Обновляем состояние textValue при изменении текста в поле ввода
    adjustTextareaHeight(); // Вызываем функцию для автоматического изменения высоты textarea
    if (!isReadyToGetAnswer && event.target.value.length > 1)
      setIsReadyToGetAnswer(true);
    if (isReadyToGetAnswer && event.target.value.length < 2)
      setIsReadyToGetAnswer(false);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Сначала установим высоту textarea на "auto" для сброса размера
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Зададим высоту textarea на основе его содержимого
    }
  };

  /**
   * @param {Event} evt
   */
  const handleEnterKey = (evt) => {
    if (
      evt.keyCode === 13 &&
      evt.shiftKey === false &&
      textValue.trimEnd().length > 1
    ) {
      evt.preventDefault();
      evt.target.form.requestSubmit();
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className='chat__textarea'
      placeholder={!isRecordLoading ? 'Send a message' : ''}
      value={textValue}
      rows={textRows}
      onChange={handleTextChange}
      onKeyDown={handleEnterKey}
    />
  );
};
