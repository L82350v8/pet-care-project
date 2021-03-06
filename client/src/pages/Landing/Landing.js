import React, { Component } from "react";
import DogPic from "../../components/DogPic";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { OwnerBtn, CareBtn } from "../../components/Buttons";
import { CardHead, CardBody } from "../../components/Card";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import "./Landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="background">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <DogPic>
              <div className="layer">
                <h1 className="title"> Welcome to Pet Purfect</h1>
                <h2 className="description">All Pets <i className="fas fa-paw"></i> All Care</h2>
                <div>
                  <Link to="/login">
                    <Button className="LoginBtn btn btn-lg">Login</Button>
                 </Link>
                 </div>
                <Button className="CreateAcctBtn btn-lg" onClick={this.toggle}>Create Account</Button>
                </div>
              </DogPic>
           </div>
          </div>
       
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}><div className="account">Pick Account Type</div></ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <CardHead>
                    <div className="account3">Create Owner</div>
                    <div className="account2">Account</div>
                    </CardHead>
                    <CardBody>
                      <Link to="/createowner" className="btn-link">
                        <OwnerBtn>
                          Owner
                      </OwnerBtn>
                      </Link>
                    </CardBody>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <CardHead>
                      <div className="account1">Create CareGiver</div>
                      <div className="account2">Account</div>
                    </CardHead>
                    <CardBody>
                      <Link to="/createcare" className="btn-link">
                        <CareBtn>
                          Caregiver
                        </CareBtn>
                      </Link>
                    </CardBody>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
          
         </div>
         <Footer />
        </div>
      
    );
  }
}

export default Landing;
