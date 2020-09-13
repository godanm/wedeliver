import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import Mailer from 'react-native-mail';

export default class SendMail extends Component {

  handleEmail = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['reachgodan@gmail.com'],
      ccRecipients: [],
      bccRecipients: [],
      body: '<b>A Bold Body</b>',
      customChooserTitle: "This is my new title", // Android only (defaults to "Send Mail")
      isHTML: true,
      attachments: [{
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        // mimeType - use only if you want to use custom type
        name: '',   // Optional: Custom filename for attachment
      }]
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleEmail}
          title="Email Me"
          color="#841584"
          accessabilityLabel="Purple Email Me Button"
        />
      </View>
    );
  }
}
