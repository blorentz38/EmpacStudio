// JavaScript Document
// Script for Studio Application by blorentz

function triggerContent(theIndex){
	
	// Get the sidebar list and items
	let myList = document.getElementById('sidebarList');
	let listItems = myList.getElementsByTagName('li');
	
	// Get the related section
	let allSubSections = document.getElementsByClassName('subsection');
	let mySubName = listItems[theIndex].getAttribute('eds-related');
	let mySubSection = document.getElementById(mySubName);
	
	// Iterate through list and deactive active item
	for(let i = 0; i < listItems.length; i++){
		let currItem = listItems[i];
		if(currItem.classList.contains('active')){ currItem.classList.remove('active'); }
	}
	
	// Iterate through list and deactive active item
	for(let j = 0; j < allSubSections.length; j++){
		let currItem = allSubSections[j];
		if(currItem.classList.contains('active')){ 
			currItem.classList.remove('active'); 
		}
	}
	
	// Activate the new item
	if(!listItems[theIndex].classList.contains('active')){
		listItems[theIndex].classList.add('active');
	}
	
	if(!mySubSection.classList.contains('active')){
		mySubSection.classList.add('active');
	}
	
}

// Function that toggles the navigation menu
function toggleNav(){
    
    // Grab navigation elements
    let theNav = document.getElementsByTagName('nav');
    let theToggle = theNav[0].getElementsByClassName('toggle');
    let theDrawer = document.getElementsByClassName('sidebar');
    
    //Set the status
    if(!theToggle[0].classList.contains('active')){
        theToggle[0].classList.add('active');
        theDrawer[0].classList.add('active');
    } else {
        theToggle[0].classList.remove('active');
        theDrawer[0].classList.remove('active');
    }
}

// Function that toggles the button state
function toggleButton(theObj, theSection){
	// Reset all buttons
	let myBtnSection = document.getElementById(theSection);
	let myButtons = myBtnSection.querySelectorAll('button');
	for(let i=0; i < myButtons.length; i++){ myButtons[i].classList = ''; }
	
	// Activate new button
	if(!theObj.classList.contains('active')){ 
		theObj.classList.add('active'); 
		document.getElementById(myBtnSection.getAttribute('eds-related')).classList = theObj.getAttribute('eds-related');
	}
}

// Function that updates the root colors in the document
function updateColor(theInput){
	let myPicker = document.getElementById(theInput);
	let mySelection = myPicker.value;
	
	// Grab section and update root variable
	let myOutput = document.getElementById('contentSection');
	myOutput.style.setProperty(myPicker.getAttribute('eds-related-css'), mySelection);
}

// Function that sets event listeners for color attributes
function setColorListeners(){
	let myColorSection = document.getElementById('edsColor');
	let myColorInputs = myColorSection.getElementsByTagName('input')
	for(let c = 0; c < myColorInputs.length; c++){
		let idx = c;
		let myInput = myColorInputs[idx];
		myInput.addEventListener('change', () => { updateColor(myInput.id); });
		// Preset Color Inputs
		updateColor(myInput.id);
	}
}

// Function that updates the root typography in the document
function updateDisplayFont(){
	let myFontSection = document.getElementById('typeStyling');
	let myDisplayInput = myFontSection.querySelector('#displayFont');
	let myValue = myDisplayInput.value;
	let myOutput = document.getElementById('contentSection');
	myOutput.style.setProperty(myDisplayInput.getAttribute('eds-related-css'), myValue);
}

window.onload = function(){
	
	// Set fixed height at all breakpoints
	document.getElementsByTagName('body')[0].style.height = window.innerHeight;
	
	window.addEventListener('resize', function(){
		document.getElementsByTagName('body').style.height = window.innerHeight;
	})
	
	// Add event listeners to sidebar navi
	let sidebarList = document.getElementById('sidebarList');
	let listItems = sidebarList.getElementsByTagName('li');
	
	document.getElementById('sidebarToggle').addEventListener('click', toggleNav);
	
	// Iterate through list and attach event listeners
	for(let i = 0; i < listItems.length; i++){
		let currItem = listItems[i];
		let currIndex = i;
		currItem.addEventListener('click', function(){
			triggerContent(currIndex);
			if(window.innerWidth < 1024){ toggleNav(); }
		})
	}
	
	// Add event listeners to buttons
	let myEditorSections = document.getElementsByClassName('editor');
	
	for(let j = 0; j < myEditorSections.length; j++){
		let idx = j;
		let myButtons = myEditorSections[idx].getElementsByTagName('button')
		for(let b = 0; b < myButtons.length; b++){
			let buttonIndex = b;
			myButtons[buttonIndex].addEventListener('click', (e) => { toggleButton(e.currentTarget, e.currentTarget.parentNode.id) });
		}
	}
	
	// Add event listener for typography settings
	document.getElementById('displayFont').addEventListener('change', updateDisplayFont);
	
	// Add listeners to color selectors
	setColorListeners();
	
}