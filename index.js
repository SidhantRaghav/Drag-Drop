const tabs = document.getElementsByClassName('tab');
const whiteBoxes = document.getElementsByClassName('whiteBox');

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// Function for position Reset
function fix() {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.marginLeft = 0 + 'px';
        tabs[i].style.marginTop = 0 + 'px';
    }
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.backgroundColor = getRandomColor();
}
// For saving color, number,Id of Initial rectangle
let clr, num, Id;
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('dragstart', (e) => {
        clr = e.target.style.backgroundColor;
        num = e.target.innerHTML;
        Id = e.target.id;
        e.target.className += ' hold';
        setTimeout(() => {
            document.getElementById(Id).style.zIndex = -1;
        }, 0);
    });
}
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('dragover', (e) => {
        e.preventDefault();
        fix();
    });
    tabs[i].addEventListener('dragenter', (e) => {
        document.getElementById(e.target.id).parentElement.className += ' dashed';
    });
    tabs[i].addEventListener('dragleave', (e) => {
        console.log('DragLeave has been triggered');
        document.getElementById(e.target.id).parentElement.className = 'whiteBox';
    })
    tabs[i].addEventListener('dragend', (e) => {
        document.getElementById(e.target.id).parentElement.className = 'whiteBox';
        document.getElementById(Id).style.zIndex = 1;
        document.getElementById(Id).className = 'tab';
    });
}
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('drop', (e) => {
        let tclr = e.target.style.backgroundColor;
        let tnum = e.target.innerHTML;
        // Animation
        let row = (parseInt(Id[1]) - parseInt(e.target.id[1])) * 195;
        let clm = (parseInt(Id[2]) - parseInt(e.target.id[2])) * 195;
        //
        if (num != undefined) {
            e.target.style.backgroundColor = clr;
            e.target.innerHTML = num;
            document.getElementById(Id).innerHTML = tnum;
            document.getElementById(Id).style.backgroundColor = tclr;
            document.getElementById(Id).className = 'tab';
            document.getElementById(e.target.id).parentElement.className = 'whiteBox';
        }
        // Animation
        //------------------ 
        let left = parseInt(document.getElementById(Id).style.marginLeft, 10) || 0 + clm * -1;
        let right = parseInt(document.getElementById(Id).style.marginTop, 10) || 0 + row * -1;
        document.getElementById(Id).style.marginLeft = left + 'px';
        document.getElementById(Id).style.marginTop = right + 'px';
        let kill = setInterval(() => {
            if (left > 0) { left -= 5; }
            if (left < 0) { left += 5; }
            if (right > 0) { right -= 5; }
            if (right < 0) { right += 5; }
            document.getElementById(Id).style.marginLeft = left + 'px';
            document.getElementById(Id).style.marginTop = right + 'px';
            document.getElementById(Id).style.zIndex = 2;
            if (left == 0 && right == 0) {
                clearInterval(kill);
            }
        }, 8);
        //------------------
    });
}
