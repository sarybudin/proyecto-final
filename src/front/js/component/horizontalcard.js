import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";

import "../../styles/horizontalcard.css";

export const HorizontalCard = (props) => {
  //  const { store, actions } = useContext(Context);

  return (
    <div className="card mb-3">
      <div className="row g-0 d-flex justify-items-start align-items-center">
        <div className="flex-fill d-flex col-xs-12 col-md-4 pull-left" id="img-space">
          <img src={props.image} className="img-fluid" />
        </div>
        <div className="col-8 d-flex flex-fill flex-column">
          <h5 className="card-title" id="hcardTitle">
            {props.title}
          </h5>
          <p className="card-text" id="hcardText">
            {props.text}
          </p>
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
