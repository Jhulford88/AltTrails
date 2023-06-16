import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { deleteTrailThunk } from "../../store/trails";
import { getCurrentTrailsThunk } from "../../store/trails";

const DeleteTrailModal = ({trailId, setDeleted}) => {

    //initialize things
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()


    const deleteTrail = (e) => {
        dispatch(deleteTrailThunk(trailId))
          .then(dispatch(getCurrentTrailsThunk()))
          .then(closeModal)
          .then(setDeleted(true))
      }


      return (
        <div >
          <h2>Confirm Delete</h2>
          <button onClick={deleteTrail}>Yes</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )

}

export default DeleteTrailModal
