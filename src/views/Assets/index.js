import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../models/assets';
import './index.css';

const Loading = props => (
  <div className="loader" hidden={!props.isFetching}>
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>
)

class Assets extends Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.props.dispatch(actions.get())
  }

  render() {
    const { assets, dispatch } = this.props;
    const { data, isFetching } = assets.toJS();
    console.log('data: ', data)


    const assetsList = data.map( ( item, index ) => {
      return (
        <li key={index}>
          {item}
        </li>
      )
    })

    return (
      <div>
        Assets
        <ul>
          {assetsList}
        </ul>
        <Loading isFetching={isFetching} />
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    assets: state.assets,
  }
}

// export default connect(mapStateToProps)(withRouter(Assets));
export default connect(mapStateToProps)(Assets);