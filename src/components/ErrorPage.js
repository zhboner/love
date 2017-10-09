import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 4
        }
    }

    componentDidMount() {
        this.interval = setInterval(()=>{
            this.setState((prevState) => {
                return {
                    count: prevState.count - 1
                }
            })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count === 0) {
            clearInterval(this.interval);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <p>
                You have got an error, redirecting to the index in {this.state.count} seconds.
            </p>
        )
    }
}

export default withRouter(ErrorPage);