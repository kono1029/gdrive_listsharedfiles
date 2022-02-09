function myFunction() {
  var teamDrives;
  var folderList;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rows = sheet.getLastRow();
  var avalues;
  var lastrow;
  var pageToken;

  do{

    // Get drive list
    teamDrives = Drive.Drives.list({userDomainAdminAccess:true});
    if(teamDrives.items.length > 0){
      for (var i = 0; i < teamDrives.items.length; i++) {
        var teamDrive = teamDrives.items[i];

        // Get files infomation subordinated shared drives
        folderList = Drive.Files.list({
        corpora:"drive",
        driveId:teamDrive.id,
        spaces: "drive",
        q: "visibility = 'anyoneWithLink'",
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        pageToken: pageToken
        });

          // List files
          for (var j = 0; j < folderList.items.length; j++){
            
            avalues = sheet.getRange("A:A").getValues();
            lastrow = avalues.filter(String).length;

            var values = [];
            var file = folderList.items[j];
            
            var drivename = teamDrive.name;
            var filename = file.title;
            var fileid = file.id;
            var url = file.alternateLink;

            values.push([lastrow+1,drivename,filename,url]);
            sheet.getRange(lastrow+1,1,rows+1,values[0].length).setValues(values); 

            }

          }
      }
  
  pageToken = folderList.nextPageToken;

  }while(pageToken);
}
