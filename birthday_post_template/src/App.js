import React, { Component } from "react";
import { Card } from "react-bootstrap";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
import jsPdf from "jspdf";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import canvasToImage from "canvas-to-image";

import like from "./assets/icons/like.png";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      profileImage: null,
      username: EditorState.createEmpty(),
      usernametemp: true,
      designation: EditorState.createEmpty(),
      designationtemp: true,
      desc: EditorState.createEmpty(),
      desctemp: true,
      comments: 0,
      likes: 0,
      chkbox: false,
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onInputchangeImage = this.onInputchangeImage.bind(this);
    this.handleChangeComments = this.handleChangeComments.bind(this);
    this.handleChangeLikes = this.handleChangeLikes.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onInputchangeImage(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        profileImage: URL.createObjectURL(img),
      });
    }
  }

  onSubmitForm() {
    console.log(this.state);
  }
  printPDF = () => {
    const domElement = document.getElementById("photo");

    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      canvasToImage(canvas, {
        name: "myImage",
        type: "png",
        quality: 1,
      });
    });
  };
  onEditorStateChange = (username) => {
    this.setState({
      username,
      usernametemp: false,
    });
  };
  onDescChange = (desc) => {
    this.setState({
      desc,
      desctemp: false,
    });
  };

  onDesignationChange = (designation) => {
    this.setState({
      designation,
      designationtemp: false,
    });
  };
  handleChangeComments(event) {
    console.log(event);
    this.setState({ comments: event.target.value });
  }
  handleChangeLikes(event) {
    this.setState({ likes: event.target.value });
  }
  handleChangeChk(event) {
    this.setState({
      chkbox: !this.state.chkbox,
    });
  }
  render() {
    const {
      items,
      username,
      desc,
      options,
      designation,
      comments,
      likes,
      chkbox,
    } = this.state;
    let user = draftToHtml(convertToRaw(username.getCurrentContent()));

    let b = ` style="margin:0px"`;
    let position = 2;
    let output = [user.slice(0, position), b, user.slice(position)].join("");
    console.log(output);
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        ;
        <div style={{ flexDirection: "row", width: "50%", height: "100%" }}>
          <div>
            <label>
              Event Heading :
              <Editor
                editorState={username}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </label>
          </div>
          <div>
            <label>
              Name :
              <Editor
                editorState={designation}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onDesignationChange}
              />
            </label>
          </div>
          <div>
            <label>
              Person title :
              <Editor
                editorState={desc}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onDescChange}
              />
            </label>
          </div>

          <div>
            <label>
              Profile image :
              <input
                name="profileImage"
                type="file"
                // value={this.state.profileImage}
                onChange={this.onInputchangeImage}
              />
            </label>
          </div>
          <div>
            {chkbox === true ? (
              <div>
                <div>
                  <label> {"Comments"}</label>
                  <input
                    type="number"
                    // value={this.state.comments}
                    placeholder="0"
                    onChange={this.handleChangeComments}
                  />
                </div>
                <div>
                  <label> {"Likes"}</label>
                  <input
                    type="number"
                    placeholder="0"
                    onChange={this.handleChangeLikes}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            border: 1,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "lightcyan",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "100%",
              margin: 10,
            }}
          >
            <div>
              <Card
                // className="text-center"
                style={{
                  width: "80%",

                  margin: 10,
                  alignItems: "center",
                  justifyItems: "center",
                  padding: "25px 15px",
                  boxShadow: "rgb(0 0 0 / 13%) 0px 3px 10px 0px",
                }}
              >
                <Card.Body id="photo" class="mainDiv">
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "30%",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: "50%",
                          borderWidth: 8,
                          border: 6,
                          margin: 2,
                          marginTop: 120,
                          marginLeft: 40,
                          marginBottom: 120,
                          borderColor: "#EA5C2E",
                          borderStyle: "solid",
                        }}
                        src={this.state.profileImage}
                      />
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        width: "80%",
                        // backgroundColor: "aquamarine",
                        height: "100%",
                        marginTop: 140,
                        marginLeft: 160,
                        // paddingLeft: 5,
                      }}
                    >
                      <div style={{ flexDirection: "column" }}>
                        <div
                          style={{
                            flexDirection: "column",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.usernametemp == true ? (
                            "Event heading"
                          ) : (
                            <div
                              className="htmlTag"
                              style={{ margin: 0 }}
                              dangerouslySetInnerHTML={{
                                __html: `${user}`,
                              }}
                            />
                          )}
                          {console.log(
                            draftToHtml(
                              convertToRaw(username.getCurrentContent())
                            )
                          )}
                        </div>
                        <div
                          style={{
                            flexDirection: "column",
                            fontSize: 16,
                          }}
                        >
                          <Card.Title>
                            {this.state.designationtemp == true ? (
                              "Name"
                            ) : (
                              <div
                                className="htmlTag1"
                                dangerouslySetInnerHTML={{
                                  __html: draftToHtml(
                                    convertToRaw(
                                      designation.getCurrentContent()
                                    )
                                  ),
                                }}
                              />
                            )}
                          </Card.Title>
                          <Card.Text
                            style={{
                              width: "98%",
                              fontSize: 12,
                              justifyContent: "center",
                            }}
                          >
                            {this.state.desctemp == true ? (
                              "Person title"
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: draftToHtml(
                                    convertToRaw(desc.getCurrentContent())
                                  ),
                                }}
                              />
                            )}
                          </Card.Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  {chkbox === true ? (
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",

                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",

                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            paddingLeft: 6,
                            display: "flex",
                            flexDirection: "row",
                            width: "50%",
                          }}
                        >
                          <img
                            style={{
                              width: 100,
                              height: 24,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            src={like}
                            alt=""
                          ></img>
                          <div
                            style={{
                              fontSize: 14,
                              color: "lightslategrey",
                              flexDirection: "row",
                              paddingLeft: 10,
                            }}
                          >
                            {likes}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          flexDirection: "row",
                          width: "33%",
                          fontSize: 14,
                          color: "lightslategrey",
                        }}
                      >
                        {comments} {" comments"}
                      </div>
                    </div>
                  ) : null}
                </Card.Body>
              </Card>
            </div>
            <div
              style={{
                width: "90%",

                padding: 10,
              }}
            >
              <button id="print" onClick={this.printPDF}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
