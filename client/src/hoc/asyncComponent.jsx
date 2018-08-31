import React, { Component } from 'react';

const asyncComponent = importComponent =>
  class extends Component {
    state = {
      component: null
    };

    async componentDidMount() {
      const cmp = await importComponent();
      this.setState({ component: cmp.default });
    }

    render() {
      const { component } = this.state;
      const AsyncComponent = component;
      return AsyncComponent ? <AsyncComponent {...this.props} /> : null;
    }
  };

export default asyncComponent;
