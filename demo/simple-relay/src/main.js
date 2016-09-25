import React from "react";
import Relay from "react-relay";
import { RootContainer, DefaultNetworkLayer, injectNetworkLayer } from "react-relay";
import { render } from "react-dom";
//import { AppContainer, AppRoute } from "./components/App";

const githubNwLayer = new DefaultNetworkLayer("https://api.github.com/graphql", {
  headers: {
    Authorization: "Bearer a310d0d193e4e3efafc3d6cfaeb1733b1148454b"
  },
});

injectNetworkLayer(githubNwLayer);

class AppComponent extends React.Component {
  render() {
    return (
      <div>Hello</div>
    );
  }
}

function UserSummaryComponent({user}) {
  const {name, avatarURL, bio, login} = user;
  return (
    <a href={"https://github.com/"+login} target="_blank" title={name}>
      <img src={avatarURL} alt={name} width="24px"/>
      <span>{name}</span>
    </a>
  );
}

export const AppContainer = Relay.createContainer(UserSummaryComponent, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name, avatarURL, bio, login
      }
    `,
  }
});

export class AppRoute extends Relay.Route {
  static queries = {
    user: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
  static routeName = 'AppRoute';
}

function renderLoading() {
  return (
    <div>Loading...</div>
  );
}

render((
  <RootContainer Component={AppContainer} route={new AppRoute()} renderLoading={renderLoading}></RootContainer>
), document.getElementById("app"));
