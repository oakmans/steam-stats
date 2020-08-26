import React from 'react'
import { Modal, Button } from "react-bootstrap";

export class InfoModal extends React.Component {

    render() {
        return (
            <Modal show = {this.props.show}
                   onHide={this.props.hideModal}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Body>
                    {this.props.bodyText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={this.props.hideModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}