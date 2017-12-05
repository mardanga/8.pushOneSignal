import { Platform } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class PushNotificationsProvider {

  constructor(private oneSignal: OneSignal, private plat: Platform, private alertCtrl: AlertController) {
    
  }

  InicializarPushProvider(){
    if (this.plat.is('cordova')){
      this.oneSignal.startInit('a6933c48-4df4-4409-b28f-4413cc5e0741', '900980813562');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        this.showAlert("Notificacion recibida");
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        this.showAlert("Notificacion abierta");
      });
      this.oneSignal.getIds().then((data)=> this.showAlert(data.userId + ' - ' + data.pushToken)).catch((error) => this.showAlert('Error al subscribirse a one Signal'));
      this.oneSignal.endInit();
    }
    else
    {
      console.error('Estas en un browser');      
    }
  }

  showAlert(texto) {
    let alert = this.alertCtrl.create({
      title: texto,
      subTitle: "",
      buttons: ['OK']
    });
    alert.present();
  }
}
