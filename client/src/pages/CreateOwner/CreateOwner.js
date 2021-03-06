import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Footer from "../../components/Footer";
import { CreateBtn } from "../../components/Buttons";
import { InputRow, TextArea } from "../../components/Form";
import { CardHead, CardBody } from "../../components/Card";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import Image from "react-image-resizer";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./CreateOwner.css";

class CreateOwner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal6: false,
      petOwner: {},
      image: "",
      isUploading: false,
      progress: 0,
      imageURL: "",
      errorMsg: ""
    };

    this.toggle6 = this.toggle6.bind(this);
  }

  toggle6() {
    this.setState({
      modal6: !this.state.modal6
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("owner")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({ imageURL: url })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const newOwner = {
      "name": this.state.ownerName,
      "address": this.state.ownerAddress,
      "city": this.state.ownerCity,
      "state": this.state.ownerState,
      "zip_code": this.state.ownerZipcode,
      "phone": this.state.ownerPhone,
      "secondary_phone": this.state.ownerSecPhone,
      "email": this.state.ownerEmail,
      "username": this.state.ownerUsername,
      "owner_info": this.state.ownerInfo,
      "owner_image": this.state.imageURL
    };

    API.createOwner({ newOwner })
      .then(res => this.props.history.push("/ownerview/", { username: this.state.ownerUsername, fromPage: "CreateOwner" }))
      .catch(err => console.log(err));
  };

  userFormSubmit = event => {
    event.preventDefault();
    let allRequired = false;

    if (!this.state.ownerUsername) {
      allRequired = false;
      this.setState({
        errorMsg: "User Name"
      })
    } else if (!this.state.ownerPassword) {
      allRequired = false;
      this.setState({
        errorMsg: "Password"
      })
    } else if (!this.state.ownerName) {
      allRequired = false;
      this.setState({
        errorMsg: "Name"
      })
    } else if (!this.state.ownerAddress) {
      allRequired = false;
      this.setState({
        errorMsg: "Address"
      })
    } else if (!this.state.ownerCity) {
      allRequired = false;
      this.setState({
        errorMsg: "City"
      })
    } else if (!this.state.ownerState) {
      allRequired = false;
      this.setState({
        errorMsg: "State"
      })
    } else if (!this.state.ownerZipcode) {
      allRequired = false;
      this.setState({
        errorMsg: "Zip Code"
      })
    } else if (!this.state.ownerPhone) {
      allRequired = false;
      this.setState({
        errorMsg: "Phone"
      })
    } else {
      allRequired = true;
    }

    if (allRequired) {
      if (this.state.ownerUsername && this.state.ownerPassword) {

        const ownLogObj = {
          username: this.state.ownerUsername,
          password: this.state.ownerPassword,
          role: "owner"
        }

        API.createOwnLogin({ ownLogObj })
          .then(res => this.handleFormSubmit(event)
          )
          .catch(err => console.log(err));
      }
    } else {
      this.toggle6();
    }
  };

  careFormSubmit = event => {
    event.preventDefault();
    if (this.state.careUserid && this.state.carePassword) {
      API.ownerLogin({
        user: this.state.careUserid,
        password: this.state.carePassword
      })
        .then(res => this.careLoggedIn())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="background">
        <div className="container fluid">
          <div className="row">
            <div className="col text-center">
              <Jumbotron>
                <div className="caregiver"><i className="fas fa-paw"></i> Create Owner Account</div>
              </Jumbotron>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card">
                <CardHead> <div className="create2">Create Owner Account <span className="required">* = required field</span></div></CardHead>
                <div className="background">
                  <CardBody>
                    <form>
                      <InputRow
                        value={this.state.ownerUsername}
                        onChange={this.handleInputChange}
                        name="ownerUsername"
                        title="User Name: *"
                        forattribute="ownerId"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <InputRow
                        value={this.state.ownerPassword}
                        onChange={this.handleInputChange}
                        name="ownerPassword"
                        title="Password: *"
                        forattribute="ownerPsswrd"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <InputRow
                        value={this.state.ownerName}
                        onChange={this.handleInputChange}
                        name="ownerName"
                        title="Name: *"
                        forattribute="ownerNm"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <InputRow
                        value={this.state.ownerAddress}
                        onChange={this.handleInputChange}
                        name="ownerAddress"
                        title="Address: *"
                        forattribute="ownerAdd"
                        collabel="col-md-2"
                        coldiv="col-md-10"
                      />
                      <div className="row">
                        <div className="col-md-6">
                          <InputRow
                            value={this.state.ownerCity}
                            onChange={this.handleInputChange}
                            name="ownerCity"
                            title="City: *"
                            forattribute="ownerCty"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                        <div className="col-md-3">
                          <InputRow
                            value={this.state.ownerState}
                            onChange={this.handleInputChange}
                            name="ownerState"
                            title="State: *"
                            forattribute="ownerState"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                        <div className="col-md-3">
                          <InputRow
                            value={this.state.ownerZipcode}
                            onChange={this.handleInputChange}
                            name="ownerZipcode"
                            title="Zip: *"
                            forattribute="ownerZp"
                            collabel="col-md-3"
                            coldiv="col-md-9"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <InputRow
                            value={this.state.ownerPhone}
                            onChange={this.handleInputChange}
                            name="ownerPhone"
                            title="Phone: *"
                            forattribute="ownerPh"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                        <div className="col-md-6">
                          <InputRow
                            value={this.state.ownerSecPhone}
                            onChange={this.handleInputChange}
                            name="ownerSecPhone"
                            title="Secondary Phone:"
                            forattribute="ownerPh2"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <InputRow
                            value={this.state.ownerEmail}
                            onChange={this.handleInputChange}
                            name="ownerEmail"
                            title="Email:"
                            forattribute="ownerEml"
                            collabel="col-md-4"
                            coldiv="col-md-8"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-5">
                              <p>Upload your photo: </p>
                              <FileUploader
                                accept="image/*"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage().ref("owner")}
                                onUploadStart={this.handleUploadStart}
                                onProgress={this.handleProgress}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                              />
                            </div>
                            <div className="col-md-3">
                              <p>Upload Progress:</p>
                            </div>
                            <div className="col-md-4">
                              <progress value={this.state.progress} max="100" id="uploader">0%</progress>
                              <Image
                                src={this.state.imageURL}
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <TextArea
                        value={this.state.ownerInfo}
                        onChange={this.handleInputChange}
                        name="ownerInfo"
                        title="About Me"
                        forattribute="ownerAbt"
                      />
                      <CreateBtn
                        onClick={this.userFormSubmit}
                      >
                        Create Account
                  </CreateBtn>
                    </form>
                  </CardBody>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />

        <Modal isOpen={this.state.modal6} toggle={this.toggle6} className={this.props.className} size="lg" backdrop="static" >
          <ModalHeader toggle={this.toggle6}><div className="account">Error Message</div></ModalHeader>
          <ModalBody>
            <div className="card">
              <CardHead
                value="Error Message"
              />
              <CardBody>
                <div className="row">
                  <div className="col">
                    <p className="error-msg">Please enter a valid {this.state.errorMsg}.</p>
                  </div>
                </div>
                <Button className="modal-btn" onClick={this.toggle6}>Close</Button>
              </CardBody>
            </div>
          </ModalBody>
        </Modal>

      </div>

    );
  }
}

export default CreateOwner;