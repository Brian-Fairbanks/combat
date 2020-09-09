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
        <div className="modal">
          <div className="bg-white shadow-lg rounded p-1 absolute" style={{top:props.loc.y+"px", [props.loc.side]:props.loc.x+"px"}} >
            <button className="closeButton" onClick={props.close} >X</button>
            {props.content}
          </div>
        </div>
      }
    </div>
  )
}

export default Modal;