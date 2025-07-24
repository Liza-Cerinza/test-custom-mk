const connection = new Postmonger.Session();
let payload = {};

document.addEventListener('DOMContentLoaded', function () {
  connection.on('initActivity', function (data) {
    payload = data;

    const campaignData = data.arguments?.execute?.inArguments?.find(arg => arg.campaignName);
    if (campaignData) {
      document.getElementById('campaignName').value = campaignData.campaignName;
    }
  });

  connection.on('clickedNext', function () {
    const campaignName = document.getElementById('campaignName').value;

    payload.arguments.execute.inArguments = [
      { email: "{{Contact.Default.Email}}" },
      { campaignName }
    ];

    payload.metaData.isConfigured = true;

    connection.trigger('updateActivity', payload);
  });

  document.getElementById('btnSave').addEventListener('click', function () {
    connection.trigger('clickedNext');
  });

  connection.trigger('ready');
});

