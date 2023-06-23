import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../../store/categories";
import { postNewTrailThunk } from "../../store/trails";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./createTrailFormPage.css";

//This is used to convert the backend errors into a format that the frontend can use
const caseHelper = (backendstring) => {
  const backendToFrontend = {
    trail_name: "trailName",
    park: "park",
    city: "city",
    state: "state",
    lat: "lat",
    lng: "lng",
    category_id: "CategoryId",
    length: "length",
    elevation_gain: "elevationGain",
    cover_photo: "coverPhoto",
    description: "description",
  };
  return backendToFrontend[backendstring];
};

function CreateTrailFormPage() {
  //Initialize things
  const history = useHistory();
  const dispatch = useDispatch();

  //State
  const [trailName, setTrailName] = useState("");
  const [park, setPark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [categoryId, setCategoryId] = useState("");
  const [length, setLength] = useState(0.0);
  const [elevationGain, setElevationGain] = useState(0);
  const [coverPhoto, setCoverPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  //useSelectors
  const categories = useSelector((state) => state.categories.categories);
  const loggedIn = useSelector((state) => state.session.user);

  // Fetch category data
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Frontend form validation
    const newErrors = {};
    if (trailName.length < 1)
      newErrors["trailName"] = "Trail name is required!";
    if (trailName.length > 50)
      newErrors["trailName"] = "Trail name must be less than 50 characters!";
    if (park.length < 1) newErrors["park"] = "Park name is required!";
    if (city.length < 1) newErrors["city"] = "City is required!";
    if (state.length !== 2)
      newErrors["state"] = "Two character state abbreviation is required!";
    if (!lat) newErrors["lat"] = "Latitude is required!";
    if (lat < -90 || lat > 90)
      newErrors["lat"] = "Latitude must be between -90 and 90!";
    if (!lng) newErrors["lng"] = "Longitudeis requried!";
    if (lng < -180 || lng > 180)
      newErrors["lng"] = "Longitude must be between -180 and 180!";
    if (!categoryId) newErrors["category"] = "Please select a category!";
    if (length < 0.1) newErrors["length"] = "Length is required!";
    if (elevationGain < 1)
      newErrors["elevationGain"] = "Elevation gain is required!";
    if (coverPhoto.length < 1)
      newErrors["coverPhoto"] = "Cover Photo is required!";
    if (description.length < 1)
      newErrors["description"] = "Description is required!";

    //If there are errors, abort post and display messages
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Build up form data before sending
    const formData = new FormData();
    formData.append("trail_name", trailName);
    formData.append("park", park);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("category_id", categoryId);
    formData.append("length", length);
    formData.append("elevation_gain", elevationGain);
    formData.append("cover_photo", coverPhoto);
    formData.append("description", description);

    // Dispatch thunk to post new trail
    const newTrailOrErrors = await dispatch(postNewTrailThunk(formData));

    // Handle backend validation errors
    if ("errors" in newTrailOrErrors) {
      // Handle errors from the backend which comes in as an object with a key of errors
      const formErrors = newTrailOrErrors.errors.errors;
      let errorObj = {};

      Object.keys(formErrors).forEach((errorKey) => {
        const frontEndErrorKey = caseHelper(errorKey);
        const frontEndErrorString = formErrors[errorKey][0];
        errorObj[frontEndErrorKey] = frontEndErrorString;
      });
      setErrors(errorObj);
    } else {
      if (newTrailOrErrors) {
        setTrailName("");
        setPark("");
        setCity("");
        setState("");
        setLat(0.0);
        setLng(0.0);
        setCategoryId("");
        setLength(0.0);
        setElevationGain(0);
        setCoverPhoto("");
        setDescription("");

        history.push(`/trails/${newTrailOrErrors.id}`);
      } else {
        console.error(
          "The postNewTrailThunk returned undefined when creating this trail"
        );
      }
    }
  };

  if (!loggedIn) {
    return (
      <>
        <h3>Please login or signup to create a trail!</h3>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />

        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </>
    );
  }

  return (
    <div className="create-trail-form-parent">
      <form className="create-trail-form" onSubmit={handleSubmit}>
        <h2>Create a New Trail!</h2>
        <label>
          Trail Name <span className="errors">{errors?.trailName}</span>
          <input
            type="text"
            value={trailName}
            placeholder="Trail Name"
            onChange={(e) => setTrailName(e.target.value)}
          />
        </label>
        <label>
          Park<span className="errors">{errors?.park}</span>
          <input
            type="text"
            value={park}
            placeholder="Park"
            onChange={(e) => setPark(e.target.value)}
          />
        </label>
        <label>
          City<span className="errors">{errors?.city}</span>
          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State<span className="errors">{errors?.state}</span>
          <input
            type="text"
            value={state}
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Latitude<span className="errors">{errors?.lat}</span>
          <input
            type="decimal"
            value={lat}
            placeholder="Latitude"
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <label>
          Longitude<span className="errors">{errors?.lng}</span>
          <input
            type="decimal"
            value={lng}
            placeholder="Longitude"
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        <label>
          Category <span className="errors">{errors?.category}</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option default>Select a Category</option>
            {categories &&
              Object.values(categories).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
          </select>
        </label>
        <label>
          Length<span className="errors">{errors?.length}</span>
          <input
            type="decimal"
            value={length}
            placeholder="Length"
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
        <label>
          Elevation Gain<span className="errors">{errors?.elevationGain}</span>
          <input
            type="number"
            value={elevationGain}
            placeholder="Elevation Gain"
            onChange={(e) => setElevationGain(e.target.value)}
          />
        </label>
        <label>
          Description<span className="errors">{errors?.description}</span>
          <textarea
            type="text"
            value={description}
            placeholder="Tell people about this trail..."
            onChange={(e) => setDescription(e.target.value)}
            rows="7"
            cols="50"
          ></textarea>
        </label>
        <label>
          Cover Photo<span className="errors">{errors?.coverPhoto}</span>
          <input
            type="text"
            value={coverPhoto}
            placeholder="Cover Photo"
            onChange={(e) => setCoverPhoto(e.target.value)}
          />
        </label>
        <div className="create-trail-button-container">
          <button className="create-trail-button" type="submit">
            Create Trail
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrailFormPage;
