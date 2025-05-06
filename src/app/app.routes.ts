import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./pages/login/login.component').then(c => c.LoginComponent),
        pathMatch:'full'
    },{
        path:'menu',
        loadComponent: () => import('./pages/menu/menu.component').then(c => c.MenuComponent),
        children:[
            {
                path:'persona',
                loadComponent:() => import('./pages/persona/persona.component').then(c =>c.PersonaComponent)
            },{
                path:'partidos',
                loadComponent:() => import('./pages/partido/partido.component').then(c =>c.PartidoComponent),
                children:[
                    {
                        path:'cronograma',
                        loadComponent:() => import('./pages/cronograma/cronograma.component').then(c =>c.CronogramaComponent)
                    },{
                        path:'propuestas',
                        loadComponent:() => import('./pages/propuesta/propuesta.component').then(c =>c.PropuestaComponent)
                    },{
                        path:'galeria',
                        loadComponent:() => import('./pages/galeria/galeria.component').then(c =>c.GaleriaComponent)
                    }
                ],
            },{
                path:'galeria',
                loadComponent:() => import('./pages/galeria/galeria.component').then(c =>c.GaleriaComponent)
            },{
                path:'cronograma',
                loadComponent:() => import('./pages/cronograma/cronograma.component').then(c =>c.CronogramaComponent)
            },{
                path:'propuestas',
                loadComponent:() => import('./pages/propuesta/propuesta.component').then(c =>c.PropuestaComponent)
            },{
                path:'votacion',
                loadComponent:() => import('./pages/votacion/votacion.component').then(c =>c.VotacionComponent)
            },{
                path:'resultados',
                loadComponent:() => import('./pages/resultado/resultado.component').then(c =>c.ResultadoComponent)
            }

        ]
    },{
        path: '**',
        loadComponent: () => import('./pages/not-found.component').then(c => c.NotFoundComponent)
      }
      
];
