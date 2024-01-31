document.addEventListener("DOMContentLoaded",function(){
/*  (()=>{})(); */
/* The code I wrote by hand
(()=>{
    let eye = document.getElementById("showpw");
    eye.addEventListener("click",() => {
        let pwField = document.querySelector("input[type=password]");
        let type = pwField.getAttribute('type');
        pwField.setAttribute('type') = (type == 'password')?'text':'password';
    });
})();
*/
/** CHAT GPT OPTIMIZED VERSION OF MY CODE with the ask "How can I make my code more efficient?" */
(() => {
    if(document.getElementById("showpw") != null){
    const eye = document.getElementById("showpw");
    const pwField = document.querySelector("input[type=password]");
        eye.addEventListener("click", (e) => {
            const type = this.getAttribute('type');
            this.setAttribute('type', type === 'password' ? 'text' : 'password');
        });

    }
})();
/*** 
(() => {
    if(document.querySelector("#regForm") != null){
        const regForm = document.querySelector("#regForm");
        const pwField = document.querySelector("#password1");
        regForm.addEventListener('submit',(e)=>{
          //  e.preventDefault();
            const pwString = pwField.value;
            if(pwString != ""){
                let message = testPw(pwString);
                if (message.length > 0){
                        throw message;
                }else{
                    const formData = new FormData(this).entries()
                    const response = await fetch('/account/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(Object.fromEntries(formData))
                    });
                
                    const result = await response.json();
                    console.log(result)
                }
            }
        });
    }
    
});
*/
}); // close

// I wrote this on my own before looking at the validation portion of the lesson. 
function testPw(input){
    let message = "";
    if('/.{12}/g'.exec(pwString) == false) message += "Your password must be 12 characters in length. ";
    if('/[A-Z]+/g'.exec(pwString) == false) message += "Your password must contain at least one capital letter. ";
    if('/[\d]+/g'.exec(pwString) == false) message += "Your password must contain at least one roman numeral. ";
    if('/[`~!@#$%^&\*()\-+={}|\\\[\];\'\":,\.<>\?\/\_]/g'.exec(pwString) == false) message += "Your password must contain at least one special character. ";
    return message;
}
