import React, { Component } from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            type: '',
            group: '',
            description: '',
            nextRun: '',
            owner: ''
        }
    }
    open = () => this.setState({
        modalOpen: true,
        type: '',
        group: '',
        description: '',
        nextRun: '',
        owner: ''
    })
    close = () => this.setState({ modalOpen: false })

    saveTask = () => {
        const { type, group, description, nextRun, owner } = this.state;
        var dateSplit = nextRun.split("/");
        var d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
        d.setHours(23, 59, 59, 999);
        this.props.addTask(type, group, description, d.getTime(), owner);
        this.close();
    }
    handleInputChange = (event, data) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.type === 'text' ? target.value : data.value;
        const name = target.name ? target.name : data.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { modalOpen, type, group, description, nextRun, owner } = this.state;
        const { taskTypes } = this.props;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Header icon='dot circle' content='New Task' />
                <Modal.Content>
                    <Form size='small'>
                        <Form.Field>
                            <label>Task Group</label>
                            <input name='group' value={group}
                                onChange={this.handleInputChange}
                                placeholder='Task Group' />
                        </Form.Field>
                        <Form.Select
                            onChange={this.handleInputChange}
                            name='type'
                            value={type}
                            fluid label='Task Type' options={taskTypes} placeholder='Task Type' />
                        <Form.Field>
                            <label>Description</label>
                            <input name='description' value={description}
                                onChange={this.handleInputChange}
                                placeholder='Description' />
                        </Form.Field>
                        <Form.Field>
                            <label>Owner</label>
                            <input name='owner' value={owner}
                                onChange={this.handleInputChange}
                                placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                            <label>Due</label>
                            <input name='nextRun' value={nextRun}
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue'
                        onClick={() => this.saveTask()}
                        circular content='SAVE' />
                </Modal.Actions>
            </Modal>
        )
    }
}
