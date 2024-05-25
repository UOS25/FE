import React, {useRef} from 'react';

export default function Payback({  }){
    const paybackModalBackground = useRef();
    return (
        <div id="modal-container" ref={paybackModalBackground}>
            모달입니다.
            
        </div>
    );
}