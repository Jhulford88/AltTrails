import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SignupForm.css";

function SignupFormModal() {
  //Initialize things
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  //State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //this is used to convert the backend errors into a format that the frontend can use
  // const caseHelper = (backendstring) => {
  //     const backendToFrontend = {
  //         username: "username",
  //         email: "email",
  //         first_name: "firstName",
  //         last_name: "lastName",
  //         city: "city",
  //         state: "state",
  //         password: "password"
  //     };
  //     return backendToFrontend[backendstring]
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (username.length < 4)
      errors["username"] =
        "Please make sure your username is more than 4 characters.";
    if (username.length > 40)
      errors["username"] =
        "Please make sure your username is less than 40 characters.";
    if (!username.length) errors["username"] = "Please type a valid username.";
    if (!firstName.length)
      errors["firstName"] = "Please type a valid first name.";
    if (!lastName.length) errors["lastName"] = "Please type a valid last name.";
    if (!city.length) errors["city"] = "Please type a valid city.";
    if (state.length !== 2)
      errors["state"] = "Please use your state's two character abbreviation.";
    if (!password.length) errors["password"] = "Please enter a valid password";
    if (password.length < 6)
      errors["password"] = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      errors["confirmPassword"] = "Please ensure the passwords match";
    if (!email.includes("@") || !email.includes("."))
      errors["email"] = "Please include a valid email.";

    setErrors(errors);
    if (Object.values(errors).length) return;

    if (password === confirmPassword) {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("username", username);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("password", password);

      // console.log("Form Data gathered from form:");
      // for (let key of formData.entries()) {
      //   console.log(key[0] + " ----> " + key[1]);
      // }

      const data = await dispatch(signUp(formData));
      // Handle backend validation errors
      if (!data) return null;
      // if ('errors' in data) {
      // 	// handle errors from the backend which comes in as an object with a key of errors
      // 	console.error('The backend returned validation errors when creating a new form', data)
      // 	const formErrors = data.errors
      // 	let errorObj = {}

      // 	Object.keys(formErrors).forEach((errorKey) => {
      // 		const frontEndErrorKey = caseHelper(errorKey)
      // 		const frontEndErrorString = formErrors[errorKey][0]
      // 		errorObj[frontEndErrorKey] = frontEndErrorString
      // 	})
      // 	setErrors(errorObj)
      // } else {
      if (data) {
        history.push(`/`);
        closeModal();
      } else {
        console.error("Nothing returned from edit project thunk");
      }
      // }
      // 	if (data) {
      // 		setErrors(data);
      // 	} else {
      // 		history.push("/")
      // 		closeModal();
      // 	}
      // 	} else {
      // 	setErrors([
      // 		"Confirm Password field must be the same as the Password field",
      // 	]);
    }
  };

  return (
    <>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {/* <ul>
					{errors?.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}

        <label>
          Email
          <div className="errors">{errors.email ? errors.email : null}</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Username
          <div className="errors">
            {errors.username ? errors.username : null}
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <div className="errors">
            {errors.password ? errors.password : null}
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password
          <div className="errors">
            {errors.confirmPassword ? errors.confirmPassword : null}
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <label>
          First Name
          <div className="errors">
            {errors.firstName ? errors.firstName : null}
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <div className="errors">
            {errors.lastName ? errors.lastName : null}
          </div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          City
          <div className="errors">{errors.city ? errors.city : null}</div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <div className="errors">{errors.state ? errors.state : null}</div>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <div className="signup-button-container">
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
