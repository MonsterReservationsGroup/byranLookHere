import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as rawPages from './pages';

const pageRoutes = Object.keys(rawPages).map((rawPage) => {
  //@ts-ignore
  const component = rawPages[rawPage] as any;
  return {
    path: rawPage.toLowerCase(),
    component,
  };
}) as any;

const routes: Routes = [...pageRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
