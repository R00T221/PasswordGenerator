
//Fetching Input Slider element
const inputSlider=document.querySelector('[pswrd-lengthSlider]');//To fetch an element using custom attribute,we use [] to enclose the custom attribute.

//Fetching Password Length Number
const lengthDisplay=document.querySelector('[pswrd-lengthNum]');

//Fetching input type which displays password
const passworDisplay=document.querySelector('[data-passworDisplay]');
//Fetching copy button
const copyBtn=document.querySelector('[pswrd-copy]');
//Fetchig copy msg
const copyMsg=document.querySelector('[pswrd-copyMsg]');

//Fetching CheckBoxes using their id
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');

//Fetching strength Indicator
const indicator=document.querySelector('[pswrd-indicator]');

//Fetching Generate Password Button
const generateBtn=document.querySelector('.generateButton');

//Fetching all Check Boxes at once.Using querySelectorAll to get an array of checkboxes.
const allCheckBox=document.querySelectorAll('input[type=checkbox]');
/*====================================
    FETCHING OF ELEMENTS ENDS
====================================*/

//CREATING A STRING OF SYMBOLS AMONG WHICH ONE OF THE SYMBOLS IS RANDOMLY ACCESSED
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

/* ***********************************
        SETTING DEFAULT PARAMETERS
************************************/

let password = "";//Setting the deafult password string as empty.
let passwordLength=10;//Default value of password length is 10.
let checkCount=0;//setting default count of checked checkboxes to 0.
//Setting the default color of strength indicator circle to grey.

//Calling handleSlider() function
 handleSlider();
//Invoking setIndicator() function
 setIndicator('#ccc');

/* **********************************
    Handle Slider Function
*************************************
As per the flow of execution,the ist thing that needs to be handled is the slider function.This function sets the password length on the basis of slider movement. */
function handleSlider(){
 //setting the initial/default value of inputSlider(which represents the slider)
 inputSlider.value=passwordLength;
 //Now the same value is to be displayed in lengthDisplay which represents the 'p' tag displaying length of password.
 lengthDisplay.innerText=passwordLength;

//  CODE TO CALCULATE THE VALUES BEFORE THE SLIDER-THUMB POSITION AND AFTER THE SLIDER THUMB'S POSITION i:e on a slider where a thumb is placed,there is one type of color upto the slider thumb and after the slider thumb there is another color,so to apply the color,we need to calculate the range upto slider thumb and after the slider thumb.Since inputSlider value stores the input slider element,so getting the min and max values as:
const maximum=inputSlider.max; 
const minnimum=inputSlider.min; 
//Now we will calculate the background size and since we have already applied gradient(dk-violet) as  background-image,thus only the calculated background-size will reflect that background image.For background size,we know height will be 100% but we need to calculate width in %age.
const total=maximum-minnimum;//gives total range
//passwordLength contains the length of password upto slider-thumb and we need to calculate how much %age is passwordLength of total length(range).Let bgSize denote the %age  that passwordLength is of total range
let bgSize=((passwordLength-minnimum)*100)/total;
inputSlider.style.backgroundSize= bgSize+'% 100%';//where bgSize% represents width and 100% represents height

}

/* **********************************
    Set Indicator Function
*************************************
This function sets indicator color of strength of pswrd-indicator */
function setIndicator(color){
//This function does 2 things,sets the color and shadow of strength indicator div.
indicator.style.backgroundColor=color;
indicator.style.boxShadow=`0px 0px 12px 1px ${color}`; //12px is blur radius and 1px is spread radius and ${color} means present color passed as parameter.
}

/* **********************************
    Get Random Integers Function
*************************************
This function creates random numbers/integers b/w 2 numbers,one among them will be min. and other the max.
This function will be used by other function which is supposed to generate random numbers.*/
function getRndmInteger(min,max){
//In this function we passed 2 parameters,a min and a max value within which we have to generate a random integer.We need to use min and max in order to get the integer within a specific limit,otherwise using math.random and math.floor directly without the limits lead to a possibility of generating floating point numbers.This function will be used to generate random integers within a specific limit and those integers will represent ascii values of respective upper case/lower case characters like 97 for 'a' and 123 for 'z',65 for 'A' and 90 for 'Z' etc.

/*The logic behind this function is that if we have a random number e:g 0.5 generated by math.random function then we will multiply that number with 'max-min +1' e:g 9-5+1=5(where 9 is max and 5 is min),thus giving the output 0.5*5=2.5.Note that the range given by math.random is [0,1),so to include the max range as well,we add 1 to max-min.Thus range of math.random now becomes [0,1].
Now using math.floor(2.5) to round off this floating number to nearest left integer,we get 2 but since this 2 is not in the range b/w min and max(4 and 9),so we add 'min' value to final result as:4+2=6 and thus we get value b/w 4 and 9 i:e b/w min and max.So what we do is:
math.floor(math.random() * (max-min)) +min;

MATHEMATICALLY:
Since math.random generates b/w 0 and 1 including 0 and excluding 1,range of math.random is: [0,1).Now multiplying range by 'max-min',we get the new range as [(max-min)*0,(max-min)*1) = [0,max-min).
Now adding 'min' to range,the final range we get is:
[(0+min),(max-min+min)) = [min,max),excluding max value.So we get the random integer b/w 'min' and 'max' values.So we can add +1 to include the max value as well.
*/

return Math.floor(Math.random() * (max - min)) + min;

}

/*************************************   Generate Random Numbers Function
*************************************
This function uses the getRndmIntegers() function to generate random integers
*/
function generateRandomNumber(){
 return  getRndmInteger(0,10);
}

/*   *************************************   Generate LowerCase Function
************************************   This function is used to generate random ascii value using getRndmIntegers() function and those ascii values are then converted to repective characters using 'fromCharCode(ascii_value) method of String Object.
The fromCharCode() method in JavaScript is a static method of the String object(also applicable on primitive strings). It converts Unicode values into characters. You can use this method to create a string from a sequence of Unicode values.e:g-

   console.log(String.fromCharCode(65)); // Output: "A"

*/
function generateLowerCase(){

   return String.fromCharCode(getRndmInteger(97,123));
//97 is ascii value of 'a' and 123 is ascii value of 'z',so it generates random integers in range [97,123] and converts the ascii value into repective character.
}

/*   *************************************    Generate UpperCase Function
*************************************/function generateUpperCase(){

    return String.fromCharCode(getRndmInteger(65,91));
 //65 is ascii value of 'A' and 90 is ascii value of 'Z',so it generates random integers in range [65,90] and converts the ascii value into repective character.
 }

 /*   *************************************    Generate Symbol Function
**************************************
This function is used on an already created string of symbols.In this function we select the symbol from the string using charAt(index) method of String Object by using a value which is randomly generated by getRndmIntegers() function.
Suppose we have a string of 20 symbols,so we generate a random integer in range [0,19] and the generated integer will be used to access the respective symbol.
*/
function generateSymbol(){
    const rndmNum=getRndmInteger(0,symbols.length);
//rndmNum will store a random number generated in range [0,string length of 'symbols' string]
   return symbols.charAt(rndmNum);
 /*  
The charAt() method in JavaScript is a method of the String object. It returns the character at a specified index (position) within the string.
In above case symbols is a primitive string but the charAt() method is still applicable on it.
*/
}

/* *********************************
   Calculate Strength Function
************************************
This function calculates the strength of password by changing the color.We ist declare variables for each check box and intialise their value to false i:e intially check for uppercase,lowercase,symbols,numbers will be set to false.Then we use if condition to check if any among them is checked using '.checked' attribute on input type variables defined above as uppercaseCheck,lowercaseCheck etc and if any of them is checked,we change the status of these variables(defined in this function) to true.
Then we use the rules to check for strength of the password.
*/
function calcStrength(){
    //Defining variables
let hasUpper = false;
let hasLower = false;
let hasNum = false;
let hasSym = false;
//Checking wheteher they are checked or not
if(uppercaseCheck.checked) {//means if uppercaseCheck variable which represents the uppercase checkbox input is checked.
    hasUpper=true;
}
if(lowercaseCheck.checked){
    hasLower=true;
}
if(numbersCheck.checked){
    hasNum=true;
}
if(symbolsCheck.checked){
    hasSym=true;
}
//Setting and Checking rules for Strength of Password
if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8) {
    setIndicator('#0f0');
//Now this rule use logical '&' means all the operations should return true result i:e hasUpper,hasLower,(hasNum || hasSym),passwordLength must all be true i:e checked.Thus if uppercase,lowercase,number or symbols are checked and passwordLength is >=8 then color will be '0f0'.The color is set by invoking setIndicator() function.
}
else if(
    (hasLower||hasUpper) && (hasNum|| hasSym) && passwordLength>=6
)
//If lowercase OR uppercase,number OR symbol is checked and passwordLength>=6.
{
    setIndicator('#ff0');
}
else {
    setIndicator('#f00');
}

}

/* *********************************
   Copy To Clipboard Function
************************************
This function uses 'clipboard API' to write the generated text/password to the clipboard.The statement used for this purpose is:
   navigator.clipboard.writeText(passworDisplay.value)

(*)navigator: This is a built-in object in the browser that provides information about the browser's environment and allows interaction with the browser.

(*)clipboard: This is a property of the navigator object that represents the clipboard, which is a temporary storage area for data that the user has copied from one location and intends to paste elsewhere.
(*)writeText(): This is a method of the clipboard object. It is used to write text to the clipboard.It returns a Promise that resolves when the text has successfully written to the clipboard.
Since a promise is returned ,thus it is async code and thus needs to be implemented using async-await function.
Thus we add 'await' keyword before navigator.clipboard.writeText(passworDisplay.value) and by using this the code waits until the Promise resolves before moving onto the next line of code.This ensures that the password is successfully written to the clipboard before any further actions are taken.
(*)'passworDisplay' is the varaiable that stores the fetched input type which displays the password.
Value is a property of that input element(currently stored in passworDisplay) that represents its current value.
*/
async function copyContent(){
//Since there may occur an error while copying the text to clipboard,so we use try-catch in this async function
try{
    await navigator.clipboard.writeText(passworDisplay.value);
/*Once the promise is resolved(text copied successfully),the next line of code in try block will be executed and the next line of code displays the 'copied' text.If the promise is rejected,then control directly passes to the catch block.
Using innerText attribute,we will write 'copied' into the copyMsg varaiable which points to the fetched 'span' tag within the button tag which is there to display the message 'copied'.
*/
copyMsg.innerText='copied';
}
catch(err){
  //In case of error,the copyMsg variable will display 'failed' and text color will be different
  //copyMsg.style.color='maroon';
  copyMsg.innerText='failed!';
}
/*Since the text 'copied' or 'failed' displayed by copyMsg vanishes after some time,so there must be a timeout set for it to display.
Thus here we add a css class 'active' to the span element stored in copyMsg which will make it visible but using setTimeout() function we will remove the same 'active' class from the span element so that after the fixed timeout the text vanishes.This also means that using css properties 'span' element intially will be set to hidden.
*/
copyMsg.classList.add('active');

setTimeout(()=>{
    copyMsg.classList.remove('active')
},2000);

}

/* ===============================
 Adding an Event Listener to Slider
 ==================================
inputSlider varaiable represents the input type 'range' Html element and we are adding event listener to same.
So when the 'input' event(event that causes input value,textarea to change) is triggered in inputSlider,an arrow function will be executed with an event object(e) passed as parameter to it.
 */
inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
//The event object stores all information about the event,so we access the current value in target element(element which triggered event) using the event passed as 'e.target.value' and we put this value into variable passwordLength.Then we invoke handleSlider() function which is supposed to display the same value in lengthDisplay variable.
})

/* ===============================
 Adding an Event Listener to CopyButton
 ==================================
copyBtn variable represents the button element used to copy generated password to clipboard. 
 */
copyBtn.addEventListener('click',()=>{
//Since copy operation can only be done when there is a valid password(cannot be empty) generated in input type represented by variable passworDisplay.So setting up the condition for a valid password.If the condition is met,copyContent() function will be called which is supposed to handle copy to clipboard operation
if(passworDisplay.value)
    copyContent();
})

/* ===============================
 Adding an Event Listener to Check Boxes
 ==================================
Since password can't be generated if none of the check boxes is checked.By default one of the checkboxes is checked but the user can uncheck it and no password will be generated when no checkbox is checked.Thus we need to count the checkboxes that are checked using the already declared variable above called 'checkCount'.This varaibale's value will be updated using an event listener set on each check box.This event listener here will be 'change' which means that whether checkbox is checked ,event triggers or checkbox is unchecked,event still triggers.The list of all checkboxes is already stored in varaible 'allCheckBox'.
 */

/************************************Defining a callback function to be implemeneted for checkbox 'change' events.
************************************
In this function we intialise checkCount to zero and then using 'if' condition we check for each checkbox that if checkbox is checked,increment the checkCount.This means checkCount will only increment when checkbox is checked and will store the value equal to no.of checkboxes checked.Thus when unchecked,event triggers but checkCount is not incremented.Thus it means everytime event occurs(check/uncheck) the count for checked checkboxes start from zero and only when checkbox is checked,increment is done.Thus no.of checked checkboxes=value of checkCount. 
*/
function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach ( (checkbox) =>
//checkbox here is a parameter passed in 'forEach' method representing each checkbox.
  {
     if(checkbox.checked)
     checkCount++;
  });

 //But a corner case problem arises here i:e,if all 4 check boxes are checked,means password has to be at least 4 character long but if the slider is set on less than that(1 or 2 or 3),then there will be mismatch becox password will be generated of 4 characters but slider will be displaying less than that.Thus we are adding a special condition here that if passwordLength is less than checkCount value then passwordLength has to be atleast equal to checkCount value.
 if(passwordLength < checkCount){
    passwordLength=checkCount;
    handleSlider();
 }
 //Now we need to update the new passwordLength on UI as well i:e if passwordLength is less than checkCount then the above code will make it equal to checkCount value but we need to update the same on the UI as well means if user checks 3 checkboxes and enters slider value(passwordLength) as 2,the slider should automatically display 3 as passwordLength.For this we invoke handleSlider() function.
 
}


//Using forEach loop to traverse each checkbox and applying eventListener to each checkbox and invoking a callback function to be executed when event occurs
allCheckBox.forEach((checkbox)=>{//checkbox here  denotes a parameter passed representing each checkbox.
  checkbox.addEventListener('change',handleCheckBoxChange);
});

/*================================
   shufflePassword Function
==================================*/
function shufflePassword(shuffleArray){
 //To shuffle a string/password we will use an algorithim called 'FISHER YATES METHOD'.
 for(let i=shuffleArray.length-1;i>0;i--)//Starting the loop from  last element using variable 'i' as i<array.length-1,'-1' is done becox indexing of elements starts from zero but length will start from 1.The value of 'i' will go from last index to 2nd index(i=1).


 // Ending the loop AT the 2nd element BECOX The last iteration of the loop (when i is 1) ensures that the second element is swapped with either the first or the second element. This step completes the shuffling process because the last two elements are effectively swapped, achieving the desired randomness .Stopping the loop when i is 1 ensures that we don't unnecessarily swap the first element with itself in the final iteration, which wouldn't change anything.
 {
  //calculating a random index 'j'
  const j=Math.floor(Math.random()*(i+1));//When we try to generate the random index 'j',we need to make sure that it lies in that range of [0,i] where i is the last index of array and by multiplying with (i+1),we make sure it remians in that range as range of Math.floor(math.random()) is [0,1) and by multiplying with i+1,range becomes [0,i+1),excluding i+1 but including 'i' i:e range becomes [0,i].
  const temp=shuffleArray[i];
  shuffleArray[i]=shuffleArray[j];
  shuffleArray[j]=temp;
 }
 //Now we need to convert this shuffled array back to string as it was changed to shallow copy of array instance

 //Creating an empty string
 let str='';
 shuffleArray.forEach((character)=>{
str+=character;//putting each character of shuffledArray into empty string 'str'.
 });
 return str;
}

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
EVENT LISTENER OF GENERATE PASSWORD BUTTON
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
The button is represented by variable generateBtn
*/
generateBtn.addEventListener('click',()=>{
    //Condition-1:-If none of the checkboxes is checked,password will not be generated.Here we will check the value of varaiable checkCount but within from the checkBoxChange() function becox the global declaration is set to zero and since one of the checkboxes is alraedy checked,which will be staored as count in checkBoxChnage function
    if(handleCheckBoxChange.checkCount==0) 
    return;

//Condition-2:-Since even if all 4 checkboxes are checked then at least 4 character long password is to be generated.As there are already event listeners applied on each checkbox which set the slider exactly at the value of checkCount but after all 4 checkboxes are checked,we can still change the slider value to a lesser value,which means slider can show password of characters less than 4 when actually all 4 chckboxes are checked.So same logic will be applied on the event listener of the button as well.
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
 }

 //JOURNEY TO FIND NEW PASSWORD
 console.log('STARTING THE JOURNEY OF EVENT LISTENER EXECUTON');
 //(1):- To create a new password,we need to remove the old password before new password is generated at click event of generateBtn.
 password='';

 //(2):-Put the minnimum criteria specified by checkboxes into the password:
 //If uppercase is checked,invoke generateUpperCase() function on password.
 
 /*if(uppercaseCheck.checked){
    password=generateUpperCase();
 }
 if(lowercaseCheck.checked){
    password=generateLowerCase();
 }
 if(numbersCheck.checked){
    password=generateRandomNumber();
 }
 if(symbolsCheck.checked){
    password=generateSymbol();
 }
 */

//But in using the above method,we still face the problem of generating other characters i:e if there are 10 charaters to be generated in password and 4 are compulsory(checked ones),then we still need to generate other 6 charcters and they can be generated using a loop by creating an array of all the functions that are invoked to generate characters.So when the event is triggered(generateBtn),every time we create an empty array and check for the checkboxes that are checked and the ones that are checked,we push the respective generate function into the array i:e if uppercase is checked,we push the generateUppercase() function into array.After that we do the compulsory addition  of characters using loop that are to be compulsorily added to password becox their respective checkboxes are checked.After that we do the remaining addition of characters into password randomly by using a loop and traversing the array of functions the selecting one of the functions and executing it.

//Creating array of functions
let funcArray=[];
if(uppercaseCheck.checked)
 funcArray.push(generateUpperCase);

if(lowercaseCheck.checked)
 funcArray.push(generateLowerCase);

if(numbersCheck.checked)
 funcArray.push(generateRandomNumber);

if(symbolsCheck.checked)
 funcArray.push(generateSymbol);

 //Creating another array of functions which will surely include all function that will be used for those characters which are not mandatory(Remaining Addition).This is to be used only when we want mixed characters which include compulsory ones but the remaining ones also include those characters which are non-compulsory.
 let funcArray1=[generateLowerCase,generateRandomNumber,generateUpperCase,generateSymbol];

 //Compulsory addition:-Since the funcArray now contains only those functions whose respective checkboxes are checked,thus we can use loop to traverse the funcArray and use only those funcions to generate random characters that are checked via checkboxes.
 for(let i=0;i<funcArray.length;i++){
    password += funcArray[i]();//funcArray[i] represents the function amd with () we are invoking that function same time.
 }
 console.log('COMPULSORY ADDITION DONE');
 
 //Remaining Addition:- For remaining addition,we use a loop to traverse remaining no. of times and generate a random integer each time between 0 and length of array becox the remaining characters must also be from those which are checked.
 for (let i=0;i<passwordLength-funcArray.length;i++) {
    let randomIndex=getRndmInteger(0,funcArray.length);
    // console.log('Random Index is: ',randomIndex);
    // console.log('Function at Random Index is:',funcArray[randomIndex]);
    password += funcArray[randomIndex]();
 }

 //REMAINING ADDITION IF WE USE funcArray1 is commented out below:

 /*
 for (let i=0;i<passwordLength-funcArray.length;i++) {
    let randomIndex=getRndmInteger(0,funcArray1.length);
    
    password += funcArray1[randomIndex]();
 }
 */


 console.log('REMAINING ADDITION DONE');
 //(03):-Now the methods we used guarentees one thing,if all 4 checkboxes are checked then obviousely as per our methods,the ist character will always be uppercase,the 2nd character will always be lower case,the 3rd will always be a number and the 4th will always be a symbol.To remove this certainity,we need to shuffle the password to get it random.Passing an array of password as parameter
 password=shufflePassword(Array.from(password));//Array.from('iterable'); method is used to create a shallow copy of array instance from an Array like object or Iterable Object.The 'password' passed in argument is the string 'password' that was generated and is currently in array format becox of .from() method.
 console.log('SHUFFLING DONE');

 //Display password on UI
 passworDisplay.value=password;
 console.log('ADDITION TO U.I DONE');
 //Calculate and Display Strength
 calcStrength();



});
