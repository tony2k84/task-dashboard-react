import React, { Component } from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            type: '', 
            group: '', 
            nextRun: '', 
            owner: '',
            taskTypes: props.taskTypes.map((item,index) => {
                var newItem = {};
                newItem.key = index;
                newItem.value = item.type;
                newItem.text = item.type;
                return newItem;
            })
        }
    }
    open = () => this.setState({
        modalOpen: true,
    })
    close = () => this.setState({ modalOpen: false })

    saveTask = () => {
        const {type, group, nextRun, owner} = this.state;
        this.props.addTask(type, group, nextRun, owner);
        this.close();
    }
    handleInputChange = (event, data) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.type === 'text' ? target.value : data.value;
        const name = target.name?target.name:data.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {modalOpen, type, group, nextRun, owner, taskTypes} = this.state;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Header icon='dot circle' content='New Task' />
                <Modal.Content>
                    <Form>
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
                            <label>Due</label>
                            <input name='nextRun' value={nextRun} 
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>
                        <Form.Field>
                            <label>Owner</label>
                            <input name='owner' value={owner} 
                                onChange={this.handleInputChange}
                                placeholder='Email' />
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
