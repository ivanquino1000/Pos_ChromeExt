const todo = document.getElementsByClassName("container-fluid p-0")[0];
const opt= {
    attributes: false,
    attributeOldValue: false,
    subtree: false,
    childList: true,
    CharacterData: false
}
observer = new MutationObserver(talk)
function talk(m){
    for (m of m){
        console.log(m.target)
        if (m.target.className == "font-weight-semibold h5"){
            try{
                let = regexTotal = /S\//gm;
                if(m.target.innerText.match(regexTotal) == "S/"){
                              
                        const total1 = document.getElementsByClassName("font-weight-semibold h5")[1].innerText;
                        let regexFloat1 = /\d*\.*\d/gm;
                        let priceInd = parseFloat(total1.trim().match(regexFloat1));
            
                        let speech1 = new SpeechSynthesisUtterance( priceInd - 1 + "hola");
                        //let speech1 = new SpeechSynthesisUtterance(price+"soles");
                        speech1.rate = 5
                        window.speechSynthesis.speak(speech1);
                        console.log(m.target.innerText.oldValue)
                       //lastTotal = price
                }else{
                    console.log("not ELement")
                }
            }catch(e){
                console.log("Fatal Error" + e+"total") 
                setTimeout(observer.observe(todo,opt),10000)
            };
            };
        };
    };
observer.observe(todo,opt)
