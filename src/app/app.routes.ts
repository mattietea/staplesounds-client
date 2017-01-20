import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongComponent } from "./song/song.component";
import { DiscoverComponent } from "./pages/discover/discover.component";
import {SongDetailsComponent} from "./song/song-details/song-details.component";
import {UserComponent} from "./user/user.component";
import {UserSettingsComponent} from "./user/user-settings/user-settings.component";
import {UserFavoritesComponent} from "./user/user-favorites/user-favorites.component";
import {TrendingComponent} from "./pages/trending/trending.component";
import {SongNewComponent} from "./song/song-new/song-new.component";
import {SongEditComponent} from "./song/song-edit/song-edit.component";
import {SearchComponent} from "./pages/search/search.component";
import {UserRegistrationComponent} from "./user/user-registration/user-registration.component";
import {AuthGuard} from "./shared/authentication/auth.guard";
import {AdminGuard} from "./shared/authentication/admin.guard";

export const routes: Routes = [
    { path: '', redirectTo: 'discover', pathMatch: 'full' },
    { path: 'discover', component: DiscoverComponent },
    { path: 'trending', component: TrendingComponent },
    { path: 'search', component: SearchComponent},
    { path: 'songs', component: SongComponent, children: [
        {path: 'new', component: SongNewComponent, canActivate: [AdminGuard]},
        {path: ':id/edit', component: SongEditComponent, canActivate: [AdminGuard]},
        {path: ':id', component: SongDetailsComponent}
    ]},
    { path: 'user', component: UserComponent, children: [
        {path: 'registration', component: UserRegistrationComponent},
        {path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard]},
        {path: 'favorites', component: UserFavoritesComponent, canActivate: [AuthGuard]}
    ] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
