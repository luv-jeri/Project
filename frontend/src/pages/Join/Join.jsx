import React, {useRef, useState, useEffect} from 'react';
import './Join.css';
import emailjs from '@emailjs/browser';


const Join = () => {
  const form = useRef();

  const [confirmation, setConfirmation] = useState('');


  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_82iqfem', 'template_fuodjmp', form.current, '3rMv1tYkFf7VmNvdJ')
      .then((result) => {
          console.log(result.text);
          setConfirmation("Message sent successfully")
      }, (error) => {
          console.log(error.text);
      });
  };
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 180, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div className='Join'>
        <div className='left-j'>
        <div className=' blur blur-w'></div>
           
            <div>
                <span className='stoke-text'>Ready To</span>
                <span>Level Up</span>
            </div>
            <div>
                <span>your body</span>
                <span className='stoke-text'>with us?</span>
            </div>
            <hr />

        </div>
        <div className="right-j">
          
     

<div className="contain">

<div className="wrapper">

  <div className="form">
    <h4>GET IN TOUCH</h4>
    <h2 className="form-headline">Send us a message</h2>
    <form id="submit-form" ref={form} onSubmit={sendEmail}>
      
        <input id="name" className="form-input" type="text" placeholder="Your Name*" name="user_name"/>
      
    
        <input id="email" className="form-input" type="email" placeholder="Your Email*" name="user_email" />
     
        <textarea  minLength="20" id="message" cols="30" rows="7" placeholder="Your Message*" className='form-input' required name="message"></textarea>
 
        <p id="checkbox" >
        <input type="checkbox" name="checkbox" defaultChecked />Yes, I would like to receive communications by call / email about Company's services.</p>

<div className="btn-group"> 
 <button type="submit" className="btn submit-btn" >Submit</button>
<button className="btn reset-btn" type='reset' >Reset</button></div>
      
    
    </form>
    <h1>{confirmation?confirmation:""}</h1>
  </div>


</div>
<div className="contacts contact-wrapper">


  <li>We've more than +6000 members till now and growing daily.
    <br />
    How we can help you?</li>
  <span className="hightlight-contact-info">
    <li className="email-info"><i>📧</i> info@demo.com</li>
    <li><i >📞</i> <span className="highlight-text">+91 11 1111 2900</span></li>
  </span>

</div>
</div>


      
        </div>
        <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.020330288509!2d83.38124151441284!3d26.775621872425575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399144fe3c667c61%3A0x22679e3adf671230!2sFitness%20Passion!5e0!3m2!1sen!2sin!4v1662572118483!5m2!1sen!2sin" title='location' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
  )
}

export default Join