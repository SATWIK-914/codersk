import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer, Login } from './components';
import { Articles, Favourites, Main, NotFoundPage } from './pages';
import { getDate, initialMessages } from './utils';

const App = () => {
  const [savedMessages, setSavedMessages] = useState([]);
  const [messages, setMessages] = useState(initialMessages);
  const [textValue, setTextValue] = useState(
    `Hi, I have job interview soon. I am a  junior UX/UI designer. Can you be an employer and im an employee, ask me one question at ones`
  );

  /**
   * @param {object} message
   * @param {'bot' | 'user' | 'poll' | 'error'} message.sender
   * @param {String} message.content
   */
  function saveMessage({ sender, content }) {
    const date = getDate();
    setSavedMessages((prev) => [...prev, { sender, content, date }]);
  }

  /**
   * @param {object} message
   * @param {'bot' | 'user' | 'poll' | 'error'} message.sender
   * @param {String} message.content
   */
  function removeMessageFromSaved({ sender, content }) {
    setSavedMessages((prev) =>
      prev.filter((msg) => msg.content !== content || msg.sender !== sender)
    );
  }

  /**
   * @param {Boolean} isSaved
   * @param {object} message
   * @param {'bot' | 'user' | 'poll' | 'error'} message.sender
   * @param {String} message.content
   */
  function handleSaveMsgBtnClick(isSaved, message) {
    isSaved ? removeMessageFromSaved(message) : saveMessage(message);
  }

  const handleMessageAdd = useCallback(
    /**
     * @param {object} message
     * @param {'bot' | 'user' | 'poll' | 'error'} message.sender
     * @param {String} message.content
     */
    (message) => {
      setMessages((prev) => [...prev, message]);
    },
    []
  );

  useEffect(() => {
    localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
  }, [savedMessages]);

  return (
    <div className='page'>
      <Header />
      <main className='content'>
        <Routes>
          <Route
            path='/'
            element={
              <Main
                onSaveBtnClick={handleSaveMsgBtnClick}
                savedMessages={savedMessages}
                messages={messages}
                handleMessageAdd={handleMessageAdd}
                textValue={textValue}
                setTextValue={setTextValue}
              />
            }
          />
          <Route
            path='/articles'
            element={<Articles />}
          />
          <Route
            path='/favorites'
            element={
              <Favourites
                savedMessages={savedMessages}
                onStarClick={removeMessageFromSaved}
              />
            }
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
