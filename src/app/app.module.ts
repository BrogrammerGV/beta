
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DatePicker } from 'ionic2-date-picker';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { MyApp } from './app.component';

//Custom Pages: CJM 08/03/2017
//admin WebPage
import { AdminLoginPage } from '../pages/admin/admin-login/admin-login';
import { AdminManagerPage } from '../pages/admin/admin-manager/admin-manager';
import { AdminAddPage } from '../pages/admin/admin-add/admin-add';


import { EntryPage } from '../pages/entry/entry';
import { SelectPage } from '../pages/select/select';
import { TabsPage } from '../pages/tabs/tabs';

import { CulturePage } from '../pages/culture/culture';
import { InfoNamePage } from '../pages/info/info-name/info-name';
import { InfoBirthPage } from '../pages/info/info-birth/info-birth';
import { InfoSsnModalPage } from '../pages/info/info-ssn-modal/info-ssn-modal';
import { InfoDeathPage } from '../pages/info/info-death/info-death';
import { InfoAddrPage } from '../pages/info/info-addr/info-addr';
import { InfoMilitaryPage } from '../pages/info/info-military/info-military';
import { InfoHonorsPage } from '../pages/info/info-honors/info-honors';
import { InfoEduPage } from '../pages/info/info-edu/info-edu';
import { InfoWorkPage } from '../pages/info/info-work/info-work';

import { CultureSpousePage } from '../pages/culture/culture-spouse/culture-spouse';
import { CultureSpousecontPage } from '../pages/culture/culture-spousecont/culture-spousecont';
import { CultureParentsPage } from '../pages/culture/culture-parents/culture-parents';
import { CultureFatherPage } from '../pages/culture/culture-father/culture-father';
import { CultureRacePage } from '../pages/culture/culture-race/culture-race';


import { ServiceDispPage } from '../pages/service/service-disp/service-disp';
import { ServiceViewingPage } from '../pages/service/service-viewing/service-viewing';
import { ServiceModalPage } from '../pages/service/service-modal/service-modal';
import { ServiceViewModalPage } from '../pages/service/service-view-modal/service-view-modal';
import { ServiceRemainsPage } from '../pages/service/service-remains/service-remains';
import { ServiceCemeteryPage } from '../pages/service/service-cemetery/service-cemetery';

import { ServiceRemainsModalPage } from '../pages/service/service-remains-modal/service-remains-modal';
import { Welcome1Page } from '../pages/Welcome/welcome1/welcome1';
import { Welcome2Page } from '../pages/Welcome/welcome2/welcome2';
import { Welcome3Page } from '../pages/Welcome/welcome3/welcome3';
import { Home1Page } from '../pages/Home/home1/home1';
import { Planning1Page } from '../pages/Home/planning1/planning1';
import { Planning2Page } from '../pages/Home/planning2/planning2';
import { Search1Page } from '../pages/Home/search1/search1';
import { Search2Page } from '../pages/Home/search2/search2';
import { EventsPage } from '../pages/Home/events/events';

import { EventInfoOnePage } from '../pages/event-info/event-info-one/event-info-one';
import { EventMainPage } from '../pages/event-info/event-main/event-main';
import { EventMainPage2 } from '../pages/event-info/event-main2/event-main2';
import { EventMainPage3 } from '../pages/event-info/event-main3/event-main3';
import { GlobalCarePage } from '../pages/event-info/global-care/global-care';
import { CareModalPage } from '../pages/event-info/care-modal/care-modal';
import { CareRegistryListPage } from '../pages/event-info/care-registry-list/care-registry-list';
import { CareRegistryAddItemPage } from '../pages/event-info/care-registry-add-item/care-registry-add-item';
import { CareRegistryFirstTimeModalPage } from '../pages/event-info/care-registry-first-time-modal/care-registry-first-time-modal';
import { CareRegistryItemDetailsPage } from '../pages/event-info/care-registry-item-details/care-registry-item-details';
import { RegisterPage } from '../pages/register/register';
import { LoginComponentPage } from '../pages/login-component/login-component';
import { LoginPage } from '../pages/login/login';




@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    EntryPage,
    SelectPage,
    TabsPage,
    CulturePage, 
    InfoNamePage, 
    InfoBirthPage, 
    InfoSsnModalPage, 
    InfoDeathPage, 
    InfoAddrPage, 
    InfoMilitaryPage, 
    InfoHonorsPage, 
    InfoEduPage, 
    InfoWorkPage, 
    CultureSpousePage,
    CultureSpousecontPage, 
    CultureParentsPage, 
    CultureFatherPage, 
    CultureRacePage,
    ServiceDispPage,
    ServiceModalPage,
    ServiceViewingPage,
    ServiceViewModalPage,
    ServiceRemainsPage,
    ServiceRemainsModalPage,
    ServiceCemeteryPage,
    Welcome1Page,
    Welcome2Page,
    Welcome3Page,
    Home1Page,
    Planning1Page,
    Planning2Page,
    Search1Page,
    EventInfoOnePage,
    EventMainPage,
    Search2Page,
    EventsPage,
    EventMainPage2,
    EventMainPage3, 
    CareModalPage,
    EventMainPage3,
    CareRegistryListPage,
    CareRegistryAddItemPage,
    CareRegistryFirstTimeModalPage,
    CareRegistryItemDetailsPage,
     DatePicker,
    RegisterPage,
    LoginComponentPage, 
    GlobalCarePage,
    AdminLoginPage, 
    AdminManagerPage,
    AdminAddPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DatePicker,
    SelectPage,
    TabsPage,
    CulturePage, 
    InfoNamePage, 
    InfoBirthPage, 
    InfoSsnModalPage, 
    InfoDeathPage, 
    InfoAddrPage, 
    InfoMilitaryPage, 
    InfoHonorsPage, 
    InfoEduPage, 
    InfoWorkPage, 
    CultureSpousePage,
    CultureSpousecontPage, 
    CultureParentsPage, 
    CultureFatherPage, 
    CultureRacePage,
    ServiceDispPage,
    ServiceModalPage,
    ServiceViewingPage,
    ServiceViewModalPage,
    ServiceRemainsPage,
    ServiceRemainsModalPage,
    ServiceCemeteryPage,
    Welcome1Page,
    Welcome2Page,
    Welcome3Page,
    Home1Page,
    Planning1Page,
    Planning2Page,
    Search1Page,
    EventInfoOnePage,
    EventMainPage,
    Search2Page,
    EventsPage,
    EventMainPage2,
    EventMainPage3, 
    CareModalPage,
    EventMainPage3,
    CareRegistryListPage,
    CareRegistryAddItemPage,
    CareRegistryFirstTimeModalPage,
    CareRegistryItemDetailsPage,
     DatePicker,
    RegisterPage,
    LoginComponentPage, 
    GlobalCarePage, 
    LoginPage,
    AdminLoginPage, 
     AdminManagerPage, 
     AdminAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    SplashScreen,
    Calendar,
    CallNumber,
    SocialSharing,
    Camera,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
