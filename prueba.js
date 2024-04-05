
let opt = {
    childList: true,
    subtree: true
};

observer = new MutationObserver(talk);
observer.observe(todo,opt);

observer1 = new MutationObserver(print);
observer1.observe(todo,opt);

document
  .addEventListener("keydown", e => {
    if(e.key === "F9") {
      e.preventDefault()
    }
  })
document.addEventListener("keyup",e => {
    if(e.key === "F9"){
        try{
            const b = document.getElementsByClassName("row text-white m-0 p-0 h-50 d-flex align-items-center bg-info pointer")[0];
            const select = document.getElementsByClassName("el-input el-input--small el-input--suffix")[0];
            const cliente = document.getElementsByClassName("el-select-dropdown__item")[0];
            const total = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
            
            let regexFloat = /\d*\.*\d/gm;
            let speechTotal = new SpeechSynthesisUtterance("su total es de" + parseFloat(total.trim().match(regexFloat)).toFixed(1) + "soles");
            
            speechTotal.rate= 3; 
            window.speechSynthesis.speak(speechTotal);
            select.click();
            cliente.click();
            b.click();
            
        }catch(e){
            console.log("BUTTON ERROR" + e);
        }
    }
})

            
function print(m){
    for (m of m){
        if (m.addedNodes.length > 0 && m.addedNodes.length <= 1){
            console.log("observe " + m.target.className);
            switch(m.target.className){
                case "table table-sm table-borderless mb-0 pos-list-items":
                    try{
                    const pay = document.getElementsByClassName("btn btn-block btn-primary")[0];
                    const docType = document.getElementsByClassName("el-radio-button el-radio-button--small")[2];
                    docType.click();
                    pay.click();
                    }catch(e){
                        console.log("not button: " + e)
                    }
                case "el-dialog":
                    try{
                        const h = document.getElementById("nemo");
                       
                            h.onload = function() {
                                setTimeout(printPdf(h.src),3000)
                            };
                            
                        
                    }catch(e){
                        console.log("not charged " + e)
                    }
            }
        }
    }
}

printPdf = function (url) {
    var iframe = this._printIframe;
    if (!this._printIframe) {
      iframe = this._printIframe = document.createElement('iframe');
      iframe.setAttribute("id","iframe")
      document.body.appendChild(iframe);
  
      iframe.style.display = 'none';
      const newSale = document.getElementsByClassName("el-button float-right el-button--primary el-button--small")[0];
      iframe.onload = function() {
        if(iframe.src.length > 50){
            setTimeout(function() {
                iframe.focus();
                iframe.contentWindow.print();
            }, 100);
            setTimeout(newSale.click(),8000)
            observer1.disconnect();
        }else{
            console.log("empty")
        }
        
      };
    }
    
    iframe.src = url;
  }

function talk(m){
    //try{
        for (m of m){
            if (m.addedNodes.length > 0 && m.addedNodes.length <= 1){
                if(m.target.className="table table-sm table-borderless mb-0 pos-list-items"){
                    try{
                    let = regexId = /NIU/gm;
                    if(m.target.rows[0].innerText.match(regexId) == "NIU"){
                           
                            const desc = document.getElementsByClassName("item-description")[0].innerHTML;
                            const total = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
                            var h = document.getElementsByClassName("row text-white m-0 p-0 h-50 d-flex align-items-center bg-info pointer")[0];
                            //const synth = window.speechSynthesis;
                            let regex = /^([\w\-]+)/gm;
                            let regexfix = /\-+\s*[a-zA-Z]{3,}/gm;
                            let regexFloat = /\d*\.*\d/gm;
                            let descLow = desc.toLowerCase();
                            let productName = descLow.trim().match(regex)//fix);
                            let price = parseFloat(total.trim().match(regexFloat))-lastTotal;
                            
                            //let voices = synth.getVoices()
                            //quitar comment del price to talk the price
                            let speech = new SpeechSynthesisUtterance(productName)// + "de" + price.toFixed(1) + "soles");
                            //speech.voice = voices[0]
                            speech.rate = 5
                            window.speechSynthesis.speak(speech);
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
                
                }else {
                    console.log("no class target")
                }
        
        }else{
            try{
                let regexFloat = /\d*\.*\d/gm;
                const total1 = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
                lastTotal = parseFloat(total1.trim().match(regexFloat)).toFixed(2);
                console.log("second total 1" + total1)
                console.log("Second float"+ lastTotal)
            }catch(err){
                let regexFloat = /\d*\.*\d/gm;
                const total1 = document.getElementsByClassName("font-weight-semibold h5")[1].innerHTML;
                totalNum= parseFloat(total1.trim().match(regexFloat)).toFixed(2);
                lastTotal = totalNum
                console.log("Error total:"+ lastTotal)
                console.log("Error float" + totalNum)
                //console.log("no Total")
            }


        };
};

}