import React from 'react';
import { Dimmer, Header, Icon, Button } from 'semantic-ui-react';

const Loading = ({loading, error, message, onClose}) => {
    return (
        <Dimmer active={loading} page>
            {
                error ?
                    <React.Fragment>
                        <Header as='h2' inverted color='red'>
                            {message}
                        </Header>
                        <Button onClick={onClose} circular color='blue' inverted>LET ME CHECK</Button>
                    </React.Fragment>
                    :
                    <Header as='h2' icon inverted>
                        <Icon name='discourse' loading />
                        Please wait...
                </Header>
            }

        </Dimmer>
    );
};

export default Loading;