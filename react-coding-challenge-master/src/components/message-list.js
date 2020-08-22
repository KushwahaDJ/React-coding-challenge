import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Api from "../api";
import "../style.css";

class MessageList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      messages: [],
      showSnakebar: false
    };
    this.timeOut = null;
    this.messageCount = 0;
  }

  api = new Api({
    messageCallback: message => {
      this.messageCallback(message);
    }
  });

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    const { messages } = this.state;
    this.setState(
      {
        messages: [
          ...messages.slice(),
          { ...message, messageId: this.messageCount++ }
        ]
      },
      () => {
        // Included to support initial direction. Please remove upon completion
        console.log(message);
      }
    );

    if (message.priority === 1) {
      this.setState({ showSnakebar: true });
      this.removeItem();
    }
  }
  clearItem = messageId => {
    this.setState({
      messages: this.state.messages.filter(item => item.messageId !== messageId)
    });
  };

  renderButton() {
    const isApiStarted = this.api.isStarted();
    return (
      <div className="btns">
        <Button
          variant="contained"
          onClick={() => {
            if (isApiStarted) {
              this.api.stop();
            } else {
              this.api.start();
            }
            this.forceUpdate();
          }}
        >
          {isApiStarted ? "Stop Messages" : "Start Messages"}
        </Button>
        <Button
          onClick={() => {
            this.setState({
              messages: []
            });
          }}
          variant="contained"
          className="clearAll"
        >
          CLEAR
        </Button>
      </div>
    );
  }

  removeItem = () => {
    clearTimeout(this.timeOut);
    setTimeout(() => {
      this.setState({ showSnakebar: false });
    }, 2000);
  };

  closeError = () => {
    clearTimeout(this.timeOut);
    this.setState({ showSnakebar: false });
  };

  render() {
    return (
      <div className="body">
        <div className="header">
          <h2>Here we Go...</h2>
          {this.state.showSnakebar ? (
            <p className="errors error">
              <span onClick={this.closeError}>&times; </span> error
            </p>
          ) : (
            ""
          )}
        </div>
        <div>{this.renderButton()}</div>
        <div className="errors error">
          <h2>Error Type 1</h2>
          {this.state.messages.filter(element => element.priority === 1)
            .length > 0 && (
            <div>
              <h4>
                Count
                <span>
                  {
                    this.state.messages.filter(
                      element => element.priority === 1
                    ).length
                  }
                </span>
              </h4>
            </div>
          )}

          {this.state.messages
            .filter(err => err.priority === 1)
            .map((err, index) => (
              <li key={index}>
                {err.message}
                <span onClick={() => this.clearItem(err.messageId)}>Clear</span>
              </li>
            ))}
        </div>
        <div className="errors warning">
          <h2>Error Type 2</h2>
          {this.state.messages.filter(element => element.priority === 2)
            .length > 0 && (
            <div>
              <h4>
                Count
                <span>
                  {
                    this.state.messages.filter(
                      element => element.priority === 2
                    ).length
                  }
                </span>
              </h4>
            </div>
          )}
          {this.state.messages
            .filter(err => err.priority === 2)
            .map((err, index) => (
              <li key={index}>
                {err.message}
                <span onClick={() => this.clearItem(err.messageId)}>Clear</span>
              </li>
            ))}
        </div>
        <div className="errors info">
          <h2>Error Type 3</h2>
          {this.state.messages.filter(element => element.priority === 3)
            .length > 0 && (
            <div>
              <h4>
                Count
                <span>
                  {
                    this.state.messages.filter(
                      element => element.priority === 3
                    ).length
                  }
                </span>
              </h4>
            </div>
          )}

          {this.state.messages
            .filter(err => err.priority === 3)
            .map((err, index) => (
              <li key={index}>
                {err.message}
                <span onClick={() => this.clearItem(err.messageId)}>Clear</span>
              </li>
            ))}
        </div>
      </div>
    );
  }
}

export default MessageList;
