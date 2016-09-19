# Redux small test app

This is my first exp in working with redux. I choosed next:

* Typescript - as it's one of the most (top 15) trending languages, that gives me great benefitsw while development and especially while refactoring (rename is awesome). The only weakness is slow project bootstraping.;
* Typed css modules - to avoid typo-bugs not only while typescript developing/refactoring;
* Webpack - as it has incredible support for react & redux development (hot module replacement, isomorphic tools).

#### Project conventions:
* There are a _Ref_'s object with same structure as _IAppState_. It should be used to get _state data path_ by object structure (with typecheck) and use it later to modify state in _Reducer_ (see _ClienForm_ reducer for example);
* Initial state must be specifiend in _state.yml_ file. _IState_ and _StateRef_ typings are generated automatically and placed in _state.ts_;
* Store cross-file interfaces in interfaces directory to avoid extra imports and to avoid class types usage inside interfaces;
* Use stateless component if possible (_templates_ folder);
* Use _Actors_ for side effects, such as data fetch. Actors also can emit _Actions_, _Dispatcher will enqueue them, then dispatch.

#### Install
`npm i`

#### Start
For develoment use `npm run dev`, for production - `npm run build` and `npm start`

#### Roadmap
So much work to do. Later... The closest steps are:
* tests
* generate reducers structure typings to avoid errors in _Reducer_.combine
* format code according tslint
* isomorphic data fetch
* localization (with i18next & gettext & customm JSX loader)

#### Preview
![preview](https://dl.dropboxusercontent.com/spa/cm6sytebldipwst/rs0r965a.png)
