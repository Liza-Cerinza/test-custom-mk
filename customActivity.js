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
      // Aquí puedes usar los tokens si es necesario
  }

  function onGetEndpoints(endpoints) {
      // Aquí puedes usar los endpoints si es necesario
  }

  function save() {
      // Validación simple
      if (!campaignName || !campaignId) {
          $("#status").html("Debes completar todos los campos.");
          return;
      }

      // Prepara los datos para inArguments. La referencia de email debe coincidir con el schema y el campo de la Data Extension.
      payload.arguments.execute.inArguments = [
          { campaignName: campaignName },
          { campaignId: campaignId },
          { email: "{{Contact.Attribute.Prueba_Jorge.Email}}" }
      ];

      payload.metaData.isConfigured = true;

      connection.trigger("updateActivity", payload);
      $("#status").html("Datos guardados correctamente.");
  }
});
