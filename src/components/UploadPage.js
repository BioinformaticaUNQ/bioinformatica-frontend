import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Uploader from './components/uploader/Uploader';
import Status from './components/Status';
import Results from './components/Results';
import Actions from './components/Actions';
import uploadActions from '../../actions/uploadActions';


const styles = theme => ({
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    }
});

class UploadPage extends Component {

    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.actions.unsetFile();
        this.props.actions.setProcessResult(null);
        this.props.actions.setProcessProgress(null);
        this.props.actions.setProcessUnfinished();
    }

    render() {
        return (
            <Container maxWidth="sm" className={this.props.classes.container}>
                <Uploader/>
                <Status/>
                <Results/>
                <Actions/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(uploadActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme:true})(UploadPage));