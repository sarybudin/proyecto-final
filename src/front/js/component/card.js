import React, { useContext } from "react";
import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
// import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/card.css";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";

export const HomeCard = () => {
  //  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid">
      <h1>ÁniBot!!</h1>
      <Card className="Card">
        <CardImg
          className="CardImg"
          alt="Card image cap"
          src="https://dummyimage.com/400x300/000/fff.png&text=Imagen+1"
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">Título</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

/*HomeCard.propTypes = {
  title: PropTypes.string,
};

HomeCard.defaultProps = {
  title: "Título",
};*/
