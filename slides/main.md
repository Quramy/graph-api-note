
## Introduction

---

### Question

GraphQLやFalcorは何の為に作られたのか？

---

Background : Multiple Clients - Server

<img src="resources/images/intro.png" class="no-frame" style="width:auto" alt="">

---

例 : GitHub REST APIで <span class="fa fa-star"></span> したRepoを取得

<img src="resources/images/thin.png" class="no-frame" style="width:auto" alt="">

---

こっちの方が良い、という奴がいるかもしれない

<img src="resources/images/fat.png" class="no-frame" style="width:auto" alt="">

---

最初からこうすればいいんじゃね？

<img src="resources/images/dda.png" class="no-frame" style="width:auto" alt="">

---

### Answer

<p class="smaller">
  複数クライアントに対応したサービスを効率よく開発したい
</p>

<span class="fa fa-arrow-down"></span>

<p class="smaller">
  <span style="font-size: 1.3em">欲しい情報を欲しい分だけ</span>返してくれるAPIがあれば...!
</p>

<span class="fa fa-arrow-down"></span>

これを実現するのがGraphQLやFalcor.

---

GraphQLやFalcorのような仕組みの総称:

<p style="font-size:larger">
  "Demand Driven Architecture"
</p>

<a class="link smaller" href="https://qconnewyork.com/ny2015/system/files/presentation-slides/qcon_dda_2015_iwork09_boguta_nolen.pdf" target="_blank">
presentation slides by Boguta & Nolen at QCon Newyork 2015</a>

---

## GraphQL

<div style="margin-top: 5%">
  <img width="20%" src="resources/images/graphql_logo.svg" class="no-frame" alt="">
</div>

---

### What's GraphQL?

<ul class="wide">
  <li>2012年にFacebook社内で開発されたクエリ言語</li>
  <li>2015年にOpen Source化.
  <a href="https://facebook.github.io/graphql/" target="_blank">RFCの草案</a>も一応ある</li>
  <li>2016.09.14に"Production Ready"に</li>
  </li>
</ul>

---

### Query example

<p class="smaller">
データの検索を操作にはqueryを利用する
</p>

```python
query {
  viewer {    # オブジェクト名. 子propertyをネストさせる
    starredRepositories(    # propertyに引数を与えるパターンもある
      first: 10
      orderBy: {field: STARRED_AT, direction: DESC}
    ){
      edges {
        node {
          name, description,
          issues {
            totalCount
          }
        }
      }
    }
  }
}
```

<p class="smaller">
GitHub GraphQL APIで直近に <span class="fa fa-star"></span> したRepo 10件から  <br />
名前、説明、issue件数のフィールドを取得する.
</p>

<a class="link smaller" href="https://developer.github.com/early-access/graphql/explorer/" target="_blank">
Try it with GitHub GraphQL explorer!
</a>

---

### Mutation

<p class="smaller">データの変更操作はmutationを利用する

```python
mutation {
  addComment(     # 関数名
    input: {      #   引数
      clientMutationId: "0"
      subjectId: "MDU6SXNzdWUxNzg2NTUyOTE="
      body: "test add comment mutation"
    }
  ) {             # 戻り値のうち、所望のproperty
    subject {
      ... on Issue {
        comments(last: 1) {
          edges {
            node {
              author {name}, body
            }
          }
        }
      }
    }
  }
}
```

---

### Schema

<p class="smaller">
  GraphQLには独自のSchema Systemが備わっている. <br />
  GitHub GraphQL APIにおける "Repository" の定義(一部抜粋)
</p>

<!-- {{{ -->

```json
{
  "kind": "OBJECT",
  "name": "Repository",
  "description": "A repository contains the content for a project.",
  "fields": [
    {
      "name": "description",
      "description": "The description of the repository.",
      "args": [],
      "type": {
        "kind": "SCALAR",
        "name": "String",
        "ofType": null
      },
      "isDeprecated": false,
      "deprecationReason": null
    },
    {
      "name": "descriptionHTML",
      "description": "The description of the repository rendered to HTML.",
      "args": [],
      "type": {
        "kind": "NON_NULL",
        "name": "Non-Null",
        "ofType": {
          "kind": "SCALAR",
          "name": "HTML",
          "ofType": null
        }
      },
      "isDeprecated": false,
      "deprecationReason": null
    },
    ...
  ]
}
```

<!-- }}} -->

<p class="smaller">
<a href="http://graphql.org/graphql-js/utilities/#introspectionquery" target="_blank">introspectionQuery</a>
を実行することで完全なSchemaを取得可能
</p>


<!--
### Libraries(JavaScript)

<ul class="good">
  <li>
    <a href="http://graphql.org/graphql-js/" target="_blank">graphql/graphql-js</a>
    <p class="smaller">
      GraphQLのRI. parserやvalidator, excecutor等の機構を含む.
    </p>
  </li>
  <li>
    <a href="https://github.com/graphql/graphiql" target="_blank">graphql/graphiql</a>
    <p class="smaller">
      読みは"ぐらふぃくる". GraphQLの対話コンソール. <br /> React Component.
      Electronでラップした<a href="https://github.com/skevy/graphiql-app" target="_blank">アプリ版</a>も.
    </p>
  </li>
  <li>
    <a href="https://github.com/graphql/express-graphql" target="_blank">graphql/express-graphql</a>
    <p class="smaller">
      ExpressでGraphQLのエンドポイントを公開するためのMiddleware.
    </p>
  </li>
</ul>


### Libraries(other lang)

<ul class="good">
  <li>
    <a href="https://github.com/rmosolgo/graphql-ruby" target="_blank">rmosolgo/graphql-ruby</a>
  </li>
  <li>
    <a href="https://github.com/graphql/libgraphqlparser" target="_blank">graphql/libgraphqlparser</a>
  </li>
  <li>
    <a href="https://github.com/graphql-go/graphql" target="_blank">graphql-go/graphql</a>
  </li>
  <li class="no-mark">etc...</li>
</ul>

<p class="smaller">
<a href="https://github.com/chentsulin/awesome-graphql" target="_blank">awesome-graphql</a> に色々載ってます
</p>
-->

---

### React and GraphQL

<ul class="good">
  <li>
    <a href="https://facebook.github.io/relay/" target="_blank">Relay</a>
    <p class="smaller">
      Facebookが開発したReactとGraphQLを統合したFramework. <br />
      GraphQL Relay Specificationの実装が必要(後述)
    </p>
  </li>
  <li>
    <a href="http://dev.apollodata.com/react/" target="_blank">react-apollo</a>
    <p class="smaller">
    Meteorが開発したApollo StackにおけるReact Client. <br />
    Apolloは様々なFrameworkのGraphQL Clientを提供している(Angular/Swift/Java, etc...)
    </p>
  </li>
  <li class="no-mark smaller">etc...</li>
</ul>

---

### Relay Architecture

<img width="60%" src="https://facebook.github.io/react/img/blog/relay-components/relay-architecture.png" class="no-frame" alt="">
<a class="link smaller" href="https://facebook.github.io/react/blog/2015/03/19/building-the-facebook-news-feed-with-relay.html#the-relay-architecture">
https://facebook.github.io/react/blog/2015/03/19/building-the-facebook-news-feed-with-relay.html#the-relay-architecture
</a>

---

### Relay provides HOC

<p class="smaller">
  Relay.createContainer はComponentにRelay Storeの値を注入する <br />
  (react-reduxのconnectのようなもの)
</p>

```javascript
export function Repository({repository}) {
  const {name, description, issues} = repository;
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <span>{issues.totalCount}</span>
    </div>
  );
}
```

```javascript
export const RepositoryContainer = Relay.createContainer(Repository, {
  fragments: {
    repository: () => Relay.QL`
      fragment on Repository {
        name, description, issues { totalCount }
      }
    `
  }
});
```

<p class="smaller">
注入したいpropsはGraphQLのfragment形式で記述
</p>

---

### Composition

```javascript
export function Repositories({starred}) {
  const {edges} = starred.starredRepositories;
  return (
    <ul>
      {edges.map(edge => (
        <li key={edge.node.id}><RepositoryContainer repository={edge.node} /></li>
      ))}
    </ul>
  );
}
```

```javascript
export const RepositoriesContainer = Relay.createContainer(Repositories, {
  fragments: {
    starred: () => Relay.QL`
    fragment on User {
      starredRepositories(
        first:10, orderBy: { field: STARRED_AT, direction: DESC }
      ){
        edges {
          node {
            id, ${RepositoryContainer.getFragment("repository")}
          }
        }
      }
    }`
  }
});
```

<p class="smaller">
  Component階層に従って、fragmentもcomposeしていく
</p>

---

### Root & Route


```javascript
export class AppRoute extends Relay.Route {
  static queries = {
    starred: () => Relay.QL`
      query {
        viewer
      }
    `
  };
  static routeName = 'AppRoute';
}

render((
  <RootContainer Component={RepositoriesContainer} route={new AppRoute()}/>
), document.querySelector("#app"));
```

<p class="smaller">
  RootContainer はRelayアプリのトップレベルに配置するコンテナ. <br />
  Routeは下層コンテナのFragmentを結合していき、クエリを構築する
</p>

---

<p class="smaller">
Rauteにより結合されるGraphQLクエリのイメージ
</p>

```python
# AppRaute
query {
  viewer { ...F2 }
}

# from RepositoriesContainer
fragment F2 on User {
  starredRepositories(
    first: 10, orderBy: {field: STARRED_AT, direction: DESC}
  ){
    edges {
      node { id, ...F1 }
    }
  }
}

# from RepositoryContainer
fragment F1 on Repository {
  name, description, issues {totalCount}
}
```

---

<img class="no-frame" src="resources/images/relay_composition.png" alt="">

---

### Caution

<p class="smaller">
  <b> 注意: GraphQLのServerがある ≠  Relayから接続できる</b>
</p>

<p class="smaller">
  対応するServerはGraphQL Relay Specを実装する必要がある:
  <a class="link" href="https://facebook.github.io/relay/docs/graphql-relay-specification.html" target="_blank">https://facebook.github.io/relay/docs/graphql-relay-specification.html</a>
</p>

<p class="smaller">
  Relayが内部のCache管理やPagingのために用いるため
</p>

---

#### GraphQL Relay Specificationの例(一部)：

<ul style="font-size:smaller">
  <li>コレクションの要素は Edge interface を実装すること</li>
  <li>EdgeにはNode interfaceを実装したnodeフィールドを含めること</li>
  <li>Mutation の引数は inputという名前にすること</li>
  <li>Mutation の引数には clientMutationIdフィールドを含めること</li>
  <li>etc...</li>
</ul>

<p class="smaller">※ GitHub GraphQL APIはこのSpecを満たしている</p>

---

## Falcor

<img src="resources/images/falcor_logo.svg" class="no-frame" alt="">

---

### What's Falcor?

<ul class="wide">
  <li>Netflixが開発したJavaScript Library(Middleware)</li>
  <li>2015年にオープンソース化</li>
  <li>2016年9月現在、Developer Preview</li>
</ul>

---

### One Model Everywhere

<p class="smaller">
Client - Server間でグラフ構造を透過的に扱うイメージ. <br/>
Clientには必要な部分グラフがcacheされていく.
</p>

<img class="no-frame" src="resources/images/falcor_json_g.png" alt="">

---

### Query example

```javascript
// Model classを介してFalcorが管理するデータにアクセスする
const model = new falcor.Model({
  datasource: new HttpDatasource("/model.json")
});

model.get(
  "login", "name",
  "starredRepositories[0...10].name",
  "starredRepositories[0...10].description",
  "starredRepositories[0...10].issues.length"
).subscribe(({json}) => {
  console.log(json);
  // {
  //   login: "Quramy",
  //   name: "Yosuke Kurami",
  //   starredRepositories: {
  //     0: { name: "hoge", description: "...", ...},
  //     ...
  //     9: { name: "bar", description: "...", ...}
  //   }
  // }
});
```

<!--
### Model has own cache

<p class="smaller">
Clientに存在しない部分グラフをServerへ問い合わせる
</p>

<img width="60%" src="http://netflix.github.io/falcor/images/model-caching.png" alt="" class="no-frame"/>
<a class="link smaller" href="http://netflix.github.io/falcor/starter/how-does-falcor-work.html#caching">http://netflix.github.io/falcor/starter/how-does-falcor-work.html#caching</a>
-->

---

### JSON Graph & Reference

<p class="smaller">
  Falcorは内部でJSON Graphというデータ形式でCacheを構築する <br />
  JSON Graphは"参照"をClient-Serverで共有する為の仕組み
</p>

```javascript
// JSON Graphの例:
{
  repositories: {
    0: { $type: "ref", value: ["repositoriesById", "hogehoge"]},
    ...
  },
  starredRepositories: {
    0: { $type: "ref", value: ["repositoriesById", "hogehoge"]},
    1: { $type: "ref", value: ["repositoriesById", "piyopiyo"]},
    ...
  },
  repositoriesById: {
    "hogehoge": {
      name: "hogehoge",
      owner: {
        $type: "ref", value: ["usersById", "quramy"]
      }
    },
  },
  usersById: {
    "quramy": {
      login: "quramy",
      name: "Yosuke Kurami",
      avatarURL: "..."
      ...
    },
    ...
  },
}
```

---

### Normalized data

<ul class="good">
  <li>Falcorが扱うデータ(JSON Graph)は正規化されている</li>
  <li>One Fact in One Place</li>
  <li><a href="https://github.com/paularmstrong/normalizr" target="_blank">paularmstrong/normalizr</a> と似ている</li>
</ul>

---

### Set/Call

<p class="smaller">
  GraphQLにMutationが存在するように、<br />Falcorにも変更を扱う独自の仕組みがある
</p>

```javascript
// setは冪等な操作に利用する
model.set({
  path: "viewer.login",
  value: "QURAMY"
}).subscribe(...);

// callは冪等でない操作に利用する
model.call({
  path: "starredRepositories[0].issues[0].addComment",
  args: [{body: "some comment"}],
  ["body", "author.login", "author.avatarURL"]
}).subscribe(...);
```


<!--
### Libraries(JavaScript)

<ul class="good">
  <li>
    <a href="https://github.com/Netflix/falcor-router" target="_blank">falcor-router</a>
    <p class="smaller">
      FalcorのrequestをからJSON Graphを生成するための機構
    </p>
  </li>
  <li>
    <a href="https://github.com/Netflix/falcor-express" target="_blank">falcor-express</a>
    <p class="smaller">
      falcor-routerで作成したRouterをExpressに登録するmiddleware
    </p>
  </li>
  <li>
    <a href="https://github.com/Netflix/falcor-http-datasource" target="_blank">falcor-http-datasource</a>
    <p class="smaller">HTTP上に公開されたFalcorエンドポイントに接続するためのDataSource</p>
  </li>
</ul>


### Libraries(other lang)

<p class="smaller">
  JavaScript以外のライブラリはほぼ皆無. <br />
  (C#のServer Side向け実装が存在する程度)
</p>

<p class="smaller">
  GraphQLと比較すると、活況とは言えないのがFalcorの現状...
</p>
-->

---

### React and Falcor

---

### Async MVC


<p class="smaller">
  FalcorはViewには依存していないライブラリ. <br />
  (MVCのModel部分のみを担当するイメージ)
</p>

<div>
  <img width="50%" src="http://netflix.github.io/falcor/images/async-mvc.png" alt="" class="no-frame"> <br />
  <a class="link smaller" href="http://netflix.github.io/falcor/starter/what-is-falcor.html#bind-to-the-cloud">
    http://netflix.github.io/falcor/starter/what-is-falcor.html#bind-to-the-cloud
  </a>
</div>

---

### Integrate with View Libraries

<p class="smaller">
  Falcor.modelにはCache変更時に発火するonChange callbackが仕込める
</p>

<p class="smaller">
  このイベントを購読してViewのstateを更新するのが常套手段
</p>

---

#### Pseudocode Example

```javascript
class Model extends falcor.Model {
  constructor(opt) {
    opt.onChange = () => this.event.emit("update");
    super(opt);
    this.event = new EventEmitter();
  }
}
const model = new Model(option);

class AppContainer extends React.Component {
  componentDidMount() {
    model.event.on("update", () => {
      model.get(query).subscribe(({json}) => {
        this.setState(toState(json));
      });
    });
  }
  render () {
    return <App appProps={this.state} />;
  }
}
```

---

### Other Resources

<ul class="good">
  <li>
    <a href="https://speakerdeck.com/btholt/falcorjs-and-react" target="_blank">falcorjs-and-react</a>
    <p class="smaller">
      Netflixの中の人によるFalcor & Reactの説明資料. <br/>
      複数のqueryを連結することで、RelayのFragment Composition相当を実装する方法も示されている
    </p>
  </li>
  <li>
    <a href="https://github.com/ekosz/redux-falcor" target="_blank">ekosz/redux-falcor</a>
    <p class="smaller">ReduxからFalcorを扱えるようにするライブラリ</p>
  </li>
</ul>


---


<!--
#### Realy v.s. Falcor
<table style="font-size: 0.7em">
  <thead>
    <tr>
      <td></td>
      <td>Relay</td>
      <td>Falcor</td>
    </tr>
  </thead>
  <tr>
    <td>Server</td>
    <td>graphql-express</td>
    <td>falcor-express</td>
  </tr>
  <tr>
    <td>Request</td>
    <td>(GraphQL)</td>
    <td>(JSON Graph)</td>
  </tr>
  <tr>
    <td>Caching</td>
    <td>react-relay</td>
    <td>falcor/Model</td>
  </tr>
  <tr>
    <td>View</td>
    <td>react</td>
    <td>(none)</td>
  </tr>
</table>
-->


## まとめ

---

### DDA for Front-end

<ul class="good">
  <li>フロントの都合に合わせてAPIをリクエスト出来る</li>
  <li>取得するPropertyやネストの深さも思いのまま</li>
  <li>フロント改修の度にAPIをメンテする必要が無くなる</li>
  <li>(Relay/Falcorであれば)正規化の面倒も見てくれる</li>
  <li class="no-mark smaller">etc...</li>
</ul>

良い事ずくめだ！

---

でも裏を返すと...

<ul class="bad">
  <li>複雑さをAPIサーバ側に押し付けているのでは？</li>
  <li>データの結合関係を決められない(=SQLに頼りにくい)</li>
  <li>
    容易にN + 1問題が発生する. 性能を担保できるのか?
    <p class="smaller">
      <a href="https://github.com/facebook/dataloader">dataloader</a> 等のcaching/batching libraryを用いてDown Streamへの負荷を低減することは可能
    </p>
  </li>
  <li class="no-mark smaller">etc...</li>
</ul>

---

### 本当にDDAを必要としているのか？

---

### DDAが向いていそうなケース

<ul class="good">
  <li>複数種類のクライアントを考えている</li>
  <li>低速回線対応. 通信量を絞り込みたい</li>
  <li>扱うデータ構造に多対多が頻出する</li>
</ul>

---

### DDAが向いてなさそうなケース

<ul class="bad">
  <li>デスクトップメイン。帯域幅も十分</li>
  <li>自社のクライアントから呼びだせればそれで良い</li>
  <li>木構造が扱えれば十分</li>
</ul>

<p class="smaller">
  複数クライアントを扱う場合も、クライアント特性毎(PC or mobile等)にREST endpoint(= BFF)を用意すれば十分なケースも多いのでは
</p>

---

<p>
  自分のサービスにDemand Driven Architectureが必要か
</p>
<p>
  じっくり考えてからGraphQLやFalcorを適用すべき
</p>

---

## Thank you!

<a class="smaller" href="https://quramy.github.io/graph-api-note/#/">
<span class="fa fa-github"></span>
https://quramy.github.io/graph-api-note/
</a>
