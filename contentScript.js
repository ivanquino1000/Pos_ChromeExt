const todo = document.getElementsByClassName("container-fluid p-0")[0];
let lastTotal = 0;
let actionBt;

window.onload = function(){
    obs = new MutationObserver(talk);
    obs.observe(todo,opt);
    observer1 = new MutationObserver(print);
    const codigo = document.getElementsByClassName("el-switch__core")[0];
    const input = document.getElementsByClassName("fa fa-bars")[0];
    codigo.click();
    input.click();
    appendButton_UI()
}
let opt = {
    childList: true,
    subtree: true
};

let regex = /^([\w\-]+)/gm;
let regexfix = /\-+\s*[a-zA-Z]{3,}/gm;
let regexFloat = /\d*\.*\d/gm;

document.addEventListener("keydown", e => {
    switch (e.key){
        case 'F7':
        case 'F8':
        case 'F9':
        case 'F10':
            e.preventDefault()
            observer1.disconnect()
        break;
    }
  })
  document.addEventListener("keyup",e => {
    switch (e.key){
        case 'F7':
        case 'F8':
        case 'F9':
        case 'F10':
            actionBt = e.key
            init(e.key);
            break;
    }
})

appendButton_UI = function(){
    const buttonContainerDiv = document.querySelector('.col-md-4')

    const quickPrint_Button = document.createElement('button');
    const documentType_Panel = document.createElement('div')
    const nota_button = document.createElement('button');
    const boleta_button = document.createElement('button');
    const factura_button = document.createElement('button');
    const cancel_button = document.createElement('button');

    const showPanelButton_style = {
        backgroundColor: '#46abfe',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '0px',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: '85%',
        transform: 'translate(-50%, -50%)',
        width: '160px',
        height: '50px'
    };

    const optionButton_style = {
        backgroundColor: '#46abfe',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
        border: 'none',
        width: '80%',
        height: '20%',
        fontSize: '25px', 
        fontFamily: 'Arial, sans-serif', 
    };

    const documentTypePanel_style = {
        backgroundColor: '#46abfe',
        color: 'white',
        border: 'none',
        padding: '20px',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-between',
        alignItems: 'center',
        height: '40%',
        width: '450px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: '9999', 
        display: 'none' 

    }

    Object.assign(quickPrint_Button.style, showPanelButton_style)

    Object.assign(nota_button.style, optionButton_style)
    Object.assign(boleta_button.style, optionButton_style)
    Object.assign(factura_button.style, optionButton_style)
    Object.assign(cancel_button.style, optionButton_style)

    Object.assign(documentType_Panel.style, documentTypePanel_style)

    nota_button.innerHTML  = 'Nota de Venta <br>(Clientes Varios)';
    boleta_button.innerHTML  = 'Boleta <br>(Clientes Varios)';
    factura_button.innerHTML  = 'Factura <br>(Clientes Varios)';
    cancel_button.innerHTML  = 'Cancelar';

    documentType_Panel.appendChild(nota_button)
    documentType_Panel.appendChild(boleta_button)
    documentType_Panel.appendChild(factura_button)
    documentType_Panel.appendChild(cancel_button)

    nota_button.addEventListener('click',()=>{
        init('F9')
        documentType_Panel.style.display = 'none'; 
        console.log('option button preseed')
    })
    boleta_button.addEventListener('click',()=>{
        init('F10')
        documentType_Panel.style.display = 'none'; 
        console.log('option button preseed')
    })
    factura_button.addEventListener('click',()=>{
        init('F7')
        documentType_Panel.style.display = 'none'; 
        console.log('option button preseed')
    })
    cancel_button.addEventListener('click',()=>{
        documentType_Panel.style.display = 'none'; 
    })

    // show Document Type Selection Panel
    quickPrint_Button.addEventListener('click',()=>{
       documentType_Panel.style.display = 'flex'; 
    })
    quickPrint_Button.textContent = 'Impresion Rapida (Clientes Varios)';

    buttonContainerDiv.appendChild(quickPrint_Button)
    buttonContainerDiv.appendChild(documentType_Panel)


}



init = function (a){
    try{ 
        
        const b = document.getElementsByClassName("row text-white m-0 p-0 h-50 d-flex align-items-center bg-info pointer")[0]; 
        const total = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
        const select = document.getElementsByClassName("el-input el-input--small el-input--suffix")[0];
        const cliente = document.getElementsByClassName("el-select-dropdown__item")[0];
        let speechTotal = new SpeechSynthesisUtterance("su total es de" + parseFloat(total.trim().match(regexFloat)).toFixed(1) + "soles");
        speechTotal.rate= 3; 
        if(a=='F9'||a=='F10'){
            //window.speechSynthesis.speak(speechTotal);
            select.click();
            cliente.click();
            b.click();
        } else{
            //window.speechSynthesis.speak(speechTotal);
            b.click();
        }
        observer1.observe(todo,opt)
    }catch(e){
        console.log("BUTTON ERROR" + e);
    }
}

printPdf = function (url) {
    var iframe = this._printIframe;
    if (!this._printIframe) {
      iframe = this._printIframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.style.display = 'none';
      iframe.onload = function() {
        if(iframe.src.length > 50){
            setTimeout(function() {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1000);
            setTimeout(document.getElementsByClassName("el-button float-right el-button--primary")[0].click(),8000);
            observer1.disconnect();
        }else{
            console.log("empty")
        }
      };
    }
    iframe.src = url;
  }

function print(m){
    for (m of m){
        if (m.addedNodes.length > 0 && m.addedNodes.length <= 1){
            console.log("observe " + m.target.className);
            switch(m.target.className){
                case "control-label":
                    try{
                        const docTypeF = document.getElementsByClassName("el-radio-button el-radio-button--small")[0]; //Factura
                        const docTypeB = document.getElementsByClassName("el-radio-button el-radio-button--small")[1]; //Boleta
                        const docTypeN = document.getElementsByClassName("el-radio-button el-radio-button--small")[2]; //Nota de Venta
                        
                        switch (actionBt){
                            case 'F9':
                                docTypeN.click();
                            break;
                            case 'F8':
                            case 'F10':
                                docTypeB.click();
                            break;
                            case 'F7':
                                docTypeF.click();
                            break;
                        }
                    }catch(e){
                        console.log("not button: " + e)
                    }
                case "el-select-dropdown el-popper":
                    try{
                        const pay = document.getElementsByClassName("btn btn-block btn-primary")[0];
                        setTimeout(pay.click(),3000);
                    }catch(e){
                        console.log("not pay button: " + e)
                    }
                case "el-dialog":
                    try{
                        const h = document.getElementById("nemo");
                            h.onload = function() {
                                setTimeout(printPdf(h.src),500)
                            };
                    }catch(e){
                        console.log("not charged " + e)
                    }
            }
        }
    }
}
function talk(m){
        for (m of m){
            if (m.addedNodes.length > 0 && m.addedNodes.length <= 1){
                //console.log("observe " + m.target.className);
                switch (m.target.className){
                    case 'row col-lg-12 m-0 p-0':
                        try{
                            let list = document.getElementsByClassName('table table-sm table-borderless mb-0 pos-list-items')[0];
                            let search = document.getElementsByClassName('table table-sm table-borderless mb-0 pos-list-items')[2];
                            let itemDesc = document.getElementsByClassName('row col-lg-12 m-0 p-0')[1];
                            list.className = 'row col-lg-12 m-0 p-0'
                            search.className='row'
                            itemDesc.className = 'table table-sm table-borderless mb-0 pos-list-items'
                        }catch(e){
                            console.log('not added')
                        }
                        break;
                    case 'table table-sm table-borderless mb-0 pos-list-items':
                        try{
                            let = regexId = /NIU/gm;
                            if(m.target.rows[0].innerText.match(regexId) == "NIU"){                               
                                    const desc = document.getElementsByClassName("item-description")[0].innerHTML;
                                    const total = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
                                    var h = document.getElementsByClassName("row text-white m-0 p-0 h-50 d-flex align-items-center bg-info pointer")[0];
                                    //const synth = window.speechSynthesis;
                                    
                                    let descLow = desc.toLowerCase();
                                    let productName = descLow.trim().match(regex)//fix);
                                    let price = parseFloat(total.trim().match(regexFloat))-lastTotal;
                                    
                                    //let voices = synth.getVoices()
                                    let speech = new SpeechSynthesisUtterance(productName + "de" + price.toFixed(1) + "soles");
                                    //speech.voice = voices[0]
                                    speech.rate = 5
                                    //window.speechSynthesis.speak(speech);

                                    console.log(lastTotal)

                                    lastTotal = price
                                    let speechTotal = new SpeechSynthesisUtterance("total" + parseFloat(total.trim().match(regexFloat)).toFixed(1) + "soles");
                                    //speechTotal.voice = voice[1]
                                    speechTotal.rate= 4
                                    //h.onclick = window.speechSynthesis.speak(speechTotal);

                                    console.log(m.target.rows[0].innerText)
                                    console.log(price)                                
                                }else{
                                    console.log("Non product")
                                }
                        }catch(e){
                            console.log(e) 
                            setTimeout(observer.observe(todo,opt),10000)
                        }   
                        break;    
                    default: 
                        try{
                            const total1 = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
                            lastTotal = parseFloat(total1.trim().match(regexFloat)).toFixed(2);
                            //console.log("second total 1" + total1)
                            //console.log("Second float"+ lastTotal)
                        }catch(err){
                            //const total1 = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
                            //totalNum= parseFloat(total1.trim().match(regexFloat)).toFixed(2);
                            //lastTotal = totalNum
                            //console.log("Error total:"+ lastTotal)
                            //console.log("Error float" + totalNum)
                        }
                    };
            };
        
    };
}