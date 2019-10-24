import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  firebasePlugin;

  constructor(
    platform: Platform,
    public alertController: AlertController,
  ) {
    platform.ready().then(() => {
      this.firebasePlugin = (<any>window).FirebasePlugin;
      this.firebasePlugin.onMessageReceived(this.onMessageReceived.bind(this));
    });
  }

  getToken() {
    this.firebasePlugin.getToken(token => {
      const alert = this.alertController.create({
        title: 'FCM token',
        subTitle: token,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  onMessageReceived(message){
    if (message.tap) { console.log(`Notification was tapped in the ${message.tap}`); }

    const alert = this.alertController.create({
      title: 'Message received',
      subTitle: JSON.stringify(message),
      buttons: ['OK']
    });
    alert.present();
  }

}
