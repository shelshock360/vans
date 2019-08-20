import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  public usuarioLogin: Usuario = {};
  public usuarioRegistro: Usuario = {};
  private loading: any;
    
  constructor(  //importando area de serviço  
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  //componete pra pegar o o ion slide do html via angular




  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  ngOnInit() {


  }


    async login(){
      await this.presentLoading();
      try {

        await this.authService.login(this.usuarioLogin);
      } catch (error) {

        this.presentToast(error.message);
      } finally {

        this.loading.dismiss();
      }

    }


  async register() {
    await this.presentLoading();

    try {

      await this.authService.register(this.usuarioRegistro);
    } catch (error) {

      this.presentToast(error.message);
    } finally {

      this.loading.dismiss();
    }



  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
