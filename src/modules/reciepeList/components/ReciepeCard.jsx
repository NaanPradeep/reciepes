import React from 'react';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {OverlayTrigger, Tooltip} from "react-bootstrap"
import { actions } from "../../redux/reciepeRedux"

export const ReciepeCard = (props) => {
  const dispatch = useDispatch()
  const { favorites } = useSelector(
    ({ favorites }) => ({
      favorites
    })
  )

  const addFavorite = (reciepeName) => {
    // checking if the reciepe exist within favorite list, if exist remove, else add to the favorite list
    if(favorites && favorites[reciepeName]) {
      dispatch(actions.removeFavorite(reciepeName))
    } else {
      dispatch(actions.addFavorite(reciepeName))
    }
  }

  return (
    <>
      <div className="reciepe mx-3 my-3">
        <div className="card">
          <span 
            className="favorites ms-auto pt-3 px-4"
            onClick={() => addFavorite(props.reciepeName)}
          >
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Favorites</Tooltip>}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="22" 
                height="22" 
                fill="currentColor" 
                className={`bi bi-heart fav-hover cursor-pointer ${favorites && favorites[props.reciepeName] ? 'fav-color' : ''}`}
                viewBox="0 0 16 16"
              >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </OverlayTrigger>
          </span> 
          <a href={`reciepe-detail?name=${props.reciepeName}`} className="card-body d-flex flex-column bg-white justify-content-between">
            <div className="text-center rounded mb-7">
              <img src={props.reciepeImage} className="mw-100 w-299px" />
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="font-size-12">
                    <div className="text-muted">{props.mealType[0].toString().toUpperCase()}</div>
                  </h4>
                  <h4 className="font-size-12">
                    <div className="text-dark">{props.reciepeName}</div>
                  </h4>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
 