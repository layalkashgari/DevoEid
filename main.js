var canvas = document.getElementById('viewport');
context = canvas.getContext('2d');
base_image = new Image();
base_image.src = 'index.jpg';
let db = firebase.firestore().collection('Eid');
function make_base() {

    let nameI = document.getElementById('tt').value
    if (nameI.length < 3 || nameI === undefined) {

        alert('أدخل اسمك رجاء : ) ');

    } else {


        db.add({
            name: nameI
        });

        document.getElementById('eid-Saeed').style.display = 'block';;
        document.getElementById('aa').style.display = 'block';
        //   base_image.width= "100%";
        
        var textInput = document.getElementById('tt').value;
        console.log(textInput)

        document.getElementById("demo").innerHTML = textInput;


        var base_imageH = base_image.height;
        canvas.clientWidth = base_image.width;
        canvas.clientHeight = base_imageH;

        // var imgSize = calculateAspectRatioFit(base_image.width, base_image.height, canvas.clientWidth, canvas.clientHeight);


        function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
            // var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            //   console.log(maxHeight)
            var rtnWidth = srcWidth;
            var rtnHeight = srcHeight;
            return {
                width: rtnWidth,
                height: rtnHeight
            };
            //   maxWidth = 634;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(base_image, 0, 0, canvas.width, canvas.height);
        context.font = 'bold 18px Tajawal';
        context.textAlign = 'end';
        context.fillStyle = "#c73d32";
        context.fillText(textInput, 300, 390);

        document.getElementById("theimage").src = canvas.toDataURL();

    }
}



// File



function handleFile(e) {
    //Get the files from Upload control
    var files = e.target.files;
    var i, f;
    //Loop through files
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result;

            var result;
            var workbook = XLSX.read(data, { type: 'binary' });

            var sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                if (roa.length > 0) {
                    result = roa;
                }
            });
            //Get the result
            console.log(result);
        };
        reader.readAsArrayBuffer(f);
    }
}



function to_image(e) {
    var btn = document.getElementById("aa");
    btn.addEventListener('click', function (e) {
        var canvas = document.getElementById("viewport");
        var dataURL = canvas.toDataURL();
        btn.href = dataURL;
    })

}



//Change event to dropdownlist
$(document).ready(function () {
    $('#files').change(handleFile);
});