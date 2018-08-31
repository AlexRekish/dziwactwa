import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

Logout.propTypes = {
  history: PropTypes.object.isRequired,

  onLogout: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
