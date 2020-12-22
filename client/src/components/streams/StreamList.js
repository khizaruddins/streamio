import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';
import history from './../../history';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link
            to={`/streams/edit/${stream.id}`}
            className='ui mini basic orange button'
          >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui mini basic button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content' onClick={() => this.checkLogin(stream.id)}>
            <div className='header' style={{ cursor: 'pointer' }}>
              {stream.title}
            </div>
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  checkLogin(id) {
    if (this.props.isSignedIn) {
      history.push(`/streams/${id}`);
    } else {
      alert('Please Sign in with Google Account');
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui basic icon button'>
            <i className='add icon'></i>
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='ui celled segment'>
          <h2 className='header'>List of all Available streams</h2>
          {this.renderCreate()}
        </div>
        <div className='ui middle aligned selection list'>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
