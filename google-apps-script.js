function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    };

    const data = JSON.parse(e.postData.contents);

    data.members.forEach(member => {
        const row = [
            new Date(), // Timestamp
            data.teamName,
            member.name,
            member.erpId,
            member.year,
            member.email,
            member.phone,
            member.discord
        ];
        sheet.appendRow(row);
    });

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
    // Set up header row
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange('A1:H1').setValues([
        ['Timestamp', 'Team Name', 'Member Name', 'ERP ID', 'Year', 'Email', 'Phone', 'Discord Username']
    ]);
}
