import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { SubjectComponent } from './components/subject/subject.component';
import { TagComponent } from './components/tag/tag.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'book/:pageType', component: BookComponent },
  { path: 'attribute/:pageType', component: AttributeComponent },
  { path: 'subject/:pageType', component: SubjectComponent },
  { path: 'tag/:pageType', component: TagComponent }
];
