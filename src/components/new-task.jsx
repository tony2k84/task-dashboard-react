import React, { Component } from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            taskTypes: [],
        }
    }
    open = () => this.setState({
        modalOpen: true,
    })
    close = () => this.setState({ modalOpen: false })

    saveTask = () => {
        this.props.taskAdded();
        this.close();
    }

    render() {
        const { modalOpen, taskTypes } = this.state;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Header icon='dot circle' content='New Task' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Application</label>
                            <input placeholder='Application Name' />
                        </Form.Field>
                        <Form.Select fluid label='Task Type' options={taskTypes} placeholder='Task Type' />
                        <Form.Field>
                            <label>Due</label>
                            <input placeholder='DD/MM/YYYY' />
                        </Form.Field>
                        <Form.Field>
                            <label>Owner</label>
                            <input placeholder='Owner' />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic 
                        onClick={()=>this.saveTask()}
                        className={"selected"} content='SAVE'/>
                </Modal.Actions>
            </Modal>
        )
    }
}
