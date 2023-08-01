import './App.scss';
import Input from './components/Input/input';
import instagramIcon from './assets/img/instagramIcon.png'
import arrow from './assets/img/arrow.png'
import attach from './assets/img/attach.png'
import { useRef, useState } from 'react';
import axios from 'axios';

const App = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleGetQuote = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmptyName = name.trim() === '';
    const isEmptyMessage = message.trim() === '';

    if (!isValidEmail || isEmptyName || isEmptyMessage) {
      setStatus('error');
      console.error('Invalid input fields');
      return;
    }

    axios
      .post('/send-email', {
        name,
        email,
        message,
      })
      .then((response) => {
        setStatus('success');
        console.log('Email sent successfully');
      })
      .catch((error) => {
        setStatus('error');
        console.error('Error sending email:', error);
      });
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: "100vh"
      }}>
        <div className='pageTitle'>
          <h1 className='title'>Contact Me</h1>
          <div className="line"></div>
        </div>
        <div className="about">
          <h1 className="aboutTitle">
            Let me know if you want to talk
            about a potential collaboration.
            I'm available for freelance work.
          </h1>
          <a className="mail" href="mailto:example@example.com">infoname@mail.com</a>
        </div>
        <div className='inputBox'>
          <Input
            placeholder='What’s your name?'
            value={name}
            onChange={(e) => setName(e.target.value)}
            isValid={status !== 'error'}
          />
          <Input
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={status !== 'error'}
          />
          <Input
            placeholder='Tell me about your project'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            isValid={status !== 'error'}
          />
          <div className="sendBox">
            <button className="send" onClick={handleGetQuote}>
              Get a Quote
            </button>
            <div className="attachBox">
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
              <img src={attach} alt="" onClick={handleAttachClick} style={{
                cursor: 'pointer'
              }} />
              <img src={arrow} alt="" style={{
                cursor: 'pointer'
              }} />
            </div>
          </div>
          {status === 'success' && <div className='succesful'>Message sent successfully!</div>}
          {status === 'error' && <div className='error'>Error sending message. Please try again later.</div>}
        </div>
        <div className='messengers'>
          <h2 className='messengersTitle'>
            Let’s be Friends
          </h2>
          <div className='links'>
            <a href="#"><img src={instagramIcon} alt="instagram" /></a>
            <a href="#"><img src={instagramIcon} alt="instagram" /></a>
            <a href="#"><img src={instagramIcon} alt="instagram" /></a>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
