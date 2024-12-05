import React, { useState } from 'react';
import {sendMail} from "../../app/api/sendEmail";



// og typr was any, if there is an error then prob because i changed type to boolean
export default function EmailForm(props: { trigger: boolean ; setTrigger: (arg0: boolean) => void; }) {

  const [yourEmail, setYourEmail] = useState('');
  const [theirEmail, setTheirEmail] = useState('');
  const [yourName, setYourName] = useState('');
  const [theirName, setTheirName] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await sendMail({
      email:  theirEmail, // Sender's email
      sendTo: theirEmail, // Recipient's email
      subject: 'conflict report',
      text: message,
      html: '<h1>Conflict Report</h1><p>This is the conflict report your roommate sent</p>'
      + "<h3> Report Sent From: "+yourName+"</h3> <br></br>" + "<h3> Report Sent To: "+ theirName+"</h3> <br></br>"
       + "<p>Concerns and Conflicts</p> <br></br>" + "<p>" + message +"</p><br></br> <p>Please address and respond respectfully these concerns raised by your roomate.</p>",
    });

    const response2 = await sendMail({
      email: yourEmail, // Sender's email
      sendTo: yourEmail, // Recipient's email
      subject: 'conflict report',
      text: message,
      html: '<h1>Conflict Report</h1><p>This is the conflict report you sent to your roommate</p>'
      + "<h3> Report Sent From: "+yourName+"</h3> <br></br>" + "<h3> Report Sent To: "+ theirName+"</h3> <br></br>"
       + "<p>Concerns and Conflicts</p> <br></br>" + "<p>" + message +"</p><br></br>",
    });


    console.log(response);
    console.log(response2);

    if(response !== undefined && response2 !==undefined){
      alert("Report Sent!");
      
    }
 
  }

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
      setCurrentStep(currentStep + 1);
    };
  
  const handlePrevious = () => { 
      setCurrentStep(currentStep - 1);
    };

  const updateYourName = (name: string) => {
      setYourName(name);
    }

 const updateYourEmail= (name: string) => {
      setYourEmail(name);
    }
    const updateTheirName= (name: string) => {
      setTheirName(name);
    }
    const updateTheirEmail = (name: string) => {
      setTheirEmail(name);
    }

    const updateMessage = (name: string) => {
      setMessage(name);
    }
 
  

  
  
    function Step3() {
      return (
        <div>
          <h3>Step 3: Send report </h3>
           <button onClick = {handleSubmit}>Submit Report</button>
        </div>
      );
    }

  {
    return (props.trigger)?(
    
      <div>
          
      <button onClick ={() => props.setTrigger(false)}>Close</button>

      
        {currentStep === 1 && <Step1 updateYourName={updateYourName} updateYourEmail={updateYourEmail} updateTheirName={updateTheirName} updateTheirEmail={updateTheirEmail}/>}
        {currentStep === 2 && <Step2 updateMessage = {updateMessage} />}
        {currentStep === 3 && <Step3 />}

        {currentStep > 1 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < 3 && <button onClick={handleNext}>Next</button>}
        </div>
    ):"";

  }


}

  

  interface Step1Props {
    updateYourName:(id: string) => void;
    updateYourEmail:(id: string) => void;
    updateTheirName:(id: string) => void;
    updateTheirEmail:(id: string) => void;
  }
  
  interface Step2Props {
    updateMessage:(id: string) => void;
  
  }

function Step1({updateYourName,  updateYourEmail, updateTheirName, updateTheirEmail }:Step1Props){
   
    const changeYourName = (e: { target: { value: string; }; }) => {
           updateYourName(e.target.value);  

      }

    const changeYourEmail = (e: { target: { value: string; }; }) => {
        updateYourEmail(e.target.value);  

   }

   const changeTheirName = (e: { target: { value: string; }; }) => {
    updateTheirName(e.target.value);  

}

const changeTheirEmail = (e: { target: { value: string; }; }) => {
  updateTheirEmail(e.target.value);  

}

  
    return (
      <div>
        <h3>Step 1: Person of Interest</h3><br></br>
         <label>Enter Your Name:</label>
        <input type="text" name="Enter Your Name" autoComplete="name"
         
            onChange={changeYourName}
            required/> <br></br>
         <label>Enter Your Email:</label>
         <input type="email" name="Enter Your Email"
           
            onChange={changeYourEmail}
            required/> <br></br>
        <label>Rommate with whom there is conflict</label> 
        <input type="text"  name="Rommate with whom there is conflict"
    
            onChange={changeTheirName}
            required/> <br></br>
        <label>Email of Roommate</label>  
        <input type="email" name="Email of Roommate"

            onChange={changeTheirEmail}
            required/><br></br>

      </div>
    );
  }

  function Step2({updateMessage}:Step2Props) {

    const changeMessage = (e: { target: { value: string; }; }) => {
      updateMessage(e.target.value);  

 }

    return (
      <div>
        <h3>Step 2: Describe Conflict/s</h3>
        <label>Conflicts and Concerns</label>  
        <p> Remember to use I statements</p>
        <input type = "text" name="Conflicts and Concerns"
      
            onChange={changeMessage}
            required/> 
      </div>
    );
  }