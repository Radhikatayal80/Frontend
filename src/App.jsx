import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./App.css";

const App = () => {
  const [Values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    state: "",
    city: "",
    age: "",
    gender: "",
    mobileNumber: "",
    message: "",
    termsAccepted: false,
    selectedOption: "",
    selectedHobbies: [],
  });

  const change = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setValues({ ...Values, [name]: checked });
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setValues({ ...Values, [name]: selectedValues });
    } else {
      setValues({ ...Values, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (
      Values.name === "" ||
      Values.email === "" ||
      Values.address === "" ||
      Values.state === "" ||
      Values.city === "" ||
      Values.age === "" ||
      Values.gender === "" ||
      Values.mobileNumber === "" ||
      Values.message === "" ||
      !Values.termsAccepted
    ) {
      alert("All fields are required");
    } else {
      try {
        // Send form data to backend (API)
        const response = await axios.post("http://localhost:5001/submit-form", Values);
        alert(response.data.message); // Show success message
        setValues({
          name: "",
          email: "",
          address: "",
          state: "",
          city: "",
          age: "",
          gender: "",
          mobileNumber: "",
          message: "",
          termsAccepted: false,
          selectedOption: "",
          selectedHobbies: [],
        });
      } catch (error) {
        console.log(error);
        alert("Error submitting form");
      }
    }
  };

  return (
    <div className="main">
      <div className="form-container">
        <h1>Contact Form</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Enter your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={Values.name}
              onChange={change}
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={Values.email}
              onChange={change}
              placeholder="Your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Enter your phone number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={Values.mobileNumber}
              onChange={change}
              placeholder="Phone Number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Enter your address</label>
            <textarea
              id="address"
              name="address"
              value={Values.address}
              onChange={change}
              placeholder="Address"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={Values.state}
                onChange={change}
                placeholder="State"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={Values.city}
                onChange={change}
                placeholder="City"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={Values.age}
              onChange={change}
              placeholder="Age"
            />
          </div>

          <div className="form-group gender-options">
            <label>Gender</label>
            <div className="radio-buttons">
              <label className="radio-label">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={Values.gender === "male"}
                  onChange={change}
                />
                Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={Values.gender === "female"}
                  onChange={change}
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-group terms-group">
            <label htmlFor="termsAccepted" className="terms-label">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={Values.termsAccepted}
                onChange={change}
                className="terms-checkbox"
              />
              I accept the terms and conditions
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="selectedOption">Preferred Contact Method</label>
            <select
              id="selectedOption"
              name="selectedOption"
              value={Values.selectedOption}
              onChange={change}
            >
              <option value="">Select an option</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="selectedHobbies">Select your hobbies</label>
            <select
              id="selectedHobbies"
              name="selectedHobbies"
              multiple
              value={Values.selectedHobbies}
              onChange={change}
            >
              <option value="reading">Reading</option>
              <option value="travelling">Travelling</option>
              <option value="sports">Sports</option>
              <option value="coding">Coding</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={Values.message}
              onChange={change}
              placeholder="Your message"
            />
          </div>

          <button className="submit-btn" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
