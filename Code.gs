function listFolderContents(folder) {
  var subFolders = folder.getFolders();
  var files = folder.getFiles();
  var output = [];

  // Recursively loop through subfolders
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    var subFolderName = subFolder.getName();
    output.push([subFolderName, "", ""]);

    // Get files in subfolder
    var subFiles = subFolder.getFiles();
    while (subFiles.hasNext()) {
      var subFile = subFiles.next();
      var subFileName = subFile.getName();
      var subFileUrl = subFile.getUrl();
      output.push(["", subFileName, subFileUrl]);
    }

    // Call the function recursively
    var subOutput = listFolderContents(subFolder);
    output = output.concat(subOutput);
  }

  return output;
}

function getFolderAndFileLinks() {
  var folderId = "your-folder-id-here"; // ganti dengan ID folder Anda
  var folder = DriveApp.getFolderById(folderId);
  var output = [["Folder Name", "File Name", "File Link"]];
  var folderContents = listFolderContents(folder);
  output = output.concat(folderContents);

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1, output.length, 3).setValues(output);
}

