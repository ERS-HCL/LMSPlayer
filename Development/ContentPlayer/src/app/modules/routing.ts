/**
 * Routing Module
 */
import { ContainerComponent } from '../controller/container.component';
import { VideoComponent } from '../controller/video.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const APP_ROUTES: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'player', component: ContainerComponent, children: [
    { path: '', redirectTo: 'player', pathMatch: 'full' },
    { path: 'video', component: VideoComponent, runGuardsAndResolvers: 'always'},
    { path: 'videoext', component: VideoComponent, runGuardsAndResolvers: 'always'}
  ]}
];


/**
 * Main module routing
 *
 * contains code related to routing
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {onSameUrlNavigation:  'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
