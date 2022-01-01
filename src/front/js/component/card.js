import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/card.css";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";

export const HomeCard = (props) => {
  //  const { store, actions } = useContext(Context);

  return (
    <Card className="Card">
      <CardImg
        className="CardImg"
        alt="Card image cap"
        src="https://dummyimage.com/400x300/000/fff.png&text=Imagen+1"
        top
        width="100%"
      />
      <CardBody>
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardText>{props.text}</CardText>
      </CardBody>
    </Card>
  );
};

HomeCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
};
