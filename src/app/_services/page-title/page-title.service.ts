import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  mapUrl2Title = new Map([
    ['home', `Ghost's Blogs`],
    ['useful-app/json-beautifier', `JSON Beautifier`],
    ['useful-app/json-excel', `JSON ⇋ Excel`],
    ['useful-app/text-diff', `Diff Checker`],
    ['useful-app/run-js', `Javascript playground`],
    ['index/js-index', `Javascript's books`],
    ['index/node-js-index', `NodeJS's books`],
    ['index/angular-index', `Angular's books`],
    ['index/react-index', `React's books`],
    ['index/html-index', `HTML's books`],
    ['index/css-index', `Css's books`],
    ['index/git-index', `Git's books`],
    ['index/mongodb-index', `MongoDB's books`],
    ['index/ts-index', `Typescript's books`],
    ['index/algorithms-index', `Algorithm's books`],
    ['index/android-index', `Android's books`],
    ['index/mysql-index', `Mysql's books`],
    ['index/react-native-index', `React Native's books`],
  ])

  constructor() { }
}
