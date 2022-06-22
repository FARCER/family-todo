import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './modules/profile/profile.module';
import { IndexPageModule } from './modules/index-page/index-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RouterModule,
    AppRoutingModule,
    ProfileModule,
    IndexPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
