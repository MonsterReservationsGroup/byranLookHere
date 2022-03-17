import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as rawPages from './pages';

const pageRoutes = Object.keys(rawPages).map((rawPage) => {
  //@ts-ignore
  const component = rawPages[rawPage] as any;
  const output = {
    path: rawPage.toLowerCase(),
    component,
    data: {
      state: rawPage.toLowerCase(),
    },
  };
  return output;
}) as any;

const routes: Routes = [...pageRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
