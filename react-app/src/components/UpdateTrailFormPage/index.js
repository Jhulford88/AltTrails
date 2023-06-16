import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk } from '../../store/categories';
import { getSingleTrailThunk } from "../../store/trails";
import { updateTrailThunk } from '../../store/trails';
import { getAllTrailsThunk } from '../../store/trails';


//this is used to convert the backend errors into a format that the frontend can use
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
        description: "description"
    };
    return backendToFrontend[backendstring]
}

function UpdateTrailFormPage() {

    //initialize things
    const dispatch = useDispatch();
    const history = useHistory();
    const { trailId } = useParams()



    const categories = useSelector(state => state.categories.categories);
    useEffect(() => {
        if (!categories) dispatch(getCategoriesThunk())
    }, [dispatch])



    const singleTrail = useSelector(state => state.trails.allTrails[trailId])
    console.log('singletrail pulled from all trails............',singleTrail)


    //state slices

        const [trailName, setTrailName] = useState(singleTrail?.trailName || '');
        const [park, setPark] = useState(singleTrail?.park || '');
        const [city, setCity] = useState(singleTrail?.city || '');
        const [state, setState] = useState(singleTrail?.state || '');
        const [lat, setLat] = useState(singleTrail?.lat || 0.0);
        const [lng, setLng] = useState(singleTrail?.lng || 0.0);
        const [categoryId, setCategoryId] = useState(singleTrail?.categoryId || '');
        const [length, setLength] = useState(singleTrail?.length || 0.0);
        const [elevationGain, setElevationGain] = useState(singleTrail?.elevationGain || 0);
        const [coverPhoto, setCoverPhoto] = useState(singleTrail?.coverPhoto || '');
        const [description, setDescription] = useState(singleTrail?.description || '')
        const [errors, setErrors] = useState({});



    useEffect(() => {
        if(!singleTrail) {
            dispatch(getAllTrailsThunk())
        } else {
            setTrailName(singleTrail.trailName);
            setPark(singleTrail.park);
            setCity(singleTrail.city);
            setState(singleTrail.state);
            setLat(singleTrail.lat);
            setLng(singleTrail.lng);
            setCategoryId(singleTrail.categoryId);
            setLength(singleTrail.length);
            setElevationGain(singleTrail.elevationGain);
            setCoverPhoto(singleTrail.coverPhoto);
            setDescription(singleTrail.description);
        }
    }, [dispatch, singleTrail])


    const handleSubmit = async (e) => {
        e.preventDefault();

        //frontend form validation
        const newErrors = {};
        if (trailName.length < 1) newErrors['trailName'] = "Trail name is required!"
        if (park.length < 1) newErrors['park'] = "Park name is required!"
        if (city.length < 1) newErrors['city'] = "City is required!"
        if (state.length !== 2) newErrors['state'] = "Two character state abbreviation is required!"
        if (lat < -90 || lat > 90) newErrors['lat'] = "Latitude must be between -90 and 90!"
        if (lng < -180 || lat > 180) newErrors['lng'] = "Longitude must be between -180 and 180!"
        if (categoryId === 'Select') newErrors['categoryId'] = "Please select a category!"
        if (length < .1) newErrors['length'] = "Length is required!"
        if (elevationGain < 1) newErrors['elevationGain'] = "Elevation gain is required!"
        if (coverPhoto.length < 1) newErrors['coverPhoto'] = "Cover Photo is required!"
        if (description.length < 1) newErrors['description'] = "Description is required!"


        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;


        // Build up form data
        const formData = new FormData()
        formData.append("trail_name", trailName)
        formData.append("park", park)
        formData.append("city", city)
        formData.append("state", state)
        formData.append("lat", lat)
        formData.append("lng", lng)
        formData.append("category_id", categoryId)
        formData.append("length", length)
        formData.append("elevation_gain", elevationGain)
        formData.append("cover_photo", coverPhoto)
        formData.append("description", description)

        console.log('formdata on form page...........', formData)

        // Post project to the backend
        const updatedTrailOrErrors = await dispatch(updateTrailThunk(trailId, formData))

        // Handle backend validation errors
        if (!updatedTrailOrErrors) return null
        if ('errors' in updatedTrailOrErrors) {
            // handle errors from the backend which comes in as an object with a key of errors
            console.error('The backend returned validation errors when creating a new form', updatedTrailOrErrors)
            const formErrors = updatedTrailOrErrors.errors.errors
            let errorObj = {}

            Object.keys(formErrors).forEach((errorKey) => {
                const frontEndErrorKey = caseHelper(errorKey)
                const frontEndErrorString = formErrors[errorKey][0]
                errorObj[frontEndErrorKey] = frontEndErrorString
            })
            setErrors(errorObj)

        } else {
            if (updatedTrailOrErrors) {
                history.push(`/trails/${updatedTrailOrErrors.id}`)
            }
            else {
                console.error('The updateTrailThunk returned undefined when updating this trail')
            }
        }
    }

    if (!singleTrail) return <p>Trail loading...</p>


    return (
        <div>
            <h1>Update your Trail!</h1>
            <form className='update-trail-form' onSubmit={handleSubmit} >
                <label>
                    Trail Name <span className='errors'>{errors?.trailName}</span>
                    <input
                        type='text'
                        value={trailName}
                        placeholder='Trail Name'
                        onChange={(e) => setTrailName(e.target.value)}
                    />
                </label>
                <label>
                    Park<span className='errors'>{errors?.park}</span>
                    <input
                        type='text'
                        value={park}
                        placeholder='Park'
                        onChange={(e) => setPark(e.target.value)}
                    />
                </label>
                <label>
                    City<span className='errors'>{errors?.city}</span>
                    <input
                        type='text'
                        value={city}
                        placeholder='City'
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State<span className='errors'>{errors?.state}</span>
                    <input
                        type='text'
                        value={state}
                        placeholder='State'
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    Latitude<span className='errors'>{errors?.lat}</span>
                    <input
                        type='decimal' //does this need to be number?
                        value={lat}
                        placeholder='Latitude'
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label>
                    Longitude<span className='errors'>{errors?.lng}</span>
                    <input
                        type='decimal' //does this need to be number?
                        value={lng}
                        placeholder='Longitude'
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                <label>
                    Category <span className='errors'>{errors.category}</span>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}>
                        <option default>Select a Category</option>
                        {categories && Object.values(categories).map(category => (
                            <option key={category.id} value={category.id}>
                                {category.type}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Length<span className='errors'>{errors?.length}</span>
                    <input
                        type='decimal' //does this need to be number?
                        value={length}
                        placeholder='Length'
                        onChange={(e) => setLength(e.target.value)}
                    />
                </label>
                <label>
                    Elevation Gain<span className='errors'>{errors?.elevationGain}</span>
                    <input
                        type='number'
                        value={elevationGain}
                        placeholder='Elevation Gain'
                        onChange={(e) => setElevationGain(e.target.value)}
                    />
                </label>
                <label>
                    Description<span className='errors'>{errors?.description}</span>
                    <textarea
                        type='text'
                        value={description}
                        placeholder='Tell people about this trail...'
                        onChange={(e) => setDescription(e.target.value)}
                        rows="7" cols="50">
                    </textarea>
                </label>
                <label>
                    Cover Photo<span className='errors'>{errors?.coverPhoto}</span>
                    <input
                        type='text'
                        value={coverPhoto}
                        placeholder='Cover Photo'
                        onChange={(e) => setCoverPhoto(e.target.value)}
                    />
                </label>
                <button type='submit'>Update Trail</button>
            </form>
        </div>
    )

}

export default UpdateTrailFormPage