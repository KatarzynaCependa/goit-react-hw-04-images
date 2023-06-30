import { Component } from 'react';
import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  modalClose = e => {
    if (e.key === 'Escape' || e.type === 'click') {
      this.props.onClick('');
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.modalClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.modalClose, false);
  }

  render() {
    const { imageAddress } = this.props;

    return (
      <div className={css.Overlay} onClick={this.modalClose}>
        <div className={css.Modal}>
          <img src={imageAddress} alt="modal" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageAddress: PropTypes.string,
  modalClose: PropTypes.func,
};
