import React from 'react';
import { reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import connect from '../connect';
import CustomModal from './CustomModal';
import ChannelsForm from './ChannelsForm';

const mapStateToProps = ({
  createChannel, showModal, modal,
}) => {
  const props = {
    createChannel,
    showModal,
    modal,
  };
  return props;
};

const AddChannelForm = reduxForm({
  form: 'AddchannelForm',
  onSubmitSuccess: (result, dispatch, { reset }) => {
    reset();
  },
})(ChannelsForm);

@connect(mapStateToProps)
export default class AddChannel extends React.Component {
  render() {
    const currentModalName = 'addChannel';
    const {
      createChannel,
      showModal,
      modal,
    } = this.props;

    return (
      <div className="mt-3">
        <Button
          onClick={() => showModal({
            ui: {
              name: currentModalName,
            },
          })}
          color="primary"
        >
          Add +
        </Button>
        <CustomModal name={currentModalName}>
          <AddChannelForm
            label="Channel name"
            buttonText="Add channel"
            handleAction={({ text }) => createChannel({
              data: {
                name: text,
              },
              ui: {
                ...modal.ui,
              },
            })}
          />
        </CustomModal>
      </div>
    );
  }
}
