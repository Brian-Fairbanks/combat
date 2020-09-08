import React from 'react';
import './styles.css';


//  To use!
//==============================================
//     const [modal, setModal] = useState(true);
//     <Modal visible={modal} close={() => {setModal(false)}}></Modal>


function Modal(props) {
  return (
    <div>
      {!props.visible ? "" :
        <div className="modal flex justify-center align-center items-center">
          <div className="bg-white shadow-lg rounded p-3 pb-5 pt-8 mb-4 md:w-3xl max-w-3xl min-w-3xl mx-auto relative"  onClick={props.close}>
            <div className="closeButton">X</div>
            testing the modal
            {props.content}
          </div>
        </div>
      }
    </div>
  )
}

export default Modal;