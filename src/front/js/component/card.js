import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/card.css";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";

export const HomeCard = (props) => {
  //  const { store, actions } = useContext(Context);

  return (
    <Card className="Card px-0">
      <CardImg className="CardImg" src={props.image} top width="100%" />
      <CardBody>
        <CardTitle className="CardTitle" tag="h5">
          {props.title}
        </CardTitle>
        <CardText className="CardText">{props.text}</CardText>
      </CardBody>
    </Card>
  );
};

HomeCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
};
