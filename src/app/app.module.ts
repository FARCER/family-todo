import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './modules/profile/profile.module';
import { IndexPageModule } from './modules/index-page/index-page.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CabinetModule } from './modules/cabinet/cabinet.module';
import { GroupsModule } from './modules/groups/groups.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    IndexPageModule,
    TasksModule,
    CabinetModule,
    GroupsModule,
    StoreModule.forRoot({
    }, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
