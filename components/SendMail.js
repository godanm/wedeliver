import { sendGridEmail } from 'react-native-sendgrid';
import {withNavigation} from "react-navigation";
import React from 'react';

const SENDGRIDAPIKEY = "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\n";
const FROMEMAIL = "test@test.com";
const TOMEMAIL = "me@test.com";
const SUBJECT = "You have a new message";

class SendMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name : "Godan", email: "reachgodan@gmail.com", phone:"609-977-0877"};
  }

  sendMail(){

    const ContactDetails = "Contact Data: " + this.state.name + " Mail: "+ this.state.email+" Phone: "+this.state.phone
    const sendRequest = sendGridEmail(SENDGRIDAPIKEY, TOMEMAIL, FROMEMAIL, SUBJECT, ContactDetails )
    sendRequest.then((response) => {
      console.log("Success")
    }).catch((error) =>{
      console.log(error)
    });
  }

}
export default withNavigation(SendMail);
