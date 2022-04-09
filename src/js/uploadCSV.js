function uploadDealcsv() {};

/*------ Method for read uploded csv file ------*/

uploadDealcsv.prototype.getCsv = function(inputId) {

    let input = document.getElementById(inputId);
    input.addEventListener('change', function() {

        if (this.files && this.files[0]) {
            for (let file of this.files) {
                var myFile = file;

            }
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                let csvdata = e.target.result;
                parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
            });

            reader.readAsBinaryString(myFile);

        }
    });
}

let parsedata = [];

/*------- Method for parse csv data and display --------------*/
uploadDealcsv.prototype.getParsecsvdata = function(data) {
    parsedata = [];
    let newLinebrk = data.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {
        parsedata.push(newLinebrk[i]
            .replace(',,', ', No Data,')
            .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g));
    };

    return newLinebrk;
};

uploadDealcsv.prototype.dataReset = function(data) {
    data = [];
}

const parseCsv = new uploadDealcsv();


export { parsedata, parseCsv };