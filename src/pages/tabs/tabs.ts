import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { Home1Page } from '../Home/home1/home1';
import { EventsPage } from '../Home/events/events';
import { Search1Page } from '../Home/search1/search1';
import { EventMainPage } from '../event-info/event-main/event-main';

import { GlobalCarePage } from '../event-info/global-care/global-care';
//import { FhPage } from '../fh/fh'

//temporary
import { CareRegistryListPage } from '../event-info/care-registry-list/care-registry-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  public showModal: boolean = false;

  tab1Root: any = Home1Page;
  tab2Root: any = Search1Page;
  tab3Root: any = EventsPage;
  tab4Root: any = GlobalCarePage;


  constructor(navParams: NavParams) {
    //this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
