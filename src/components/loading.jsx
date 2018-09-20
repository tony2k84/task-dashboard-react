import React from 'react';
import { Dimmer, Header, Icon } from 'semantic-ui-react';

const Loading = ({ loading, message = 'Please wait..' }) => {
    return (
        <Dimmer active={loading} page>
            <Header as='h2' icon inverted>
                <Icon name='discourse' loading />
                {message}
            </Header>
        </Dimmer>
    );
};

export default Loading;