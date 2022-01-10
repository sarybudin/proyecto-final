import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";

import "../../styles/horizontalcard.css";

export const HorizontalCard = (props) => {
  //  const { store, actions } = useContext(Context);

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3" id="img-space">
          <img src={props.image} className="img-fluid" />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h5 className="card-title" id="hcardTitle">
              {props.title}
            </h5>
            <p className="card-text" id="hcardText">
              {props.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

HorizontalCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
};
