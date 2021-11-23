

/*
* // fs.appendFileSync('result.csv', `,\"${id}\",\"${wcag}\",\"${description}\",\"${message}\",${impact},\"${relCode}\",,${sampleCode}\n`, callBack2);  //add WCAG and Remediation if needed
* // console.log(`\"${id}\",\"${wcag}\",\"${description}\",\"${message}\",${impact},\"${relCode}\",,\"${sampleCode}\"\n`);
* // sampleCode = val.target[0].replace(/\s\s+/g, ' ').replace(/,/g, '\",\"');
* // id = "=hyperlink(\"\"" + violations[j].helpUrl + "\"\"\, \"\"" + violations[j].id + "\"\")";
* */
function createFile(ace_result){
/*  let id;
  let wcag;
  let description;
  let relCode;
  let impact;
  let sampleCode;
  let message;*/
  let ret = [];
  function populate(violations){
      let count = 0;
        for(let violation of violations){
          //ret.push(["WCAG SC"],[`"${violation.tags}"\r\n`]);
          let primary = "";
           let secondary = " ";
           if(violation.tags.length > 1){
            primary = violation.tags[0];
            violation.tags.splice(0,1);
            secondary = violation.tags;
           }else{
             primary = violation.tags[0];
           }
           primaryLinked = "=hyperlink(\"\"" + violation.helpUrl + "\"\"\, \"\"" + primary + "\"\")";
          for(let node of violation.nodes){
            /*
            * count = violation count
            * wcag = tags representing WCAG violations
            * description = description of the WCAG violation
            * failureSummary = how to fix the violation
            * impact = seriousness of the violation
            * code snippet of the area that's responsible for the violation
            * */

            ret.push(['',`"${count+=1}"`,`"${primaryLinked}"`,`"${secondary}"`,`"${violation.impact/*priotity*/}"`,`"${violation.description}"`,`"${node.html.replace(/\s\s+/g, ' ').replace(/[,]/g, '').replace(/\n/g, '')}"`,'',`"${node.failureSummary}",\r\n`]);
          }
        }
  }

  // let fs = require('fs');
  // fs.writeFileSync('result.csv', "", callBack);

  for(let i = 0; i < ace_result.length; i++){
    sails.log(ace_result);
    let url = ace_result[i].getURL();
    let pageTitle = ace_result[i].getTitle();
    // let sections = ",Issue Id,WCAG SC,Description,Message,Impact,Relevant Code,Remediation,Sample Code";
    ret.push([`"${url}"`,`Resolution: ${ace_result[i].getScreenWidth()}x${ace_result[i].getScreenHeight()}`,`\r\n`]);
    ret.push([`"${pageTitle}"\r\n\r\n`,'', "Issue Id","WCAG SC","WCAG SC Secondary","Priority","Description","Relevant Code","Impact","Remediation","Sample Code","Screen Resolution\r\n"]);
    ret.push(["Violations:\r\n"]);
    populate(ace_result[i].getViolations());
    ret.push(["Incomplete:\r\n"]);
    populate(ace_result[i].getIncomplete());
    // fs.appendFileSync('result.csv', `${url}\n\n${sections}\n`, callBack);
    // fs.appendFileSync('result.csv', "Violations:\n", callBack2);
    // populate(result.violations);
    // fs.appendFileSync('result.csv', "Incomplete:\n", callBack2);
    // populate(result.incomplete);
    // fs.appendFileSync('result.csv', "\n\n", callBack2);
  }
  return ret;
}

// function callBack(err){
//   if(err) throw err;
//   console.log('File is created sucessfully');
// }
//
// function callBack2(err){
//   if(err) throw err;
//   // console.log('File appended successfully');
// }

module.exports = createFile;
