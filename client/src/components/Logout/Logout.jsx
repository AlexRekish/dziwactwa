import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../services/authService';
import { Actions } from '../../store/actions/actions';

class Logout extends Component {
  state = {};

  componentDidMount() {
    const { onLogout, history } = this.props;
    logout();
    onLogout();
    history.replace('/');
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(Actions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
