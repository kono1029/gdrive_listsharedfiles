function myFunction() {
  var folderList;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rows = sheet.getLastRow();
  var avalues;
  var lastrow;
  var pageToken;

do{

  // Get files infomation subordinated shared drives
  folderList = Drive.Files.list({
  // spaces: "drive",
  q: "visibility = 'anyoneWithLink'",
  includeItemsFromAllDrives: true,
  supportsAllDrives: true,
  pageToken: pageToken
  });

  for (var j = 0; j < folderList.items.length; j++){
    var values = [];
    var file = folderList.items[j];

      // List files
      if(file.teamDriveId == null){

        avalues = sheet.getRange("A:A").getValues();
        lastrow = avalues.filter(String).length;

        var filename = file.title;
        var url = file.alternateLink;
        var owner = file.ownerNames;
        var owners = file.owners;
        var email = owners[0].emailAddress;

        values.push([lastrow+1,filename,url,owner,email]);
        sheet.getRange(lastrow+1,1,rows+1,values[0].length).setValues(values); 

      
      }

  }

pageToken = folderList.nextPageToken;
}while(pageToken);

}
