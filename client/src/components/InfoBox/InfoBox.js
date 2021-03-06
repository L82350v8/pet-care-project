import React from "react";
import Container from "../Container/Container";
// import Image from "../../assets/cat.jpeg";
import "./InfoBox.css";

const InfoBox = props => (
  <div>
    <div className="row">
      <div className="col-12">
        <h1 className="infoTitle"> About Pet Purfect</h1>
      </div>
    </div>
    {/* <div className="background"> */}
    <Container>
      
      <div className="row">
        <div className="col-7">
          <div className="info">
          <div className="all">All Pets<i className="fas fa-paw"></i> All Care </div>
          <div className="all2">We care about your Pets just as much as you do! </div>
         <div className="all3"> We provide pet owners the ability to provide custom care information to caregivers about 
          their pet while they are away. This information enhances the care of their pets.  
          In addition, pet owners can specify special instructions for each pet and coordinate with the 
          caregiver to complete the status of very important tasks. If the specified task has not completed 
          with a specified time, our app can send a message to all parties informing them that an important 
          task is overdue. Caregivers can also benefit from this application by having a repository of information 
          about each pet that is in their care. And, they can earn a good reputation from pet owners 
          by following all care instructions.
          </div>
        </div>
      </div>
      </div>
    </Container>
    </div>
  // </div>
);



export default InfoBox;
