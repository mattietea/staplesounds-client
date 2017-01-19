import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RecentComponent} from './pages/recent/recent.component';
import {TrendingComponent} from './pages/trending/trending.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {PlayerComponent} from './shared/components/player/player.component';
import {UserComponent} from './user/user.component';
import {SongComponent} from './song/song.component';
import {SongListComponent} from './song/song-list/song-list.component';
import {SongCardComponent} from './song/song-card/song-card.component';
import {SongFormComponent} from './song/song-form/song-form.component';
import {SongDetailsComponent} from './song/song-details/song-details.component';
import {UserFormComponent} from './user/user-form/user-form.component';
import {UserSignInComponent} from './user/user-registration/user-sign-in/user-sign-in.component';
import {UserFavoritesComponent} from './user/user-favorites/user-favorites.component';
import {LoadingComponent} from './shared/components/loading/loading.component';
import {KeyPipe} from './shared/pipes/key.pipe';
import {TimePipe} from './shared/pipes/time.pipe';
import {UserService} from "./shared/services/user.service";
import {PlayerService} from "./shared/services/player.service";
import {LayoutService} from "./shared/services/layout.service";
import {SessionService} from "./shared/authentication/session.service";
import {UtilityService} from "./shared/services/utility.service";
import {UserSignUpComponent} from './user/user-registration/user-sign-up/user-sign-up.component';
import {UserSettingsComponent} from './user/user-settings/user-settings.component';
import {SongNewComponent} from './song/song-new/song-new.component';
import {SongEditComponent} from './song/song-edit/song-edit.component';
import {routing} from "./app.routes";
import {PlaylistComponent} from './shared/components/playlist/playlist.component';
import {SongService} from "./shared/services/song.service";
import { PopoverComponent } from './shared/components/popover/popover.component';
import { SearchComponent } from './pages/search/search.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import {AuthGuard} from "./shared/authentication/auth.guard";
import {AdminGuard} from "./shared/authentication/admin.guard";
import {SoundCloudService} from "./shared/services/soundcloud.service";
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { NotificationComponent } from './shared/components/notifications/notification/notification.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        RecentComponent,
        TrendingComponent,
        NavbarComponent,
        PlayerComponent,
        UserComponent,
        SongComponent,
        SongListComponent,
        SongCardComponent,
        SongFormComponent,
        SongDetailsComponent,
        UserFormComponent,
        UserSignInComponent,
        UserFavoritesComponent,
        LoadingComponent,
        KeyPipe,
        TimePipe,
        UserSignUpComponent,
        UserSettingsComponent,
        SongNewComponent,
        SongEditComponent,
        PlaylistComponent,
        PopoverComponent,
        SearchComponent,
        UserRegistrationComponent,
        NotificationsComponent,
        NotificationComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        UserService,
        PlayerService,
        SessionService,
        UtilityService,
        SongService,
        LayoutService,
        SoundCloudService,
        AuthGuard,
        AdminGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
