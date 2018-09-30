import React, { Component } from 'react';
import { Modal, Button, Header, Form, Icon, Input } from 'semantic-ui-react';
import { RectDatePicker } from 'rect-ui-calendar';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            type: '',
            group: '',
            description: '',
            nextRun: '',
            owner: '',
            selected: '',
            open: false,
        }
    }
    open = () => this.setState({
        modalOpen: true,
        type: '',
        group: '',
        description: '',
        nextRun: '',
        owner: '',
    })
    close = () => this.setState({ modalOpen: false })

    saveTask = () => {
        const { type, group, description, nextRun, owner } = this.state;
        var dateSplit = nextRun.split("/");
        var d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
        d.setHours(23, 59, 59, 999);
        this.props.addTask(type, group, description, d.getTime(), owner);
    }
    handleInputChange = (event, data) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.type === 'text' ? target.value : data.value;
        const name = target.name ? target.name : data.name;

        this.setState({
            [name]: value
        });
    }

    onSelect = (selected) => {
        var str = selected.getDate() + "/" + (parseInt(selected.getMonth(), 10) + 1).toString().padStart(2, "0") + "/" + selected.getFullYear();
        this.setState({ open: false, nextRun: str });
    }
    openCalendar = (e) => {
        const { nextRun } = this.state;
        var d = new Date();
        var ds = nextRun.split("/");
        d.setDate(ds[0]);
        d.setMonth(ds[1] - 1);
        d.setFullYear(ds[2]);
        d.setHours(0, 0, 0);
        this.setState({ selected: d, open: true })
    }

    render() {
        const { modalOpen, type, group, description, nextRun, owner, open } = this.state;
        const { taskTypes } = this.props;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Header icon='dot circle' content='New Task' />
                <Modal.Content>
                    <Form size='small' autoComplete='off'>
                        <Form.Field required>
                            <label>Description</label>
                            <input name='description' value={description}
                                onChange={this.handleInputChange}
                                placeholder='Description' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Task Group</label>
                            <input name='group' value={group}
                                onChange={this.handleInputChange}
                                placeholder='Task Group' />
                        </Form.Field>

                        <Form.Select required
                            search selection
                            onChange={this.handleInputChange}
                            name='type'
                            value={type}
                            fluid label='Task Type' options={taskTypes} placeholder='Task Type' />
                        <Form.Field required>
                            <label>Owner</label>
                            <input name='owner' value={owner}
                                onChange={this.handleInputChange}
                                placeholder='Email' />
                        </Form.Field>

                        <Form.Field required>
                            <label>Next Due</label>
                            <Input
                                icon={<Icon name='calendar outline' link onClick={this.openCalendar} />}
                                iconPosition='left'
                                name='nextRun' value={nextRun}
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>

                        <RectDatePicker open={open}
                            selected={this.state.selected}
                            onSelect={this.onSelect} />
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
