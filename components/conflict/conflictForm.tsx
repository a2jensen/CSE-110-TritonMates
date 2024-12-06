import React, { useState } from "react";
import { sendMail } from "../../app/api/sendEmail";

export default function EmailForm(props: {
  trigger: boolean;
  setTrigger: (arg0: boolean) => void;
}) {
  const [yourEmail, setYourEmail] = useState("");
  const [theirEmail, setTheirEmail] = useState("");
  const [yourName, setYourName] = useState("");
  const [theirName, setTheirName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await sendMail({
      email: theirEmail,
      sendTo: theirEmail,
      subject: "conflict report",
      text: message,
      html:
        "<h1>Conflict Report</h1><p>This is the conflict report your roommate sent</p>" +
        "<h3> Report Sent From: " +
        yourName +
        "</h3> <br></br>" +
        "<h3> Report Sent To: " +
        theirName +
        "</h3> <br></br>" +
        "<p>Concerns and Conflicts</p> <br></br>" +
        "<p>" +
        message +
        "</p><br></br> <p>Please address and respond respectfully these concerns raised by your roomate.</p>",
    });

    const response2 = await sendMail({
      email: yourEmail,
      sendTo: yourEmail,
      subject: "conflict report",
      text: message,
      html:
        "<h1>Conflict Report</h1><p>This is the conflict report you sent to your roommate</p>" +
        "<h3> Report Sent From: " +
        yourName +
        "</h3> <br></br>" +
        "<h3> Report Sent To: " +
        theirName +
        "</h3> <br></br>" +
        "<p>Concerns and Conflicts</p> <br></br>" +
        "<p>" +
        message +
        "</p><br></br>",
    });

    console.log(response);
    console.log(response2);

    if (response !== undefined && response2 !== undefined) {
      alert("Report Sent!");
    }
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateYourName = (name: string) => setYourName(name);
  const updateYourEmail = (name: string) => setYourEmail(name);
  const updateTheirName = (name: string) => setTheirName(name);
  const updateTheirEmail = (name: string) => setTheirEmail(name);
  const updateMessage = (name: string) => setMessage(name);

  function Step3() {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Step 3: Send Report 🗑️ 🦝
        </h3>
        <button
          onClick={handleSubmit}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit Report
        </button>
      </div>
    );
  }

  return props.trigger ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 p-6 rounded-xl shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Roommate Conflict Report
          </h2>
          <button
            onClick={() => props.setTrigger(false)}
            className="text-gray-600 hover:text-gray-800 font-bold rounded-full p-2 hover:bg-gray-200 transition duration-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {currentStep === 1 && (
            <Step1
              updateYourName={updateYourName}
              updateYourEmail={updateYourEmail}
              updateTheirName={updateTheirName}
              updateTheirEmail={updateTheirEmail}
            />
          )}
          {currentStep === 2 && <Step2 updateMessage={updateMessage} />}
          {currentStep === 3 && <Step3 />}

          <div className="flex justify-center space-x-4 mt-4">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={handleNext}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

interface Step1Props {
  updateYourName: (id: string) => void;
  updateYourEmail: (id: string) => void;
  updateTheirName: (id: string) => void;
  updateTheirEmail: (id: string) => void;
}

interface Step2Props {
  updateMessage: (id: string) => void;
}

function Step1({
  updateYourName,
  updateYourEmail,
  updateTheirName,
  updateTheirEmail,
}: Step1Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Step 1: Person of Interest
      </h3>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xs mb-3">
          <label className="block text-gray-700 mb-2 text-sm">
            Enter Your Name:
          </label>
          <input
            type="text"
            name="Enter Your Name"
            autoComplete="name"
            onChange={(e) => updateYourName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            required
          />
        </div>
        <div className="w-full max-w-xs mb-3">
          <label className="block text-gray-700 mb-2 text-sm">
            Enter Your Email:
          </label>
          <input
            type="email"
            name="Enter Your Email"
            onChange={(e) => updateYourEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            required
          />
        </div>
        <div className="w-full max-w-xs mb-3">
          <label className="block text-gray-700 mb-2 text-sm">
            Roommate with whom there is conflict:
          </label>
          <input
            type="text"
            name="Roommate with whom there is conflict"
            onChange={(e) => updateTheirName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            required
          />
        </div>
        <div className="w-full max-w-xs mb-3">
          <label className="block text-gray-700 mb-2 text-sm">
            Email of Roommate:
          </label>
          <input
            type="email"
            name="Email of Roommate"
            onChange={(e) => updateTheirEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ updateMessage }: Step2Props) {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Step 2: Describe Conflict
      </h3>
      <div className="w-full max-w-xs">
        <label className="block text-gray-700 text-sm mb-2">
          Describe in detail the conflict and what solutions you have exhausted.
          Please use I statements.
        </label>
        <p className="text-xs text-gray-600 mb-2 text-center">...</p>
        <textarea
          name="Conflicts and Concerns"
          onChange={(e) => updateMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
          required
        />
      </div>
    </div>
  );
}
