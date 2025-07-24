define(["postmonger"], function (Postmonger) {
  "use strict";

  var connection = new Postmonger.Session();
  var payload = {};

  var campaignName = "";
  var campaignId = "";

  $(window).ready(onRender);

  connection.on("initActivity", initialize);
  connection.on("requestedTokens", onGetTokens);
  connection.on("requestedEndpoints", onGetEndpoints);

  $("#activity-form").submit(function (e) {
      e.preventDefault();
      campaignName = $("#campaign").val();
      campaignId = $("#idCampaign").val();
      save();
  });

  function onRender() {
      connection.trigger("ready");
      connection.trigger("requestTokens");
      connection.trigger("requestEndpoints");
  }

  function initialize(data) {
      if (data) {
          payload = data;
      }

      var inArguments = payload.arguments?.execute?.inArguments || [];

      inArguments.forEach(function (arg) {
          if (arg.campaignName) {
              campaignName = arg.campaignName;
              $("#campaign").val(campaignName);
          }

          if (arg.campaignId) {
              campaignId = arg.campaignId;
              $("#idCampaign").val(campaignId);
          }
      });
  }

  function onGetTokens(tokens) {
      // Puedes usar los tokens si es necesario
  }

  function onGetEndpoints(endpoints) {
      // Puedes usar los endpoints si es necesario
  }

  function save() {
      // Validación simple
      // No es necesario validar otros campos si solo se envía el email

      payload.arguments.execute.inArguments = [
          { email: "{{Contact.Attribute.Prueba_Jorge.Email}}" }
      ];

      payload.metaData.isConfigured = true;

      connection.trigger("updateActivity", payload);
      $("#status").html("Datos guardados correctamente.");
  }
});
