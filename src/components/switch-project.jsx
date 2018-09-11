import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

export default class SwitchProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            projects: [
                { name: 'Maxis AM', tasks: 100 },
                { name: 'Maxis AD', tasks: 100 }
            ]
        }
    }
    open = () => this.setState({
        modalOpen: true,
    })
    close = () => this.setState({ modalOpen: false })

    selectProject = (projectId) => {
        this.props.selectProject(projectId);
        this.close();
    }
    renderProjects = () => {
        const { projects } = this.state;
        return projects.map((item, index) => {
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon name="barcode" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.name}</div>
                            <div style={{ fontSize: 13, color: '#939090' }}>{item.tasks} Tasks</div>
                        </div>
                    </div>
                    <span style={{ fontSize: 12 }}>
                        <Button onClick={()=>this.selectProject(item.name)} 
                            basic className={"selected"}>SELECT</Button>
                    </span>
                </div>
            )
        })
    }
    render() {
        const { modalOpen } = this.state;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Modal.Content style={{paddingBottom: 20}}>
                    {this.renderProjects()}
                </Modal.Content>
            </Modal>
        )
    }
}
