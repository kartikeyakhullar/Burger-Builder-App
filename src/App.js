import React, { Component } from 'react';
import Layout from "./components/Layouts"
import BurgerBuilder from "./containers/BurgerBuilder"


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
