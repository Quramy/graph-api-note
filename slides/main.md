
## Introduction

---

### Question

* GraphQLとかFalcorって何なの？
* 何のために作られたの？

---

### Today's theme: "API"

---

### Clients - Server

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
  「欲しい情報を欲しい分だけ返してくれる」APIがあれば...!
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

<ul style="lineheight: 1.3em">
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
  GitHub GraphQL APIで直近に <span class="fa fa-star"></span> したRepoを10件から  <br />
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

---

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

---

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

---

### React and GraphQL

---

<ul class="good">
  <li>Relay</li>
  <li>Apollo stack</li>
</ul>

#### React-Relay

<ul>
  <li>GraphQLをベースにしたFramework</li>
  <li>Relay Specificationに則ってGraphQL Serverを実装する必要がある</li>
</ul>

---

## Falcor

---

### What's Falcor?

<ul>
  <li>Netflixが開発したJavaScript Library(Middleware)</li>
  <li>2015年にオープンソース化</li>
  <li>2016年9月現在、Developer Preview</li>
  <li>Client - Server間で仮想的にJSONを共有する</li>
</ul>

---

### What's Falcor ?

<quote>
Falcor lets you represent all your remote data sources as a single domain model via JSON Graph. Falcor makes it easy to access as much or as little of your model as you want, when you want it.
</quote>

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

---

<img src="http://netflix.github.io/falcor/images/model-caching.png" alt="" class="no-frame"/>
<a class="link smaller" href="http://netflix.github.io/falcor/starter/how-does-falcor-work.html#caching">http://netflix.github.io/falcor/starter/how-does-falcor-work.html#caching</a>

---

### JSON Graph & Reference

<p class="smaller">
  参照構造をClient-Serverで共有する仕組み
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
  <li>FalcorのJSON Graphは正規化されたデータが扱える</li>
  <li>
    <a href="https://github.com/paularmstrong/normalizr" target="_blank">normalizr</a> と似ている
  </li>
</ul>

---

### Set/Call

GraphQLにMutationが存在するように、Falcorには

---

### Falcor and React

---

### Async MVC


<p class="smaller">
  Falcorはviewからは切り離されたライブラリ. <br />
  (MVCのModel部分のみを担当するイメージ)
</p>

<div>
  <img width="60%" src="http://netflix.github.io/falcor/images/async-mvc.png" alt="" class="no-frame">
  <a class="link smaller" href="http://netflix.github.io/falcor/starter/what-is-falcor.html#bind-to-the-cloud">
    http://netflix.github.io/falcor/starter/what-is-falcor.html#bind-to-the-cloud
  </a>
</div>

---

Falcorはデータを取得した際に発火するeventがある.

このeventを `componentDidMount` で購読し、下層のcomponentのpropsを更新するHOCを作成するのが常套手段.

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
      Netflixの中の人によるFalcor & Reactの説明資料
    </p>
  </li>
  <li>
    <a href="https://github.com/ekosz/redux-falcor" target="_blank">ekosz/redux-falcor</a>
    <p class="smaller">ReduxからFalcorを扱えるようにするライブラリ</p>
  </li>
</ul>


---

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

---


## まとめ

---

### Demand Driven Architecture

<ul class="good">
  <li>フロントの都合に合わせてAPIをリクエスト出来る</li>
  <li>Propertyや結合関係も思いのまま</li>
  <li>Relay/Falcorは正規化, cacheの面倒も見てくれる</li>
</ul>

良いことがいっぱい！

---

でも裏を返すと...

<ul class="bad">
  <li>複雑さをServer Sideに押し付けている</li>
  <li>データの結合関係を決められない(=SQLに頼りにくい)</li>
  <li>容易にN + 1問題が発生する. 性能を担保できるのか?</li>
</ul>

---

そもそも本当に必要としているのか？

自分のサービスにDemand Driven Architectureが必要か、じっくり考えた方が良い。

---

### DDAが向いていそうなケース

<ul class="good">
  <li>複数種類のクライアントを考えている</li>
  <li>帯域制限要求が厳しい</li>
  <li>APIを公開するので、柔軟に呼べるようにしたい</li>
  <li>扱うデータ構造に多対多が頻出する</li>
</ul>

---

### DDAが向いていないケース

<ul class="bad">
  <li>デスクトップメイン。N/Wは十分高速</li>
  <li>自社のクライアントから呼びだせればそれで良い</li>
  <li>木構造が扱えれば十分</li>
</ul>

<p class="smaller">
  複数クライアントを扱う場合も、クライアント特性毎(PC or mobile等)にendpointを用意すれば十分なケースも多いのでは
  (Backend For Frontend)
</p>

---

## Thank you!
