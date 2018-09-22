import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

export default class SwitchProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        }
    }
    open = () => this.setState({
        modalOpen: true,
    })
    close = () => this.setState({ modalOpen: false })

    selectProject = (project) => {
        this.props.selectProject(project);
        this.close();
    }
    renderProjects = () => {
        const { projects } = this.props;
        return projects.map((item, index) => {
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon name="bullseye" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.name}</div>
                        </div>
                    </div>
                    <Button onClick={() => this.selectProject(item)}
                        color='blue' circular>SELECT</Button>
                </div>
            )
        })
    }
    render() {
        const { modalOpen } = this.state;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Modal.Content style={{ paddingBottom: 20 }}>
                    {this.renderProjects()}
                </Modal.Content>
            </Modal>
        )
    }
}
